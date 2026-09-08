import { useState, useEffect, useRef } from 'react'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

interface OpportunityCard {
  id: string
  title: string
  subtitle: string
  description: string
  image: string
  tag: string
}

const OPPORTUNITIES_DATA: OpportunityCard[] = [
  {
    id: 'buy-to-let',
    title: 'Buy-to-Let',
    subtitle: 'Renda Recorrente',
    description: 'Renda recorrente com foco em estabilidade e construção patrimonial.',
    image: '/assets/prospera/routes/route-buy-to-let.jpg',
    tag: 'Estabilidade & Yield',
  },
  {
    id: 'hmo',
    title: 'HMO / Multi-Let',
    subtitle: 'Maximização de Retorno',
    description: 'Estratégia voltada à maximização de renda através de múltiplas locações.',
    image: '/assets/prospera/routes/route-hmo.jpg',
    tag: 'Alto Fluxo de Caixa',
  },
  {
    id: 'flip-retrofit',
    title: 'Flip / Retrofit',
    subtitle: 'Valorização Estratégica',
    description: 'Aquisição, melhoria e reposicionamento com foco em valorização e saída estratégica.',
    image: '/assets/prospera/routes/route-flip.jpg',
    tag: 'Ganho de Capital',
  },
  {
    id: 'developments',
    title: 'New Developments',
    subtitle: 'Lançamentos Britânicos',
    description: 'Projetos e lançamentos com potencial de valorização e crescimento patrimonial.',
    image: '/assets/prospera/routes/route-developments.jpg',
    tag: 'Crescimento de Ativos',
  },
  {
    id: 'portfolio',
    title: 'Portfolio Building',
    subtitle: 'Expansão Contínua',
    description: 'Estruturação de portfólio para investidores que buscam crescimento de longo prazo.',
    image: '/assets/prospera/routes/route-portfolio.jpg',
    tag: 'Longo Prazo',
  },
  {
    id: 'off-market',
    title: 'Off-Market Opportunities',
    subtitle: 'Acesso Exclusivo',
    description: 'Oportunidades selecionadas que podem exigir análise estratégica e decisão rápida.',
    image: '/assets/prospera/routes/route-luxury-penthouse.jpg',
    tag: 'Exclusividade Privada',
  },
]

