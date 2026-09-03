import { useState, useEffect, useRef, useCallback } from 'react'
import { ArrowUpRight, ChevronDown, Landmark, ShieldCheck, MapPin } from 'lucide-react'

// 5-Scene Master Sequence per HERO_VIDEO_SHOTLIST.md (15s Total Cycle, 3s each)
const VIDEO_SCENES = [
  {
    id: 'thames',
    src: '/assets/prospera/video/london-thames-bridge.mp4',
    title: 'Cena 1: Tâmisa + Ponte + Skyline (0–3s)',
  },
  {
    id: 'big-ben',
    src: '/assets/prospera/video/london-big-ben.mp4',
    title: 'Cena 2: Westminster + Big Ben (3–6s)',
  },
  {
    id: 'london-eye',
    src: '/assets/prospera/video/london-eye.mp4',
    title: 'Cena 3: London Eye + Tâmisa (6–9s)',
  },
  {
    id: 'skyline',
    src: '/assets/prospera/video/london-skyline.mp4',
    title: 'Cena 4: Skyline Premium (9–12s)',
  },
  {
    id: 'property',
    src: '/assets/prospera/video/london-property.mp4',
    title: 'Cena 5: Imóveis Britânicos Premium (12–15s)',
  },
]

interface CinematicHeroProps {
  posterSrc?: string
  adrianaSrc?: string
}

