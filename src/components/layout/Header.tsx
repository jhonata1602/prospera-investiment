import { useState, useEffect } from 'react'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { NAV_ITEMS } from '@/constants/navigation'

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
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
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#07110D]/95 shadow-[0_4px_30px_rgba(0,0,0,0.6)] backdrop-blur-xl border-b border-prospera-gold/25'
          : 'bg-[#07110D]/80 backdrop-blur-md border-b border-white/10'
      }`}
    >
      <div className="container-luxury flex h-20 lg:h-24 items-center justify-between gap-6">
        {/* Logo */}
        <a
          href="#topo"
          className="group flex items-center gap-3.5 transition-opacity hover:opacity-90"
          aria-label="Prospera Investment — Página inicial"
        >
          <div className="relative flex h-12 w-12 sm:h-13 sm:w-13 items-center justify-center rounded-full border border-prospera-gold/90 bg-prospera-green text-prospera-gold transition-transform duration-300 group-hover:scale-105 shadow-md">
            <span className="font-serif text-xl sm:text-2xl font-bold">P</span>
            <div className="absolute -inset-1 rounded-full border border-prospera-gold/30" />
          </div>
          <div>
            <div className="font-serif text-xl sm:text-2xl font-semibold tracking-wider text-prospera-white">
              PROSPERA
            </div>
            <div className="text-[10px] sm:text-[11px] font-semibold tracking-[0.28em] text-prospera-gold uppercase">
              Investments
            </div>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav
          className="hidden items-center gap-8 xl:gap-10 lg:flex"
          aria-label="Navegação principal"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group relative py-1 text-[15px] font-medium text-prospera-white/90 transition-colors hover:text-prospera-gold"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-prospera-gold transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <a
            href="#diagnostico"
            className="hidden sm:inline-flex items-center gap-2.5 rounded-full bg-prospera-gold px-6 py-3 text-xs sm:text-[13px] font-bold uppercase tracking-wider text-[#07110D] shadow-md transition-all duration-300 hover:bg-[#D8B35C] hover:shadow-lg hover:scale-105 active:scale-95"
          >
            <span>Descobrir minha rota</span>
            <ArrowUpRight size={15} className="text-[#07110D]" />
          </a>

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="grid h-12 w-12 place-items-center rounded-full border border-white/20 text-prospera-gold transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-prospera-gold/50 lg:hidden"
            aria-label={isMobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 top-20 z-40 bg-prospera-green/40 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer content */}
          <div className="fixed inset-x-0 top-20 z-50 max-h-[calc(100vh-5rem)] overflow-y-auto border-b border-prospera-gold/30 bg-[#07110D]/98 backdrop-blur-2xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-all">
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

            <div className="mt-6 pt-2">
              <a
                href="#diagnostico"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-prospera-gold py-4 text-xs font-bold uppercase tracking-wider text-[#07110D] shadow-lg transition-all hover:bg-[#D8B35C] active:scale-95"
              >
                <span>Descobrir minha rota</span>
                <ArrowUpRight size={15} className="text-[#07110D]" />
              </a>

              <p className="mt-4 text-center text-[11px] text-prospera-ivory/60">
                Estratégia e estrutura patrimonial no Reino Unido
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
