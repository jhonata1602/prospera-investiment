import { useState, useEffect, useRef, useCallback } from 'react'
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Compass } from 'lucide-react'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useLanguage } from '@/contexts/LanguageContext'

interface RouteCard {
  id: string
  title: string
  microcopy: string
  imageSrc: string
  videoSrc?: string
}

// ESTEIRA 1 (SUPERIOR): Foco institucional / estratégico / arquitetura & skyline
const ROW_1_ROUTES: RouteCard[] = [
  {
    id: 'new-developments',
    title: 'New Developments',
    microcopy: 'Lançamentos selecionados com potencial de crescimento e posicionamento estratégico.',
    imageSrc: '/assets/prospera/routes/route-developments.jpg',
  },
  {
    id: 'valorizacao-patrimonial',
    title: 'Valorização Patrimonial',
    microcopy: 'Ativos em localizações consolidadas com alto potencial de valorização a longo prazo.',
    imageSrc: '/assets/prospera/routes/route-skyline.jpg',
  },
  {
    id: 'buy-to-let',
    title: 'Buy-to-Let',
    microcopy: 'Renda recorrente com visão de longo prazo em bairros nobres e consolidados.',
    imageSrc: '/assets/prospera/routes/route-buy-to-let.jpg',
  },
  {
    id: 'hmo-multilet',
    title: 'HMO / Multi-Let',
    microcopy: 'Rentabilidade otimizada com estrutura multi-locação e gestão profissional.',
    imageSrc: '/assets/prospera/routes/route-hmo.jpg',
  },
  {
    id: 'portfolio-building',
    title: 'Portfolio Building',
    microcopy: 'Construção patrimonial progressiva com diversificação e visão de legado.',
    imageSrc: '/assets/prospera/routes/route-portfolio.jpg',
  },
  {
    id: 'empreendimentos-prime',
    title: 'Empreendimentos Prime',
    microcopy: 'Projetos de alta relevância arquitetônica nos distritos mais consagrados da capital.',
    imageSrc: '/assets/prospera/routes/route-valorizacao.jpg',
  },
]

// ESTEIRA 2 (INFERIOR): Foco diverso / visualmente chamativo / interiores, casas modernas & lifestyle
const ROW_2_ROUTES: RouteCard[] = [
  {
    id: 'penthouses-highend',
    title: 'Penthouses & High-End',
    microcopy: 'Apartamentos panorâmicos de alto padrão com vista privilegiada e acabamentos nobres.',
    imageSrc: '/assets/prospera/routes/route-luxury-penthouse.jpg',
  },
  {
    id: 'casas-contemporaneas',
    title: 'Casas Contemporâneas',
    microcopy: 'Projetos residenciais modernos que unem sofisticação, conforto térmico e alta liquidez.',
    imageSrc: '/assets/prospera/routes/route-modern-residence.jpg',
  },
  {
    id: 'flip-retrofit',
    title: 'Flip / Retrofit e Design',
    microcopy: 'Aquisição, modernização e reposicionamento de interiores para valorização ágil.',
    imageSrc: '/assets/prospera/routes/route-flip.jpg',
  },
  {
    id: 'localizacoes-consagradas',
    title: 'Localizações Consagradas',
    microcopy: 'Imóveis inseridos nas ruas mais charmosas e valorizadas de Mayfair e Kensington.',
    imageSrc: '/assets/prospera/routes/route-london-street.jpg',
  },
  {
    id: 'lifestyle-living',
    title: 'Lifestyle & Living',
    microcopy: 'Espaços amplos integrados com marcenaria sob medida e alta gastronomia privada.',
    imageSrc: '/assets/prospera/routes/route-luxury-interior.jpg',
  },
  {
    id: 'oportunidades-offmarket',
    title: 'Oportunidades Off-Market',
    microcopy: 'Acesso antecipado a propriedades singulares antes da abertura ao mercado aberto.',
    imageSrc: '/assets/prospera/routes/route-developments.jpg',
  },
]

