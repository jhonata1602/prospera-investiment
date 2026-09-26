import { useState, useEffect, useRef } from 'react'
import { Sparkles, Quote, User } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export function Feedback() {
  const { t } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (motionQuery.matches) {
      setPrefersReducedMotion(true)
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px 0px 50px 0px',
      }
    )

    const section = sectionRef.current
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative z-20 w-full bg-[#FAF7F2] py-20 sm:py-24 lg:py-28 shadow-[0_40px_80px_-12px_rgba(0,0,0,0.45)] scroll-mt-20 sm:scroll-mt-24 lg:scroll-mt-28"
      aria-label={t.feedback.eyebrow}
    >
      {/* Background Component */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden bg-[#FAF7F2]" aria-hidden="true">
        {/* Imagem fotográfica de living room premium/penthouse com vista para a cidade */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-100 transition-opacity duration-1000" aria-hidden="true">
          <img
            src="/assets/prospera/routes/route-luxury-penthouse.jpg"
            alt=""
            className="w-full h-full object-cover object-[center_60%] brightness-[1.05] contrast-[1.05]"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* Gradiente superior otimizado para garantir leitura perfeita da headline branca sem escurecer o centro da foto */}
        <div
          className="absolute inset-x-0 top-0 h-[40%] pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(5, 23, 16, 0.75) 0%, rgba(5, 23, 16, 0.3) 50%, transparent 100%)',
          }}
        />

        {/* Gradiente inferior para criar transição suave e profunda para a próxima dobra (FAQ) */}
        <div
          className="absolute inset-x-0 bottom-0 h-[30%] pointer-events-none"
          style={{
            background: 'linear-gradient(to top, rgba(0, 0, 0, 0.5) 0%, transparent 100%)',
          }}
        />
      </div>

      <div className="container-luxury relative z-10">
        <div
          className={`mx-auto max-w-3xl text-center relative transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isVisible || prefersReducedMotion ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {/* Suporte visual muito sutil (overlay localizado e elegante) para maximizar legibilidade sem lavar a dobra inteira */}
          <div
            className="absolute -inset-x-12 -inset-y-12 pointer-events-none -z-10 rounded-full blur-[32px] opacity-80"
            style={{
              background: 'radial-gradient(ellipse at 50% 50%, rgba(5,23,16,0.6) 0%, rgba(5,23,16,0.15) 50%, transparent 75%)',
            }}
            aria-hidden="true"
          />

          <div className="inline-flex items-center justify-center mb-4">
            <div className="badge-section-pill bg-white/10 backdrop-blur-md border-white/20 text-white shadow-[0_2px_8px_rgba(0,0,0,0.2)]">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" aria-hidden="true" />
              <span>{t.feedback.eyebrow}</span>
            </div>
          </div>
          <h2 
            className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[#FFFFFF] leading-[1.15] tracking-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)]"
          >
            {t.feedback.headlinePart1}
            <span 
              className="text-[#F5D982] font-serif font-bold italic tracking-tight mx-1.5 drop-shadow-[0_0_12px_rgba(245,217,130,0.5)]"
            >
              {t.feedback.headlineGold}
            </span>
            {t.feedback.headlinePart2}
          </h2>
          <p 
            className="mt-4 sm:mt-5 text-[15.5px] sm:text-[1.05rem] lg:text-[1.15rem] text-[#FFFFFF] font-bold max-w-2xl mx-auto leading-relaxed drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]"
          >
            {t.feedback.subheadline}
          </p>
        </div>

        <div className="mt-12 sm:mt-16 lg:mt-20 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 max-w-[1100px] mx-auto">
          {t.feedback.items.map((item: any, index: number) => {
            const delayStyle = prefersReducedMotion ? undefined : { transitionDelay: `${150 + index * 100}ms` }
            return (
              <div
                key={item.id}
                style={delayStyle}
                className={`relative group bg-white border border-[#EAE3D6]/70 rounded-xl p-6 sm:p-8 shadow-[0_8px_32px_-12px_rgba(5,23,16,0.06)] hover:shadow-[0_12px_40px_-16px_rgba(212,175,55,0.15)] hover:border-[#D4AF37]/30 transition-all duration-700 hover:-translate-y-1 ease-out flex flex-col max-w-[285px] sm:max-w-[340px] md:max-w-none mx-auto w-full ${
                  isVisible || prefersReducedMotion ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <div className="flex items-center gap-4 mb-5">
                  {item.image ? (
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#F4EFE6] ring-1 ring-[#D4AF37]/30 p-[2px] shrink-0 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-500 group-hover:ring-[#D4AF37]/60">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-full grayscale-[0.05]"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  ) : (
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#F4EFE6] ring-1 ring-[#D4AF37]/30 p-[2px] flex items-center justify-center shrink-0 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-500 group-hover:ring-[#D4AF37]/60">
                      <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-[#B38728]" />
                      </div>
                    </div>
                  )}
                  <div className="flex flex-col justify-center flex-1">
                    <span className="block text-[15px] sm:text-[16px] font-black text-[#050505] leading-tight transition-colors duration-300 group-hover:text-[#7A4F05]">
                      {item.name}
                    </span>
                    <span className="block text-[12.5px] sm:text-[13px] font-semibold text-[#4A4A4A] mt-0.5 leading-tight">
                      {item.role}
                    </span>
                  </div>
                  <Quote className="w-5 h-5 sm:w-6 sm:h-6 text-[#D4AF37]/20 shrink-0 self-start transition-colors duration-500 group-hover:text-[#D4AF37]/50" />
                </div>
                
                <p className="text-[14.5px] sm:text-[15px] text-[#0A0A0A] leading-[1.65] font-medium">
                  {item.text}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
