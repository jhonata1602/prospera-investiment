import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { FlagBR, FlagGB } from '@/components/ui/FlagIcons'

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { language, setLanguage, t } = useLanguage()

  const navItems = [
    { label: t.nav.method, href: '#metodo' },
    { label: t.nav.about, href: '#sobre' },
    { label: t.nav.routes, href: '#rotas' },
    { label: t.nav.howItWorks, href: '#como-funciona' },
    { label: t.nav.opportunities, href: '#oportunidades' },
    { label: t.nav.testimonials, href: '#testimonials' },
    { label: t.nav.faq, href: '#faq' },
    { label: t.nav.analyseProfile, href: '#diagnostico' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${isScrolled
        ? 'bg-gradient-to-r from-[#1A4D3F]/94 via-[#164538]/92 to-[#1A4D3F]/94 shadow-[0_8px_24px_rgba(15,59,46,0.22)] backdrop-blur-xl border-b border-[#D4AF37]/25 h-18 lg:h-20'
        : 'bg-gradient-to-b from-[#05110B]/60 via-[#05110B]/20 to-transparent backdrop-blur-[1.5px] border-b-0 border-transparent shadow-none h-20 lg:h-24'
        }`}
    >
      <div className="container-luxury flex h-full items-center justify-between gap-1.5 sm:gap-4 lg:gap-3 xl:gap-8 px-3 sm:px-6 lg:px-8">
        {/* Logo Oficial Prospera: Escudo à esquerda + Tipografia refinada */}
        <a
          href="#topo"
          className="group flex items-center gap-1.5 sm:gap-3 lg:gap-2.5 xl:gap-3.5 transition-opacity hover:opacity-95 shrink-0 min-w-0"
          aria-label={t.aria.headerHome}
        >
          {/* Brasão Oficial com Escudo Verde, Coroa e Coluna */}
          <div className="relative shrink-0 flex items-center justify-center">
            <img
              src="/assets/prospera/brand/logo-shield.webp"
              alt={t.aria.headerLogo}
              className="h-8.5 sm:h-11 md:h-12 lg:h-12 xl:h-14 [@media(min-width:2000px)]:h-16 w-auto object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] drop-shadow-[0_2px_12px_rgba(212,175,55,0.3)] transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* Nome Oficial Institucional */}
          <div className="flex flex-col justify-center min-w-0">
            <span
              className="font-serif text-[14px] xs:text-[15px] sm:text-lg md:text-xl lg:text-[1.2rem] xl:text-[1.35rem] [@media(min-width:2000px)]:text-2xl font-bold tracking-[0.20em] xs:tracking-[0.24em] text-[#FFFDF8] uppercase leading-tight truncate"
              style={{
                textShadow: '0 1px 3px rgba(0, 0, 0, 0.95), 0 2px 8px rgba(0, 0, 0, 0.75)',
              }}
            >
              PROSPERA
            </span>
            <span
              className="text-[7.5px] xs:text-[8px] sm:text-[9.5px] md:text-[10.5px] lg:text-[10px] xl:text-[11px] [@media(min-width:2000px)]:text-[12px] font-bold tracking-[0.28em] xs:tracking-[0.32em] text-[#F5D982] uppercase leading-tight mt-0.5 truncate"
              style={{
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.95), 0 0 10px rgba(245, 217, 130, 0.35)',
              }}
            >
              {language === 'pt' ? 'INVESTIMENTOS' : 'INVESTMENT'}
            </span>
          </div>
        </a>

        {/* Desktop Navigation & Seletor de Idioma: Todos os itens com mesma elegância e hover dourado */}
        <div className="hidden items-center gap-2 lg:gap-2.5 xl:gap-5 2xl:gap-7 lg:flex shrink-0">
          <nav
            className="flex items-center gap-1.5 lg:gap-2 xl:gap-4.5 2xl:gap-6"
            aria-label="Navegação principal"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group relative py-1 text-[11px] lg:text-[11.5px] xl:text-[13px] 2xl:text-[13.5px] font-semibold tracking-[0.01em] xl:tracking-[0.02em] text-[#FFFDF8] transition-colors duration-200 hover:text-[#D4AF37] whitespace-nowrap"
                style={{
                  textShadow: '0 1px 3px rgba(0, 0, 0, 0.95), 0 2px 6px rgba(0, 0, 0, 0.75)',
                }}
              >
                {item.label}
                <span className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-[#D4AF37] transition-all duration-300 group-hover:w-full rounded-full shadow-[0_0_8px_rgba(212,175,55,0.7)]" />
              </a>
            ))}
          </nav>

          {/* Seletor Compacto de Idioma PT / EN com Bandeiras */}
          <div
            className="shrink-0 flex items-center rounded-full p-0.5 bg-black/40 border border-[#D4AF37]/30 shadow-[0_2px_12px_rgba(0,0,0,0.35)] backdrop-blur-md"
            role="group"
            aria-label="Seletor de idioma / Language selector"
          >
            <button
              type="button"
              onClick={() => setLanguage('pt')}
              className={`px-2 py-0.5 lg:px-2.5 lg:py-1 rounded-full transition-all duration-200 cursor-pointer flex items-center gap-1.5 text-[10.5px] lg:text-[11px] font-bold tracking-wider uppercase select-none ${language === 'pt'
                ? 'bg-gradient-to-r from-[#F5D982] via-[#E2BA4E] to-[#C8992D] text-[#07110D] shadow-[0_1px_6px_rgba(212,175,55,0.4)]'
                : 'text-[#FAF8F5]/75 hover:text-[#FFFDF8] hover:bg-white/5 font-medium'
                }`}
              aria-label="Alterar idioma para Português (Brasil)"
              aria-pressed={language === 'pt'}
            >
              <FlagBR className="w-3.5 h-2.5" />
              <span>PT</span>
            </button>
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`px-2 py-0.5 lg:px-2.5 lg:py-1 rounded-full transition-all duration-200 cursor-pointer flex items-center gap-1.5 text-[10.5px] lg:text-[11px] font-bold tracking-wider uppercase select-none ${language === 'en'
                ? 'bg-gradient-to-r from-[#F5D982] via-[#E2BA4E] to-[#C8992D] text-[#07110D] shadow-[0_1px_6px_rgba(212,175,55,0.4)]'
                : 'text-[#FAF8F5]/75 hover:text-[#FFFDF8] hover:bg-white/5 font-medium'
                }`}
              aria-label="Switch language to English (UK)"
              aria-pressed={language === 'en'}
            >
              <FlagGB className="w-3.5 h-2.5" />
              <span>EN</span>
            </button>
          </div>
        </div>

        {/* Mobile & Tablet: Seletor 🇧🇷 PT / 🇬🇧 EN + Botão Menu Hambúrguer */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 lg:hidden shrink-0">
          {/* Seletor Compacto Mobile & Tablet com Bandeiras Oficiais 🇧🇷 PT / 🇬🇧 EN */}
          <div
            className="flex items-center rounded-full p-0.5 bg-black/40 border border-[#D4AF37]/30 shadow-[0_2px_8px_rgba(0,0,0,0.3)] backdrop-blur-md"
            role="group"
            aria-label="Seletor de idioma / Language selector"
          >
            <button
              type="button"
              onClick={() => setLanguage('pt')}
              className={`px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full cursor-pointer flex items-center gap-1 sm:gap-1.5 text-[9.5px] sm:text-[10.5px] font-bold tracking-wider uppercase select-none transition-all duration-200 ${language === 'pt'
                ? 'bg-gradient-to-r from-[#F5D982] via-[#E2BA4E] to-[#C8992D] text-[#07110D] shadow-[0_1px_4px_rgba(212,175,55,0.4)]'
                : 'text-[#FAF8F5]/75 hover:text-[#FFFDF8]'
                }`}
              aria-label="Alterar idioma para Português"
              aria-pressed={language === 'pt'}
            >
              <FlagBR className="w-3.5 h-2.5 shrink-0" />
              <span>PT</span>
            </button>
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full cursor-pointer flex items-center gap-1 sm:gap-1.5 text-[9.5px] sm:text-[10.5px] font-bold tracking-wider uppercase select-none transition-all duration-200 ${language === 'en'
                ? 'bg-gradient-to-r from-[#F5D982] via-[#E2BA4E] to-[#C8992D] text-[#07110D] shadow-[0_1px_4px_rgba(212,175,55,0.4)]'
                : 'text-[#FAF8F5]/75 hover:text-[#FFFDF8]'
                }`}
              aria-label="Switch language to English"
              aria-pressed={language === 'en'}
            >
              <FlagGB className="w-3.5 h-2.5 shrink-0" />
              <span>EN</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="grid h-8.5 w-8.5 sm:h-10 sm:w-10 place-items-center rounded-full border border-prospera-gold/40 bg-[#1A4D3F]/85 text-prospera-gold backdrop-blur-md transition-all hover:border-prospera-gold hover:bg-[#164538] focus:outline-none focus:ring-2 focus:ring-prospera-gold/50 cursor-pointer shrink-0"
            aria-label={isMobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 top-[72px] sm:top-20 z-40 bg-[#0F3B2E]/65 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer content */}
          <div className="fixed inset-x-0 top-[72px] sm:top-20 z-50 max-h-[calc(100vh-5rem)] overflow-y-auto border-b border-prospera-gold/25 bg-gradient-to-b from-[#1A4D3F]/98 via-[#164538]/98 to-[#133D31]/98 backdrop-blur-2xl p-6 shadow-[0_20px_50px_rgba(15,59,46,0.45)]">
            {/* Seletor de Idioma em Destaque no Drawer */}
            <div className="flex items-center justify-between pb-4 mb-2 border-b border-white/10">
              <span className="text-xs uppercase tracking-wider text-prospera-gold font-bold">
                {language === 'pt' ? 'Idioma / Language' : 'Language / Idioma'}
              </span>
              <div
                className="flex items-center gap-1 rounded-full p-1 bg-black/40 border border-[#D4AF37]/30"
                role="group"
                aria-label="Seletor de idioma / Language selector"
              >
                <button
                  type="button"
                  onClick={() => setLanguage('pt')}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-200 flex items-center gap-2 ${language === 'pt'
                    ? 'bg-gradient-to-r from-[#F5D982] via-[#E2BA4E] to-[#C8992D] text-[#07110D] shadow-[0_1px_6px_rgba(212,175,55,0.35)]'
                    : 'text-white/75 hover:text-white'
                    }`}
                  aria-pressed={language === 'pt'}
                >
                  <FlagBR className="w-4 h-2.5" />
                  <span>Português</span>
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-200 flex items-center gap-2 ${language === 'en'
                    ? 'bg-gradient-to-r from-[#F5D982] via-[#E2BA4E] to-[#C8992D] text-[#07110D] shadow-[0_1px_6px_rgba(212,175,55,0.35)]'
                    : 'text-white/75 hover:text-white'
                    }`}
                  aria-pressed={language === 'en'}
                >
                  <FlagGB className="w-4 h-2.5" />
                  <span>English</span>
                </button>
              </div>
            </div>

            <nav className="flex flex-col space-y-1" aria-label="Navegação mobile">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between border-b border-white/10 py-3 min-h-[48px] text-base font-medium text-prospera-ivory/90 transition-colors hover:text-prospera-gold"
                >
                  <span>{item.label}</span>
                  <span className="text-xs text-prospera-gold">→</span>
                </a>
              ))}
            </nav>

            <div className="mt-6 pt-4 border-t border-white/10">
              <p className="text-center text-xs text-prospera-ivory/60 font-light">
                {t.nav.tagline}
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
