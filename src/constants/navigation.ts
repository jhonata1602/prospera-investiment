import type { NavItem } from '@/types'

export const NAV_ITEMS: NavItem[] = [
  { label: 'Método PROSPERA', href: '#metodo' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Rotas de Investimento', href: '#rotas' },
  { label: 'Como Funciona', href: '#como-funciona' },
  { label: 'Oportunidades', href: '#oportunidades' },
  { label: 'Analisar Meu Perfil', href: '#diagnostico', isCta: true },
]

export const BRAND_INFO = {
  name: 'Prospera Investimentos',
  shortName: 'Prospera',
  tagline: 'Private UK Property Advisory',
  city: 'Londres, Reino Unido',
  disclaimer:
    'A Prospera Investimentos atua em planejamento, estruturação estratégica e acompanhamento para investimento imobiliário no Reino Unido. Não realizamos promessas de rentabilidade garantida. Decisões de investimento devem considerar o perfil individual e contar com validações profissionais e regulatórias britânicas.',
}
