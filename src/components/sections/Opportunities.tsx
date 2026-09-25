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
      className="relative w-full overflow-hidden bg-[#FAF7F2] text-[#0A221A] py-12 sm:py-14 lg:py-16 selection:bg-[#1A4D3F] selection:text-[#FAF8F3]"
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
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
        {/* Base Nobre Off-White / Creme / Champagne Límpida */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 100% 85% at 50% 25%, #FFFDF8 0%, #FAF7F2 55%, #F4ECE0 100%)',
          }}
        />

        {/* Imagem de Fundo de Mansão Inglesa de Luxo Mais Visível e Nítida (Casa, Jardim e Carro) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.58] sm:opacity-[0.62] lg:opacity-[0.66] mix-blend-multiply" aria-hidden="true">
          <img
            src="/assets/prospera/opportunities-mansion-bg.jpg"
            alt=""
            className="w-full h-full object-cover object-[center_32%] sm:object-[center_35%] lg:object-[center_38%] brightness-[1.03] contrast-[1.10] saturate-[1.12]"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* Véu de contraste perolado difuso sob os cards: garante foco nos cards sem apagar a imagem ao redor */}
        <div
          className="absolute top-[35%] left-1/2 -translate-x-1/2 w-[95vw] max-w-[1120px] h-[650px] rounded-full pointer-events-none blur-3xl opacity-75"
          style={{
            background:
              'radial-gradient(ellipse 85% 65% at 50% 50%, rgba(255, 253, 248, 0.85) 0%, rgba(250, 247, 242, 0.45) 60%, transparent 90%)',
          }}
        />

        {/* Brilho Atmosférico Champagne Suave */}
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[90vw] max-w-[1100px] h-[450px] rounded-full pointer-events-none blur-3xl opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(212, 175, 55, 0.18) 0%, transparent 70%)',
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
          className={`relative mx-auto max-w-3xl text-center transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isVisible || prefersReducedMotion
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-5'
          }`}
        >
          {/* Bruma suave perolada/champagne para garantir legibilidade e contraste impecável sobre o fundo */}
          <div
            className="absolute -inset-x-8 -inset-y-6 sm:-inset-x-16 sm:-inset-y-8 pointer-events-none -z-10 blur-3xl opacity-90"
            style={{
              background:
                'radial-gradient(ellipse 80% 70% at 50% 50%, rgba(255, 253, 248, 0.95) 0%, rgba(250, 247, 242, 0.70) 55%, transparent 85%)',
            }}
            aria-hidden="true"
          />

          {/* Eyebrow Institucional Padronizado */}
          <div className="inline-flex items-center justify-center mb-3 sm:mb-3.5">
            <div className="badge-section-pill">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" aria-hidden="true" />
              <span>{t.opportunities.eyebrow}</span>
            </div>
          </div>

          {/* Headline Principal: Sólida, nítida e com ouro britânico de alto impacto */}
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-[2.65rem] font-bold leading-[1.16] tracking-[-0.015em] text-[#051710]">
            {t.opportunities.headlinePart1}
            <span className="text-[#845607] font-serif font-bold italic tracking-tight">
              {t.opportunities.headlineGold}
            </span>
            {t.opportunities.headlinePart2}
          </h2>

          {/* Subheadline com excelente contraste */}
          <p className="mt-3 sm:mt-3.5 text-[14px] sm:text-[15px] lg:text-[1.05rem] font-medium leading-[1.66] text-[#142B20] max-w-2xl mx-auto">
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
          className={`relative mt-4 sm:mt-5 max-w-xl mx-auto text-center px-4 transition-all duration-700 delay-150 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isVisible || prefersReducedMotion
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-3'
          }`}
        >
          {/* Apoio visual suave: névoa/bruma difusa translúcida sem contornos nem bordas rígidas */}
          <div
            className="absolute -inset-x-8 -inset-y-4 pointer-events-none -z-10 blur-2xl opacity-60"
            style={{
              background:
                'radial-gradient(ellipse 80% 65% at 50% 45%, rgba(255, 252, 245, 0.78) 0%, rgba(250, 246, 238, 0.35) 55%, transparent 80%)',
            }}
            aria-hidden="true"
          />

          {/* Headline com maior destaque visual, contraste aprimorado e sofisticação */}
          <h3
            className="font-serif text-lg sm:text-[1.25rem] lg:text-[1.32rem] font-bold text-[#020D08] tracking-tight leading-snug"
            style={{
              textShadow: '0 1px 2px rgba(255, 255, 255, 0.65)',
            }}
          >
            {t.opportunities.closingHeadline}
          </h3>

          {/* Subtitle refinado com excelente leitura e respiro */}
          <p
            className="mt-1.5 sm:mt-2 text-[13px] sm:text-[14px] text-[#081F15] font-semibold max-w-lg mx-auto leading-relaxed"
            style={{
              textShadow: '0 1px 2px rgba(255, 255, 255, 0.60)',
            }}
          >
            {t.opportunities.closingSubtitle}
          </p>

          <div className="mt-3.5 sm:mt-4 flex flex-col items-center justify-center gap-1.5">
            <a
              href="#diagnostico"
              className="btn-gold-primary relative overflow-hidden inline-flex items-center justify-center gap-2 rounded-full px-6 py-2.5 sm:px-7 sm:py-3 text-xs sm:text-[12.5px] font-bold tracking-[0.12em] uppercase text-[#07110D] shadow-[0_4px_18px_rgba(212,175,55,0.40)] transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-prospera-gold/70 cursor-pointer"
            >
              <span>{t.opportunities.closingButton}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#07110D]" />
            </a>
            <span className="text-[11.5px] font-semibold text-[#132A20] tracking-wide mt-1">
              {t.opportunities.closingMicrocopy}
            </span>
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
