import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { language, setLanguage, t } = useLanguage()

  const navItems = [
    { label: t.nav.about, href: '#sobre' },
    { label: t.nav.method, href: '#metodo' },
    { label: t.nav.routes, href: '#rotas' },
    { label: t.nav.howItWorks, href: '#como-funciona' },
    { label: t.nav.opportunities, href: '#oportunidades' },
    { label: t.nav.analyzeProfile, href: '#diagnostico' },
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
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#07110D]/95 shadow-[0_8px_32px_rgba(0,0,0,0.7)] backdrop-blur-xl border-b border-prospera-gold/20 h-18 lg:h-20'
          : 'bg-gradient-to-b from-[#07110D]/75 via-[#07110D]/35 to-transparent backdrop-blur-[4px] h-20 lg:h-24'
      }`}
    >
      <div className="container-luxury flex h-full items-center justify-between gap-4 sm:gap-6 lg:gap-8">
        {/* Logo Oficial Prospera: Escudo à esquerda + Tipografia refinada */}
        <a
          href="#topo"
          className="group flex items-center gap-2.5 sm:gap-3.5 transition-opacity hover:opacity-95 shrink-0"
          aria-label="Prospera Investment — Página inicial"
        >
          {/* Brasão Oficial com Escudo Verde, Coroa e Coluna */}
          <div className="relative shrink-0 flex items-center justify-center">
            <img
              src="/assets/prospera/brand/logo-shield.webp"
              alt="Brasão Oficial Prospera Investment"
              className="h-10 sm:h-11 md:h-12 lg:h-13.5 xl:h-14 [@media(min-width:2000px)]:h-16 w-auto object-contain drop-shadow-[0_2px_12px_rgba(212,175,55,0.3)] transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* Nome Oficial Institucional */}
          <div className="flex flex-col justify-center">
            <span className="font-serif text-base sm:text-lg md:text-xl lg:text-[1.35rem] [@media(min-width:2000px)]:text-2xl font-semibold tracking-[0.24em] text-prospera-white uppercase leading-tight">
              PROSPERA
            </span>
            <span className="text-[8.5px] sm:text-[9.5px] md:text-[10.5px] lg:text-[11px] [@media(min-width:2000px)]:text-[12px] font-semibold tracking-[0.32em] text-gold-metallic uppercase leading-tight mt-0.5">
              INVESTMENT
            </span>
          </div>
        </a>

        {/* Desktop Navigation & Seletor de Idioma: Todos os itens com mesma elegância e hover dourado */}
        <div className="hidden items-center gap-3 lg:gap-4 xl:gap-6 2xl:gap-7 lg:flex">
          <nav
            className="flex items-center gap-3 lg:gap-3.5 xl:gap-5 2xl:gap-6"
            aria-label="Navegação principal"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group relative py-1.5 text-[12px] lg:text-[12.5px] xl:text-[13.5px] font-medium tracking-[0.02em] text-[#FFFDF8] transition-colors duration-200 hover:text-[#D4AF37] drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)] whitespace-nowrap"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-[#D4AF37] transition-all duration-300 group-hover:w-full rounded-full shadow-[0_0_8px_rgba(212,175,55,0.7)]" />
              </a>
            ))}
          </nav>

          {/* Seletor Discreto de Idioma PT / EN */}
          <div
            className="flex items-center rounded-full p-0.5 bg-[#0A1F17]/90 border border-[#D4AF37]/35 shadow-[0_2px_10px_rgba(0,0,0,0.3)] backdrop-blur-md ml-1"
            role="group"
            aria-label="Seletor de idioma / Language selector"
          >
            <button
              type="button"
              onClick={() => setLanguage('pt')}
              className={`px-2.5 py-1 rounded-full transition-all duration-200 cursor-pointer flex items-center gap-1 text-[10.5px] font-bold tracking-wider uppercase ${
                language === 'pt'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-[#07110D] shadow-xs'
                  : 'text-[#FAF8F5]/75 hover:text-[#D4AF37]'
              }`}
              aria-label="Alterar idioma para Português"
              aria-pressed={language === 'pt'}
            >
              <span className="text-[12px]">🇧🇷</span>
              <span>PT</span>
            </button>
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 rounded-full transition-all duration-200 cursor-pointer flex items-center gap-1 text-[10.5px] font-bold tracking-wider uppercase ${
                language === 'en'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-[#07110D] shadow-xs'
                  : 'text-[#FAF8F5]/75 hover:text-[#D4AF37]'
              }`}
              aria-label="Switch language to English"
              aria-pressed={language === 'en'}
            >
              <span className="text-[12px]">🇬🇧</span>
              <span>EN</span>
            </button>
          </div>
        </div>

        {/* Mobile: Seletor Compacto + Hamburger Toggle Button */}
        <div className="flex items-center gap-2.5 lg:hidden">
          {/* Seletor Compacto Mobile */}
          <div className="flex items-center rounded-full p-0.5 bg-[#0A1F17]/90 border border-[#D4AF37]/35">
            <button
              type="button"
              onClick={() => setLanguage('pt')}
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase transition-colors ${
                language === 'pt'
                  ? 'bg-[#D4AF37] text-[#07110D]'
                  : 'text-[#FAF8F5]/70 hover:text-[#D4AF37]'
              }`}
              aria-label="Português"
            >
              PT
            </button>
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase transition-colors ${
                language === 'en'
                  ? 'bg-[#D4AF37] text-[#07110D]'
                  : 'text-[#FAF8F5]/70 hover:text-[#D4AF37]'
              }`}
              aria-label="English"
            >
              EN
            </button>
          </div>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="grid h-10 w-10 place-items-center rounded-full border border-prospera-gold/40 bg-[#07110D]/80 text-prospera-gold backdrop-blur-md transition-all hover:border-prospera-gold hover:bg-prospera-gold/20 focus:outline-none focus:ring-2 focus:ring-prospera-gold/50 cursor-pointer"
            aria-label={isMobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 top-[72px] sm:top-20 z-40 bg-[#07110D]/75 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer content */}
          <div className="fixed inset-x-0 top-[72px] sm:top-20 z-50 max-h-[calc(100vh-5rem)] overflow-y-auto border-b border-prospera-gold/25 bg-[#07110D]/98 backdrop-blur-2xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.85)]">
            {/* Seletor de Idioma em Destaque no Drawer */}
            <div className="flex items-center justify-between pb-4 mb-2 border-b border-white/10">
              <span className="text-xs uppercase tracking-wider text-prospera-gold font-bold">
                {language === 'pt' ? 'Idioma / Language' : 'Language / Idioma'}
              </span>
              <div className="flex items-center gap-1 rounded-full p-1 bg-[#0A1F17] border border-[#D4AF37]/35">
                <button
                  type="button"
                  onClick={() => setLanguage('pt')}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-colors flex items-center gap-1.5 ${
                    language === 'pt'
                      ? 'bg-[#D4AF37] text-[#07110D]'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  <span>🇧🇷</span>
                  <span>Português</span>
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-colors flex items-center gap-1.5 ${
                    language === 'en'
                      ? 'bg-[#D4AF37] text-[#07110D]'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  <span>🇬🇧</span>
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
