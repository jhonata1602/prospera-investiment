import { useState, useEffect, useRef, useCallback } from 'react'
import { ArrowUpRight, ChevronDown } from 'lucide-react'

// Available High-Definition London Scenes in public/assets/prospera/video/
const VIDEO_SCENES = [
  {
    id: 'big-ben',
    src: '/assets/prospera/video/london-big-ben.mp4',
    title: 'Cena 1: Big Ben & Palácio de Westminster',
    className: 'object-cover',
    style: {
      objectPosition: '55% center',
    },
  },
  {
    id: 'thames-bridge',
    src: '/assets/prospera/video/london-thames-bridge.mp4',
    title: 'Cena 2: Tower Bridge & Rio Tâmisa',
    className: 'object-cover object-center',
    style: undefined,
  },
  {
    id: 'london-eye',
    src: '/assets/prospera/video/london-eye.mp4',
    title: 'Cena 3: London Eye & Tâmisa',
    className: 'object-cover',
    style: {
      objectPosition: '35% center',
      transform: 'scale(1.18) translateX(12%)',
    },
  },
  {
    id: 'london-streets',
    src: '/assets/prospera/video/london-streets.mp4',
    title: 'Cena 4: Trafalgar Square & Arquitetura Britânica',
    className: 'object-cover',
    style: {
      objectPosition: '60% center',
    },
  },
  {
    id: 'london-skyline',
    src: '/assets/prospera/video/london-skyline.mp4',
    title: 'Cena 5: Skyline Contemporâneo de Londres',
    className: 'object-cover object-center',
    style: undefined,
  },
  {
    id: 'victoria-memorial',
    src: '/assets/prospera/video/london-victoria-memorial.mp4',
    title: 'Cena 6: Victoria Memorial & Tradição',
    className: 'object-cover',
    style: {
      objectPosition: 'center 40%',
    },
  },
]

interface CinematicHeroProps {
  posterSrc?: string
  adrianaSrc?: string
}

