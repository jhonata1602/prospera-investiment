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
  const { t, language } = useLanguage()
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
      className="relative z-30 w-full overflow-hidden bg-[#FAF7F2] text-[#0A221A] py-12 sm:py-14 lg:py-16 shadow-[0_40px_80px_-12px_rgba(0,0,0,0.45)] selection:bg-[#1A4D3F] selection:text-[#FAF8F3]"
      aria-label="Oportunidades no Mercado Imobiliário Britânico"
    >
      {/* =========================================================================
          1. TRANSIÇÃO SUAVE 4ª DOBRA → 5ª DOBRA
          - Dissolução contínua e elegante do verde corporativo da 4ª dobra para o fundo claro da 5ª
          - Sem linhas horizontais duras, sem faixas pretas, sem corte seco
         ========================================================================= */}
      <div
        className="absolute inset-x-0 top-0 h-16 sm:h-20 lg:h-24 pointer-events-none z-10"
        style={{
          background:
            'linear-gradient(to bottom, rgba(11, 35, 27, 0.70) 0%, rgba(11, 35, 27, 0.35) 30%, rgba(15, 59, 46, 0.10) 65%, rgba(15, 59, 46, 0.02) 85%, transparent 100%)',
        }}
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 75% 100% at 50% 0%, rgba(212, 175, 55, 0.05) 0%, transparent 75%)',
          }}
        />
      </div>

      {/* =========================================================================
          2. FUNDO CLARO COM ARQUITETURA BRITÂNICA MAIS VISÍVEL E ELEGANTE
          - Fachada residencial britânica, jardim e carro mais perceptíveis e nítidos
          - Camada de luz champanhe perolada límpida
          - Textura imobiliária marcante e luxuosa com leitura impecável dos cards
         ========================================================================= */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden bg-[#FAF7F2]" aria-hidden="true">
        {/* Imagem de Fundo 100% fotográfica, presença absoluta, sem lavagem creme ou estourados */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-100" aria-hidden="true">
          <img
            src="/assets/prospera/opportunities-mansion-bg.jpg"
            alt=""
            className="w-full h-full object-cover object-[center_35%]"
            loading="lazy"
            decoding="async"
          />
        </div>
        
        {/* Gradiente superior ultra-sutil para garantir leitura do texto branco sem escurecer a seção inteira */}
        <div
          className="absolute inset-x-0 top-0 h-[45%] pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(5, 23, 16, 0.65) 0%, transparent 100%)',
          }}
        />

        {/* Gradiente inferior largo e majestoso para ancorar o CTA final e dar leitura absoluta aos textos */}
        <div
          className="absolute inset-x-0 bottom-0 h-[55%] pointer-events-none"
          style={{
            background: 'linear-gradient(to top, rgba(5, 23, 16, 0.95) 0%, rgba(5, 23, 16, 0.6) 45%, transparent 100%)',
          }}
        />
      </div>

      <div className="container-luxury relative z-10">
        <div
          className={`relative mx-auto max-w-3xl text-center transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isVisible || prefersReducedMotion
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-5'
          }`}
        >
          <div className="inline-flex items-center justify-center mb-3 sm:mb-3.5">
            <div className="badge-section-pill bg-white/10 backdrop-blur-md border-white/20 text-white shadow-[0_2px_8px_rgba(0,0,0,0.2)]">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" aria-hidden="true" />
              <span>{t.opportunities.eyebrow}</span>
            </div>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-[1.15] tracking-tight text-[#FFFFFF] drop-shadow-[0_2px_16px_rgba(0,0,0,0.95)]">
            {t.opportunities.headlinePart1}
            <span className="text-[#F5D982] font-serif font-bold italic tracking-tight mx-1.5 drop-shadow-[0_0_12px_rgba(245,217,130,0.4)]">
              {t.opportunities.headlineGold}
            </span>
            {t.opportunities.headlinePart2}
          </h2>
          
          <p className="mt-4 sm:mt-5 text-[15.5px] sm:text-[1.05rem] lg:text-[1.15rem] text-[#FFFFFF] font-bold max-w-2xl mx-auto leading-relaxed drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)]">
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
                className={`group relative flex flex-col overflow-hidden rounded-xl sm:rounded-2xl bg-white border border-[#D4AF37]/45 shadow-[0_4px_20px_rgba(15,59,46,0.08),0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_rgba(15,59,46,0.14)] hover:border-[#D4AF37]/85 transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 max-w-[340px] sm:max-w-none mx-auto w-full ${
                  isVisible || prefersReducedMotion
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-5'
                }`}
              >
                {/* Imagem Superior Clara e Nítida */}
                <div className="relative h-[136px] sm:h-[152px] lg:h-[160px] w-full overflow-hidden shrink-0 bg-[#1A4D3F]/5">
                  <img
                    src={card.image}
                    alt={cardData.title}
                    loading={index < 3 ? "eager" : "lazy"}
                    decoding="async"
                    className="h-full w-full object-cover object-center brightness-[1.02] transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  {/* Overlay gradiente leve para garantir contraste do badge */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10 pointer-events-none"
                    aria-hidden="true"
                  />

                  {/* Badge Discreto de Valor */}
                  <div className="absolute top-2.5 left-2.5 z-10">
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase text-[#FFFDF8] bg-[#1A4D3F] border border-[#D4AF37]/60 shadow-xs">
                      {cardData.tag}
                    </span>
                  </div>

                  {/* Indicador Numérico */}
                  <div className="absolute bottom-2.5 left-3 right-3 z-10 flex items-center justify-between text-white/90">
                    <span
                      className="text-[11px] font-bold tracking-wide text-[#F5D982]"
                      style={{ textShadow: '0 1px 3px rgba(0,0,0,0.95), 0 2px 6px rgba(0,0,0,0.9)' }}
                    >
                      {cardData.subtitle}
                    </span>
                    <span
                      className="text-[10px] font-bold text-white/95"
                      style={{ textShadow: '0 1px 3px rgba(0,0,0,0.95), 0 2px 6px rgba(0,0,0,0.9)' }}
                    >
                      0{index + 1}
                    </span>
                  </div>
                </div>

                {/* Conteúdo Inferior Compacto e Luminoso de Alto Contraste */}
                <div className="flex flex-1 flex-col justify-between p-3.5 sm:p-4 bg-white">
                  <div>
                    <h3 className="font-serif text-base sm:text-[1.18rem] font-bold tracking-tight text-[#02130C] transition-colors duration-200 group-hover:text-[#7A4F05]">
                      {cardData.title}
                    </h3>
                    <p className="mt-1.5 text-[13px] sm:text-[13.5px] leading-relaxed font-semibold text-[#03140E]">
                      {cardData.description}
                    </p>
                  </div>

                  {/* Linha Discreta de Ação com Alto Contraste */}
                  <div className="mt-3 pt-2 border-t border-[#D4AF37]/40 flex items-center justify-between text-[11.5px] font-bold tracking-wider uppercase text-[#7A4F05] group-hover:text-[#02130C] transition-colors">
                    <span>{t.opportunities.actionLink}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#7A4F05] group-hover:text-[#02130C] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* =======================================================================
            5. BLOCO DE FECHAMENTO EDITORIAL — SEM MOLDURA, INTEGRADO E LEVE
            - Sem moldura, sem borda visível, sem caixa/card branco rígido
            - Copy aproximada dos cards superiores (subida para harmonia visual)
            - Apoio visual suave em névoa/bruma difusa perolada atrás do texto
            - Headline nobre com maior destaque e alto contraste
            - Botão dourado e microcopy perfeitamente alinhados
           ======================================================================= */}
        <div
          className={`relative mt-12 sm:mt-16 max-w-3xl mx-auto transition-all duration-700 delay-150 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isVisible || prefersReducedMotion
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-3'
          }`}
        >
          {/* Suporte visual localizado e elegante para maximizar legibilidade sem lavar a dobra inteira */}
          <div
            className="absolute -inset-x-12 -inset-y-12 pointer-events-none -z-10 rounded-full blur-[32px] opacity-95"
            style={{
              background: 'radial-gradient(ellipse at 50% 50%, rgba(5,23,16,0.85) 0%, rgba(5,23,16,0.3) 60%, transparent 80%)',
            }}
            aria-hidden="true"
          />

          <div className="relative px-4 text-center">
            <h3 
              className="font-serif text-xl sm:text-2xl lg:text-[1.75rem] font-bold text-[#FFFFFF] tracking-tight leading-snug drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)]"
            >
              {language === 'pt' ? (
                <>
                  Nem toda oportunidade serve para <span className="text-[#F5D982] drop-shadow-[0_0_12px_rgba(245,217,130,0.4)]">todo investidor.</span>
                </>
              ) : (
                <>
                  Not every opportunity suits <span className="text-[#F5D982] drop-shadow-[0_0_12px_rgba(245,217,130,0.4)]">every investor.</span>
                </>
              )}
            </h3>

            <p 
              className="mt-3 sm:mt-4 text-[14.5px] sm:text-[15.5px] lg:text-[1.05rem] text-[#FFFFFF] font-bold max-w-xl mx-auto leading-relaxed drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)]"
            >
              {t.opportunities.closingSubtitle}
            </p>

            <div className="mt-8 sm:mt-10 flex flex-col items-center justify-center gap-4">
              <a
                href="#diagnostico"
                className="btn-gold-primary relative overflow-hidden inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 sm:px-8 sm:py-4 text-xs sm:text-[13px] font-bold tracking-[0.12em] uppercase text-[#07110D] shadow-[0_4px_24px_rgba(212,175,55,0.40)] transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-prospera-gold/70 cursor-pointer"
              >
                <span
                  className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none animate-button-shine"
                  aria-hidden="true"
                />
                <span>{t.opportunities.closingButton}</span>
                <ArrowUpRight className="w-4 h-4 text-[#07110D]" />
              </a>
              <span className="text-[12px] font-bold text-[#D4AF37] tracking-widest mt-1 uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                {t.opportunities.closingMicrocopy}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          6. TRANSIÇÃO & SOMBRA SUAVE: 5ª DOBRA (OPORTUNIDADES) → 6ª DOBRA (PERFIL)
          - Ocupa 100% da largura, uniforme e difusa
          - Degradê elegante que desce suavemente abaixo do CTA final
          - Elimina qualquer aspecto de linha seca ou divisão dura
          - pointer-events-none z-20
         ========================================================================= */}
      <div
        className="absolute inset-x-0 bottom-0 h-[48px] sm:h-[60px] lg:h-[76px] xl:h-[88px] pointer-events-none z-20"
        style={{
          background:
            'linear-gradient(to bottom, transparent 0%, rgba(15, 59, 46, 0.015) 25%, rgba(15, 59, 46, 0.04) 55%, rgba(15, 59, 46, 0.08) 82%, rgba(15, 59, 46, 0.12) 100%)',
        }}
        aria-hidden="true"
      />
    </section>
  )
}
