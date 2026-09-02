import { NAV_ITEMS, BRAND_INFO } from '@/constants/navigation'
import { ShieldCheck, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-prospera-gold/20 bg-prospera-green text-prospera-white">
      {/* Main Footer Content */}
      <div className="container-luxury py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12">
          {/* Column 1: Brand & Positioning */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-prospera-gold bg-prospera-green-secondary text-prospera-gold shadow-inner">
                <span className="font-serif text-lg font-bold">P</span>
              </div>
              <div>
                <div className="font-serif text-xl font-bold tracking-wider text-prospera-white">
                  PROSPERA
                </div>
                <div className="text-[10px] font-medium tracking-[0.24em] text-prospera-gold uppercase">
                  Investments
                </div>
              </div>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-prospera-white/75">
              Direção estratégica, estrutura patrimonial e acompanhamento qualificado para brasileiros que investem no mercado imobiliário do Reino Unido.
            </p>

            <div className="mt-6 flex items-center gap-2 text-xs text-prospera-gold">
              <MapPin size={14} className="shrink-0" />
              <span>{BRAND_INFO.city}</span>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="lg:col-span-3">
            <h3 className="font-serif text-base font-semibold tracking-wide text-prospera-gold">
              Navegação
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-prospera-white/80">
              {NAV_ITEMS.map((item) => (
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
                  Diagnóstico Prospera →
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Institutional Notice / Compliance */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-prospera-gold">
              <ShieldCheck size={16} />
              <span>Aviso Institucional & Conformidade</span>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-prospera-white/65">
              {BRAND_INFO.disclaimer}
            </p>
            <p className="mt-3 text-xs leading-relaxed text-prospera-white/50">
              Operações imobiliárias e societárias internacionais exigem diligência técnica e representação por profissionais habilitados (solicitors e consultores fiscais credenciados).
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-prospera-green-secondary/80 py-6">
        <div className="container-luxury flex flex-col items-center justify-between gap-4 text-center text-xs text-prospera-white/60 sm:flex-row sm:text-left">
          <div>
            © {new Date().getFullYear()} Prospera Investment. Todos os direitos reservados.
          </div>
          <div className="flex items-center gap-6">
            <a href="#topo" className="transition-colors hover:text-prospera-gold">
              Voltar ao topo ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