export function CinematicHero({
  posterSrc = '/assets/prospera/hero/poster-london.webp',
  adrianaSrc = '/assets/prospera/hero-adriana-prospera-final.png',
}: CinematicHeroProps) {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 })
  const [isDesktop, setIsDesktop] = useState(false)
  const [currentSceneIdx, setCurrentSceneIdx] = useState(0)
  const [isAnyVideoWorking, setIsAnyVideoWorking] = useState(false)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  // Detect capability: Desktop pointer, viewport size, reduced motion
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

  // Parallax tracking with low-pass dampening
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDesktop) return
      const { clientX, clientY, currentTarget } = e
      const { width, height, left, top } = currentTarget.getBoundingClientRect()
      const normalizedX = (clientX - left) / width - 0.5
      const normalizedY = (clientY - top) / height - 0.5

      setMouseOffset({
        x: Math.round(normalizedX * 18),
        y: Math.round(normalizedY * 12),
      })
    },
    [isDesktop]
  )

  const handleMouseLeave = useCallback(() => {
    setMouseOffset({ x: 0, y: 0 })
  }, [])

  // Smooth continuous crossfader between scenes (4.0s per scene, 700ms crossfade)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const interval = setInterval(() => {
      setCurrentSceneIdx((prev) => (prev + 1) % VIDEO_SCENES.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  // Whenever active scene updates, start playing next video cleanly
  useEffect(() => {
    const nextVideo = videoRefs.current[currentSceneIdx]
    if (nextVideo) {
      nextVideo.currentTime = 0
      nextVideo.play().catch(() => {})
    }
  }, [currentSceneIdx])

  const scrollToNext = () => {
    window.scrollBy({ top: window.innerHeight * 0.9, behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      aria-label="Introdução Prospera Investment"
      className="relative min-h-[100svh] w-full flex items-center overflow-hidden bg-[#07110D]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* =========================================================================
          CAMADA 1: VÍDEOS DE ALTA RESOLUÇÃO DE LONDRES (Background Cinematográfico)
          - Transição suave entre as 6 cenas em crossfade de 700ms
          - Zoom lento contínuo (ken burns) para máxima sofisticação
          - Fallback com poster panorâmico garantindo zero tela preta
         ========================================================================= */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
        {VIDEO_SCENES.map((scene, idx) => {
          const isActive = idx === currentSceneIdx
          return (
            <div
              key={scene.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              <div
                className="w-full h-full animate-kenburns-subtle will-change-transform"
                style={scene.style}
              >
                <video
                  ref={(el) => { videoRefs.current[idx] = el }}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload={idx < 2 ? 'auto' : 'metadata'}
                  className={`w-full h-full ${scene.className}`}
                  aria-hidden="true"
                  onPlaying={() => setIsAnyVideoWorking(true)}
                >
                  <source src={scene.src} type="video/mp4" />
                </video>
              </div>
            </div>
          )
        })}

        {/* Fallback de alta resolução caso vídeo não reproduza */}
        {!isAnyVideoWorking && (
          <img
            src={posterSrc}
            alt=""
            fetchPriority="high"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        )}
      </div>

      {/* =========================================================================
          CAMADA 2: OVERLAY CINEMATOGRÁFICO CONTÍNUO (Zero linhas, zero faixas)
          - Gradiente radial e vertical full-bleed suave
          - Garante legibilidade absoluta da copy centralizada sem apagar Londres
         ========================================================================= */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            'radial-gradient(ellipse 90% 75% at 50% 50%, rgba(7,17,13,0.45) 0%, rgba(7,17,13,0.68) 55%, rgba(7,17,13,0.92) 100%), linear-gradient(180deg, rgba(7,17,13,0.65) 0%, transparent 18%, transparent 80%, rgba(7,17,13,0.9) 100%)',
        }}
        aria-hidden="true"
      />

      {/* =========================================================================
          CAMADA 3: COPY CENTRALIZADA INSTITUCIONAL (Sem moldura, sem card)
          - Centralizada horizontalmente com proporção nobre
          - Tipografia editorial refinada com clamp e quebra de linha harmoniosa
          - CTAs equilibrados: Principal dominante + Secundário discreto
         ========================================================================= */}
      <div className="container-luxury relative z-30 w-full pt-28 pb-20 sm:pt-32 sm:pb-24 lg:py-0 flex flex-col items-center justify-center min-h-[calc(100svh-5rem)] lg:min-h-screen text-center">
        <div
          className="max-w-[940px] xl:max-w-[1040px] 2xl:max-w-[1140px] mx-auto flex flex-col items-center transition-transform duration-500 ease-out will-change-transform"
          style={{
            transform: isDesktop
              ? `translate3d(${mouseOffset.x * 0.1}px, ${mouseOffset.y * 0.1}px, 0)`
              : 'none',
          }}
        >
          {/* Título Principal Centralizado com Destaque Dourado Oficial Metálico */}
          <h1
            className="animate-hero-fade-in-up-1 font-serif font-normal leading-[1.12] sm:leading-[1.08] lg:leading-[1.08] tracking-[-0.015em] text-prospera-white text-center"
            style={{
              fontSize: 'clamp(2.35rem, 4.2vw, 4.6rem)',
            }}
          >
            Invista no mercado imobiliário britânico com{' '}
            <span className="text-gold-metallic italic font-light sm:whitespace-nowrap">
              direção, estrutura
            </span>{' '}
            <span className="text-gold-metallic italic font-light sm:whitespace-nowrap">
              e visão de longo prazo.
            </span>
          </h1>

          {/* Subheadline com Alto Respiro e Legibilidade */}
          <p className="animate-hero-fade-in-up-2 mt-6 sm:mt-7 text-[16px] sm:text-[18px] lg:text-[1.2rem] xl:text-[1.28rem] font-light leading-relaxed text-[#F8F5EE]/90 max-w-[720px] text-center mx-auto">
            Da análise do seu perfil à aquisição, gestão e crescimento do patrimônio no Reino Unido.
          </p>

          {/* Bloco de CTAs: Ação Principal Dominante + Microcopy + Ação Secundária Discreta */}
          <div className="animate-hero-fade-in-up-3 mt-9 sm:mt-11 flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-8 w-full">
            {/* Bloco do CTA Principal Dominante + Microcopy */}
            <div className="flex flex-col items-center gap-2.5">
              <div className="relative group">
                <div
                  className="absolute -inset-1 rounded-full bg-prospera-gold/25 blur-lg animate-cta-glow pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                  aria-hidden="true"
                />

                <a
                  href="#diagnostico"
                  className="btn-gold-primary relative overflow-hidden inline-flex items-center justify-center gap-3 rounded-full px-8 py-4 sm:px-9 sm:py-4.5 min-h-[54px] sm:min-h-[58px] text-xs sm:text-[13px] font-bold tracking-[0.14em] uppercase text-[#07110D] shadow-[0_8px_30px_rgba(212,175,55,0.4)] transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-prospera-gold/70"
                >
                  <span
                    className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none animate-button-shine"
                    aria-hidden="true"
                  />
                  <span>DESCOBRIR MINHA ROTA</span>
                  <ArrowUpRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#07110D]"
                  />
                </a>
              </div>

              {/* Microcopy Elegante e Discreta */}
              <p className="text-[12px] sm:text-[12.5px] font-light tracking-[0.02em] text-[#F8F5EE]/75 text-center">
                Descubra a estratégia mais alinhada ao seu perfil.
              </p>
            </div>

            {/* CTA Secundário: Discreto, sem competir com o botão principal */}
            <a
              href="#sobre"
              className="inline-flex items-center justify-center gap-2.5 py-4 px-5 text-xs sm:text-[13px] font-medium tracking-[0.12em] uppercase text-[rgba(255,255,255,0.88)] hover:text-[#E7C76A] transition-colors duration-300 group/sec sm:mb-6"
            >
              <span>CONHECER A PROSPERA</span>
              <span className="text-prospera-gold transition-transform duration-300 group-hover/sec:translate-x-1">
                →
              </span>
            </a>
          </div>

        </div>
      </div>

      {/* =========================================================================
          INDICADOR "EXPLORAR" CENTRALIZADO NA BASE
         ========================================================================= */}
      <button
        type="button"
        onClick={scrollToNext}
        className="hidden lg:flex absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex-col items-center gap-1 text-[10px] tracking-[0.25em] uppercase text-prospera-gold/70 hover:text-prospera-gold transition-colors focus:outline-none"
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
