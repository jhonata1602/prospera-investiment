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
          CAMADA 2: OVERLAY ÚNICO E CONTÍNUO (Zero faixas, zero linhas, zero cortes)
          Um único gradiente contínuo cobrindo 100% da viewport (inset-0) sem divisões parciais
         ========================================================================= */}
      {/* Overlay contínuo para Desktop (>= 1024px) */}
      <div
        className="hidden lg:block absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            'linear-gradient(90deg, rgba(7,17,13,0.25) 0%, transparent 22%, transparent 56%, rgba(7,17,13,0.65) 72%, rgba(7,17,13,0.92) 88%, rgba(7,17,13,0.96) 100%), linear-gradient(180deg, rgba(7,17,13,0.38) 0%, transparent 15%, transparent 85%, rgba(7,17,13,0.65) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Overlay contínuo vertical para Tablet e Mobile (< 1024px) */}
      <div
        className="lg:hidden absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            'linear-gradient(180deg, rgba(7,17,13,0.92) 0%, rgba(7,17,13,0.78) 45%, rgba(7,17,13,0.35) 100%)',
        }}
        aria-hidden="true"
      />

      {/* =========================================================================
          CAMADA 3: ADRIANA HORROCKS OFICIAL (hero-adriana-prospera-final.png)
          - Imagem com fundo transparente nativo (preservando livro, maquete e mesa)
          - Ancorada em left-0 e bottom-0 para integração natural da mesa com a viewport
          - Escala proporcional nobre em todas as resoluções
         ========================================================================= */}
      <div
        className="absolute bottom-0 left-0 z-20 pointer-events-none flex items-end transition-transform duration-700 ease-out will-change-transform max-w-[85%] sm:max-w-[70%] md:max-w-[58%] lg:max-w-none"
        style={{
          width: isDesktop ? 'clamp(620px, 44vw, 980px)' : undefined,
          transform: isDesktop
            ? `translate3d(${-mouseOffset.x * 0.2}px, ${-mouseOffset.y * 0.12}px, 0)`
            : 'none',
        }}
        aria-hidden="true"
      >
        <div className="relative w-full">
          <img
            src={adrianaSrc}
            alt="Adriana Horrocks — Fundadora da Prospera Investment"
            fetchPriority="high"
            loading="eager"
            decoding="async"
            className="h-[44vh] sm:h-[48vh] md:h-[54vh] lg:h-[76vh] xl:h-[82vh] 2xl:h-[86vh] max-h-[920px] w-auto max-w-none object-contain object-bottom-left"
          />
        </div>
      </div>

      {/* =========================================================================
          CAMADA 4: COPY SOLTA SOBRE A HERO (Sem Moldura, Sem Card, Mais Respiro)
          - Container principal com max-width entre 1600px e 1720px
          - Proporção nobre e equilibrada com Adriana
          - Tipografia refinada com clamp e quebra de linha editorial
          - CTA Principal dominante + Microcopy discreta + CTA Secundário leve
         ========================================================================= */}
      <div className="container-luxury relative z-30 w-full pt-20 pb-12 sm:pt-24 sm:pb-16 md:py-16 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 w-full items-center min-h-[calc(100svh-5rem)] md:min-h-[85vh] lg:min-h-screen">
          
          {/* Espaço à esquerda dedicado à Adriana e notebook */}
          <div className="hidden lg:block lg:col-span-5 xl:col-span-5 2xl:col-span-5" aria-hidden="true" />

          {/* Coluna da Copy — TOTALMENTE SOLTA, sem caixa ou moldura ao redor */}
          <div
            className="lg:col-span-7 xl:col-span-7 2xl:col-span-7 flex flex-col justify-center max-w-[620px] lg:max-w-[660px] xl:max-w-[680px] w-full pb-56 sm:pb-60 md:pb-68 lg:pb-0 lg:ml-auto transition-transform duration-500 ease-out will-change-transform"
            style={{
              transform: isDesktop
                ? `translate3d(${mouseOffset.x * 0.15}px, ${mouseOffset.y * 0.15}px, 0)`
                : 'none',
            }}
          >
            {/* Título Principal com Destaque Dourado Oficial Metálico */}
            <h1
              className="animate-hero-fade-in-up-1 font-serif font-normal leading-[1.08] sm:leading-[1.06] lg:leading-[1.08] tracking-[-0.015em] text-prospera-white"
              style={{
                fontSize: 'clamp(2.4rem, 3.8vw, 4.5rem)',
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

            {/* Texto Secundário com Alto Respiro e Legibilidade */}
            <p className="animate-hero-fade-in-up-2 mt-5 sm:mt-6 lg:mt-7 text-[15.5px] sm:text-[17px] lg:text-[1.125rem] xl:text-[1.2rem] font-light leading-relaxed text-[#F8F5EE]/90 max-w-[580px]">
              Da análise do seu perfil à aquisição, gestão e crescimento do patrimônio no Reino Unido.
            </p>

            {/* Bloco de CTAs: Ação Principal Dominante + Microcopy + Ação Secundária Discreta */}
            <div className="animate-hero-fade-in-up-3 mt-8 sm:mt-10 lg:mt-11 flex flex-col sm:flex-row items-stretch sm:items-start gap-4 sm:gap-6 lg:gap-8">
              {/* Bloco do CTA Principal Dominante + Microcopy */}
              <div className="flex flex-col items-stretch sm:items-start gap-2.5">
                <div className="relative group">
                  <div
                    className="absolute -inset-1 rounded-full bg-prospera-gold/25 blur-lg animate-cta-glow pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                    aria-hidden="true"
                  />

                  <a
                    href="#diagnostico"
                    className="btn-gold-primary relative overflow-hidden inline-flex items-center justify-center gap-3 rounded-full px-8 py-4 sm:px-9 sm:py-4.5 min-h-[54px] sm:min-h-[58px] text-xs sm:text-[13px] font-bold tracking-[0.14em] uppercase text-[#07110D] w-full sm:w-auto shadow-[0_8px_30px_rgba(212,175,55,0.4)] transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-prospera-gold/70"
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
                <p className="text-[12px] sm:text-[12.5px] font-light tracking-[0.02em] text-[#F8F5EE]/70 pl-2 text-center sm:text-left">
                  Descubra a estratégia mais alinhada ao seu perfil.
                </p>
              </div>

              {/* CTA Secundário: Discreto, sem competir com o botão principal */}
              <a
                href="#sobre"
                className="inline-flex items-center justify-center gap-2.5 py-4 px-5 text-xs sm:text-[13px] font-medium tracking-[0.12em] uppercase text-[rgba(255,255,255,0.85)] hover:text-[#E7C76A] transition-colors duration-300 group/sec sm:mt-1 self-center sm:self-start"
              >
                <span>CONHECER A PROSPERA</span>
                <span className="text-prospera-gold transition-transform duration-300 group-hover/sec:translate-x-1">
                  →
                </span>
              </a>
            </div>

          </div>
        </div>
      </div>

      {/* =========================================================================
          SCROLL INDICATOR DISCRETO
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