export function Opportunities() {
  const { t } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (motionQuery.matches) {
      setPrefersReducedMotion(true)
      setIsVisible(true)
      return
    }

    if (window.location.hash === '#oportunidades') {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.08,
        rootMargin: '60px 0px 60px 0px',
      }
    )

    const section = sectionRef.current
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="oportunidades"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#FAF7F2] text-[#0A221A] py-12 sm:py-14 lg:py-16 selection:bg-[#0F3B2E] selection:text-[#FAF8F3]"
      aria-label="Oportunidades no Mercado Imobiliário Britânico"
    >
      {/* =========================================================================
          1. TRANSIÇÃO SUAVE 4ª DOBRA → 5ª DOBRA
          - Dissolução contínua e elegante do skyline noturno (#07110D) para o fundo claro (#FAF7F2)
          - Sem linhas horizontais duras, sem faixas pretas, sem corte seco
         ========================================================================= */}
      <div
        className="absolute inset-x-0 top-0 h-14 sm:h-18 lg:h-22 pointer-events-none z-10"
        style={{
          background:
            'linear-gradient(to bottom, #07110D 0%, rgba(7, 17, 13, 0.35) 25%, rgba(15, 59, 46, 0.08) 50%, rgba(250, 247, 242, 0.65) 80%, #FAF7F2 100%)',
        }}
        aria-hidden="true"
      />

      {/* =========================================================================
          2. FUNDO CLARO COM ARQUITETURA BRITÂNICA OPACA E ELEGANTE
          - Fachada residencial/imóvel contemporâneo sutil de alto padrão
          - Camada de luz champanhe perolada que valoriza o ambiente editorial
          - Textura imobiliária visível sem escurecer e sem competir com as copys
         ========================================================================= */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
        {/* Base Nobre Off-White / Creme / Champagne */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 95% 75% at 50% 20%, #FFFDF8 0%, #FAF7F2 50%, #F5EFE6 100%)',
          }}
        />

        {/* Imagem de Fundo de Mansão Inglesa de Luxo (O P A C A / CLARA / Champagne) */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.14] mix-blend-multiply"
          style={{
            backgroundImage: "url('/assets/prospera/opportunities-mansion-bg.jpg')",
          }}
        />

        {/* Brilho Atmosférico Champagne Suave */}
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[90vw] max-w-[1100px] h-[450px] rounded-full pointer-events-none blur-3xl opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(212, 175, 55, 0.16) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="container-luxury relative z-10">
        {/* =======================================================================
            3. CABEÇALHO DA 5ª DOBRA
            - Eyebrow compacto e nobre
            - Headline elegante com destaque em dourado suave
            - Subheadline reflexiva com entrelinha equilibrada
           ======================================================================= */}
        <div
          className={`mx-auto max-w-3xl text-center transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isVisible || prefersReducedMotion
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-5'
          }`}
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-[11px] sm:text-[11.5px] font-bold tracking-[0.22em] uppercase text-[#7A5A12] bg-[#D4AF37]/15 border border-[#D4AF37]/35 shadow-xs mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B88922]" />
            <span>{t.opportunities.eyebrow}</span>
          </div>

          {/* Headline Principal */}
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-[2.5rem] font-normal leading-[1.15] tracking-[-0.015em] text-[#0F3B2E]">
            {t.opportunities.headlinePart1}
            <span className="text-gold-metallic font-semibold italic">
              {t.opportunities.headlineGold}
            </span>
            {t.opportunities.headlinePart2}
          </h2>

          {/* Subheadline */}
          <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm lg:text-[0.98rem] font-normal leading-relaxed text-[#3D4A41] max-w-2xl mx-auto">
            {t.opportunities.subheadline}
          </p>
        </div>

        {/* =======================================================================
            4. GRID DE 6 CARDS COMPACTOS, ELEGANTES E PROPORCIONAIS
            - Largura máxima controlada (max-w-[1040px]) e grid centralizado
            - Desktop: 3 colunas esbeltas / Tablet: 2 colunas / Mobile: max-w-[340px] centralizado
            - Imagem compacta, clara e nítida (h-34 sm:h-38 lg:h-40)
            - Borda dourada sutil, sombra nível 2 discreta
           ======================================================================= */}
        <div className="max-w-[1040px] mx-auto mt-7 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-4.5 lg:gap-5">
          {OPPORTUNITIES_DATA.map((card, index) => {
            const cardData = t.opportunities.items[card.id] || {
              tag: card.tag,
              subtitle: card.subtitle,
              title: card.title,
              description: card.description,
            }
            const delayStyle = prefersReducedMotion
              ? undefined
              : {
                  transitionDelay: `${100 + index * 60}ms`,
                }

            return (
              <div
                key={card.id}
                style={delayStyle}
                className={`group relative flex flex-col overflow-hidden rounded-xl sm:rounded-2xl bg-[#FFFDF9] border border-[#D4AF37]/25 shadow-[0_4px_16px_rgba(15,59,46,0.04)] hover:shadow-[0_8px_24px_rgba(212,175,55,0.14)] hover:border-[#D4AF37]/65 transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 max-w-[340px] sm:max-w-none mx-auto w-full ${
                  isVisible || prefersReducedMotion
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-5'
                }`}
              >
                {/* Imagem Superior Clara e Nítida */}
                <div className="relative h-34 sm:h-38 lg:h-40 w-full overflow-hidden shrink-0 bg-[#0F3B2E]/5">
                  <img
                    src={card.image}
                    alt={cardData.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover object-center brightness-[1.03] transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  {/* Overlay gradiente leve para garantir contraste do badge */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none"
                    aria-hidden="true"
                  />

                  {/* Badge Discreto de Valor */}
                  <div className="absolute top-2.5 left-2.5 z-10">
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase text-[#FFFDF8] bg-[#07110D]/75 backdrop-blur-md border border-[#D4AF37]/45 shadow-xs">
                      {cardData.tag}
                    </span>
                  </div>

                  {/* Indicador Numérico */}
                  <div className="absolute bottom-2.5 left-3 right-3 z-10 flex items-center justify-between text-white/90">
                    <span className="text-[11px] font-medium tracking-wide drop-shadow-xs text-[#F5D982]">
                      {cardData.subtitle}
                    </span>
                    <span className="text-[10px] font-bold text-white/70">
                      0{index + 1}
                    </span>
                  </div>
                </div>

                {/* Conteúdo Inferior Compacto e Luminoso de Alto Contraste */}
                <div className="flex flex-1 flex-col justify-between p-3.5 sm:p-4 bg-[#FFFDF9]">
                  <div>
                    <h3 className="font-serif text-base sm:text-[1.12rem] font-bold tracking-tight text-[#0F3B2E] transition-colors duration-200 group-hover:text-[#7A5A12]">
                      {cardData.title}
                    </h3>
                    <p className="mt-1 text-xs sm:text-[12.5px] leading-relaxed text-[#3D4A41]">
                      {cardData.description}
                    </p>
                  </div>

                  {/* Linha Discreta de Ação */}
                  <div className="mt-3 pt-2 border-t border-[#D4AF37]/18 flex items-center justify-between text-[11px] font-semibold tracking-wider uppercase text-[#7A5A12] group-hover:text-[#0F3B2E] transition-colors">
                    <span>{t.opportunities.actionLink}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#B88922] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* =======================================================================
            5. BLOCO DE FECHAMENTO EDITORIAL APROXIMADO
            - Sem moldura pesada / sem sensação de caixa perdida
            - Fundo champagne perolado translúcido com detalhe sutil
            - Próximo do grid e com CTA dourado proporcional
           ======================================================================= */}
        <div
          className={`mt-5 sm:mt-6 max-w-lg mx-auto text-center rounded-2xl p-4 sm:p-4.5 bg-[#FFFDF8]/95 border border-[#D4AF37]/25 shadow-[0_2px_12px_rgba(15,59,46,0.03)] transition-all duration-700 delay-200 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isVisible || prefersReducedMotion
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
        >
          <h3 className="font-serif text-base sm:text-[1.05rem] font-bold text-[#0F3B2E] tracking-tight">
            {t.opportunities.closingHeadline}
          </h3>
          <p className="mt-1 text-xs text-[#3D4A41] max-w-md mx-auto leading-relaxed">
            {t.opportunities.closingSubtitle}
          </p>

          <div className="mt-2.5 flex flex-col items-center justify-center gap-1.5">
            <a
              href="#diagnostico"
              className="btn-gold-primary relative overflow-hidden inline-flex items-center justify-center gap-2 rounded-full px-5 py-2 sm:px-6 sm:py-2.5 text-xs font-bold tracking-[0.12em] uppercase text-[#07110D] shadow-[0_3px_14px_rgba(212,175,55,0.22)] transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-prospera-gold/70 cursor-pointer"
            >
              <span>{t.opportunities.closingButton}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#07110D]" />
            </a>
            <span className="text-[10.5px] font-medium text-[#7A5A12] tracking-wide">
              {t.opportunities.closingMicrocopy}
            </span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          6. TRANSIÇÃO SUAVE 5ª DOBRA → 6ª DOBRA
          - Dissolução difusa e orgânica entre as bases creme (#FAF7F2 → #F6F1E8)
         ========================================================================= */}
      <div
        className="absolute inset-x-0 bottom-0 h-10 sm:h-14 pointer-events-none z-10"
        style={{
          background:
            'linear-gradient(to bottom, transparent 0%, rgba(212, 175, 55, 0.04) 50%, rgba(246, 241, 232, 0.60) 100%)',
        }}
        aria-hidden="true"
      />
    </section>
  )
}
