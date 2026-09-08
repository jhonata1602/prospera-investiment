import { useState, useEffect, useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useLanguage } from '@/contexts/LanguageContext'

interface JourneyStep {
  step: string
  title: string
  description: string
  image: string
}

const JOURNEY_STEPS: JourneyStep[] = [
  {
    step: '01',
    title: 'DECISÃO',
    description: 'Definição do objetivo, horizonte e visão patrimonial.',
    image: '/assets/prospera/journey/step-01-decisao.webp',
  },
  {
    step: '02',
    title: 'ESTRUTURA',
    description: 'Análise do perfil, capital, estratégia e estrutura adequada.',
    image: '/assets/prospera/journey/step-02-estrutura.webp',
  },
  {
    step: '03',
    title: 'BUSCA',
    description: 'Seleção de oportunidades alinhadas ao plano do investidor.',
    image: '/assets/prospera/journey/step-03-busca.webp',
  },
  {
    step: '04',
    title: 'AQUISIÇÃO',
    description: 'Análise, negociação e condução do processo de compra.',
    image: '/assets/prospera/journey/step-04-aquisicao.webp',
  },
  {
    step: '05',
    title: 'FINANCIAMENTO',
    description: 'Estruturação financeira quando aplicável.',
    image: '/assets/prospera/journey/step-05-financiamento.webp',
  },
  {
    step: '06',
    title: 'VALORIZAÇÃO',
    description: 'Gestão, melhoria e potencialização do ativo.',
    image: '/assets/prospera/journey/step-06-valorizacao.webp',
  },
  {
    step: '07',
    title: 'SAÍDA',
    description: 'Venda, refinanciamento, renda ou reposicionamento estratégico.',
    image: '/assets/prospera/journey/step-07-saida.webp',
  },
  {
    step: '08',
    title: 'RIQUEZA REAL',
    description: 'Crescimento patrimonial com visão de longo prazo.',
    image: '/assets/prospera/journey/step-08-riqueza-real.webp',
  },
]

const VIDEO_SRC = '/assets/prospera/video/london-skyline.mp4'
const POSTER_SRC = '/assets/prospera/how-it-works-buildings-bg.jpg'
const VIDEO_PLAYBACK_RATE = 0.55
const FADE_BEFORE_END_SECONDS = 1.8

