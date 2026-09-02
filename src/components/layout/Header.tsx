import { Menu } from 'lucide-react'

const links = [
  ['Sobre', '#sobre'],
  ['Método', '#metodo'],
  ['Estratégias', '#estrategias'],
  ['Como funciona', '#como-funciona'],
  ['Livro', '#livro'],
]

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-[rgba(255,253,248,.92)] backdrop-blur-xl">
      <div className="container-prospera flex h-20 items-center justify-between gap-6">
        <a href="#topo" className="flex items-center gap-3" aria-label="Prospera Investment">
          <div className="grid h-10 w-10 place-items-center rounded-full border border-[var(--prospera-gold)] text-sm font-semibold text-[var(--prospera-green)]">P</div>
          <div>
            <div className="font-serif text-lg leading-none text-[var(--prospera-green)]">PROSPERA</div>
            <div className="mt-1 text-[10px] tracking-[.24em] text-[var(--prospera-gold-2)]">INVESTMENTS</div>
          </div>
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Navegação principal">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="text-sm font-medium text-[var(--prospera-graphite)] transition hover:text-[var(--prospera-green)]">
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href="#diagnostico" className="hidden rounded-full bg-[var(--prospera-green)] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 sm:inline-flex">
            Descobrir minha rota
          </a>
          <button className="grid h-11 w-11 place-items-center rounded-full border border-black/10 lg:hidden" aria-label="Abrir menu">
            <Menu size={20} />
          </button>
        </div>
      </div>
    </header>
  )
}
