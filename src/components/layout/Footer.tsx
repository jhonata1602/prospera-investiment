import { ShieldCheck, MapPin } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export function Footer() {
  const { t, language } = useLanguage()

  const navItems = [
    { label: t.nav.about, href: '#sobre' },
    { label: t.nav.method, href: '#metodo' },
    { label: t.nav.routes, href: '#rotas' },
    { label: t.nav.howItWorks, href: '#como-funciona' },
    { label: t.nav.opportunities, href: '#oportunidades' },
    { label: t.nav.analyzeProfile, href: '#diagnostico' },
  ]

  return (
    <footer className="relative bg-[#0E2E23] text-[#FFFDF8]">
      {/* Transição névoa difusa no topo do rodapé */}
      <div className="fold-transition-top" aria-hidden="true">
        <div className="fold-transition-glow-top" />
      </div>

      {/* Main Footer Content — Altura compacta e verde britânico refinado */}
      <div className="container-luxury py-8 sm:py-10 lg:py-12">
        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          {/* Column 1: Brand & Positioning (Full on mobile, half on tablet, 4 cols on desktop) */}
          <div className="md:col-span-1 lg:col-span-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/prospera/brand/logo-shield.webp"
                alt="Brasão Oficial Prospera Investment"
                className="h-10 sm:h-11 lg:h-12 w-auto object-contain drop-shadow-[0_2px_10px_rgba(212,175,55,0.25)]"
              />
              <div className="flex flex-col justify-center">
                <div className="font-serif text-[1.12rem] sm:text-[1.22rem] font-semibold tracking-[0.24em] text-[#FFFDF8] uppercase leading-tight">
                  PROSPERA
                </div>
                <div className="text-[9.5px] sm:text-[10px] font-semibold tracking-[0.32em] text-gold-metallic uppercase leading-tight mt-0.5">
                  INVESTMENT
                </div>
              </div>
            </div>

            <p className="mt-4 text-[13.5px] sm:text-[14px] leading-relaxed text-[#FFFDF8]/88 max-w-sm">
              {t.footer.tagline}
            </p>

            <div className="mt-4 flex items-center gap-2 text-[12.5px] text-prospera-gold">
              <MapPin size={14} className="shrink-0" />
              <span>{t.footer.location}</span>
            </div>
          </div>

          {/* Column 2: Navigation (Full on mobile, half on tablet, 3 cols on desktop) */}
          <div className="md:col-span-1 lg:col-span-3">
            <h3 className="font-serif text-[1rem] sm:text-[1.08rem] font-semibold tracking-wide text-prospera-gold">
              {t.footer.navTitle}
            </h3>
            <ul className="mt-3.5 space-y-2 text-[13.5px] sm:text-[14px] text-[#FFFDF8]/88">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="transition-colors hover:text-prospera-gold"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#diagnostico"
                  className="font-medium text-prospera-gold hover:underline"
                >
                  {t.footer.diagnosticLink}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Institutional Notice / Compliance (Full on mobile, spans 2 cols on tablet, 5 cols on desktop) */}
          <div className="md:col-span-2 lg:col-span-5">
            <div className="flex items-center gap-2 text-[12px] sm:text-[12.5px] font-semibold uppercase tracking-wider text-prospera-gold">
              <ShieldCheck size={16} />
              <span>{t.footer.complianceTitle}</span>
            </div>
            <p className="mt-2.5 text-[12.5px] sm:text-[13px] leading-relaxed text-[#FFFDF8]/80">
              {t.footer.complianceText1}
            </p>
            <p className="mt-2.5 text-[12px] sm:text-[12.5px] leading-relaxed text-[#FFFDF8]/70">
              {t.footer.complianceText2}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar — Sem copyright, com links discretos de compliance e voltar ao topo */}
      <div className="border-t border-white/10 bg-[#0A231B] py-4">
        <div className="container-luxury flex flex-col items-center justify-between gap-3 text-center text-xs text-[#FFFDF8]/75 sm:flex-row sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-5">
            <a href="#privacidade" className="hover:text-prospera-gold transition-colors">
              {language === 'en' ? 'Privacy Policy' : 'Política de Privacidade'}
            </a>
            <span className="text-[#D4AF37]/35">•</span>
            <a href="#termos" className="hover:text-prospera-gold transition-colors">
              {language === 'en' ? 'Terms of Use' : 'Termos de Uso'}
            </a>
            <span className="text-[#D4AF37]/35">•</span>
            <a href="#aviso-institucional" className="hover:text-prospera-gold transition-colors">
              {language === 'en' ? 'Institutional Notice' : 'Aviso Institucional'}
            </a>
          </div>
          <div className="flex items-center gap-6">
            <a href="#hero" className="transition-colors hover:text-prospera-gold">
              {t.footer.backToTop}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
