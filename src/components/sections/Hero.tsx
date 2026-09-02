import { useState, useEffect, useCallback } from 'react'
import { ArrowUpRight, ChevronDown, Landmark, ShieldCheck } from 'lucide-react'

export function Hero() {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 })
  const [isDesktop, setIsDesktop] = useState(false)

  // Detect pointer capability and screen size
  useEffect(() => {
    const checkDesktop = () => {
      const isFinePointer = window.matchMedia('(pointer: fine)').matches
      const isWideScreen = window.innerWidth >= 1024
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      setIsDesktop(isFinePointer && isWideScreen && !prefersReducedMotion)
    }

    checkDesktop()
    window.addEventListener('resize', checkDesktop)
    return () => window.removeEventListener('resize', checkDesktop)
  }, [])

  // Subtle parallax on mouse move (Desktop only)
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (!isDesktop) return

      const rect = e.currentTarget.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5

      // Smooth subtle offset (max +/- 8px)
      setMouseOffset({
        x: Math.round(x * 12),
        y: Math.round(y * 12),
      })
    },
    [isDesktop],
  )

  const handleMouseLeave = useCallback(() => {
    setMouseOffset({ x: 0, y: 0 })
  }, [])

  const scrollToNext = () => {
    window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' })
  }

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-[90vh] lg:min-h-screen xl:h-screen flex items-center justify-center bg-[#07110D] text-prospera-white overflow-hidden py-12 sm:py-16 lg:py-0"
      aria-label="Primeira Dobra — Prospera Investment"
    >
      {/* Ambient Background Aura */}
      <div
        className="absolute top-1/4 -left-32 h-[500px] w-[500px] rounded-full bg-prospera-green/30 blur-[120px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 -right-32 h-[500px] w-[500px] rounded-full bg-prospera-gold/10 blur-[130px] pointer-events-none animate-ambient-glow"
        aria-hidden="true"
      />

      {/* Main Centered Container (Constrained to max-w-[1560px] on all screens including ultrawide) */}
      <div className="container-luxury relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[52fr_48fr] xl:grid-cols-[53fr_47%] gap-10 sm:gap-12 lg:gap-10 xl:gap-14 items-center">
          
          {/* =========================================================================
              1. IMAGE AREA (Approx. 52% on Desktop — Framed, Uncropped, High Authority)
             ========================================================================= */}
          <div className="animate-hero-fade-in order-1 lg:order-1 flex items-center justify-center w-full">
            <div className="relative w-full h-[360px] sm:h-[460px] md:h-[540px] lg:h-[620px] xl:h-[700px] 2xl:h-[740px] max-h-[82vh] rounded-2xl lg:rounded-3xl overflow-hidden shadow-[0_24px_70px_rgba(0,0,0,0.7)] border border-prospera-gold/25 bg-[#0A1612]">
              
              {/* Image with controlled framing & object-position to guarantee face and house are intact */}
              <img
                src="/assets/prospera/hero-adriana-london-house.webp"
                alt="Adriana Horrocks — Fundadora da Prospera Investment em Londres com visão do Big Ben e arquitetura britânica"
                fetchPriority="high"
                loading="eager"
                decoding="async"
                className="h-full w-full object-cover object-[24%_12%] sm:object-[24%_14%] lg:object-[22%_center] xl:object-[20%_center] transition-transform duration-700 ease-out will-change-transform"
                style={{
                  transform: isDesktop
                    ? `translate3d(${-mouseOffset.x * 0.7}px, ${-mouseOffset.y * 0.7}px, 0) scale(1.03)`
                    : 'none',
                }}
              />

              {/* Edge Gradient Blend (Seamless Luxury Depth) */}
              <div
                className="hidden lg:block absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0A1612]/70 to-transparent pointer-events-none"
                aria-hidden="true"
              />
              <div
                className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0A1612]/80 to-transparent pointer-events-none"
                aria-hidden="true"
              />
              <div
                className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#0A1612]/40 to-transparent pointer-events-none"
                aria-hidden="true"
              />

              {/* Subtle Gold Frame Inset */}
              <div
                className="absolute inset-0 rounded-2xl lg:rounded-3xl border border-prospera-gold/20 pointer-events-none"
                aria-hidden="true"
              />
            </div>
          </div>

          {/* =========================================================================
              2. COPY AREA (Approx. 48% on Desktop — Vertically Centered, Max 620px)
             ========================================================================= */}
          <div
            className="order-2 lg:order-2 flex flex-col justify-center max-w-[620px] w-full mx-auto lg:mx-0 transition-transform duration-500 ease-out will-change-transform"
            style={{
              transform: isDesktop
                ? `translate3d(${mouseOffset.x * 0.35}px, ${mouseOffset.y * 0.35}px, 0)`
                : 'none',
            }}
          >
            {/* Step 1: Eyebrow Badge & Linha de Autoridade */}
            <div className="animate-hero-fade-in-up-1">
              <div className="inline-flex items-center gap-2.5 rounded-full border border-prospera-gold/40 bg-[#0F3B2E]/80 px-4 py-1.5 backdrop-blur-md shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-prospera-gold animate-pulse" />
                <span className="text-[10px] sm:text-xs font-medium tracking-[0.2em] text-prospera-gold uppercase">
                  Private UK Property Advisory
                </span>
              </div>

              {/* Linha de Autoridade solicitada */}
              <div className="mt-3.5 sm:mt-4 flex items-center gap-3">
                <div className="h-[2px] w-8 sm:w-12 rounded-full animate-gold-shimmer shrink-0" />
                <p className="text-xs sm:text-[13px] font-semibold tracking-wider text-prospera-gold uppercase">
                  Estratégia • Aquisição • Gestão • Crescimento Patrimonial
                </p>
              </div>
            </div>

            {/* Step 2: Headline (56px a 72px no desktop com clamp()) */}
            <h1
              className="animate-hero-fade-in-up-2 mt-5 sm:mt-6 font-serif font-normal leading-[1.12] tracking-tight text-prospera-white"
              style={{
                fontSize: 'clamp(2.35rem, 3.8vw, 4.35rem)',
              }}
            >
              Invista no mercado imobiliário britânico com{' '}
              <span className="italic font-light text-prospera-gold">direção</span>,{' '}
              <span className="italic font-light text-prospera-gold">estrutura</span> e{' '}
              <span className="italic font-light text-prospera-gold">visão de longo prazo</span>.
            </h1>

            {/* Step 3: Subheadline (18px a 22px) */}
            <p className="animate-hero-fade-in-up-3 mt-5 sm:mt-6 text-base sm:text-lg lg:text-[1.25rem] xl:text-[1.32rem] font-light leading-relaxed text-prospera-ivory/90">
              Da análise do seu perfil à aquisição, gestão e crescimento do patrimônio no Reino Unido.
            </p>

            {/* Step 4: CTAs (Mais dominantes, largos, confortáveis) */}
            <div className="animate-hero-fade-in-up-4 mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5">
              {/* CTA Principal */}
              <a
                href="#diagnostico"
                className="group relative inline-flex items-center justify-center gap-3 rounded-full bg-prospera-gold px-9 py-5 lg:px-10 lg:py-5 min-h-[58px] text-xs sm:text-[13px] font-bold tracking-[0.14em] uppercase text-[#07110D] shadow-[0_4px_30px_rgba(201,161,74,0.4)] transition-all duration-300 hover:bg-[#D8B35C] hover:shadow-[0_8px_35px_rgba(201,161,74,0.6)] hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-prospera-gold/70"
              >
                <span>DESCOBRIR MINHA ROTA</span>
                <ArrowUpRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>

              {/* CTA Secundário */}
              <a
                href="#sobre"
                className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-prospera-gold/50 bg-white/5 px-8 py-5 lg:px-9 lg:py-5 min-h-[58px] text-xs sm:text-[13px] font-semibold tracking-[0.12em] uppercase text-prospera-white backdrop-blur-sm transition-all duration-300 hover:border-prospera-gold hover:bg-prospera-gold/15 hover:text-prospera-gold active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-prospera-gold/50"
              >
                <span>CONHECER A PROSPERA</span>
                <span className="text-prospera-gold transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>

            {/* Micro-indicadores Institucionais / Trust Anchors */}
            <div className="animate-hero-fade-in-up-4 mt-8 sm:mt-10 pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 sm:gap-8 text-xs sm:text-[13px] text-prospera-ivory/70">
              <div className="flex items-center gap-2.5">
                <Landmark size={16} className="text-prospera-gold shrink-0" />
                <span>Mais de 32 anos no Reino Unido</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck size={16} className="text-prospera-gold shrink-0" />
                <span>Estrutura de Governança Patrimonial</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 3. SCROLL INDICATOR */}
      <button
        type="button"
        onClick={scrollToNext}
        className="hidden lg:flex absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex-col items-center gap-1 text-[10px] tracking-[0.25em] uppercase text-prospera-gold/70 hover:text-prospera-gold transition-colors focus:outline-none"
        aria-label="Rolar para a próxima seção"
      >
        <span className="font-light">EXPLORAR</span>
        <div className="animate-subtle-scroll">
          <ChevronDown size={15} />
        </div>
      </button>
    </section>
  )
}
