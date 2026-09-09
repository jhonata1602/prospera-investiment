interface FlagProps {
  className?: string
}

/**
 * Bandeira do Brasil (SVG Vetorial de Alta Fidelidade)
 * Proporção e elementos oficiais em renderização vetorial nítida em qualquer resolução.
 */
export function FlagBR({ className = 'w-3.5 h-2.5' }: FlagProps) {
  return (
    <svg
      viewBox="0 0 20 14"
      className={`inline-block shrink-0 overflow-hidden rounded-[2px] shadow-[0_1px_2px_rgba(0,0,0,0.35)] ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      <rect width="20" height="14" fill="#009B3A" />
      <polygon points="10,1.5 18.3,7 10,12.5 1.7,7" fill="#FEDF00" />
      <circle cx="10" cy="7" r="3.4" fill="#002776" />
      <path
        d="M 6.8 7.4 C 8.2 6.1 11.8 6.1 13.2 7.4"
        stroke="#FFFFFF"
        strokeWidth="0.65"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}

/**
 * Bandeira do Reino Unido / Union Jack (SVG Vetorial de Alta Fidelidade)
 * Detalhes nítidos das cruzes de São Jorge, Santo André e São Patrício.
 */
export function FlagGB({ className = 'w-3.5 h-2.5' }: FlagProps) {
  return (
    <svg
      viewBox="0 0 60 30"
      className={`inline-block shrink-0 overflow-hidden rounded-[2px] shadow-[0_1px_2px_rgba(0,0,0,0.35)] ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      {/* Campo azul institucional */}
      <rect width="60" height="30" fill="#012169" />
      {/* Diagonal branca (Santo André) */}
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#FFFFFF" strokeWidth="6" />
      {/* Diagonal vermelha (São Patrício) */}
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="2" />
      {/* Cruz branca (São Jorge contorno) */}
      <path d="M30,0 V30 M0,15 H60" stroke="#FFFFFF" strokeWidth="10" />
      {/* Cruz vermelha (São Jorge central) */}
      <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  )
}
