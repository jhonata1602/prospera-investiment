import { useState, useEffect, useRef, useCallback } from 'react'
import { ArrowUpRight, ArrowRight, ChevronDown } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

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
  const { t } = useLanguage()
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

  // Transição suave de saída da Hero ao rolar para a segunda dobra (entrega fluida)
  const [scrollExit, setScrollExit] = useState({ opacity: 1, translateY: 0 })

  useEffect(() => {
    if (typeof window === 'undefined') return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    let rafId: number
    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        const scrollY = window.scrollY
        if (scrollY <= 0) {
          setScrollExit((prev) => (prev.opacity === 1 && prev.translateY === 0 ? prev : { opacity: 1, translateY: 0 }))
          return
        }
        const maxScroll = window.innerHeight * 0.75
        const ratio = Math.min(1, Math.max(0, scrollY / maxScroll))
        const newOpacity = Math.round((1 - ratio * 0.32) * 100) / 100 // 1 -> 0.68
        const newTranslateY = Math.round(-ratio * 22) // 0 -> -22px
        setScrollExit((prev) => {
          if (prev.opacity === newOpacity && prev.translateY === newTranslateY) return prev
          return { opacity: newOpacity, translateY: newTranslateY }
        })
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(rafId)
    }
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
                  className={`w-full h-full brightness-[1.14] contrast-[1.08] saturate-[1.05] ${scene.className}`}
                  aria-hidden="true"
                  onPlaying={() => setIsAnyVideoWorking(true)}
                >
                  <source src={scene.src} type="video/mp4" />
                </video>
              </div>
            </div>
          )
        })}

        {!isAnyVideoWorking && (
          <img
            src={posterSrc}
            alt=""
            fetchPriority="high"
            className="absolute inset-0 w-full h-full object-cover object-center brightness-[1.14] contrast-[1.08]"
          />
        )}
      </div>

      {/* =========================================================================
          CAMADA 2: OVERLAY CINEMATOGRÁFICO LUMINOSO E CLARO
          - Maior luminosidade e vivacidade da arquitetura, céu e iluminação noturna de Londres
          - Clareamento equilibrado sem estourar a luz
          - Preserva leitura nobre e contraste imediato do Header e da copy
         ========================================================================= */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            'radial-gradient(ellipse 115% 95% at 50% 46%, rgba(7,17,13,0.02) 0%, rgba(7,17,13,0.12) 50%, rgba(7,17,13,0.28) 100%), linear-gradient(180deg, rgba(7,17,13,0.22) 0%, transparent 18%, transparent 80%, rgba(7,17,13,0.16) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Transição inferior de profundidade suave e difusa com a 2ª dobra (sem linhas, cortes ou faixas escuras) */}
      <div
        className="absolute inset-x-0 bottom-0 h-20 sm:h-28 pointer-events-none z-20"
        style={{
          background:
            'linear-gradient(to top, rgba(7, 24, 18, 0.28) 0%, rgba(7, 24, 18, 0.10) 45%, rgba(15, 59, 46, 0.03) 80%, transparent 100%)',
        }}
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 100% at 50% 100%, rgba(212, 175, 55, 0.03) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* =========================================================================
          CAMADA 3: COPY CENTRALIZADA INSTITUCIONAL (Sem moldura, sem card)
          - Centralizada horizontalmente com proporção nobre
          - Tipografia editorial refinada com clamp e quebra de linha harmoniosa
          - Backlight suave e invisível atrás do bloco de texto para leitura cristalina
          - CTAs equilibrados: Principal dominante + Secundário discreto
         ========================================================================= */}
      <div className="container-luxury relative z-30 w-full pt-28 pb-20 sm:pt-32 sm:pb-24 lg:py-0 flex flex-col items-center justify-center min-h-[calc(100svh-5rem)] lg:min-h-screen text-center">
        {/* Halo difuso imperceptível atrás da área de leitura para contraste cristalino sem faixa visível */}
        <div
          className="absolute max-w-[960px] w-full h-[440px] pointer-events-none -z-10 blur-3xl opacity-75"
          style={{
            background:
              'radial-gradient(ellipse 85% 70% at 50% 48%, rgba(5,15,11,0.48) 0%, rgba(5,15,11,0.22) 50%, rgba(7,17,13,0.06) 75%, transparent 100%)',
          }}
          aria-hidden="true"
        />

        <div
          className="max-w-[940px] xl:max-w-[1040px] 2xl:max-w-[1140px] [@media(min-width:2200px)]:max-w-[1320px] mx-auto flex flex-col items-center transition-transform duration-500 ease-out will-change-transform"
          style={{
            transform: isDesktop
              ? `translate3d(${mouseOffset.x * 0.1}px, ${mouseOffset.y * 0.1 + scrollExit.translateY}px, 0)`
              : scrollExit.translateY !== 0
              ? `translate3d(0, ${scrollExit.translateY}px, 0)`
              : 'none',
            opacity: scrollExit.opacity,
            transition: 'opacity 200ms ease-out, transform 200ms ease-out',
          }}
        >
          <h1
            className="animate-hero-fade-in-up-1 font-serif font-normal leading-[1.12] sm:leading-[1.08] lg:leading-[1.08] tracking-[-0.015em] text-[#FFFDF8] text-center"
            style={{
              fontSize: 'clamp(2.25rem, 2.5vw + 1.5rem, 4.5rem)',
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.85), 0 4px 20px rgba(4, 10, 7, 0.75)',
            }}
          >
            {t.hero.headlinePart1}
            <span
              className="text-[#F5D982] italic font-normal sm:whitespace-nowrap font-serif"
              style={{
                textShadow: '0 0 22px rgba(245, 217, 130, 0.45), 0 2px 6px rgba(0, 0, 0, 0.85)',
              }}
            >
              {t.hero.headlineGold}
            </span>
            {t.hero.headlinePart2}
          </h1>

          <p
            className="animate-hero-fade-in-up-2 mt-6 sm:mt-7 [@media(min-width:2200px)]:mt-9 text-[15px] sm:text-[17px] lg:text-[1.15rem] xl:text-[1.25rem] font-normal leading-relaxed text-[#FAF6EE] max-w-[740px] [@media(min-width:2200px)]:max-w-[860px] text-center mx-auto"
            style={{
              textShadow: '0 1px 4px rgba(0, 0, 0, 0.85), 0 2px 12px rgba(4, 10, 7, 0.75)',
            }}
          >
            {t.hero.subheadline}
          </p>

          <div className="animate-hero-fade-in-up-3 mt-8 sm:mt-11 [@media(min-width:2200px)]:mt-14 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 w-full">
            <div className="flex flex-col items-center gap-2.5 w-full sm:w-auto">
              <div className="relative group w-full sm:w-auto flex justify-center">
                <div
                  className="absolute -inset-1 rounded-full bg-prospera-gold/25 blur-lg animate-cta-glow pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                  aria-hidden="true"
                />

                <a
                  href="#diagnostico"
                  className="btn-gold-primary relative overflow-hidden inline-flex items-center justify-center gap-3 rounded-full w-full sm:w-auto max-w-[320px] px-7 py-3.5 sm:px-10 sm:py-4.5 min-h-[50px] sm:min-h-[56px] text-xs sm:text-[13px] font-bold tracking-[0.14em] uppercase text-[#07110D] shadow-[0_8px_30px_rgba(212,175,55,0.4)] transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-prospera-gold/70"
                >
                  <span
                    className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none animate-button-shine"
                    aria-hidden="true"
                  />
                  <span>{t.hero.ctaPrimary}</span>
                  <ArrowUpRight
                    className="w-[17px] h-[17px] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#07110D]"
                  />
                </a>
              </div>

              {/* Microcopy Elegante e Perceptível */}
              <p
                className="text-[12px] sm:text-[12.5px] font-normal tracking-[0.02em] text-[#F2ECE1]/95 text-center"
                style={{ textShadow: '0 1px 3px rgba(0,0,0,0.9)' }}
              >
                {t.hero.microcopy}
              </p>
            </div>

            {/* CTA Secundário: Translúcido, refinado e elegante, sem competir com o botão principal */}
            <a
              href="#sobre"
              className="relative inline-flex items-center justify-center gap-2.5 rounded-full w-full sm:w-auto max-w-[320px] px-6 py-3.5 sm:px-7 sm:py-4 min-h-[50px] sm:min-h-[56px] text-xs sm:text-[13px] font-semibold tracking-[0.14em] uppercase text-[#F8F6F0] bg-[#07110D]/35 hover:bg-prospera-gold/[0.09] hover:text-[#FFFDF8] border border-prospera-gold/30 hover:border-prospera-gold/60 backdrop-blur-sm transition-all duration-300 hover:shadow-[0_0_18px_rgba(212,175,55,0.18)] group/sec cursor-pointer sm:mb-6"
              style={{ textShadow: '0 1px 3px rgba(0,0,0,0.85)' }}
            >
              <span>{t.hero.ctaSecondary}</span>
              <ArrowRight className="w-4 h-4 text-prospera-gold/90 transition-transform duration-300 group-hover/sec:translate-x-1" />
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
        className="hidden lg:flex absolute bottom-6 [@media(min-width:2200px)]:bottom-9 [@media(min-width:2560px)]:bottom-11 left-1/2 -translate-x-1/2 z-30 flex-col items-center gap-1 text-[10px] [@media(min-width:2200px)]:text-[12px] tracking-[0.25em] uppercase text-prospera-gold/70 hover:text-prospera-gold transition-colors focus:outline-none"
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
