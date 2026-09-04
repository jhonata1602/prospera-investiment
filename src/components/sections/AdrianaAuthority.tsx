import { ArrowRight } from 'lucide-react'

export function AdrianaAuthority() {
  return (
    <section
      id="sobre"
      aria-label="Sobre Adriana Horrocks — Fundadora da Prospera Investment"
      className="relative w-full overflow-hidden bg-gradient-to-b from-[#07110D] via-[#0C1712] to-[#07110D] text-prospera-white"
    >
      {/* =========================================================================
          CAMADA VISUAL PANORÂMICA (Desktop / Telas Grandes)
          - Usa a nova imagem oficial: adriana-second-section-london.png
          - Adriana sentada à mesa com notebook Prospera e casa em miniatura
          - Big Ben e Tower Bridge visíveis ao fundo através das janelas
          - Grande área livre no lado direito integrada à copy editorial
          - Overlay sutil preservando a iluminação nobre e a claridade da imagem
         ========================================================================= */}
      <div className="hidden lg:block absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <div className="relative w-full h-full max-w-[2200px] mx-auto">
          <img
            src="/assets/prospera/adriana-second-section-london.png"
            alt="Adriana Horrocks — Fundadora da Prospera Investment em seu escritório em Londres com vista para o Big Ben e Tower Bridge"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-[left_center] xl:object-center transition-transform duration-1000 ease-out will-change-transform"
          />

          {/* Overlay sutil apenas no lado direito para contraste de leitura nobre, preservando a luz da imagem */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, transparent 40%, rgba(7,17,13,0.28) 52%, rgba(7,17,13,0.68) 72%, rgba(7,17,13,0.88) 100%)',
            }}
            aria-hidden="true"
          />

          {/* Transição suave topo e base para integração contínua com as dobras */}
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#07110D] to-transparent pointer-events-none" aria-hidden="true" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#07110D] to-transparent pointer-events-none" aria-hidden="true" />
        </div>
      </div>

      {/* =========================================================================
          HALOS DE LUZ AMBIENTE (Atmosphere & Warm Luxury)
          - Luz ambiente dourada e esmeralda para atmosfera acolhedora e clara
         ========================================================================= */}
      <div
        className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full bg-prospera-gold/[0.06] blur-[160px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 right-1/6 w-[700px] h-[700px] rounded-full bg-[#1B4B3B]/20 blur-[170px] pointer-events-none"
        aria-hidden="true"
      />

      {/* =========================================================================
          COMPOSIÇÃO MOBILE / TABLET (Empilhamento Vertical Nobre)
          - Imagem completa no topo preservando o rosto, Londres e os elementos
          - Sem cortes ruins, sem card quadrado, integrada naturalmente
         ========================================================================= */}
      <div className="lg:hidden w-full pt-10 sm:pt-14 pb-4 px-4 sm:px-6 flex justify-center">
        <div className="relative w-full max-w-[620px] select-none">
          <img
            src="/assets/prospera/adriana-second-section-london.png"
            alt="Adriana Horrocks — Fundadora da Prospera Investment"
            loading="lazy"
            decoding="async"
            className="w-full h-auto object-cover object-[20%_center] aspect-[16/10] sm:aspect-[16/9] drop-shadow-[0_20px_45px_rgba(0,0,0,0.5)] [mask-image:linear-gradient(to_bottom,black_86%,transparent_100%)]"
          />
        </div>
      </div>

      {/* =========================================================================
          ESTRUTURA EM 2 COLUNAS (Desktop / Ultrawide)
          - Coluna Esquerda: Espaço de visibilidade plena para Adriana e Londres
          - Coluna Direita: Área de leitura com copy, indicadores e CTAs
         ========================================================================= */}
      <div className="container-luxury relative z-10 w-full max-w-[1440px] xl:max-w-[1600px] 2xl:max-w-[1720px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center min-h-0 lg:min-h-[760px] xl:min-h-[820px] 2xl:min-h-[860px]">
          
          {/* COLUNA ESQUERDA: Emolduramento visual livre de Adriana, Big Ben, Tower Bridge e a mesa */}
          <div className="hidden lg:flex lg:col-span-6 xl:col-span-6 2xl:col-span-6 h-full items-center justify-start pointer-events-none select-none" />

          {/* COLUNA DIREITA: Área de leitura com copy editorial oficial */}
          <div className="lg:col-span-6 xl:col-span-6 2xl:col-span-6 flex flex-col justify-center max-w-[640px] xl:max-w-[700px] 2xl:max-w-[760px] text-left pt-2 pb-16 lg:py-16">
            
            {/* Eyebrow de Posicionamento */}
            <div className="flex items-center gap-3 animate-hero-fade-in-up-1">
              <span className="h-[1px] w-9 bg-prospera-gold/70" aria-hidden="true" />
              <span className="text-xs sm:text-[13px] font-bold tracking-[0.24em] uppercase text-prospera-gold drop-shadow-sm">
                ADRIANA HORROCKS
              </span>
            </div>

            {/* Headline Principal */}
            <h2 className="mt-4 sm:mt-5 font-serif text-[2.15rem] sm:text-[2.65rem] lg:text-[2.8rem] xl:text-[3.25rem] font-normal leading-[1.14] sm:leading-[1.12] tracking-[-0.015em] text-[#FFFDF8] animate-hero-fade-in-up-2 drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
              Estratégia construída com{' '}
              <span className="text-gold-metallic italic font-light sm:whitespace-nowrap">
                experiência real
              </span>{' '}
              no Reino Unido.
            </h2>

            {/* Texto Narrativo Institucional */}
            <div className="mt-5 sm:mt-6 space-y-3.5 text-[15.5px] sm:text-[16.5px] lg:text-[1.05rem] xl:text-[1.12rem] font-light leading-relaxed text-[#F8F5EE]/90 animate-hero-fade-in-up-3 drop-shadow-[0_1px_6px_rgba(0,0,0,0.4)]">
              <p>
                Há mais de 32 anos no Reino Unido, Adriana Horrocks construiu sua trajetória entre negócios, patrimônio e visão de longo prazo.
              </p>
              <p>
                A Prospera Investment nasce dessa experiência prática: transformar decisões imobiliárias em estratégias estruturadas, com clareza, segurança e acompanhamento em cada etapa.
              </p>
            </div>

            {/* Frase de Destaque / Quote Editorial */}
            <div className="my-6 sm:my-7 pl-5 sm:pl-6 border-l-2 border-prospera-gold/70 bg-gradient-to-r from-prospera-gold/[0.06] via-prospera-gold/[0.02] to-transparent py-3 rounded-r-lg animate-hero-fade-in-up-4">
              <p className="font-serif italic text-[1.05rem] sm:text-[1.18rem] lg:text-[1.22rem] leading-relaxed text-[#FFFDF8] drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]">
                “Criadora do Método PROSPERA, Adriana conduz investidores a partir do diagnóstico do perfil, da definição da rota e da construção de uma estratégia alinhada aos objetivos patrimoniais de cada pessoa.”
              </p>
            </div>

            {/* Indicadores de Autoridade com Divisores Finos e Respiro Nobre */}
            <div className="pt-5 pb-6 border-t border-white/15 grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 lg:gap-6 xl:gap-8 text-left animate-hero-fade-in-up-5">
              {/* Indicador 1 */}
              <div className="flex flex-col group/ind">
                <div className="font-serif text-[1.65rem] sm:text-[1.85rem] font-medium text-prospera-gold leading-tight drop-shadow-sm transition-colors duration-300">
                  32+ anos
                </div>
                <div className="mt-1 text-xs sm:text-[13px] text-[#F8F5EE]/80 font-light leading-snug">
                  No Reino Unido
                </div>
              </div>

              {/* Indicador 2 */}
              <div className="flex flex-col group/ind">
                <div className="font-serif text-[1.65rem] sm:text-[1.85rem] font-medium text-prospera-gold leading-tight drop-shadow-sm transition-colors duration-300">
                  Método
                </div>
                <div className="mt-1 text-xs sm:text-[13px] text-[#F8F5EE]/80 font-light leading-snug tracking-wider uppercase">
                  PROSPERA
                </div>
              </div>

              {/* Indicador 3 */}
              <div className="flex flex-col group/ind">
                <div className="font-serif text-[1.65rem] sm:text-[1.85rem] font-medium text-prospera-gold leading-tight drop-shadow-sm transition-colors duration-300">
                  Visão
                </div>
                <div className="mt-1 text-xs sm:text-[13px] text-[#F8F5EE]/80 font-light leading-snug">
                  Estratégia • Aquisição • Gestão • Patrimônio
                </div>
              </div>
            </div>

            {/* Bloco de CTAs: Principal Dourado Premium + Secundário Discreto */}
            <div className="mt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 w-full">
              {/* CTA Principal: CONHECER A PROSPERA */}
              <div className="relative group">
                <div
                  className="absolute -inset-1 rounded-full bg-prospera-gold/25 blur-lg animate-cta-glow pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                  aria-hidden="true"
                />
                <a
                  href="#diagnostico"
                  className="btn-gold-primary relative overflow-hidden inline-flex items-center justify-center gap-3 rounded-full px-8 py-4 sm:px-9 sm:py-4 min-h-[52px] sm:min-h-[54px] text-xs sm:text-[13px] font-bold tracking-[0.14em] uppercase text-[#07110D] shadow-[0_8px_30px_rgba(212,175,55,0.38)] transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-prospera-gold/70 w-full sm:w-auto"
                >
                  <span
                    className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none animate-button-shine"
                    aria-hidden="true"
                  />
                  <span>CONHECER A PROSPERA</span>
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1 text-[#07110D]"
                  />
                </a>
              </div>

              {/* CTA Secundário: VER COMO FUNCIONA */}
              <a
                href="#metodo"
                className="inline-flex items-center justify-center gap-2.5 py-3.5 px-4 text-xs sm:text-[13px] font-medium tracking-[0.12em] uppercase text-[rgba(255,255,255,0.88)] hover:text-[#E7C76A] transition-colors duration-300 group/sec"
              >
                <span>VER COMO FUNCIONA</span>
                <ArrowRight
                  size={15}
                  className="text-prospera-gold transition-transform duration-300 group-hover/sec:translate-x-1"
                />
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
