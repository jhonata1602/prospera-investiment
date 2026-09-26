import { useState, useEffect, useRef } from 'react'
import { Sparkles, ChevronDown } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export function FAQ() {
  const { t } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

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

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="relative z-10 w-full bg-[#FAF7F2] py-20 sm:py-24 lg:py-28 shadow-[0_40px_80px_-12px_rgba(0,0,0,0.45)] scroll-mt-20 sm:scroll-mt-24 lg:scroll-mt-28"
      aria-label={t.faq.eyebrow}
    >
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden bg-[#FAF7F2]" aria-hidden="true">
        {/* Imagem fotográfica clara e sofisticada, skyline de Londres premium */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-100 transition-opacity duration-1000" aria-hidden="true">
          <img
            src="/assets/prospera/london-aerial-skyline.jpg"
            alt=""
            className="w-full h-full object-cover object-[center_70%] brightness-[1.05] contrast-[1.05]"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* Sombra de dobra visual curta na junção superior (Testimonials -> FAQ) */}
        <div 
          className="absolute inset-x-0 top-0 h-16 sm:h-20 lg:h-24 pointer-events-none z-[100]"
          style={{
            background: 'linear-gradient(to bottom, rgba(5,23,16,1) 0%, rgba(5,23,16,0.6) 25%, rgba(5,23,16,0) 100%)'
          }}
          aria-hidden="true"
        />

        {/* Gradiente superior otimizado para garantir leitura impecável da headline branca sem escurecer o centro da foto */}
        <div
          className="absolute inset-x-0 top-0 h-[50%] pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(5, 23, 16, 0.90) 0%, rgba(5, 23, 16, 0.45) 50%, transparent 100%)',
          }}
        />
        
        {/* Overlay escuro muito sutil na base apenas para ancorar a dobra antes da sombra cair no formulário */}
        <div
          className="absolute inset-x-0 bottom-0 h-[20%] pointer-events-none"
          style={{
            background: 'linear-gradient(to top, rgba(0, 0, 0, 0.3) 0%, transparent 100%)',
          }}
        />
      </div>

      <div className="container-luxury relative z-10">
        <div
          className={`mx-auto max-w-2xl text-center transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isVisible || prefersReducedMotion ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {/* Suporte visual muito sutil (overlay focal) para ancorar o brilho da fonte */}
          <div
            className="absolute -inset-x-12 -inset-y-12 pointer-events-none -z-10 rounded-full blur-[32px] opacity-90"
            style={{
              background: 'radial-gradient(ellipse at 50% 50%, rgba(5,23,16,0.7) 0%, rgba(5,23,16,0.2) 50%, transparent 75%)',
            }}
            aria-hidden="true"
          />

          <div className="inline-flex items-center justify-center mb-4">
            <div className="badge-section-pill bg-white/10 backdrop-blur-md border-white/20 text-white shadow-[0_2px_8px_rgba(0,0,0,0.2)]">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" aria-hidden="true" />
              <span>{t.faq.eyebrow}</span>
            </div>
          </div>
          <h2 
            className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[#FFFFFF] leading-[1.15] tracking-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)]"
          >
            {t.faq.headlinePart1}
            <span 
              className="text-[#F5D982] font-serif font-bold italic tracking-tight ml-1.5 drop-shadow-[0_0_12px_rgba(245,217,130,0.5)]"
            >
              {t.faq.headlineGold}
            </span>
            {t.faq.headlinePart2}
          </h2>
          <p 
            className="mt-4 sm:mt-5 text-[15.5px] sm:text-[1.05rem] lg:text-[1.15rem] text-[#FFFFFF] font-bold max-w-xl mx-auto leading-relaxed drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]"
          >
            {t.faq.subheadline}
          </p>
        </div>

        <div
          className={`mt-12 sm:mt-16 max-w-3xl mx-auto space-y-4 transition-all duration-700 delay-150 ease-out ${
            isVisible || prefersReducedMotion ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {t.faq.questions.map((item: any, index: number) => {
            const isOpen = openIndex === index
            return (
              <div
                key={item.id}
                className={`group border rounded-2xl overflow-hidden transition-all duration-500 ease-out ${
                  isOpen 
                    ? 'bg-white border-[#D4AF37]/40 shadow-[0_8px_32px_-12px_rgba(212,175,55,0.15)]' 
                    : 'bg-[#FCFAF8]/90 border-[#EAE3D6] hover:bg-gradient-to-r hover:from-white hover:to-[#FAF7F2] hover:border-[#D4AF37]/50 hover:shadow-[0_8px_32px_-12px_rgba(212,175,55,0.2)] backdrop-blur-sm'
                }`}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between px-6 py-5 sm:px-8 sm:py-7 text-left focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className={`font-bold text-[16px] sm:text-[17px] pr-6 transition-colors duration-500 ${
                    isOpen ? 'text-[#7A4F05]' : 'text-[#051710] group-hover:text-[#845607]'
                  }`}>
                    {item.q}
                  </span>
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-500 ${
                      isOpen 
                        ? 'bg-[#D4AF37]/10 border border-[#D4AF37]/50 rotate-180 shadow-inner' 
                        : 'bg-white border border-[#EAE3D6] group-hover:border-[#D4AF37]/50 group-hover:bg-[#D4AF37]/5 group-hover:shadow-[0_0_15px_rgba(212,175,55,0.15)]'
                    }`}
                  >
                    <ChevronDown className={`w-5 h-5 transition-colors duration-500 ${
                      isOpen ? 'text-[#845607]' : 'text-[#B38728] group-hover:text-[#D4AF37]'
                    }`} />
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-6 sm:px-8 sm:pb-8 pt-1 text-[15px] sm:text-[16px] text-[#1C2C25] leading-relaxed font-medium">
                    {item.a}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className={`mt-16 sm:mt-20 flex justify-center transition-all duration-700 delay-300 ease-out ${
          isVisible || prefersReducedMotion ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <a
            href="#diagnostico"
            className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-[#0A1A12] px-8 sm:px-10 py-4 sm:py-5 rounded-full font-bold text-[13px] sm:text-[14px] tracking-[0.15em] uppercase overflow-hidden shadow-[0_0_40px_rgba(212,175,55,0.3)] hover:shadow-[0_0_60px_rgba(212,175,55,0.5)] transition-all duration-500 hover:-translate-y-1"
          >
            <span className="relative z-10 flex items-center gap-2">
              {t.nav.analyseProfile}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#B38728] via-[#FCF6BA] to-[#BF953F] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="absolute top-0 left-0 w-[250%] h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-[150%] skew-x-[-45deg] animate-button-shine" />
          </a>
        </div>
      </div>
    </section>
  )
}
