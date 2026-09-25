import { useState, useEffect, useRef } from 'react'
import { ArrowRight, Award, Compass, TrendingUp, Sparkles } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'

export function AdrianaAuthority() {
  const { t } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const hasTriggeredRef = useRef(false)
  const [bgState, setBgState] = useState({
    progress: 0,
    parallaxY: 0,
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    // 1. Detectar preferência por movimento reduzido (WCAG 2.1 AA)
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (motionQuery.matches) {
      setPrefersReducedMotion(true)
      setIsVisible(true)
      setBgState({ progress: 1, parallaxY: 0 })
      return
    }

    // 2. Detectar viewport mobile/tablet
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener('resize', checkMobile)

    const section = sectionRef.current
    if (!section) return () => window.removeEventListener('resize', checkMobile)

    // 3. Se carregado com hash direto ou já visível na tela
    if (window.location.hash === '#sobre') {
      setIsVisible(true)
      hasTriggeredRef.current = true
      setBgState({ progress: 1, parallaxY: 0 })
      return () => window.removeEventListener('resize', checkMobile)
    }

    const initialRect = section.getBoundingClientRect()
    if (initialRect.top <= window.innerHeight * 0.85) {
      setIsVisible(true)
      hasTriggeredRef.current = true
      setBgState({ progress: 1, parallaxY: 0 })
      return () => window.removeEventListener('resize', checkMobile)
    }

    // 4. Parallax suave de fundo e controle de visibilidade
    let rafId: number
    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect()
        const windowH = window.innerHeight

        const enterDistance = windowH * 0.70
        const rawProgress = (windowH - rect.top) / enterDistance
        const progress = Math.min(1, Math.max(0, rawProgress))

        let pY = 0
        if (window.innerWidth >= 1024 && rect.top < windowH && rect.bottom > 0) {
          pY = Math.max(-16, Math.min(16, (rect.top - windowH * 0.35) * 0.04))
        }

        if (!hasTriggeredRef.current && (progress >= 0.15 || (window.scrollY > 30 && rect.top <= windowH * 0.80))) {
          hasTriggeredRef.current = true
          setIsVisible(true)
        }

        setBgState((prev) => {
          if (prev.progress === 1 && progress === 1 && Math.abs(prev.parallaxY - pY) < 0.5) {
            return prev
          }
          return {
            progress: hasTriggeredRef.current ? Math.max(prev.progress, progress) : progress,
            parallaxY: Math.round(pY * 10) / 10,
          }
        })
      })
    }

    // 5. IntersectionObserver como garantia adicional
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting && !hasTriggeredRef.current) {
          hasTriggeredRef.current = true
          setIsVisible(true)
          setBgState((prev) => ({ ...prev, progress: 1 }))
          observer.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    )
    observer.observe(section)

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', checkMobile)
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(rafId)
    }
  }, [])

  // Helper de transição escalonada para os elementos internos
  const getStaggerStyle = (delayMs: number) => {
    if (prefersReducedMotion) return undefined
    return {
      transition: `opacity 750ms cubic-bezier(0.22, 1, 0.36, 1) ${delayMs}ms, transform 750ms cubic-bezier(0.22, 1, 0.36, 1) ${delayMs}ms`,
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0px)' : 'translateY(20px)',
      willChange: 'opacity, transform',
    }
  }

  // Animação coordenada das duas colunas principais
  const copyColStyle = prefersReducedMotion
    ? undefined
    : {
        transition: 'opacity 900ms cubic-bezier(0.22, 1, 0.36, 1), transform 900ms cubic-bezier(0.22, 1, 0.36, 1)',
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? 'translate3d(0, 0, 0)'
          : isMobile
            ? 'translate3d(0, 24px, 0)'
            : 'translate3d(-36px, 0, 0)',
        willChange: 'opacity, transform',
      }

  const imageColStyle = prefersReducedMotion
    ? undefined
    : {
        transition: 'opacity 1000ms cubic-bezier(0.22, 1, 0.36, 1) 120ms, transform 1000ms cubic-bezier(0.22, 1, 0.36, 1) 120ms',
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? 'translate3d(0, 0, 0)'
          : 'translate3d(36px, 0, 0)',
        willChange: 'opacity, transform',
      }

  return (
    <section
      id="sobre"
      ref={sectionRef}
      aria-label={t.aria.adrianaSection}
      className="relative w-full overflow-hidden bg-[#FAF7F2] text-[#0A221A]"
    >
      {/* =========================================================================
          1. FUNDO DA SEGUNDA DOBRA: LONDRES OCUPANDO TODA A DOBRA
          - Background full width e full height
          - Imagem nítida de Londres (Big Ben, Rio Tâmisa, Westminster, London Eye)
          - Atmosfera clara, suave, translúcida em off-white/champagne
          - NÃO é verde escuro chapado, NÃO é preto, NÃO é parede escura
         ========================================================================= */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
        {/* Base de fundo sólida champagne perolada */}
        <div className="absolute inset-0 bg-[#FAF7F2]" />

        {/* Imagem panorâmica de Londres (Big Ben, Rio Tâmisa, Westminster, London Eye) visível, opaca e elegante */}
        <div
          className="absolute -inset-y-12 inset-x-0 will-change-transform pointer-events-none"
          style={{
            transform: prefersReducedMotion
              ? 'none'
              : `translate3d(0, ${bgState.parallaxY * 0.35}px, 0)`,
          }}
        >
          <img
            src="/assets/prospera/adriana-london-background.jpg"
            alt="Skyline panorâmico de Londres — Big Ben, Rio Tâmisa e Westminster"
            className="w-full h-full object-cover object-center brightness-[1.01] contrast-[1.05]"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* Overlay translúcido nobre em champagne perolado:
            Garante que Londres permaneça perceptível e nítida por toda a dobra,
            mas suave e opaca, preservando contraste absoluto e leitura impecável */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(135deg, rgba(251, 248, 244, 0.86) 0%, rgba(250, 246, 239, 0.80) 45%, rgba(246, 240, 230, 0.72) 100%)',
          }}
        />

        {/* Reforço de luminosidade nobre à esquerda para salvaguardar nitidez e contraste absoluto da copy */}
        <div
          className="absolute inset-y-0 left-0 w-full lg:w-3/5 pointer-events-none"
          style={{
            background:
              'linear-gradient(to right, rgba(253, 251, 247, 0.68) 0%, rgba(251, 248, 244, 0.40) 60%, transparent 100%)',
          }}
        />

        {/* =====================================================================
            TRANSIÇÃO & SOMBRA ELEGANTE: 1ª DOBRA (HERO) → 2ª DOBRA (ADRIANA)
            - Sombra difusa suave descendo da Hero escura (#07110D) para a 2ª dobra clara
            - Gradiente refinado com nuance de verde institucional translúcido
            - Toque perolado/champagne perfeitamente contínuo e sem corte
           ===================================================================== */}
        <div
          className="absolute inset-x-0 top-0 h-16 sm:h-20 lg:h-24 pointer-events-none z-20"
          style={{
            background:
              'linear-gradient(to bottom, rgba(11, 35, 27, 0.65) 0%, rgba(11, 35, 27, 0.35) 30%, rgba(15, 59, 46, 0.12) 65%, rgba(15, 59, 46, 0.02) 85%, transparent 100%)',
          }}
          aria-hidden="true"
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 75% 100% at 50% 0%, rgba(212, 175, 55, 0.05) 0%, transparent 75%)',
            }}
          />
        </div>

        {/* =====================================================================
            TRANSIÇÃO & SOMBRA ELEGANTE: 2ª DOBRA (ADRIANA) → 3ª DOBRA (ROTAS)
            - Sombra difusa suave preparando a entrada para a dobra escura das Rotas (#07130D)
            - Gradiente refinado com nuance de verde institucional translúcido
            - Zero corte seco, acabamento de transição suave e contínua
           ===================================================================== */}
        <div
          className="absolute inset-x-0 bottom-0 h-16 sm:h-20 lg:h-24 pointer-events-none z-20"
          style={{
            background:
              'linear-gradient(to bottom, transparent 0%, rgba(15, 59, 46, 0.03) 25%, rgba(15, 59, 46, 0.15) 55%, rgba(7, 19, 13, 0.45) 80%, rgba(7, 19, 13, 0.85) 100%)',
          }}
          aria-hidden="true"
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 75% 100% at 50% 100%, rgba(212, 175, 55, 0.04) 0%, transparent 75%)',
            }}
          />
        </div>
      </div>

      {/* =========================================================================
          2. COMPOSIÇÃO EDITORIAL EM TODA A ÁREA DA DOBRA
          - Ocupa a tela inteira com respiro nobre (sem card fechado no centro)
          - Lado Esquerdo: Copy principal, nome, cargo, texto institucional, quote, indicadores e CTAs
          - Lado Direito: Foto protagonista da Adriana Horrocks com roupa branca
         ========================================================================= */}
      <div
        ref={contentRef}
        className="container-luxury section-py-luxury relative z-10"
      >
        <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between gap-10 lg:gap-12 xl:gap-16 w-full">
          
          {/* =====================================================================
              COLUNA ESQUERDA: AUTORIDADE INSTITUCIONAL, COPY E AÇÕES (~54%)
             ===================================================================== */}
          <div
            className="w-full lg:w-[54%] xl:w-[52%] flex flex-col justify-center text-left py-2 lg:py-6"
            style={copyColStyle}
          >
            
            {/* 1. Eyebrow: ADRIANA HORROCKS */}
            <div style={getStaggerStyle(0)} className="flex items-center mb-3 sm:mb-3.5">
              <div className="badge-section-pill">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" aria-hidden="true" />
                <span>{t.adriana.eyebrow}</span>
              </div>
            </div>

            {/* 2. Headline Principal: Forte, elegante, sem transparência e 100% nítida */}
            <div style={getStaggerStyle(60)}>
              <h2
                className="mt-0 font-serif font-bold leading-[1.08] sm:leading-[1.06] tracking-[-0.015em] text-[#03140E]"
                style={{
                  fontSize: 'clamp(2.1rem, 2.4vw + 1.25rem, 3.5rem)',
                  textShadow: '0 1px 0 rgba(255, 255, 255, 0.7)',
                }}
              >
                {t.adriana.headlinePart1}
                <span
                  className="text-[#845607] italic font-serif font-bold sm:whitespace-nowrap underline decoration-[#B88922]/55 decoration-2 underline-offset-6"
                  style={{ textShadow: '0 1px 0 rgba(255, 255, 255, 0.75)' }}
                >
                  {t.adriana.headlineGold}
                </span>
                {t.adriana.headlinePart2}
              </h2>
            </div>

            {/* 3. Destaque de Nome & Cargo com Maior Presença Visual */}
            <div style={getStaggerStyle(110)}>
              <div className="mt-3.5 sm:mt-4 flex flex-wrap items-center gap-3 sm:gap-4 border-b border-[#D4AF37]/40 pb-4">
                <span
                  className="font-serif text-2xl sm:text-[2rem] text-[#02130C] font-bold tracking-tight"
                  style={{ textShadow: '0 1px 0 rgba(255, 255, 255, 0.7)' }}
                >
                  Adriana Horrocks
                </span>
                <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-[11.5px] font-bold tracking-[0.18em] uppercase text-[#02130C] bg-[#1A4D3F]/12 px-3.5 py-1 rounded-full border border-[#1A4D3F]/25 shadow-xs">
                  {t.adriana.role}
                </span>
              </div>
            </div>

            {/* ===================================================================
                FOTO NO MOBILE / TABLET (< 1024px)
                Empilhamento solicitado:
                1. título/copy -> 2. foto da Adriana -> 3. texto/quote -> 4. indicadores -> 5. CTAs
                Proporção contida: w-[86%] max-w-[340px] sm:max-w-[420px] aspect-[4/5]
               =================================================================== */}
            <div className="w-full lg:hidden my-6 sm:my-8 flex justify-center">
              <div className="relative w-[86%] max-w-[340px] md:max-w-[390px] mx-auto aspect-[4/5] md:aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_12px_36px_rgba(15,59,46,0.15)] border border-[#D4AF37]/35 bg-gradient-to-b from-white to-[#F5F0E6] p-2 sm:p-2.5">
                <img
                  src="/assets/prospera/adriana-executive-portrait.png"
                  alt={`Adriana Horrocks — ${t.adriana.role}`}
                  className="w-full h-full object-cover object-top rounded-xl"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>

            {/* 4. Textos de Apoio Institucionais com Alto Contraste e Legibilidade Reforçada */}
            <div
              style={getStaggerStyle(160)}
              className="mt-5 sm:mt-6 space-y-3.5 font-sans text-[15px] sm:text-[16px] xl:text-[16.5px] leading-[1.78]"
            >
              <p
                className="font-semibold text-[#02130C] leading-relaxed"
                style={{ textShadow: '0 1px 0 rgba(255, 255, 255, 0.75)' }}
              >
                {t.adriana.p1}
              </p>
              <p
                className="font-medium text-[#03140E] leading-relaxed"
                style={{ textShadow: '0 1px 0 rgba(255, 255, 255, 0.65)' }}
              >
                {t.adriana.p2}
              </p>
              <p
                className="font-medium text-[#03140E] leading-relaxed"
                style={{ textShadow: '0 1px 0 rgba(255, 255, 255, 0.65)' }}
              >
                {t.adriana.p3}
              </p>
            </div>

            {/* 5. Quote Editorial com Fundo Nobre Suave e Destaque Visual Reforçado */}
            <div
              style={getStaggerStyle(220)}
              className="mt-5 sm:mt-6 pl-4 sm:pl-5 pr-5 py-4 border-l-4 border-[#B88922] bg-gradient-to-r from-[#F4EFE5] via-[#FAF6EE] to-[#FAF6EE]/80 rounded-r-xl shadow-[0_2px_14px_rgba(15,59,46,0.06)] border-y border-r border-[#D4AF37]/25"
            >
              <p
                className="font-serif italic text-[1.15rem] sm:text-[1.32rem] leading-[1.48] text-[#02130C] font-bold tracking-tight"
                style={{ textShadow: '0 1px 0 rgba(255, 255, 255, 0.85)' }}
              >
                {t.adriana.quote}
              </p>
            </div>

            {/* 6. Indicadores de Autoridade: 3 blocos limpos, sólidos e nítidos */}
            <div
              style={getStaggerStyle(280)}
              className="mt-6 sm:mt-7 pt-5 border-t border-[#D4AF37]/40 grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 text-left"
            >
              {/* Indicador 1 */}
              <div className="flex flex-col p-3.5 sm:p-4 rounded-xl bg-white/95 border border-[#D4AF37]/50 shadow-[0_4px_18px_rgba(15,59,46,0.07)] transition-transform duration-300 hover:translate-y-[-2px]">
                <div className="flex items-center gap-1.5 mb-1">
                  <Award className="w-4 h-4 text-[#7A4F05] shrink-0" aria-hidden="true" />
                  <span className="text-[11px] uppercase tracking-wider text-[#7A4F05] font-bold">
                    {t.adriana.metric1Label}
                  </span>
                </div>
                <div className="font-serif text-[1.4rem] sm:text-[1.55rem] font-bold text-[#02130C] leading-tight">
                  {t.adriana.metric1Value}
                </div>
                <div className="mt-1 text-xs text-[#03140E] font-semibold leading-snug">
                  {t.adriana.metric1Sub}
                </div>
              </div>

              {/* Indicador 2 */}
              <div className="flex flex-col p-3.5 sm:p-4 rounded-xl bg-white/95 border border-[#D4AF37]/50 shadow-[0_4px_18px_rgba(15,59,46,0.07)] transition-transform duration-300 hover:translate-y-[-2px]">
                <div className="flex items-center gap-1.5 mb-1">
                  <Compass className="w-4 h-4 text-[#7A4F05] shrink-0" aria-hidden="true" />
                  <span className="text-[11px] uppercase tracking-wider text-[#7A4F05] font-bold">
                    {t.adriana.metric2Label}
                  </span>
                </div>
                <div className="font-serif text-[1.25rem] sm:text-[1.38rem] font-bold text-[#02130C] leading-tight">
                  {t.adriana.metric2Value}
                </div>
                <div className="mt-1 text-xs text-[#03140E] font-semibold leading-snug">
                  {t.adriana.metric2Sub}
                </div>
              </div>

              {/* Indicador 3 */}
              <div className="flex flex-col p-3.5 sm:p-4 rounded-xl bg-white/95 border border-[#D4AF37]/50 shadow-[0_4px_18px_rgba(15,59,46,0.07)] transition-transform duration-300 hover:translate-y-[-2px]">
                <div className="flex items-center gap-1.5 mb-1">
                  <TrendingUp className="w-4 h-4 text-[#7A4F05] shrink-0" aria-hidden="true" />
                  <span className="text-[11px] uppercase tracking-wider text-[#7A4F05] font-bold">
                    {t.adriana.metric3Label}
                  </span>
                </div>
                <div className="font-serif text-[1.25rem] sm:text-[1.38rem] font-bold text-[#02130C] leading-tight">
                  {t.adriana.metric3Value}
                </div>
                <div className="mt-1 text-xs text-[#03140E] font-semibold leading-snug">
                  {t.adriana.metric3Sub}
                </div>
              </div>
            </div>

            {/* 7. Botões CTAs: Dourado Principal + Secundário Transparente */}
            <div
              style={getStaggerStyle(340)}
              className="mt-7 sm:mt-8 pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4.5 w-full"
            >
              {/* CTA Principal: CONHECER A PROSPERA */}
              <div className="relative group w-full sm:w-auto">
                <div
                  className="absolute -inset-1 rounded-full bg-prospera-gold/35 blur-md animate-cta-glow pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                  aria-hidden="true"
                />
                <a
                  href="#diagnostico"
                  className="btn-gold-primary relative overflow-hidden inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-3.5 sm:px-10 sm:py-4 min-h-[52px] sm:min-h-[56px] text-xs sm:text-[13px] font-bold tracking-[0.14em] uppercase text-[#07110D] shadow-[0_8px_24px_rgba(212,175,55,0.4)] transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-prospera-gold/70 w-full sm:w-auto"
                >
                  <span
                    className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none animate-button-shine"
                    aria-hidden="true"
                  />
                  <span>{t.adriana.ctaPrimary}</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 text-[#07110D]" />
                </a>
              </div>

              {/* CTA Secundário: VER COMO FUNCIONA */}
              <a
                href="#como-funciona"
                className="inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 sm:px-8 sm:py-4 min-h-[52px] sm:min-h-[56px] text-xs sm:text-[13px] font-semibold tracking-[0.14em] uppercase text-[#1A4D3F] hover:text-[#0F3B2E] bg-white/70 hover:bg-white/95 border border-[#1A4D3F]/30 hover:border-[#D4AF37] backdrop-blur-sm shadow-sm transition-all duration-300 group/sec w-full sm:w-auto"
              >
                <span>{t.adriana.ctaSecondary}</span>
                <ArrowRight className="w-4 h-4 text-[#1A4D3F] transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>

          </div>

          {/* =====================================================================
              COLUNA DIREITA: FOTO PROTAGONISTA DA ADRIANA HORROCKS (~46%)
              - Visível em Desktop (lg: e acima)
              - Foto nítida, alta presença visual, postura executiva no terno branco
              - Enquadramento elegante ancorado na base da seção
              - TOTALMENTE SEM BADGE NO PÉ OU ELEMENTO FLUTUANTE INADEQUADO
             ===================================================================== */}
          <div
            className="hidden lg:flex lg:w-[46%] xl:w-[48%] items-end justify-center lg:justify-end self-stretch pt-6"
            style={imageColStyle}
          >
            <div className="relative w-full h-full min-h-[680px] xl:min-h-[740px] 2xl:min-h-[780px] flex items-end justify-center lg:justify-end">
              <img
                src="/assets/prospera/adriana-executive-portrait.png"
                alt={`Adriana Horrocks — ${t.adriana.role}`}
                className="w-auto h-full max-h-[740px] xl:max-h-[800px] 2xl:max-h-[840px] object-contain object-bottom drop-shadow-[0_20px_40px_rgba(15,59,46,0.18)] select-none pointer-events-none transition-transform duration-700 hover:scale-[1.015]"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
