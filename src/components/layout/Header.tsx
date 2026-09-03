import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { NAV_ITEMS } from '@/constants/navigation'

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

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
          ? 'bg-[#07110D]/95 shadow-[0_8px_32px_rgba(0,0,0,0.7)] backdrop-blur-xl border-b border-prospera-gold/20 h-16 lg:h-18'
          : 'bg-gradient-to-b from-[#07110D]/65 via-[#07110D]/30 to-transparent backdrop-blur-[4px] h-18 lg:h-20'
      }`}
    >
      <div className="container-luxury flex h-full items-center justify-between gap-8">
        {/* Logo Oficial Prospera: Escudo à esquerda + Tipografia refinada */}
        <a
          href="#topo"
          className="group flex items-center gap-3.5 transition-opacity hover:opacity-95"
          aria-label="Prospera Investment — Página inicial"
        >
          {/* Brasão Oficial com Escudo Verde, Coroa e Coluna */}
          <div className="relative shrink-0 flex items-center justify-center">
            <img
              src="/assets/prospera/brand/logo-shield.webp"
              alt="Brasão Oficial Prospera Investment"
              className="h-10 sm:h-11 lg:h-12 w-auto object-contain drop-shadow-[0_2px_10px_rgba(212,175,55,0.25)] transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* Nome Oficial Institucional */}
          <div className="flex flex-col justify-center">
            <span className="font-serif text-lg sm:text-xl font-semibold tracking-[0.24em] text-prospera-white uppercase leading-tight">
              PROSPERA
            </span>
            <span className="text-[9px] sm:text-[10px] font-semibold tracking-[0.32em] text-gold-metallic uppercase leading-tight mt-0.5">
              INVESTMENT
            </span>
          </div>
        </a>

        {/* Desktop Navigation: branco/off-white (rgba(255,255,255,0.92)) e dourado (#D4AF37) no hover */}
        <nav
          className="hidden items-center gap-7 xl:gap-9 lg:flex"
          aria-label="Navegação principal"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group relative py-1.5 text-[14px] xl:text-[14.5px] font-medium tracking-[0.02em] text-[rgba(255,255,255,0.92)] transition-colors duration-200 hover:text-[#D4AF37] drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-[#D4AF37] transition-all duration-300 group-hover:w-full rounded-full shadow-[0_0_8px_rgba(212,175,55,0.7)]" />
            </a>
          ))}
        </nav>

        {/* Mobile Hamburger Toggle Button */}
        <div className="flex items-center lg:hidden">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="grid h-10 w-10 place-items-center rounded-full border border-prospera-gold/40 bg-[#07110D]/70 text-prospera-gold backdrop-blur-md transition-all hover:border-prospera-gold hover:bg-prospera-gold/20 focus:outline-none focus:ring-2 focus:ring-prospera-gold/50"
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
            className="fixed inset-0 top-16 z-40 bg-[#07110D]/70 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer content */}
          <div className="fixed inset-x-0 top-16 z-50 max-h-[calc(100vh-4rem)] overflow-y-auto border-b border-prospera-gold/25 bg-[#07110D]/98 backdrop-blur-2xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.85)]">
            <nav className="flex flex-col space-y-4" aria-label="Navegação mobile">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between border-b border-white/10 py-3.5 text-base font-medium text-prospera-ivory/90 transition-colors hover:text-prospera-gold"
                >
                  <span>{item.label}</span>
                  <span className="text-xs text-prospera-gold">→</span>
                </a>
              ))}
            </nav>

            <div className="mt-6 pt-4 border-t border-white/10">
              <p className="text-center text-xs text-prospera-ivory/60 font-light">
                Estrutura e estratégia imobiliária de alto padrão no Reino Unido
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
