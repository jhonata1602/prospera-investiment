import { ShieldCheck, MapPin } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export function Footer() {
  const { t, language } = useLanguage()

  const navItems = [
    { label: t.nav.method, href: '#metodo' },
    { label: t.nav.about, href: '#sobre' },
    { label: t.nav.routes, href: '#rotas' },
    { label: t.nav.howItWorks, href: '#como-funciona' },
    { label: t.nav.opportunities, href: '#oportunidades' },
    { label: t.nav.analyzeProfile, href: '#diagnostico' },
  ]

  return (
    <footer className="relative bg-gradient-to-b from-[#1A4D3F] via-[#164538] to-[#133D31] text-[#FFFDF8]">
      {/* Véu de luminosidade suave no topo do rodapé */}
      <div
        className="absolute inset-x-0 top-0 h-6 pointer-events-none z-10"
        style={{
          background:
            'linear-gradient(to bottom, rgba(212, 175, 55, 0.05) 0%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      {/* Main Footer Content — Verde britânico nobre e mais luminoso, altura equilibrada */}
      <div className="container-luxury py-6 sm:py-7 lg:py-8">
        <div className="grid grid-cols-1 gap-6 sm:gap-7 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Column 1: Brand & Positioning (Full on mobile, half on tablet, 4 cols on desktop) */}
          <div className="md:col-span-1 lg:col-span-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/prospera/brand/logo-shield.webp"
                alt={language === 'pt' ? 'Brasão Oficial Prospera Investimentos' : 'Prospera Investment Official Crest'}
                className="h-10 sm:h-11 lg:h-12 w-auto object-contain drop-shadow-[0_2px_10px_rgba(212,175,55,0.25)]"
              />
              <div className="flex flex-col justify-center">
                <div className="font-serif text-[1.12rem] sm:text-[1.22rem] font-semibold tracking-[0.24em] text-[#FFFDF8] uppercase leading-tight">
                  PROSPERA
                </div>
                <div className="text-[9.5px] sm:text-[10px] font-semibold tracking-[0.32em] text-[#F7DC8D] uppercase leading-tight mt-0.5">
                  {language === 'pt' ? 'INVESTIMENTOS' : 'INVESTMENT'}
                </div>
              </div>
            </div>

            <p className="mt-3 text-[13px] sm:text-[13.5px] leading-[1.65] text-[#FAF7F0] max-w-sm font-normal">
              {t.footer.tagline}
            </p>

            <div className="mt-3.5 flex items-center gap-2 text-[12.5px] text-[#F7DC8D]">
              <MapPin size={14} className="shrink-0 text-[#F7DC8D]" />
              <span className="text-[#FAF7F0] font-medium">{t.footer.location}</span>
            </div>
          </div>

          {/* Column 2: Navigation (Full on mobile, half on tablet, 3 cols on desktop) */}
          <div className="md:col-span-1 lg:col-span-3">
            <h3 className="font-serif text-[0.98rem] sm:text-[1.05rem] font-semibold tracking-wide text-[#F7DC8D]">
              {t.footer.navTitle}
            </h3>
            <ul className="mt-3 space-y-2 text-[13px] sm:text-[13.5px]">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-[#FAF7F0] transition-colors duration-200 hover:text-[#F7DC8D] inline-block font-normal"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Institutional Notice / Compliance (Full on mobile, spans 2 cols on tablet, 5 cols on desktop) */}
          <div className="md:col-span-2 lg:col-span-5">
            <div className="flex items-center gap-2 text-[12px] sm:text-[12.5px] font-bold uppercase tracking-wider text-[#F7DC8D]">
              <ShieldCheck size={16} />
              <span>{t.footer.complianceTitle}</span>
            </div>
            <p className="mt-2.5 text-[12px] sm:text-[12.5px] leading-[1.65] text-[#FAF7F0] font-normal">
              {t.footer.complianceText1}
            </p>
            <p className="mt-2.5 text-[11.5px] sm:text-[12px] leading-[1.65] text-[#E7E0D3] font-normal">
              {t.footer.complianceText2}
            </p>
          </div>
        </div>
      </div>

      {/* Faixa Inferior — Links Institucionais, Identificação e Voltar ao Topo */}
      <div className="border-t border-[#D4AF37]/15 bg-[#103A2F] py-3.5 sm:py-4">
        <div className="container-luxury relative flex flex-col items-center justify-center text-center">
          {/* Linha Principal de Links Institucionais */}
          <nav
            aria-label="Links Institucionais"
            className="flex flex-wrap items-center justify-center gap-x-2.5 sm:gap-x-3.5 text-xs font-medium text-[#FAF7F0]"
          >
            <a
              href="#privacidade"
              className="hover:text-[#F7DC8D] transition-colors duration-200"
            >
              {language === 'en' ? 'Privacy Policy' : 'Política de Privacidade'}
            </a>
            <span className="text-[#D4AF37]/40 select-none text-[11px]" aria-hidden="true">
              ·
            </span>
            <a
              href="#termos"
              className="hover:text-[#F7DC8D] transition-colors duration-200"
            >
              {language === 'en' ? 'Terms of Use' : 'Termos de Uso'}
            </a>
            <span className="text-[#D4AF37]/40 select-none text-[11px]" aria-hidden="true">
              ·
            </span>
            <a
              href="#aviso-institucional"
              className="hover:text-[#F7DC8D] transition-colors duration-200"
            >
              {language === 'en' ? 'Legal Notice' : 'Aviso Institucional'}
            </a>
          </nav>

          {/* Linha Secundária: Identificação Institucional Mais Discreta */}
          <p className="mt-1.5 text-[11px] sm:text-[11.5px] text-[#C4B9A5] tracking-wide font-normal">
            {language === 'pt' ? 'Prospera Investimentos — Londres, Reino Unido' : 'Prospera Investment — London, United Kingdom'}
          </p>

          {/* Voltar ao Topo: Discreto, no canto direito em desktop, centralizado abaixo em mobile */}
          <div className="mt-2.5 md:mt-0 md:absolute md:right-5 lg:right-6 md:top-1/2 md:-translate-y-1/2">
            <a
              href="#topo"
              className="inline-flex items-center gap-1 text-[11px] sm:text-[11.5px] font-medium text-[#C4B9A5] hover:text-[#F7DC8D] transition-colors duration-200 cursor-pointer"
            >
              <span>{t.footer.backToTop}</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