export function CinematicHero({
  posterSrc = '/assets/prospera/hero/poster-london.webp',
  adrianaSrc = '/assets/prospera/adriana/adriana-cutout.webp',
}: CinematicHeroProps) {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 })
  const [isDesktop, setIsDesktop] = useState(false)
  const [currentSceneIdx, setCurrentSceneIdx] = useState(0)
  const [isAnyVideoWorking, setIsAnyVideoWorking] = useState(false)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  // Detect capability: Desktop pointer, viewport size, reduced motion preference
  useEffect(() => {
    const checkEnvironment = () => {
      const isFinePointer = window.matchMedia('(pointer: fine)').matches
      const isWideScreen = window.innerWidth >= 1024
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      setIsDesktop(isFinePointer && isWideScreen && !prefersReducedMotion)
    }

    checkEnvironment()
    window.addEventListener('resize', checkEnvironment)
    return () => window.removeEventListener('resize', checkEnvironment)
  }, [])

  // 15-second master sequence crossfader (3 seconds per scene, per HERO_VIDEO_SHOTLIST.md)
  useEffect(() => {
    // Only run multi-clip sequence if on desktop and reduced motion is off
    if (!isDesktop) return

    const interval = setInterval(() => {
      setCurrentSceneIdx((prev) => {
        const next = (prev + 1) % VIDEO_SCENES.length
        const nextVideo = videoRefs.current[next]
        if (nextVideo) {
          nextVideo.currentTime = 0
          nextVideo.play().catch(() => {})
        }
        return next
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [isDesktop])

  // Track video availability
  const handleVideoCanPlay = (idx: number) => {
    setIsAnyVideoWorking(true)
    if (idx === currentSceneIdx && videoRefs.current[idx]) {
      videoRefs.current[idx]?.play().catch(() => {})
    }
  }

  // Subtle microparallax on mouse move (8–14px per HERO_VIDEO_SHOTLIST.md)
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (!isDesktop) return

      const rect = e.currentTarget.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5

      setMouseOffset({
        x: Math.round(x * 14),
        y: Math.round(y * 10),
      })
    },
    [isDesktop],
  )

  const handleMouseLeave = useCallback(() => {
    setMouseOffset({ x: 0, y: 0 })
  }, [])

  const scrollToNext = () => {
    window.scrollBy({ top: window.innerHeight * 0.9, behavior: 'smooth' })
  }

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-[100svh] lg:h-screen lg:min-h-[760px] lg:max-h-[1080px] flex items-center bg-[#07110D] text-prospera-white overflow-hidden"
      aria-label="Primeira Dobra Cinematográfica — Prospera Investment"
    >
      {/* =========================================================================
          CAMADA 1: VÍDEO FULL-SCREEN (Sequência 5 Cenas de Londres com Crossfade)
          0–3s: Tâmisa + ponte | 3–6s: Big Ben | 6–9s: London Eye | 9–12s: Skyline | 12–15s: Imóveis
         ========================================================================= */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* 5-Video Scene Slots with 500ms Crossfade */}
        {VIDEO_SCENES.map((scene, idx) => (
          <video
            key={scene.id}
            ref={(el) => { videoRefs.current[idx] = el }}
            playsInline
            autoPlay
            muted
            loop
            preload="metadata"
            onCanPlay={() => handleVideoCanPlay(idx)}
            className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-500 ease-in-out ${
              isAnyVideoWorking && currentSceneIdx === idx ? 'opacity-85' : 'opacity-0'
            }`}
          >
            <source src={scene.src} type="video/mp4" />
          </video>
        ))}

        {/* Poster Fallback Panorâmico (Exibido enquanto vídeos carregam ou caso ainda não estejam na pasta) */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${
            isAnyVideoWorking ? 'opacity-0' : 'opacity-90'
          }`}
        >
          <img
            src={posterSrc}
            alt="Londres — Westminster, Big Ben, London Eye e Tâmisa"
            fetchPriority="high"
            loading="eager"
            decoding="async"
            className="h-full w-full object-cover object-[center_35%] animate-cinematic-pan will-change-transform"
          />
        </div>

        {/* Tratamento visual suave — Londres permanece viva, nítida e luminosa */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07110D]/75 via-transparent to-[#07110D]/40" />
        <div className="absolute inset-0 bg-[#07110D]/10 mix-blend-multiply" />
      </div>

      {/* =========================================================================
          CAMADA 2 & 3: ESCRITÓRIO PREMIUM (Camada Intermediária)
          Janela panorâmica piso-teto, frisos dourados, tampo da mesa executiva na base
         ========================================================================= */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Divisórias arquitetônicas de vidro piso-ao-teto */}
        <div className="hidden lg:block absolute inset-y-0 left-[38%] xl:left-[35%] w-px bg-gradient-to-b from-prospera-gold/25 via-white/10 to-prospera-gold/30 shadow-[0_0_15px_rgba(201,161,74,0.15)]" />
        <div className="hidden xl:block absolute inset-y-0 left-[68%] w-px bg-gradient-to-b from-white/10 via-white/5 to-white/15" />

        {/* Reflexo de vidro e iluminação de escritório executivo */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.04] via-transparent to-prospera-gold/[0.03]" />

        {/* Superfície da mesa executiva na base em primeiro plano */}
        <div className="absolute inset-x-0 bottom-0 h-28 sm:h-36 lg:h-44 bg-gradient-to-t from-[#07110D] via-[#091410]/95 to-transparent">
          {/* Friso em ouro nobre na borda da mesa executiva */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-prospera-gold/40 via-30% to-transparent" />
        </div>

        {/* Auras de iluminação ambiental interna refinada */}
        <div className="absolute -bottom-20 left-[10%] h-[380px] w-[380px] rounded-full bg-prospera-gold/10 blur-[130px] animate-ambient-glow" />
        <div className="absolute top-1/3 -right-20 h-[450px] w-[450px] rounded-full bg-prospera-green/25 blur-[140px]" />
      </div>

      {/* =========================================================================
          CAMADA 2 / 3: ADRIANA HORROCKS (Fixa em Primeiro Plano, Recortada, Sem Moldura)
          Posicionada à esquerda, rosto e postura impecáveis, leve microparallax (8-14px)
         ========================================================================= */}
      <div
        className="absolute bottom-0 left-0 sm:left-4 lg:left-[3%] xl:left-[6%] 2xl:left-[9%] z-20 pointer-events-none transition-transform duration-700 ease-out will-change-transform flex items-end"
        style={{
          transform: isDesktop
            ? `translate3d(${-mouseOffset.x * 0.4}px, ${-mouseOffset.y * 0.3}px, 0)`
            : 'none',
        }}
      >
        <div className="relative">
          {/* Sombra suave de contato e profundidade sob Adriana */}
          <div className="absolute -inset-x-8 bottom-0 h-24 bg-gradient-to-t from-black/80 via-black/40 to-transparent blur-xl" />

          <img
            src={adrianaSrc}
            alt="Adriana Horrocks — Fundadora da Prospera Investment"
            fetchPriority="high"
            loading="eager"
            decoding="async"
            className="h-[62vh] sm:h-[70vh] md:h-[76vh] lg:h-[82vh] xl:h-[86vh] max-h-[860px] w-auto object-contain object-bottom drop-shadow-[0_20px_45px_rgba(0,0,0,0.65)]"
          />
        </div>
      </div>

      {/* =========================================================================
          CAMADA 4: CONTEÚDO E COPY (Lado Direito, Gradiente Localizado, Cidade Visível)
         ========================================================================= */}
      <div className="container-luxury relative z-30 w-full pt-20 pb-12 sm:pt-24 sm:pb-16 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 w-full items-center">
          
          {/* Colunas 1 a 6/7 livres à esquerda para Adriana e a vista de Londres */}
          <div className="hidden lg:block lg:col-span-6 xl:col-span-7" aria-hidden="true" />

          {/* Coluna da Copy com gradiente localizado diretamente atrás do texto */}
          <div
            className="lg:col-span-6 xl:col-span-5 flex flex-col justify-center max-w-[590px] w-full pt-72 sm:pt-96 lg:pt-0 lg:ml-auto transition-transform duration-500 ease-out will-change-transform"
            style={{
              transform: isDesktop
                ? `translate3d(${mouseOffset.x * 0.25}px, ${mouseOffset.y * 0.25}px, 0)`
                : 'none',
            }}
          >
            {/* Box com backdrop glassmorphism e gradiente escuro localizado (Londres permanece visível ao redor) */}
            <div className="relative p-6 sm:p-8 lg:p-9 rounded-3xl bg-[#07110D]/75 lg:bg-[#07110D]/65 backdrop-blur-md border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              
              {/* Glow dourado ambiental localizado */}
              <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-prospera-gold/15 blur-3xl pointer-events-none" />

              {/* Step 1: Label / Eyebrow (100ms) */}
              <div className="animate-hero-fade-in-up-1">
                <div className="inline-flex items-center gap-2.5 rounded-full border border-prospera-gold/40 bg-[#0F3B2E]/90 px-4 py-1.5 backdrop-blur-md shadow-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-prospera-gold animate-pulse" />
                  <span className="text-[10px] sm:text-xs font-semibold tracking-[0.22em] text-prospera-gold uppercase">
                    PROSPERA INVESTMENT
                  </span>
                </div>
              </div>

              {/* Step 2: Headline (280ms) */}
              <h1
                className="animate-hero-fade-in-up-2 mt-4 sm:mt-5 font-serif font-normal leading-[1.12] tracking-tight text-prospera-white text-shadow-sm"
                style={{
                  fontSize: 'clamp(2.15rem, 3.4vw, 3.95rem)',
                }}
              >
                Invista no mercado imobiliário britânico com{' '}
                <span className="italic font-light text-prospera-gold">direção</span>,{' '}
                <span className="italic font-light text-prospera-gold">estrutura</span> e{' '}
                <span className="italic font-light text-prospera-gold">visão de longo prazo</span>.
              </h1>

              {/* Step 3: Subheadline (460ms) */}
              <p className="animate-hero-fade-in-up-3 mt-3.5 sm:mt-4 text-base sm:text-lg lg:text-[1.18rem] xl:text-[1.24rem] font-light leading-relaxed text-prospera-ivory/90">
                Da análise do seu perfil à aquisição, gestão e crescimento do patrimônio no Reino Unido.
              </p>

              {/* Step 4: CTAs com Leve Glow Dourado e Microinteração Refinada (640ms) */}
              <div className="animate-hero-fade-in-up-4 mt-7 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4">
                {/* CTA Principal */}
                <div className="relative group">
                  <div
                    className="absolute -inset-1 rounded-full bg-prospera-gold/25 blur-lg animate-cta-glow pointer-events-none opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                    aria-hidden="true"
                  />

                  <a
                    href="#diagnostico"
                    className="relative overflow-hidden inline-flex items-center justify-center gap-3 rounded-full bg-prospera-gold px-7 py-4 sm:px-8 sm:py-4.5 min-h-[54px] text-xs sm:text-[13px] font-bold tracking-[0.14em] uppercase text-[#07110D] shadow-[0_4px_25px_rgba(201,161,74,0.35)] transition-all duration-300 hover:bg-[#D8B35C] hover:shadow-[0_8px_35px_rgba(201,161,74,0.55)] hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-prospera-gold/70 w-full sm:w-auto"
                  >
                    <span
                      className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none animate-button-shine"
                      aria-hidden="true"
                    />
                    <span>DESCOBRIR MINHA ROTA</span>
                    <ArrowUpRight
                      size={17}
                      className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </a>
                </div>

                {/* CTA Secundário */}
                <a
                  href="#sobre"
                  className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-prospera-gold/50 bg-black/25 px-6 py-4 sm:px-7 sm:py-4.5 min-h-[54px] text-xs sm:text-[13px] font-semibold tracking-[0.12em] uppercase text-prospera-white backdrop-blur-md transition-all duration-300 hover:border-prospera-gold hover:bg-prospera-gold/15 hover:text-prospera-gold hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(201,161,74,0.2)] active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-prospera-gold/50"
                >
                  <span>CONHECER A PROSPERA</span>
                  <span className="text-prospera-gold transition-transform duration-300 group-hover:translate-x-1.5">
                    →
                  </span>
                </a>
              </div>

              {/* Step 5: Linha de Autoridade & Benefícios (820ms) */}
              <div className="animate-hero-fade-in-up-5 mt-7 sm:mt-8 pt-5 border-t border-white/10 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="h-[2px] w-8 sm:w-10 rounded-full animate-gold-shimmer shrink-0" />
                  <p className="text-xs sm:text-[12px] font-semibold tracking-wider text-prospera-gold uppercase">
                    Estratégia • Aquisição • Gestão • Crescimento Patrimonial
                  </p>
                </div>

                {/* Micro-indicadores Institucionais */}
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-prospera-ivory/70">
                  <div className="flex items-center gap-2">
                    <Landmark size={14} className="text-prospera-gold shrink-0" />
                    <span>32+ anos no Reino Unido</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={14} className="text-prospera-gold shrink-0" />
                    <span>Governança Patrimonial</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-prospera-gold shrink-0" />
                    <span>Mayfair & City Advisory</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SCROLL INDICATOR
         ========================================================================= */}
      <button
        type="button"
        onClick={scrollToNext}
        className="hidden lg:flex absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex-col items-center gap-1 text-[10px] tracking-[0.25em] uppercase text-prospera-gold/70 hover:text-prospera-gold transition-colors focus:outline-none"
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
