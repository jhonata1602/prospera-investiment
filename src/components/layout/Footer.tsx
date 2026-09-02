export function Footer() {
  return (
    <footer className="mt-24 bg-[var(--prospera-green)] text-white">
      <div className="container-prospera grid gap-10 py-12 md:grid-cols-[1.2fr_.8fr] md:items-end">
        <div>
          <div className="font-serif text-2xl">PROSPERA</div>
          <div className="mt-1 text-xs tracking-[.24em] text-[var(--prospera-gold)]">INVESTMENTS</div>
          <p className="mt-5 max-w-xl text-sm leading-7 text-white/70">
            Estratégia, estrutura e acompanhamento para uma jornada patrimonial mais clara no mercado imobiliário do Reino Unido.
          </p>
        </div>
        <div className="text-sm leading-7 text-white/60 md:text-right">
          <p>Conteúdo institucional e educacional.</p>
          <p>Decisões específicas devem ser validadas com profissionais qualificados no Reino Unido.</p>
        </div>
      </div>
    </footer>
  )
}