export function HowItWorks() {
  const { t } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const [headerRef, isHeaderVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.15, rootMargin: '0px 0px -40px 0px' })
  const [cardsRef, isCardsVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.08, rootMargin: '0px 0px -30px 0px' })
  const [ctaRef, isCtaVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.15, rootMargin: '0px 0px -40px 0px' })
  const [activeVideo, setActiveVideo] = useState<1 | 2>(1)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)

  const sectionRef = useRef<HTMLElement>(null)
  const video1Ref = useRef<HTMLVideoElement>(null)
  const video2Ref = useRef<HTMLVideoElement>(null)
  const isTransitioningRef = useRef(false)

  // Gerenciador de transição contínua em esteira suave entre os dois players
  // Elimina qualquer efeito de vai-e-volta, corte seco ou "bater na ponta"
  const handleTimeUpdate = (currentNum: 1 | 2) => {
    const currentVideo = currentNum === 1 ? video1Ref.current : video2Ref.current
    const nextVideo = currentNum === 1 ? video2Ref.current : video1Ref.current

    if (!currentVideo || !nextVideo || isTransitioningRef.current) return

    const duration = currentVideo.duration || 11.81
    if (currentVideo.currentTime >= duration - FADE_BEFORE_END_SECONDS) {
      isTransitioningRef.current = true

      nextVideo.currentTime = 0
      nextVideo.playbackRate = VIDEO_PLAYBACK_RATE
      nextVideo.play().catch(() => {})

      const nextActive = currentNum === 1 ? 2 : 1
      setActiveVideo(nextActive)

      setTimeout(() => {
        if (currentVideo) {
          currentVideo.pause()
          currentVideo.currentTime = 0
        }
        isTransitioningRef.current = false
      }, 1800)
    }
  }

  const handleVideoEnded = (currentNum: 1 | 2) => {
    if (!isTransitioningRef.current) {
      const nextActive = currentNum === 1 ? 2 : 1
      const nextVideo = nextActive === 1 ? video1Ref.current : video2Ref.current
      if (nextVideo) {
        nextVideo.currentTime = 0
        nextVideo.playbackRate = VIDEO_PLAYBACK_RATE
        nextVideo.play().catch(() => {})
      }
      setActiveVideo(nextActive)
    }
  }

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Respeitar preferência de movimento reduzido (WCAG 2.1 AA)
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (motionQuery.matches) {
      setIsVisible(true)
      if (video1Ref.current) video1Ref.current.pause()
      if (video2Ref.current) video2Ref.current.pause()
      return
    }

    if (video1Ref.current) {
      video1Ref.current.playbackRate = VIDEO_PLAYBACK_RATE
    }
    if (video2Ref.current) {
      video2Ref.current.playbackRate = VIDEO_PLAYBACK_RATE
    }

    const section = sectionRef.current
    if (!section) return

    // Se carregado diretamente com âncora
    if (window.location.hash === '#como-funciona' || window.location.hash === '#sistema') {
      setIsVisible(true)
    } else {
      const rect = section.getBoundingClientRect()
      if (rect.top <= window.innerHeight * 0.88) {
        setIsVisible(true)
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting) {
          setIsVisible(true)
          const currentRef = activeVideo === 1 ? video1Ref.current : video2Ref.current
          if (currentRef && currentRef.paused) {
            currentRef.play().catch(() => {})
          }
        } else {
          if (video1Ref.current && !video1Ref.current.paused) video1Ref.current.pause()
          if (video2Ref.current && !video2Ref.current.paused) video2Ref.current.pause()
        }
      },
      {
        threshold: 0.05,
        rootMargin: '120px 0px 120px 0px',
      }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [activeVideo])

  return (
    <section
      id="como-funciona"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#07110D] text-prospera-white py-12 sm:py-14 lg:py-16 selection:bg-[#0F3B2E] selection:text-[#FAF8F3]"
      aria-label="Como Funciona — Jornada do Investidor Prospera"
    >
      {/* Âncora de compatibilidade de navegação */}
      <div id="sistema" className="absolute -top-16 pointer-events-none" aria-hidden="true" />

      {/* =====================================================================
          1. FUNDO DA SEÇÃO: VÍDEO DO SKYLINE CORPORATIVO COM TRANSIÇÃO CONTÍNUA
          - Sistema A/B de vídeo duplo em crossfade contínuo e sem corte
          - Elimina completamente o "efeito de rebater / ida e volta / ping-pong"
          - Movimento contínuo, lento e elegante em uma única direção (0.55x)
          - Autoplay, muted, playsInline, object-cover, sem margens
          - Fallback em alta resolução com poster oficial
         ===================================================================== */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
        {/* Poster de Alta Resolução como base estática imediata cobrindo toda a dobra */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
          <img
            src={POSTER_SRC}
            alt=""
            className="w-full h-full object-cover object-center"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* Video Player 1 (A) */}
        <video
          ref={video1Ref}
          autoPlay
          muted
          playsInline
          preload="auto"
          poster={POSTER_SRC}
          onTimeUpdate={() => handleTimeUpdate(1)}
          onEnded={() => handleVideoEnded(1)}
          onLoadedData={() => {
            setIsVideoLoaded(true)
            if (video1Ref.current) {
              const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
              if (motionQuery.matches) {
                video1Ref.current.pause()
              } else {
                video1Ref.current.playbackRate = VIDEO_PLAYBACK_RATE
                video1Ref.current.play().catch(() => {})
              }
            }
          }}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1500 ease-in-out ${
            activeVideo === 1 && isVideoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden="true"
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>

        {/* Video Player 2 (B) - Seamless Buffer */}
        <video
          ref={video2Ref}
          muted
          playsInline
          preload="auto"
          poster={POSTER_SRC}
          onTimeUpdate={() => handleTimeUpdate(2)}
          onEnded={() => handleVideoEnded(2)}
          onLoadedData={() => {
            if (video2Ref.current) {
              video2Ref.current.playbackRate = VIDEO_PLAYBACK_RATE
            }
          }}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1500 ease-in-out ${
            activeVideo === 2 ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden="true"
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
      </div>

      {/* Overlay translúcido nobre de arquitetura corporativa
          Permite que a arquitetura e os edifícios de Londres permaneçam claros, nítidos e vivos,
          sem escurecer excessivamente e sem competir com os cards */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 95% 80% at 50% 35%, rgba(7, 20, 14, 0.08) 0%, rgba(7, 20, 14, 0.18) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Transição névoa difusa no topo (com a 3ª dobra) */}
      <div className="fold-transition-top" aria-hidden="true">
        <div className="fold-transition-glow-top" />
      </div>

      {/* Transição névoa difusa na base (com o rodapé) */}
      <div className="fold-transition-bottom" aria-hidden="true">
        <div className="fold-transition-glow-bottom" />
      </div>

      <div className="container-luxury relative z-10">
        {/* =====================================================================
            2. CABEÇALHO DA SEÇÃO: Eyebrow, Headline e Subheadline
               - Título em tom champanhe (#F8F6F0) com destaque dourado firme (#F0D27A)
               - Subtítulo em tom claro nobre (#F2ECE1) com excelente leitura
               - SEM caixas brancas, sem manchas ovais, leitura 100% limpa e sofisticada
               - Scroll dinâmico com fade-up escalonado sutil
           ===================================================================== */}
        <div ref={headerRef} className="relative text-center max-w-[860px] mx-auto px-4 sm:px-6">
          {/* Suave reforço de contraste focal difuso sem bordas nem caixas */}
          <div
            className="absolute -inset-x-8 -inset-y-6 sm:-inset-x-16 sm:-inset-y-10 pointer-events-none -z-10 blur-3xl opacity-50"
            style={{
              background:
                'radial-gradient(ellipse 75% 65% at 50% 50%, rgba(7, 19, 13, 0.60) 0%, rgba(7, 19, 13, 0.25) 50%, transparent 75%)',
            }}
            aria-hidden="true"
          />

          {/* Eyebrow Institucional Padronizado */}
          <div
            className={`inline-flex items-center justify-center gap-2 mb-2.5 sm:mb-3 px-3.5 py-1 rounded-full bg-[#09261D]/90 border border-[#D4AF37]/60 text-[#F0D27A] text-[11px] font-bold tracking-[0.22em] uppercase backdrop-blur-md shadow-[0_2px_12px_rgba(0,0,0,0.4)] transition-all duration-700 delay-100 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100 ${
              isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_6px_rgba(212,175,55,0.8)]" />
            <span>{t.howItWorks.eyebrow}</span>
          </div>

          {/* Headline Nobre em Tom Champanhe com Destaque Dourado Firme */}
          <h2
            className={`font-serif font-normal leading-[1.14] text-[#F8F6F0] tracking-tight transition-all duration-700 delay-250 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100 ${
              isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{
              fontSize: 'clamp(1.85rem, 2.2vw + 1.1rem, 3rem)',
              textShadow: '0 2px 4px rgba(0,0,0,0.95), 0 4px 18px rgba(4,10,7,0.95)',
            }}
          >
            {t.howItWorks.headlinePart1}
            <span
              className="italic font-serif text-[#F0D27A]"
              style={{
                textShadow: '0 0 12px rgba(240,210,122,0.35), 0 2px 4px rgba(0,0,0,0.95)',
              }}
            >
              {t.howItWorks.headlineGold}
            </span>
            {t.howItWorks.headlinePart2}
          </h2>

          {/* Subheadline Institucional em Tom Claro Nobre com Alta Legibilidade */}
          <p
            className={`mt-2.5 sm:mt-3 font-normal text-[#F2ECE1] max-w-[720px] mx-auto leading-[1.62] transition-all duration-700 delay-400 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100 ${
              isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
            style={{
              fontSize: 'clamp(0.9rem, 0.3vw + 0.8rem, 1.0625rem)',
              textShadow: '0 1px 3px rgba(0,0,0,0.95), 0 2px 8px rgba(4,10,7,0.85)',
            }}
          >
            {t.howItWorks.subheadline}
          </p>
        </div>

        {/* =====================================================================
            3. GRID RESPONSIVO DOS 8 PASSOS — CARDS TOTALMENTE PADRONIZADOS
               - Mesma largura, mesma altura por linha, mesma borda, mesmo radius
               - Títulos e descrições com baselines milimetricamente alinhadas
               - Sombras discretas de nível 2 padronizadas
           ===================================================================== */}
        <div ref={cardsRef} className="mt-7 sm:mt-8 lg:mt-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-4.5 lg:gap-4 xl:gap-5">
          {JOURNEY_STEPS.map((item, idx) => {
            const stepData = t.howItWorks.steps[idx] || { step: item.step, title: item.title, description: item.description }
            return (
              <div
                key={item.step}
                className={`group relative bg-[#FFFDF9]/95 hover:bg-white border border-[#D4AF37]/35 hover:border-[#D4AF37]/75 rounded-2xl overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-[0_4px_16px_rgba(15,59,46,0.05)] hover:shadow-[0_8px_24px_rgba(212,175,55,0.14)] hover:-translate-y-1 flex flex-col h-full max-w-[420px] sm:max-w-none mx-auto w-full motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100 ${
                  isCardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
                style={{
                  transitionDelay: `${60 + (idx % 4) * 45 + Math.floor(idx / 4) * 90}ms`,
                }}
              >
                {/* Imagem Temática Coerente no Topo */}
                <div className="relative w-full h-[142px] sm:h-[148px] overflow-hidden shrink-0 bg-[#EAE5D9]">
                  <img
                    src={item.image}
                    alt={`${stepData.step} - ${stepData.title}`}
                    className="w-full h-full object-cover transition-transform duration-600 ease-out group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      const target = e.currentTarget
                      if (target.src.endsWith('.webp')) {
                        target.src = target.src.replace('.webp', '.jpg')
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10 pointer-events-none" />

                  {/* Numeração Padronizada da Etapa */}
                  <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-[#07110D]/85 border border-[#D4AF37]/55 text-[10.5px] font-mono font-bold tracking-[0.18em] text-[#F5D982] shadow-xs">
                    {stepData.step}
                  </span>
                </div>

                {/* Interior Padronizado com Alturas Balanceadas */}
                <div className="p-4 flex-1 flex flex-col justify-between bg-[#FFFDF9] group-hover:bg-white transition-colors duration-300">
                  <div>
                    <h3 className="font-sans font-bold text-[13px] xl:text-[13.5px] tracking-[0.08em] text-[#0F3B2E] uppercase group-hover:text-[#99731A] transition-colors duration-300 leading-snug min-h-[38px] flex items-center">
                      {stepData.title}
                    </h3>
                    <p className="mt-1.5 text-[12.5px] text-[#3D4A41] font-normal leading-[1.56]">
                      {stepData.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* =====================================================================
            4. CTA FINAL INTEGRADO DA DOBRA
               - Headline em Off-White (#FFFDF8) em 1 linha contínua no desktop
               - Subtítulo em Tom Claro Nobre (#E5E0D8) aproximado com respiro elegante
               - Botão dourado oficial com glow proporcional e seta direcional
               - Bloco compacto, centralizado e sem altura desperdiçada
           ===================================================================== */}
        <div ref={ctaRef} className="relative mt-7 sm:mt-8 lg:mt-9 text-center max-w-[920px] mx-auto px-4 sm:px-6">
          <div className="relative">
            {/* Suave reforço de contraste focal difuso no bloco CTA */}
            <div
              className="absolute -inset-x-12 -inset-y-8 sm:-inset-x-20 sm:-inset-y-12 pointer-events-none -z-10 blur-3xl opacity-55"
              style={{
                background:
                  'radial-gradient(ellipse 70% 65% at 50% 50%, rgba(7, 19, 13, 0.55) 0%, rgba(7, 19, 13, 0.20) 50%, transparent 75%)',
              }}
              aria-hidden="true"
            />

            {/* Headline do CTA em tom champanhe com leitura nítida e sem palavra isolada */}
            <h3
              className={`font-serif font-normal leading-[1.18] text-[#F8F6F0] tracking-tight transition-all duration-700 delay-150 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100 ${
                isCtaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{
                fontSize: 'clamp(1.5rem, 1.6vw + 0.85rem, 2.25rem)',
                textShadow: '0 2px 4px rgba(0,0,0,0.95), 0 4px 18px rgba(4,10,7,0.95)',
              }}
            >
              {t.howItWorks.ctaHeadline}
            </h3>

            {/* Texto de Apoio em Tom Claro Nobre com espaçamento reduzido e elegante */}
            <p
              className={`mt-2 sm:mt-2.5 font-normal text-[#F2ECE1] max-w-[580px] mx-auto leading-[1.6] transition-all duration-700 delay-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100 ${
                isCtaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
              style={{
                fontSize: 'clamp(0.875rem, 0.25vw + 0.8rem, 1.05rem)',
                textShadow: '0 1px 3px rgba(0,0,0,0.95), 0 2px 8px rgba(4,10,7,0.85)',
              }}
            >
              {t.howItWorks.ctaSubtitle}
            </p>

            {/* Botão Primário Dourado Oficial com respiro proporcional */}
            <div
              className={`mt-3.5 sm:mt-4 flex flex-col items-center justify-center gap-2 transition-all duration-700 delay-450 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100 ${
                isCtaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <div className="relative group w-full sm:w-auto flex justify-center">
                <div
                  className="absolute -inset-1 rounded-full bg-prospera-gold/25 blur-md animate-cta-glow pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                  aria-hidden="true"
                />

                <a
                  href="#diagnostico"
                  className="btn-gold-primary relative overflow-hidden inline-flex items-center justify-center gap-2.5 rounded-full w-full sm:w-auto px-7 py-3 sm:px-9 sm:py-3.5 min-h-[46px] sm:min-h-[50px] text-xs sm:text-[13px] font-bold tracking-[0.14em] uppercase text-[#07110D] shadow-[0_6px_24px_rgba(212,175,55,0.32)] transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-prospera-gold/70"
                >
                  <span
                    className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none animate-button-shine"
                    aria-hidden="true"
                  />
                  <span>{t.howItWorks.ctaButton}</span>
                  <ArrowUpRight className="w-[17px] h-[17px] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#07110D]" />
                </a>
              </div>

              <p
                className="text-[12px] sm:text-[12.5px] font-normal tracking-[0.02em] text-[#F2ECE1] text-center"
                style={{ textShadow: '0 1px 4px rgba(0,0,0,0.95), 0 2px 8px rgba(4,10,7,0.85)' }}
              >
                {t.howItWorks.ctaSubtext}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