export function InvestmentRoutes() {
  const { t } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const [headerRef, isHeaderVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.15, rootMargin: '0px 0px -40px 0px' })
  const [ctaRef, isCtaVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.15, rootMargin: '0px 0px -40px 0px' })
  const sectionRef = useRef<HTMLElement>(null)
  const row1TrackRef = useRef<HTMLDivElement>(null)
  const row2TrackRef = useRef<HTMLDivElement>(null)


  // 4 repetições para garantir buffer infinito mesmo em telas ultra-wide e 4K
  const marqueeCardsRow1 = [...ROW_1_ROUTES, ...ROW_1_ROUTES, ...ROW_1_ROUTES, ...ROW_1_ROUTES]
  const marqueeCardsRow2 = [...ROW_2_ROUTES, ...ROW_2_ROUTES, ...ROW_2_ROUTES, ...ROW_2_ROUTES]

  // Estado e refs de translação contínua (GPU rAF loop)
  const offset1Ref = useRef(0)
  const offset2Ref = useRef(0)
  const cycleWidth1Ref = useRef(0)
  const cycleWidth2Ref = useRef(0)

  // Momentum buffer para clique nas setas
  const nudge1Ref = useRef(0)
  const nudge2Ref = useRef(0)

  // Controle de arrasto com ponteiro (mouse ou touch)
  const isDraggingRef = useRef(false)
  const dragRowRef = useRef<1 | 2 | null>(null)
  const lastPointerXRef = useRef(0)
  const totalDragDistRef = useRef(0)
  const hasDraggedRef = useRef(false)

  // Medição precisa da largura de um ciclo (6 cards + gaps)
  const updateMeasurements = useCallback(() => {
    if (row1TrackRef.current && row1TrackRef.current.children.length >= 7) {
      const card0 = row1TrackRef.current.children[0] as HTMLElement
      const card6 = row1TrackRef.current.children[6] as HTMLElement
      const dist = card6.offsetLeft - card0.offsetLeft
      if (dist > 0) cycleWidth1Ref.current = dist
    }
    if (row2TrackRef.current && row2TrackRef.current.children.length >= 7) {
      const card0 = row2TrackRef.current.children[0] as HTMLElement
      const card6 = row2TrackRef.current.children[6] as HTMLElement
      const dist = card6.offsetLeft - card0.offsetLeft
      if (dist > 0) cycleWidth2Ref.current = dist
    }
  }, [])

  // Motor contínuo de 60fps/120fps via requestAnimationFrame
  // REGRA CRÍTICA: HOVER NUNCA PAUSA! O autoplay continua ativo o tempo todo.
  useEffect(() => {
    updateMeasurements()
    window.addEventListener('resize', updateMeasurements)

    // Recalibrar após carregamento inicial dos elementos
    const t1 = setTimeout(updateMeasurements, 400)
    const t2 = setTimeout(updateMeasurements, 1200)

    let rafId: number
    let lastTime = performance.now()
    // Velocidade base reduzida e suave (0.11 px/frame): ritmo calmo, sereno e sem pressa
    const baseSpeed = 0.11

    // Respeitar preferência de movimento reduzido (WCAG 2.1 AA)
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const prefersReduced = motionQuery.matches

    // Modulação suave "andar devagar -> desacelerar -> pausar -> acelerar devagar" 100% SINCRONIZADA:
    // As duas esteiras andam juntas, desaceleram juntas, pausam juntas e voltam juntas
    // Ciclo de 9.4s:
    // - 0ms a 5200ms: velocidade de cruzeiro calma e elegante (mult = 1.0)
    // - 5200ms a 6400ms: desaceleração suave de 1.2s via curva cosseno
    // - 6400ms a 8000ms: pausa contemplativa perfeita (~1600ms) para leitura detalhada dos cards
    // - 8000ms a 9200ms: aceleração suave de 1.2s de volta à velocidade de cruzeiro
    // - 9200ms a 9400ms: cruzeiro estabilizado
    const getBreatheMult = (time: number): number => {
      const cycle = 9400
      const t = time % cycle
      if (t < 5200) {
        return 1.0
      }
      if (t < 6400) {
        const p = (t - 5200) / 1200
        const ease = 0.5 * (1 + Math.cos(p * Math.PI))
        return ease
      }
      if (t < 8000) {
        return 0.0 // Pausa suave/contemplativa para leitura exata dos cards
      }
      const p = (t - 8000) / 1200
      const ease = 0.5 * (1 - Math.cos(p * Math.PI))
      return ease
    }

    const tick = (now: number) => {
      const dt = Math.min((now - lastTime) / 16.67, 2.5)
      lastTime = now

      // Aplicar momentum suave do clique nas setas
      if (Math.abs(nudge1Ref.current) > 0.15) {
        const step = nudge1Ref.current * 0.12
        nudge1Ref.current -= step
        offset1Ref.current += step
      }
      if (Math.abs(nudge2Ref.current) > 0.15) {
        const step = nudge2Ref.current * 0.12
        nudge2Ref.current -= step
        offset2Ref.current += step
      }

      // Autoplay contínuo ininterrupto e 100% sincronizado (hover NÃO pausa)
      if (!prefersReduced && !isDraggingRef.current) {
        const mult = getBreatheMult(now)

        // As duas esteiras andam juntas e pausam juntas no mesmo instante
        // Esteira 1: desloca para a esquerda (offset aumenta)
        offset1Ref.current += baseSpeed * mult * dt
        // Esteira 2: desloca para a direita (offset diminui)
        offset2Ref.current -= baseSpeed * mult * dt
      }

      // Modulo wrap preciso: elimina qualquer pulo, travamento ou gap
      const w1 = cycleWidth1Ref.current
      if (w1 > 0) {
        offset1Ref.current = ((offset1Ref.current % w1) + w1) % w1
      }
      const w2 = cycleWidth2Ref.current
      if (w2 > 0) {
        offset2Ref.current = ((offset2Ref.current % w2) + w2) % w2
      }

      // Atualização direta do DOM via GPU translate3d (sem re-renders do React)
      if (row1TrackRef.current) {
        row1TrackRef.current.style.transform = `translate3d(${-offset1Ref.current}px, 0, 0)`
      }
      if (row2TrackRef.current) {
        row2TrackRef.current.style.transform = `translate3d(${-offset2Ref.current}px, 0, 0)`
      }

      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', updateMeasurements)
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [updateMeasurements])

  // Início do arrasto manual
  const handlePointerDown = (e: React.PointerEvent, row: 1 | 2) => {
    isDraggingRef.current = true
    dragRowRef.current = row
    lastPointerXRef.current = e.clientX
    totalDragDistRef.current = 0
    hasDraggedRef.current = false
    try {
      ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
    } catch {}
  }

  // Movimento durante o arrasto manual
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current || !dragRowRef.current) return
    const deltaX = e.clientX - lastPointerXRef.current
    lastPointerXRef.current = e.clientX
    totalDragDistRef.current += Math.abs(deltaX)

    if (totalDragDistRef.current > 8) {
      hasDraggedRef.current = true
    }

    if (dragRowRef.current === 1) {
      offset1Ref.current -= deltaX
    } else {
      offset2Ref.current -= deltaX
    }
  }

  // Fim do arrasto manual
  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return
    isDraggingRef.current = false
    dragRowRef.current = null
    try {
      ;(e.target as HTMLElement).releasePointerCapture(e.pointerId)
    } catch {}
    setTimeout(() => {
      hasDraggedRef.current = false
    }, 100)
  }

  // Navegação manual elegante pelas setas discretas
  const handleStep = useCallback((direction: 'left' | 'right') => {
    const step1 = cycleWidth1Ref.current ? cycleWidth1Ref.current / 6 : 305
    const step2 = cycleWidth2Ref.current ? cycleWidth2Ref.current / 6 : 305
    if (direction === 'left') {
      nudge1Ref.current -= step1
      nudge2Ref.current += step2
    } else {
      nudge1Ref.current += step1
      nudge2Ref.current -= step2
    }
  }, [])

  // Prevenção de clique acidental durante arrasto
  const handleCardClick = (e: React.MouseEvent) => {
    if (hasDraggedRef.current) {
      e.preventDefault()
      e.stopPropagation()
    }
  }

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting) {
          setIsVisible(true)
          updateMeasurements()
          observer.disconnect()
        }
      },
      { threshold: 0.08 }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [updateMeasurements])

  return (
    <section
      ref={sectionRef}
      id="rotas"
      aria-label="Rotas de Investimento — Prospera Investment"
      className="relative w-full overflow-hidden bg-[#07130D] text-prospera-white py-12 sm:py-14 lg:py-16 select-none"
    >
      {/* =====================================================================
          FUNDO EM IMAGEM FIXA DA DOBRA INTEIRA: TOWNHOUSE BRITÂNICA PREMIUM
          - Imagem Oficial: /assets/prospera/investment-routes-background.jpg
          - background-size: cover, background-position: center, background-repeat: no-repeat
          - Fachada principal, árvore e entrada nítidas, claras e bem visíveis de ponta a ponta
          - SEM maskImage de 90px (elimina faixas pretas e descontinuidade)
          - Transições atmosféricas curtas (28px a 36px) e suaves nas extremidades (2ª → 3ª e 3ª → 4ª)
         ===================================================================== */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
        {/* Imagem de Fundo cobrindo a dobra com margem de segurança */}
        <div
          className="absolute -inset-y-8 inset-x-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/assets/prospera/investment-routes-background.jpg')",
          }}
        />

        {/* Overlay translúcido nobre e uniforme, permitindo que a imagem da townhouse permaneça nítida, clara e luminosa */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(7, 19, 13, 0.14) 0%, rgba(7, 19, 13, 0.08) 35%, rgba(7, 19, 13, 0.08) 75%, rgba(7, 19, 13, 0.16) 100%)',
          }}
        />

        {/* Transição névoa difusa no topo (com a 2ª dobra) */}
        <div className="fold-transition-top" aria-hidden="true">
          <div className="fold-transition-glow-top" />
        </div>

        {/* Transição névoa difusa na base (com a 4ª dobra) */}
        <div className="fold-transition-bottom" aria-hidden="true">
          <div className="fold-transition-glow-bottom" />
        </div>
      </div>

      {/* =====================================================================
          1. TOPO DA SEÇÃO: HIERARQUIA EDITORIAL & CONTROLES DISCRETOS
             - Alinhamento centralizado e limpo, consistente com a 4ª dobra
             - Badge institucional pill dourado + verde profundo
             - Headline nobre em Cormorant Garamond em tom champagne com destaque dourado firme
             - Subtítulo nítido e arejado em tom champagne suave com alta legibilidade
             - Micro-controles discretos e elegantes integrados ao eixo visual
             - Scroll dinâmico com fade-up escalonado sutil
          ===================================================================== */}
      <div ref={headerRef} className="container-luxury relative z-10 text-center">
        <div className="relative max-w-[860px] mx-auto px-4 sm:px-6">
          {/* Suave reforço de contraste difuso sem bordas nem caixas visíveis */}
          <div
            className="absolute -inset-x-10 -inset-y-6 sm:-inset-x-16 sm:-inset-y-10 pointer-events-none -z-10 blur-3xl opacity-65"
            style={{
              background:
                'radial-gradient(ellipse 85% 75% at 50% 45%, rgba(6, 18, 13, 0.62) 0%, rgba(6, 18, 13, 0.22) 55%, transparent 80%)',
            }}
            aria-hidden="true"
          />

          {/* Eyebrow Institucional Padronizado com a 4ª Dobra */}
          <div
            className={`inline-flex items-center justify-center gap-2 mb-2.5 sm:mb-3 px-3.5 py-1 rounded-full bg-[#0F3B2E]/90 border border-[#D4AF37]/65 text-[#F5D77F] text-[11px] font-bold tracking-[0.22em] uppercase backdrop-blur-md shadow-[0_2px_12px_rgba(0,0,0,0.45)] transition-all duration-700 delay-100 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100 ${
              isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_6px_rgba(212,175,55,0.9)]" />
            <span>{t.routes.eyebrow}</span>
          </div>

          {/* Headline Principal com excelente leitura e contraste firme contra as folhas */}
          <h2
            className={`font-serif font-normal leading-[1.14] tracking-tight text-[#FFFFFF] transition-all duration-700 delay-250 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100 ${
              isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{
              fontSize: 'clamp(1.85rem, 2.2vw + 1.1rem, 3.25rem)',
              textShadow: '0 2px 4px rgba(0,0,0,0.98), 0 4px 18px rgba(4,10,7,0.95), 0 1px 2px rgba(0,0,0,1)',
            }}
          >
            {t.routes.headlinePart1}
            <span
              className="italic font-serif text-[#F5D77F]"
              style={{
                textShadow: '0 0 18px rgba(245,215,127,0.45), 0 2px 4px rgba(0,0,0,0.98)',
              }}
            >
              {t.routes.headlineGold}
            </span>
            {t.routes.headlinePart2}
          </h2>

          {/* Subheadline Explicativa com tom off-white firme e legibilidade imediata */}
          <p
            className={`mt-2.5 sm:mt-3 font-normal text-[#F5EFE6] max-w-[760px] mx-auto leading-[1.65] transition-all duration-700 delay-400 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100 ${
              isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
            style={{
              fontSize: 'clamp(0.92rem, 0.3vw + 0.82rem, 1.08rem)',
              textShadow: '0 1px 3px rgba(0,0,0,0.98), 0 2px 10px rgba(4,10,7,0.92)',
            }}
          >
            {t.routes.subheadline}
          </p>

          {/* Micro-controles de navegação manual discretos (← / →) com dourado nobre e elegante */}
          <div
            className={`mt-3.5 sm:mt-4 inline-flex items-center justify-center gap-2.5 sm:gap-3 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#06140E]/60 hover:bg-[#06140E]/80 border border-[#D4AF37]/35 hover:border-[#D4AF37]/65 backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.3)] transition-all duration-700 delay-550 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100 ${
              isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <button
              type="button"
              onClick={() => handleStep('left')}
              aria-label="Navegar rotas para a esquerda"
              className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full border border-[#D4AF37]/30 bg-white/[0.04] hover:bg-[#D4AF37]/15 text-[#FAF8F5] hover:text-[#F5D77F] hover:border-[#D4AF37]/60 transition-all duration-300 flex items-center justify-center hover:scale-105 active:scale-95 focus:outline-none cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-200" />
            </button>

            <div className="flex items-center gap-2 text-[11px] sm:text-[11.5px] font-normal text-[#FAF8F5] tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_6px_rgba(212,175,55,0.8)] animate-pulse" />
              <Compass className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
              <span>{t.routes.dragNote}</span>
            </div>

            <button
              type="button"
              onClick={() => handleStep('right')}
              aria-label="Navegar rotas para a direita"
              className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full border border-[#D4AF37]/30 bg-white/[0.04] hover:bg-[#D4AF37]/15 text-[#FAF8F5] hover:text-[#F5D77F] hover:border-[#D4AF37]/60 transition-all duration-300 flex items-center justify-center hover:scale-105 active:scale-95 focus:outline-none cursor-pointer"
            >
              <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-200" />
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================================
          2. DUAS ESTEIRAS DE CARDS: LOOP INFINITO REAL EM DIREÇÕES OPOSTAS
          - Espaçamento vertical aproximado em relação ao cabeçalho (mt-5 sm:mt-6 lg:mt-7)
          - Espaçamento equilibrado e proporcional entre as esteiras (mt-4 sm:mt-4.5 lg:mt-5.5)
          - Preservação integral de: sentidos opostos, GPU rAF loop, drag, autoplay no hover
         ===================================================================== */}
      <div className="relative mt-5 sm:mt-6 lg:mt-7 w-full overflow-hidden z-10">
        {/* Esmaecimentos laterais translúcidos cinematográficos */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-20 lg:w-28 bg-gradient-to-r from-[#07130D]/85 via-[#07130D]/30 to-transparent z-20"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-20 lg:w-28 bg-gradient-to-l from-[#07130D]/85 via-[#07130D]/30 to-transparent z-20"
          aria-hidden="true"
        />

        {/* ======================= ESTEIRA 1 (DIREITA -> ESQUERDA) ======================= */}
        <div
          className="w-full cursor-grab active:cursor-grabbing overflow-visible touch-pan-y"
          onPointerDown={(e) => handlePointerDown(e, 1)}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <div
            ref={row1TrackRef}
            className={`flex w-max gap-3.5 sm:gap-4 md:gap-4.5 xl:gap-5 [@media(min-width:1920px)]:gap-6 will-change-transform transition-opacity duration-1000 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {marqueeCardsRow1.map((route, idx) => {
              const cardData = t.routes.items[route.id] || { title: route.title, microcopy: route.microcopy }
              return (
                <div
                  key={`row1-${route.id}-${idx}`}
                  className="group relative w-[190px] sm:w-[205px] md:w-[215px] lg:w-[220px] xl:w-[226px] [@media(min-width:1601px)]:w-[245px] [@media(min-width:1920px)]:w-[260px] [@media(min-width:2500px)]:w-[295px] h-[240px] sm:h-[255px] md:h-[258px] lg:h-[264px] xl:h-[270px] [@media(min-width:1601px)]:h-[292px] [@media(min-width:1920px)]:h-[305px] [@media(min-width:2500px)]:h-[345px] shrink-0 rounded-2xl overflow-hidden border border-white/20 bg-black/10 shadow-[0_6px_20px_rgba(0,0,0,0.25)] transition-all duration-300 ease-out hover:scale-[1.02] hover:border-[#D4AF37]/80 hover:shadow-[0_10px_28px_rgba(0,0,0,0.35),0_0_18px_rgba(212,175,55,0.22)] flex flex-col justify-end p-3.5 sm:p-4 xl:p-4.5 [@media(min-width:1601px)]:p-5 [@media(min-width:1920px)]:p-5.5 select-none"
                >
                  {/* Imagem Clara e Luminosa em Alta Resolução (topo >55% 100% nítido e iluminado) */}
                  <img
                    src={route.imageSrc}
                    alt={cardData.title}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none z-0 brightness-[1.18] contrast-[1.03] saturate-[1.06] transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Overlay gradiente suave SOMENTE na base para leitura perfeita (topo >55% 100% nítido e luminoso) */}
                  <div
                    className="absolute inset-x-0 bottom-0 h-28 sm:h-32 bg-gradient-to-t from-[#04120B]/95 via-[#04120B]/60 via-50% to-transparent pointer-events-none z-10 transition-opacity duration-300"
                    aria-hidden="true"
                  />

                  {/* Conteúdo do Card: Título, Microcopy e CTA com Máxima Legibilidade */}
                  <div className="relative z-20 text-left">
                    <h3
                      className="font-serif text-[1.05rem] sm:text-[1.12rem] md:text-[1.18rem] xl:text-[1.24rem] [@media(min-width:1920px)]:text-[1.36rem] font-bold leading-[1.2] text-[#FFFFFF] drop-shadow-md transition-colors duration-300 group-hover:text-[#F5D77F]"
                      style={{ textShadow: '0 2px 5px rgba(0,0,0,0.95), 0 1px 2px rgba(0,0,0,1)' }}
                    >
                      {cardData.title}
                    </h3>

                    <p
                      className="mt-1 text-[11.5px] sm:text-[12px] xl:text-[12.6px] [@media(min-width:1601px)]:text-[13px] font-normal text-[#F5EFE6] leading-[1.42] line-clamp-2"
                      style={{ textShadow: '0 1px 3px rgba(0,0,0,0.95), 0 2px 6px rgba(0,0,0,0.9)' }}
                    >
                      {cardData.microcopy}
                    </p>

                    {/* CTA Discreto com microinteração de seta */}
                    <a
                      href="#diagnostico"
                      onClick={handleCardClick}
                      className="mt-2 sm:mt-2.5 inline-flex items-center gap-1.5 text-[11px] sm:text-[11.5px] md:text-[12px] font-bold tracking-wider uppercase text-[#F5D77F] hover:text-white transition-colors duration-300"
                      style={{ textShadow: '0 1px 4px rgba(0,0,0,0.95), 0 0 10px rgba(245,215,127,0.35)' }}
                    >
                      <span>{t.routes.exploreRoute}</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5 text-[#F5D77F]" />
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* ======================= ESTEIRA 2 (ESQUERDA -> DIREITA) ======================= */}
        {/* Espaçamento vertical equilibrado e proporcional entre as duas esteiras */}
        <div
          className="w-full cursor-grab active:cursor-grabbing overflow-visible touch-pan-y mt-4 sm:mt-4.5 md:mt-5 lg:mt-5.5 xl:mt-6"
          onPointerDown={(e) => handlePointerDown(e, 2)}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <div
            ref={row2TrackRef}
            className={`flex w-max gap-3.5 sm:gap-4 md:gap-4.5 xl:gap-5 [@media(min-width:1920px)]:gap-6 will-change-transform transition-opacity duration-1000 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {marqueeCardsRow2.map((route, idx) => {
              const cardData = t.routes.items[route.id] || { title: route.title, microcopy: route.microcopy }
              return (
                <div
                  key={`row2-${route.id}-${idx}`}
                  className="group relative w-[190px] sm:w-[205px] md:w-[215px] lg:w-[220px] xl:w-[226px] [@media(min-width:1601px)]:w-[245px] [@media(min-width:1920px)]:w-[260px] [@media(min-width:2500px)]:w-[295px] h-[240px] sm:h-[255px] md:h-[258px] lg:h-[264px] xl:h-[270px] [@media(min-width:1601px)]:h-[292px] [@media(min-width:1920px)]:h-[305px] [@media(min-width:2500px)]:h-[345px] shrink-0 rounded-2xl overflow-hidden border border-white/20 bg-black/10 shadow-[0_6px_20px_rgba(0,0,0,0.25)] transition-all duration-300 ease-out hover:scale-[1.02] hover:border-[#D4AF37]/80 hover:shadow-[0_10px_28px_rgba(0,0,0,0.35),0_0_18px_rgba(212,175,55,0.22)] flex flex-col justify-end p-3.5 sm:p-4 xl:p-4.5 [@media(min-width:1601px)]:p-5 [@media(min-width:1920px)]:p-5.5 select-none"
                >
                  {/* Imagem Clara e Luminosa em Alta Resolução (topo >55% 100% nítido e iluminado) */}
                  <img
                    src={route.imageSrc}
                    alt={cardData.title}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none z-0 brightness-[1.18] contrast-[1.03] saturate-[1.06] transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Overlay gradiente suave SOMENTE na base para leitura perfeita (topo >55% 100% nítido e luminoso) */}
                  <div
                    className="absolute inset-x-0 bottom-0 h-28 sm:h-32 bg-gradient-to-t from-[#04120B]/95 via-[#04120B]/60 via-50% to-transparent pointer-events-none z-10 transition-opacity duration-300"
                    aria-hidden="true"
                  />

                  {/* Conteúdo do Card: Título, Microcopy e CTA com Máxima Legibilidade */}
                  <div className="relative z-20 text-left">
                    <h3
                      className="font-serif text-[1.05rem] sm:text-[1.12rem] md:text-[1.18rem] xl:text-[1.24rem] [@media(min-width:1920px)]:text-[1.36rem] font-bold leading-[1.2] text-[#FFFFFF] drop-shadow-md transition-colors duration-300 group-hover:text-[#F5D77F]"
                      style={{ textShadow: '0 2px 5px rgba(0,0,0,0.95), 0 1px 2px rgba(0,0,0,1)' }}
                    >
                      {cardData.title}
                    </h3>

                    <p
                      className="mt-1 text-[11.5px] sm:text-[12px] xl:text-[12.6px] [@media(min-width:1601px)]:text-[13px] font-normal text-[#F5EFE6] leading-[1.42] line-clamp-2"
                      style={{ textShadow: '0 1px 3px rgba(0,0,0,0.95), 0 2px 6px rgba(0,0,0,0.9)' }}
                    >
                      {cardData.microcopy}
                    </p>

                    {/* CTA Discreto com microinteração de seta */}
                    <a
                      href="#diagnostico"
                      onClick={handleCardClick}
                      className="mt-2 sm:mt-2.5 inline-flex items-center gap-1.5 text-[11px] sm:text-[11.5px] md:text-[12px] font-bold tracking-wider uppercase text-[#F5D77F] hover:text-white transition-colors duration-300"
                      style={{ textShadow: '0 1px 4px rgba(0,0,0,0.95), 0 0 10px rgba(245,215,127,0.35)' }}
                    >
                      <span>{t.routes.exploreRoute}</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5 text-[#F5D77F]" />
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* =====================================================================
          3. BLOCO INSTITUCIONAL & CTA PRINCIPAL (COMPACTO, COESO E ELEGANTE)
          - Respiro aproximado dos carrosséis (mt-6 sm:mt-7 lg:mt-8)
          - Headline compacta em 1 linha no desktop sem palavra órfã
          - Subtítulo e botão aproximados com respiro harmônico
         ===================================================================== */}
      <div ref={ctaRef} className="container-luxury relative z-10 mt-6 sm:mt-7 lg:mt-8 mb-2 sm:mb-3 lg:mb-4">
        <div className="relative text-center max-w-[900px] mx-auto">
          {/* Realce de contraste orgânico e totalmente sem bordas atrás do CTA */}
          <div
            className="absolute -inset-x-12 -inset-y-8 sm:-inset-x-20 sm:-inset-y-12 pointer-events-none -z-10 blur-3xl opacity-55"
            style={{
              background:
                'radial-gradient(ellipse 70% 65% at 50% 50%, rgba(7, 19, 13, 0.55) 0%, rgba(7, 19, 13, 0.20) 50%, transparent 75%)',
            }}
            aria-hidden="true"
          />

          {/* Badge institucional Visão Prospera com scroll dinâmico sutil */}
          <div
            className={`inline-flex items-center justify-center gap-2 mb-2 sm:mb-2.5 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full bg-prospera-gold/12 border border-prospera-gold/35 text-prospera-gold text-[10.5px] sm:text-[11.5px] font-bold tracking-[0.22em] uppercase drop-shadow-sm transition-all duration-700 delay-100 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100 ${
              isCtaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            {t.routes.visionBadge}
          </div>

          {/* Headline do CTA com leitura nítida em tom champanhe */}
          <h3
            className={`font-serif font-normal leading-[1.15] text-[#F8F6F0] tracking-tight text-center max-w-[860px] mx-auto transition-all duration-700 delay-250 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100 ${
              isCtaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{
              fontSize: 'clamp(1.55rem, 1.8vw + 0.95rem, 2.45rem)',
              textShadow: '0 2px 4px rgba(0,0,0,0.95), 0 4px 16px rgba(4,10,7,0.95)',
            }}
          >
            {t.routes.ctaHeadline}
          </h3>

          {/* Subtítulo do CTA com contraste confortável e sem caixas */}
          <p
            className={`mt-2 sm:mt-2.5 font-normal text-[#F2ECE1] max-w-[680px] mx-auto leading-[1.58] text-center transition-all duration-700 delay-400 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100 ${
              isCtaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
            style={{
              fontSize: 'clamp(0.875rem, 0.25vw + 0.8rem, 1.05rem)',
              textShadow: '0 1px 3px rgba(0,0,0,0.95), 0 2px 8px rgba(4,10,7,0.85)',
            }}
          >
            {t.routes.ctaSubtitle}
          </p>

          {/* CTA Principal com Efeito Glow Dourado */}
          <div
            className={`mt-3 sm:mt-3.5 flex flex-col items-center justify-center gap-1.5 w-full transition-all duration-700 delay-550 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100 ${
              isCtaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <div className="relative group w-full sm:w-auto flex justify-center">
              <div
                className="absolute -inset-1 rounded-full bg-prospera-gold/25 blur-lg animate-cta-glow pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                aria-hidden="true"
              />

              <a
                href="#diagnostico"
                className="btn-gold-primary relative overflow-hidden inline-flex items-center justify-center gap-2.5 rounded-full w-full sm:w-auto max-w-[340px] px-7 py-3 sm:px-9 sm:py-3.5 min-h-[46px] sm:min-h-[50px] text-xs sm:text-[13px] font-bold tracking-[0.14em] uppercase text-[#07110D] shadow-[0_6px_24px_rgba(212,175,55,0.35)] transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-prospera-gold/70"
              >
                <span
                  className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none animate-button-shine"
                  aria-hidden="true"
                />
                <span>{t.routes.ctaButton}</span>
                <ArrowUpRight
                  className="w-[17px] h-[17px] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#07110D]"
                />
              </a>
            </div>

            <p
              className="mt-1.5 text-[12px] sm:text-[12.5px] font-normal tracking-[0.02em] text-[#F2ECE1] text-center"
              style={{ textShadow: '0 1px 4px rgba(0,0,0,0.95), 0 2px 8px rgba(4,10,7,0.85)' }}
            >
              {t.routes.ctaSubtext}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
