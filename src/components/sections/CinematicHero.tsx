import { useState, useEffect, useRef, useCallback } from 'react'
import { ArrowUpRight, ArrowRight, ChevronDown } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

// Available High-Definition London Scenes in public/assets/prospera/video/
const VIDEO_SCENES = [
  {
    id: 'london-skyline',
    src: '/assets/prospera/video/london-skyline.mp4',
    title: 'Cena 1: Skyline Corporativo de Londres & Nuveen',
    className: 'hero-video-skyline',
    style: undefined,
  },
  {
    id: 'big-ben',
    src: '/assets/prospera/video/london-big-ben.mp4',
    title: 'Cena 2: Big Ben & Palácio de Westminster',
    className: 'hero-video-big-ben',
    style: undefined,
  },
  {
    id: 'thames-bridge',
    src: '/assets/prospera/video/london-thames-bridge.mp4',
    title: 'Cena 3: Tower Bridge & Rio Tâmisa',
    className: 'object-cover object-center',
    style: undefined,
  },
  {
    id: 'victoria-memorial',
    src: '/assets/prospera/video/london-victoria-memorial.mp4',
    title: 'Cena 4: Victoria Memorial & Tradição',
    className: 'object-cover object-[center_40%]',
    style: undefined,
  },
  {
    id: 'london-eye',
    src: '/assets/prospera/video/london-eye.mp4',
    title: 'Cena 5: London Eye & Tâmisa',
    className: 'hero-video-london-eye',
    style: undefined,
  },
  {
    id: 'london-streets',
    src: '/assets/prospera/video/london-streets.mp4',
    title: 'Cena 6: Trafalgar Square & Arquitetura Britânica',
    className: 'object-cover object-[60%_center]',
    style: undefined,
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
  const [isVideoReady, setIsVideoReady] = useState(false)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  // Detecção e disparo imediato do primeiro vídeo para transição sem flash
  useEffect(() => {
    const firstVideo = videoRefs.current[0]
    if (!firstVideo) return

    if (!firstVideo.paused && firstVideo.readyState >= 2) {
      setIsVideoReady(true)
      setIsAnyVideoWorking(true)
      return
    }

    const markReady = () => {
      setIsVideoReady(true)
      setIsAnyVideoWorking(true)
    }

    firstVideo.addEventListener('playing', markReady, { once: true })
    firstVideo.addEventListener('timeupdate', markReady, { once: true })

    firstVideo.play().then(markReady).catch(() => {
      // Autoplay bloqueado por política de economia/navegador — poster permanece ativo com elegância
    })

    return () => {
      firstVideo.removeEventListener('playing', markReady)
      firstVideo.removeEventListener('timeupdate', markReady)
    }
  }, [])

  // Estratégia de preload progressivo: prioriza vídeo 0 no carregamento inicial
  const getPreload = (idx: number) => {
    if (idx === 0) return 'auto'
    if (idx === currentSceneIdx) return 'auto'
    if (idx === (currentSceneIdx + 1) % VIDEO_SCENES.length && isVideoReady) return 'metadata'
    return 'none'
  }

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
      className="relative min-h-[100svh] w-full flex items-center overflow-hidden bg-transparent"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Âncora oficial de navegação para Método PROSPERA */}
      <div id="metodo" className="absolute top-0 pointer-events-none" aria-hidden="true" />
      {/* =========================================================================
          CAMADA 1: VÍDEOS DE ALTA RESOLUÇÃO DE LONDRES (Background Cinematográfico)
          - Poster estático com o primeiro frame idêntico ao 1º vídeo (Big Ben ao entardecer)
          - Transição suave em fade-in (500ms) assim que o vídeo estiver pronto para tocar
          - Zero flash verde, zero flash preto, zero tela vazia
          - Crossfade contínuo de 700ms entre as 6 cenas subsequentes
         ========================================================================= */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
        {/* Poster de Alta Precisão (Espelho fiel do primeiro frame da Cena 1) */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ease-out z-0 pointer-events-none ${
            isVideoReady ? 'opacity-0' : 'opacity-100'
          }`}
          aria-hidden="true"
        >
          <img
            src={posterSrc}
            alt=""
            fetchPriority="high"
            className="w-full h-full brightness-[1.18] contrast-[1.05] saturate-[1.04] hero-video-skyline"
            style={{
              backgroundImage: `url("data:image/webp;base64,UklGRmgBAABXRUJQVlA4IFwBAADwCgCdASpAACQAPl0mkEWjoiIarf78OAXEsoBYj9DIYG7BzmW3Vb6vAax2mRPNiaduDVa1z/Iv5ZnzJzf0A2BRuOxue9PuBgI0wRMJ6dwCapHqDATJzdN4uU9cM52hvgAA/vi5E5VHh2AIM6G9IByzi1dLybU3UkbbvEXXv7CkcrJa1UKtgHinaosrQjQHTQ0IOILmmbeO4JGElJeb7Ne6Hph6jRRmCObKNF1CuUJQEP45EITxMu6skEUKYuio6EyEcvqgQfUboSYm0Cxhcxs0QLFwpchnk9KYF13dLukJccoh6sUl7EOACVFBARqyR01FRfSNcDgac7WK5N14z9ujsl1P2GpTC6phNyd25Oad6xiMefGOzqaYYiNaqOk1B2eV3Q3MLGsooR3U/9HzHoDWL6Tl8idyCmcXGtJ6IkHVGo5qGI2uNtteXbUljjhFCKp2zhQPAKC+W+zAIAA=")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
        </div>

        {/* Camadas de Vídeo com Transição Suave e Priorização de Carregamento */}
        {VIDEO_SCENES.map((scene, idx) => {
          const isActive = idx === currentSceneIdx
          const isVisible = idx === 0 ? (isActive && isVideoReady) : isActive

          return (
            <div
              key={scene.id}
              className={`absolute inset-0 transition-opacity ${
                idx === 0 ? 'duration-500' : 'duration-700'
              } ease-in-out z-10 ${
                isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              <div
                className="w-full h-full overflow-hidden animate-kenburns-subtle will-change-transform"
                style={scene.style}
              >
                <video
                  ref={(el) => { videoRefs.current[idx] = el }}
                  autoPlay={idx === 0}
                  muted
                  loop
                  playsInline
                  preload={getPreload(idx)}
                  className={`w-full h-full brightness-[1.18] contrast-[1.05] saturate-[1.04] ${scene.className}`}
                  aria-hidden="true"
                  onPlaying={() => {
                    setIsVideoReady(true)
                    setIsAnyVideoWorking(true)
                  }}
                >
                  <source src={scene.src} type="video/mp4" />
                </video>
              </div>
            </div>
          )
        })}
      </div>

      {/* =========================================================================
          CAMADA 2: OVERLAY CINEMATOGRÁFICO LUMINOSO, NATURAL E CRISTALINO
          - Elimina a presença pesada do verde sobre os vídeos e monumentos de Londres
          - Céu, arquitetura e rio Tâmisa mais naturais, límpidos e com brilho elegante
          - Preserva contraste refinado para leitura da copy sem estourar e sem lavar
         ========================================================================= */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            'radial-gradient(ellipse 120% 90% at 50% 46%, transparent 0%, rgba(10,12,16,0.04) 55%, rgba(10,12,16,0.18) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Transição inferior de profundidade suave e difusa com a 2ª dobra (sem linhas duras, acabamento refinado) */}
      <div
        className="absolute inset-x-0 bottom-0 h-16 sm:h-20 lg:h-24 pointer-events-none z-20"
        style={{
          background:
            'linear-gradient(to bottom, transparent 0%, rgba(7, 16, 12, 0.10) 40%, rgba(7, 16, 12, 0.32) 80%, rgba(11, 35, 27, 0.52) 100%)',
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

      {/* =========================================================================
          CAMADA 3: COPY CENTRALIZADA INSTITUCIONAL (Sem moldura, sem card)
          - Centralizada horizontalmente com proporção nobre
          - Tipografia editorial refinada com clamp e quebra de linha harmoniosa
          - Backlight suave e invisível atrás do bloco de texto para leitura cristalina
          - CTAs equilibrados: Principal dominante + Secundário discreto
         ========================================================================= */}
      <div className="container-luxury relative z-30 w-full pt-28 pb-20 sm:pt-32 sm:pb-24 lg:py-0 flex flex-col items-center justify-center min-h-[calc(100svh-5rem)] lg:min-h-screen text-center">
        {/* Halo difuso imperceptível atrás da área de leitura para contraste cristalino sem faixa visível e sem verde pesado */}
        <div
          className="absolute max-w-[960px] w-full h-[440px] pointer-events-none -z-10 blur-3xl opacity-60"
          style={{
            background:
              'radial-gradient(ellipse 85% 70% at 50% 48%, rgba(8,10,12,0.28) 0%, rgba(8,10,12,0.10) 55%, transparent 85%)',
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
            className="animate-hero-fade-in-up-1 font-serif font-medium sm:font-semibold leading-[1.12] sm:leading-[1.08] lg:leading-[1.08] tracking-[-0.015em] text-[#FFFDF8] text-center"
            style={{
              fontSize: 'clamp(2.25rem, 2.5vw + 1.5rem, 4.5rem)',
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.95), 0 4px 22px rgba(4, 10, 7, 0.9)',
            }}
          >
            {t.hero.headlinePart1}
            <span
              className="text-[#F5D982] italic font-semibold sm:whitespace-nowrap font-serif"
              style={{
                textShadow: '0 0 22px rgba(245, 217, 130, 0.5), 0 2px 6px rgba(0, 0, 0, 0.9)',
              }}
            >
              {t.hero.headlineGold}
            </span>
            {t.hero.headlinePart2}
          </h1>

          <p
            className="animate-hero-fade-in-up-2 mt-6 sm:mt-7 [@media(min-width:2200px)]:mt-9 text-[15px] sm:text-[17px] lg:text-[1.15rem] xl:text-[1.25rem] font-semibold leading-relaxed text-[#FFFDF8] max-w-[740px] [@media(min-width:2200px)]:max-w-[860px] text-center mx-auto"
            style={{
              textShadow: '0 1px 4px rgba(0, 0, 0, 0.98), 0 2px 14px rgba(4, 10, 7, 0.90)',
            }}
          >
            {t.hero.subheadline}
          </p>

          <div className="animate-hero-fade-in-up-3 mt-8 sm:mt-11 [@media(min-width:2200px)]:mt-14 flex flex-col items-center justify-center gap-4 w-full">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 w-full">
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

              {/* CTA Secundário: Translúcido, refinado e elegante, sem competir com o botão principal */}
              <a
                href="#sobre"
                className="relative inline-flex items-center justify-center gap-2.5 rounded-full w-full sm:w-auto max-w-[320px] px-6 py-3.5 sm:px-7 sm:py-4 min-h-[50px] sm:min-h-[56px] text-xs sm:text-[13px] font-bold tracking-[0.14em] uppercase text-[#FFFDF8] bg-[#07110D]/55 hover:bg-[#07110D]/75 hover:text-white border border-prospera-gold/45 hover:border-prospera-gold/75 backdrop-blur-md transition-all duration-300 hover:shadow-[0_0_18px_rgba(212,175,55,0.25)] group/sec cursor-pointer"
                style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.95)' }}
              >
                <span>{t.hero.ctaSecondary}</span>
                <ArrowRight className="w-4 h-4 text-prospera-gold transition-transform duration-300 group-hover/sec:translate-x-1" />
              </a>
            </div>

            {/* Microcopy Elegante e Perceptível com Contraste Reforçado */}
            <p
              className="text-[12px] sm:text-[12.5px] font-semibold tracking-[0.02em] text-[#FFFDF8] text-center"
              style={{
                textShadow: '0 1px 4px rgba(0, 0, 0, 0.98), 0 2px 10px rgba(0, 0, 0, 0.85)',
              }}
            >
              {t.hero.microcopy}
            </p>
          </div>

        </div>
      </div>

      {/* =========================================================================
          INDICADOR "EXPLORAR" CENTRALIZADO NA BASE
         ========================================================================= */}
      <button
        type="button"
        onClick={scrollToNext}
        className="hidden lg:flex absolute bottom-6 [@media(min-width:2200px)]:bottom-9 [@media(min-width:2560px)]:bottom-11 left-1/2 -translate-x-1/2 z-30 flex-col items-center gap-1 text-[10px] [@media(min-width:2200px)]:text-[12px] tracking-[0.25em] uppercase text-[#F5D982] hover:text-white transition-colors focus:outline-none"
        style={{ textShadow: '0 1px 4px rgba(0, 0, 0, 0.95)' }}
        aria-label="Rolar para a próxima seção"
      >
        <span className="font-light">{t.hero.scrollExplore}</span>
        <div className="animate-subtle-scroll">
          <ChevronDown size={15} />
        </div>
      </button>
    </section>
  )
}
