export interface TranslationSchema {
  nav: {
    about: string
    method: string
    routes: string
    howItWorks: string
    opportunities: string
    analyzeProfile: string
    tagline: string
  }
  hero: {
    eyebrow: string
    headlinePart1: string
    headlineGold: string
    headlinePart2: string
    subheadline: string
    ctaPrimary: string
    ctaSecondary: string
    microcopy: string
    scrollIndicator: string
  }
  adriana: {
    eyebrow: string
    headlinePart1: string
    headlineGold: string
    headlinePart2: string
    role: string
    p1: string
    p2: string
    p3: string
    quote: string
    metric1Label: string
    metric1Value: string
    metric1Sub: string
    metric2Label: string
    metric2Value: string
    metric2Sub: string
    metric3Label: string
    metric3Value: string
    metric3Sub: string
    ctaPrimary: string
    ctaSecondary: string
  }
  routes: {
    eyebrow: string
    headlinePart1: string
    headlineGold: string
    headlinePart2: string
    subheadline: string
    dragNote: string
    exploreRoute: string
    visionBadge: string
    ctaHeadline: string
    ctaSubtitle: string
    ctaButton: string
    ctaSubtext: string
    items: Record<string, { title: string; microcopy: string }>
  }
  howItWorks: {
    eyebrow: string
    headlinePart1: string
    headlineGold: string
    headlinePart2: string
    subheadline: string
    ctaHeadline: string
    ctaSubtitle: string
    ctaButton: string
    ctaSubtext: string
    steps: Array<{ step: string; title: string; description: string }>
  }
  opportunities: {
    eyebrow: string
    headlinePart1: string
    headlineGold: string
    headlinePart2: string
    subheadline: string
    actionLink: string
    closingHeadline: string
    closingSubtitle: string
    closingButton: string
    closingMicrocopy: string
    items: Record<string, { tag: string; subtitle: string; title: string; description: string }>
  }
  profileAnalysis: {
    eyebrow: string
    headlinePart1: string
    headlineGold: string
    headlinePart2: string
    subheadline: string
    sectionTitle: string
    pillars: Array<{ title: string; desc: string }>
    trustBadges: string[]
    formTitle: string
    formSubtitle: string
    labels: {
      name: string
      email: string
      phone: string
      country: string
      capital: string
      goal: string
    }
    placeholders: {
      name: string
      email: string
      phone: string
    }
    capitalOptions: string[]
    goalOptions: string[]
    countryOptions: string[]
    submitButton: string
    submitButtonWhatsApp: string
    submittingButton: string
    microcopy: string
    successTitle: string
    successDesc: string
    newRequestButton: string
    finalQuote: string
    finalSubtext: string
  }
  footer: {
    tagline: string
    location: string
    navTitle: string
    diagnosticLink: string
    complianceTitle: string
    complianceText1: string
    complianceText2: string
    copyright: string
    backToTop: string
  }
}

export const translations: Record<'pt' | 'en', TranslationSchema> = {
  pt: {
    nav: {
      about: 'Sobre',
      method: 'Método PROSPERA',
      routes: 'Rotas de Investimento',
      howItWorks: 'Como Funciona',
      opportunities: 'Oportunidades',
      analyzeProfile: 'Analisar Meu Perfil',
      tagline: 'Estrutura e estratégia imobiliária de alto padrão no Reino Unido',
    },
    hero: {
      eyebrow: 'PRIVATE PROPERTY ADVISORY • REINO UNIDO',
      headlinePart1: 'Investimento imobiliário de alto padrão no Reino Unido com ',
      headlineGold: 'direção estratégica',
      headlinePart2: '.',
      subheadline:
        'Orientamos investidores na aquisição, estruturação e expansão de patrimônio imobiliário em solo britânico com transparência, governança e visão de longo prazo.',
      ctaPrimary: 'DESCOBRIR MINHA ROTA',
      ctaSecondary: 'CONHECER A PROSPERA',
      microcopy: 'Acesso a oportunidades selecionadas e estruturação sob medida.',
      scrollIndicator: 'EXPLORAR',
    },
    adriana: {
      eyebrow: 'ADRIANA HORROCKS',
      headlinePart1: 'Experiência real transformada em ',
      headlineGold: 'estratégia imobiliária',
      headlinePart2: '.',
      role: 'CEO, Prospera Investment',
      p1: 'Há mais de 32 anos no Reino Unido, Adriana Horrocks construiu uma trajetória sólida entre negócios, patrimônio e visão de longo prazo.',
      p2: 'Na Prospera Investment, essa experiência prática se transforma em direção estratégica para investidores que buscam clareza, estrutura e acompanhamento no mercado imobiliário britânico.',
      p3: 'Mais do que apresentar imóveis, a Prospera estrutura caminhos — da definição da estratégia à análise de oportunidades, aquisição, gestão e crescimento patrimonial.',
      quote: '“Antes do imóvel, vem a estratégia. Antes da oportunidade, vem a clareza.”',
      metric1Label: 'Experiência',
      metric1Value: '32+ ANOS',
      metric1Sub: 'No Reino Unido',
      metric2Label: 'Estrutura',
      metric2Value: 'MÉTODO PROSPERA',
      metric2Sub: 'Estratégia com direção',
      metric3Label: 'Patrimônio',
      metric3Value: 'VISÃO PATRIMONIAL',
      metric3Sub: 'Aquisição • Gestão • Crescimento',
      ctaPrimary: 'CONHECER A PROSPERA',
      ctaSecondary: 'VER COMO FUNCIONA',
    },
    routes: {
      eyebrow: 'ROTAS DE INVESTIMENTO',
      headlinePart1: 'Diferentes rotas. ',
      headlineGold: 'Uma estratégia',
      headlinePart2: ' alinhada ao seu patrimônio.',
      subheadline:
        'Da renda recorrente à valorização patrimonial, cada investidor possui perfil, capital e objetivos específicos — por isso a Prospera estrutura a rota imobiliária ideal para o seu momento.',
      dragNote: 'Arraste ou navegue pelas setas',
      exploreRoute: 'Explorar rota',
      visionBadge: 'Visão Prospera',
      ctaHeadline: 'Antes de escolher o imóvel, definimos a estratégia.',
      ctaSubtitle:
        'A Prospera orienta cada investidor a partir do perfil, capital, objetivo e visão patrimonial, estruturando a rota mais coerente para transformar intenção em patrimônio.',
      ctaButton: 'DESCOBRIR MINHA ROTA',
      ctaSubtext: 'Comece pelo diagnóstico do seu perfil e objetivos patrimoniais.',
      items: {
        'new-developments': {
          title: 'New Developments',
          microcopy: 'Lançamentos selecionados com potencial de crescimento e posicionamento estratégico.',
        },
        'valorizacao-patrimonial': {
          title: 'Valorização Patrimonial',
          microcopy: 'Ativos em localizações consolidadas com alto potencial de valorização a longo prazo.',
        },
        'buy-to-let': {
          title: 'Buy-to-Let',
          microcopy: 'Renda recorrente com visão de longo prazo em bairros nobres e consolidados.',
        },
        'hmo-multilet': {
          title: 'HMO / Multi-Let',
          microcopy: 'Rentabilidade otimizada com estrutura multi-locação e gestão profissional.',
        },
        'portfolio-building': {
          title: 'Portfolio Building',
          microcopy: 'Construção patrimonial progressiva com diversificação e visão de legado.',
        },
        'empreendimentos-prime': {
          title: 'Empreendimentos Prime',
          microcopy: 'Projetos de alta relevância arquitetônica nos distritos mais consagrados da capital.',
        },
        'penthouses-highend': {
          title: 'Penthouses & High-End',
          microcopy: 'Apartamentos panorâmicos de alto padrão com vista privilegiada e acabamentos nobres.',
        },
        'casas-contemporaneas': {
          title: 'Casas Contemporâneas',
          microcopy: 'Projetos residenciais modernos que unem sofisticação, conforto térmico e alta liquidez.',
        },
        'flip-retrofit': {
          title: 'Flip / Retrofit e Design',
          microcopy: 'Aquisição, modernização e reposicionamento de interiores para valorização ágil.',
        },
        'localizacoes-consagradas': {
          title: 'Localizações Consagradas',
          microcopy: 'Imóveis inseridos nas ruas mais charmosas e valorizadas de Mayfair e Kensington.',
        },
        'lifestyle-living': {
          title: 'Lifestyle & Living',
          microcopy: 'Espaços amplos integrados com marcenaria sob medida e alta gastronomia privada.',
        },
        'oportunidades-offmarket': {
          title: 'Oportunidades Off-Market',
          microcopy: 'Acesso antecipado a propriedades singulares antes da abertura ao mercado aberto.',
        },
      },
    },
    howItWorks: {
      eyebrow: 'COMO FUNCIONA',
      headlinePart1: 'Da decisão à ',
      headlineGold: 'construção de patrimônio',
      headlinePart2: '.',
      subheadline:
        'A Prospera estrutura cada etapa da jornada imobiliária no Reino Unido com clareza, direção estratégica e acompanhamento.',
      ctaHeadline: 'Seu patrimônio começa com uma direção clara.',
      ctaSubtitle:
        'Descubra qual estratégia pode fazer mais sentido para o seu momento.',
      ctaButton: 'DESCOBRIR MINHA ROTA',
      ctaSubtext: 'Atendimento consultivo e confidencial para investidores qualificados.',
      steps: [
        {
          step: '01',
          title: 'DECISÃO',
          description: 'Definição do objetivo, horizonte e visão patrimonial.',
        },
        {
          step: '02',
          title: 'ESTRUTURA',
          description: 'Análise do perfil, capital, estratégia e estrutura adequada.',
        },
        {
          step: '03',
          title: 'BUSCA',
          description: 'Seleção de oportunidades alinhadas ao plano do investidor.',
        },
        {
          step: '04',
          title: 'AQUISIÇÃO',
          description: 'Análise, negociação e condução do processo de compra.',
        },
        {
          step: '05',
          title: 'FINANCIAMENTO',
          description: 'Estruturação financeira quando aplicável.',
        },
        {
          step: '06',
          title: 'VALORIZAÇÃO',
          description: 'Gestão, melhoria e potencialização do ativo.',
        },
        {
          step: '07',
          title: 'SAÍDA',
          description: 'Venda, refinanciamento, renda ou reposicionamento estratégico.',
        },
        {
          step: '08',
          title: 'RIQUEZA REAL',
          description: 'Crescimento patrimonial com visão de longo prazo.',
        },
      ],
    },
    opportunities: {
      eyebrow: 'Oportunidades',
      headlinePart1: 'Oportunidades diferentes para ',
      headlineGold: 'objetivos diferentes',
      headlinePart2: '.',
      subheadline:
        'A melhor oportunidade não é a mais bonita — é a que faz sentido para a sua estratégia, capital e horizonte patrimonial.',
      actionLink: 'Estratégia sob consulta',
      closingHeadline: 'Nem toda oportunidade serve para todo investidor.',
      closingSubtitle: 'A Prospera analisa contexto, capital, prazo e objetivo antes de indicar qualquer rota.',
      closingButton: 'ANALISAR MEU PERFIL',
      closingMicrocopy: 'Análise estratégica e confidencial.',
      items: {
        'buy-to-let': {
          tag: 'Estabilidade & Yield',
          subtitle: 'Renda Recorrente',
          title: 'Buy-to-Let',
          description: 'Renda recorrente com foco em estabilidade e construção patrimonial.',
        },
        hmo: {
          tag: 'Alto Fluxo de Caixa',
          subtitle: 'Maximização de Retorno',
          title: 'HMO / Multi-Let',
          description: 'Estratégia voltada à maximização de renda através de múltiplas locações.',
        },
        'flip-retrofit': {
          tag: 'Ganho de Capital',
          subtitle: 'Valorização Estratégica',
          title: 'Flip / Retrofit',
          description: 'Aquisição, melhoria e reposicionamento com foco em valorização e saída estratégica.',
        },
        developments: {
          tag: 'Crescimento de Ativos',
          subtitle: 'Lançamentos Britânicos',
          title: 'New Developments',
          description: 'Projetos e lançamentos com potencial de valorização e crescimento patrimonial.',
        },
        portfolio: {
          tag: 'Longo Prazo',
          subtitle: 'Expansão Contínua',
          title: 'Portfolio Building',
          description: 'Estruturação de portfólio para investidores que buscam crescimento de longo prazo.',
        },
        'off-market': {
          tag: 'Exclusividade Privada',
          subtitle: 'Acesso Exclusivo',
          title: 'Off-Market Opportunities',
          description: 'Oportunidades selecionadas que podem exigir análise estratégica e decisão rápida.',
        },
      },
    },
    profileAnalysis: {
      eyebrow: 'ANALISAR MEU PERFIL',
      headlinePart1: 'Antes da oportunidade, vem a ',
      headlineGold: 'estratégia certa para você',
      headlinePart2: '.',
      subheadline:
        'Conte à Prospera onde você está hoje e descubra qual rota imobiliária pode fazer mais sentido para o seu momento.',
      sectionTitle: 'O que a Prospera avalia antes do imóvel',
      pillars: [
        {
          title: '1. Objetivo',
          desc: 'O que você quer construir com esse investimento?',
        },
        {
          title: '2. Capital',
          desc: 'Qual estrutura financeira está disponível hoje?',
        },
        {
          title: '3. Prazo',
          desc: 'Qual o horizonte esperado para esse patrimônio?',
        },
        {
          title: '4. Perfil',
          desc: 'Qual estratégia combina melhor com seu nível de risco e objetivo?',
        },
      ],
      trustBadges: ['32+ anos no UK', 'Método PROSPERA', 'Análise Estratégica'],
      formTitle: 'Diagnóstico Preliminar',
      formSubtitle: 'Preencha os campos abaixo para entendermos o seu momento patrimonial.',
      labels: {
        name: 'Nome Completo *',
        email: 'E-mail *',
        phone: 'WhatsApp (com DDI/DDD) *',
        country: 'País de Residência',
        capital: 'Faixa Aproximada de Capital',
        goal: 'Objetivo Principal',
      },
      placeholders: {
        name: 'Ex: Carlos Eduardo Silva',
        email: 'seu.email@exemplo.com',
        phone: '+55 (11) 99999-9999',
      },
      capitalOptions: [
        '£0 – £15,000',
        '£15,000 – £50,000',
        '£50,000 – £100,000',
        '£100,000 – £250,000',
        '£250,000 – £500,000',
        '£500,000+',
      ],
      goalOptions: [
        'Renda recorrente em libras (Yield / Buy-to-Let / HMO)',
        'Proteção patrimonial em moeda forte (GBP)',
        'Valorização de capital & Flip / Retrofit',
        'Estruturação de portfólio e legado internacional',
      ],
      countryOptions: ['Brasil', 'Reino Unido', 'Estados Unidos', 'Portugal', 'Outro'],
      submitButton: 'QUERO ANALISAR MEU PERFIL',
      submitButtonWhatsApp: 'ENVIAR MEU PERFIL NO WHATSAPP',
      submittingButton: 'ENVIANDO...',
      microcopy: 'Seus dados serão tratados com confidencialidade.',
      successTitle: 'Solicitação Recebida com Sucesso',
      successDesc:
        'Agradecemos seu contato. Nossos consultores analisarão seus dados preliminares e entrarão em contato de forma confidencial.',
      newRequestButton: 'Enviar nova solicitação',
      finalQuote: '“Seu patrimônio começa com uma decisão bem estruturada.”',
      finalSubtext:
        'A Prospera ajuda você a transformar intenção em estratégia e estratégia em construção patrimonial.',
    },
    footer: {
      tagline:
        'Direção estratégica, estrutura patrimonial e acompanhamento qualificado para investidores no mercado imobiliário do Reino Unido.',
      location: 'Londres, Reino Unido',
      navTitle: 'Navegação',
      diagnosticLink: 'Diagnóstico Prospera →',
      complianceTitle: 'Aviso Institucional & Conformidade',
      complianceText1:
        'A Prospera Investment atua em planejamento, estruturação estratégica e acompanhamento para investimento imobiliário no Reino Unido. Não realizamos promessas de rentabilidade garantida. Decisões de investimento devem considerar o perfil individual e contar com validações profissionais e regulatórias britânicas.',
      complianceText2:
        'Operações imobiliárias e societárias internacionais exigem diligência técnica e representação por profissionais habilitados (solicitors e consultores fiscais credenciados).',
      copyright: 'Todos os direitos reservados.',
      backToTop: 'Voltar ao topo ↑',
    },
  },
  en: {
    nav: {
      about: 'About',
      method: 'The Prospera Method',
      routes: 'Investment Routes',
      howItWorks: 'How It Works',
      opportunities: 'Opportunities',
      analyzeProfile: 'Analyse My Profile',
      tagline: 'High-end property advisory and wealth structuring in the United Kingdom',
    },
    hero: {
      eyebrow: 'PRIVATE PROPERTY ADVISORY • UNITED KINGDOM',
      headlinePart1: 'Prime UK property investment, ',
      headlineGold: 'expertly guided',
      headlinePart2: '.',
      subheadline:
        'We help high-net-worth investors acquire, structure and grow property portfolios across the UK through expert advice, carefully selected opportunities and a long-term investment strategy.',
      ctaPrimary: 'DISCOVER MY ROUTE',
      ctaSecondary: 'ABOUT PROSPERA',
      microcopy: 'Access to curated off-market opportunities and tailored investment structures.',
      scrollIndicator: 'EXPLORE',
    },
    adriana: {
      eyebrow: 'ADRIANA HORROCKS',
      headlinePart1: 'Real experience transformed into ',
      headlineGold: 'property strategy',
      headlinePart2: '.',
      role: 'CEO – Prospera Investments',
      p1: 'With over 32 years of experience in the United Kingdom, Adriana Horrocks has built a strong track record across business and property investment, with a focus on long-term growth.',
      p2: 'At Prospera Investment, this hands-on experience translates into strategic guidance for investors seeking clarity, structure and a trusted partner in the UK property market.',
      p3: 'Prospera goes beyond simply presenting properties. We provide a clear investment pathway, from defining your strategy and evaluating opportunities to acquisition, asset management and long-term wealth creation.',
      quote: '“Strategy comes before property. Clarity comes before opportunity.”',
      metric1Label: 'Experience',
      metric1Value: '32+ YEARS',
      metric1Sub: 'In the United Kingdom',
      metric2Label: 'Structure',
      metric2Value: 'PROSPERA METHOD',
      metric2Sub: 'Direction with clarity',
      metric3Label: 'Wealth',
      metric3Value: 'PORTFOLIO VISION',
      metric3Sub: 'Acquisition • Management • Growth',
      ctaPrimary: 'ABOUT PROSPERA',
      ctaSecondary: 'HOW IT WORKS',
    },
    routes: {
      eyebrow: 'INVESTMENT ROUTES',
      headlinePart1: 'Distinct routes. ',
      headlineGold: 'One strategy',
      headlinePart2: ' built around your goals.',
      subheadline:
        'From generating rental income to achieving long-term capital growth, every investor has different objectives, resources and ambitions. Prospera helps identify and structure the property investment strategy best suited to yours.',
      dragNote: 'Drag or navigate using arrows',
      exploreRoute: 'Explore route',
      visionBadge: '',
      ctaHeadline: 'Before selecting a property, we define the strategy.',
      ctaSubtitle:
        'Prospera takes the time to understand your goals, available capital and long-term objectives, creating a clear investment strategy designed to build lasting wealth.',
      ctaButton: 'DISCOVER MY ROUTE',
      ctaSubtext: 'Begin with a confidential assessment of your circumstances and investment goals.',
      items: {
        'new-developments': {
          title: 'New Developments',
          microcopy: 'Selected prime off-plan projects with strong growth potential and strategic positioning.',
        },
        'valorizacao-patrimonial': {
          title: 'Capital Appreciation',
          microcopy: 'Assets in prime established locations with strong long-term capital appreciation.',
        },
        'buy-to-let': {
          title: 'Buy-to-Let',
          microcopy: 'Consistent rental yields with long-term capital preservation in desirable areas.',
        },
        'hmo-multilet': {
          title: 'HMO / Multi-Let',
          microcopy: 'Optimised rental yields through multi-unit letting and institutional management.',
        },
        'portfolio-building': {
          title: 'Portfolio Building',
          microcopy: 'Systematic property wealth accumulation with strategic portfolio diversification.',
        },
        'empreendimentos-prime': {
          title: 'Prime Developments',
          microcopy: 'Landmark architectural projects in London’s most prestigious postcodes.',
        },
        'penthouses-highend': {
          title: 'Penthouses & High-End',
          microcopy: 'Panoramic high-end residences with skyline views and exquisite specifications.',
        },
        'casas-contemporaneas': {
          title: 'Contemporary Homes',
          microcopy: 'Modern residential architecture blending elegance, energy efficiency and liquidity.',
        },
        'flip-retrofit': {
          title: 'Flip / Retrofit & Design',
          microcopy: 'Strategic acquisition, modernisation and repositioning for expedited capital gain.',
        },
        'localizacoes-consagradas': {
          title: 'Prestigious Locations',
          microcopy: 'Properties situated in iconic streets across Mayfair, Belgravia and Kensington.',
        },
        'lifestyle-living': {
          title: 'Lifestyle & Living',
          microcopy: 'Bespoke living spaces with tailored joinery, concierge and premium lifestyle amenities.',
        },
        'oportunidades-offmarket': {
          title: 'Off-Market Opportunities',
          microcopy: 'Privileged, off-market access to rare properties before general public marketing.',
        },
      },
    },
    howItWorks: {
      eyebrow: 'HOW IT WORKS',
      headlinePart1: 'From strategy to ',
      headlineGold: 'long-term wealth',
      headlinePart2: '.',
      subheadline:
        'Prospera guides you through every stage of your UK property investment journey, providing clear direction, strategic expertise and support at every step.',
      ctaHeadline: 'Building wealth starts with a clear strategy.',
      ctaSubtitle:
        'Discover the property investment approach best suited to your goals and circumstances.',
      ctaButton: 'DISCOVER MY ROUTE',
      ctaSubtext: 'Confidential guidance for serious property investors.',
      steps: [
        {
          step: '01',
          title: 'DECISION',
          description: 'Defining your goals, investment timeframe and long-term objectives.',
        },
        {
          step: '02',
          title: 'STRUCTURE',
          description: 'Assessing your investor profile, available capital and the most appropriate investment structure.',
        },
        {
          step: '03',
          title: 'OPPORTUNITY SELECTION',
          description: 'Identifying carefully selected opportunities aligned with your investment strategy.',
        },
        {
          step: '04',
          title: 'ACQUISITION',
          description: 'Due diligence, negotiation and guidance throughout the acquisition process.',
        },
        {
          step: '05',
          title: 'FINANCING',
          description: 'Mortgage and financing solutions structured around your investment, where appropriate.',
        },
        {
          step: '06',
          title: 'VALUE ENHANCEMENT',
          description: 'Asset management, optimisation and strategies designed to enhance long-term returns.',
        },
        {
          step: '07',
          title: 'EXIT STRATEGY',
          description: 'Planning for disposal, refinancing, rental returns or portfolio restructuring.',
        },
        {
          step: '08',
          title: 'LONG-TERM WEALTH',
          description: 'Building lasting wealth through sustained capital growth and a carefully managed property portfolio.',
        },
      ],
    },
    opportunities: {
      eyebrow: 'Opportunities',
      headlinePart1: 'Different opportunities for ',
      headlineGold: 'different objectives',
      headlinePart2: '.',
      subheadline:
        'The right opportunity isn’t always the most obvious. It’s the one that aligns with your investment strategy, available capital and long-term goals.',
      actionLink: 'Bespoke strategy upon consultation',
      closingHeadline: 'Not every opportunity suits every investor.',
      closingSubtitle: 'Prospera considers your circumstances, available capital, timeframe and investment goals before recommending the right approach.',
      closingButton: 'ANALYSE MY PROFILE',
      closingMicrocopy: 'Strategic and strictly confidential advisory.',
      items: {
        'buy-to-let': {
          tag: 'Stability & Yield',
          subtitle: 'Recurring Income',
          title: 'Buy-to-Let',
          description: 'Consistent cash flow focused on capital stability and steady accumulation.',
        },
        hmo: {
          tag: 'High Cash Flow',
          subtitle: 'Yield Maximisation',
          title: 'HMO / Multi-Let',
          description: 'Strategy designed to maximise rental returns through multi-tenant lettings.',
        },
        'flip-retrofit': {
          tag: 'Capital Growth',
          subtitle: 'Strategic Value-Add',
          title: 'Flip / Retrofit',
          description: 'Acquisition, modernisation and repositioning for capital uplift and exit.',
        },
        developments: {
          tag: 'Asset Growth',
          subtitle: 'UK Prime Off-Plan',
          title: 'New Developments',
          description: 'Selected residential schemes offering strong capital growth and modern specifications.',
        },
        portfolio: {
          tag: 'Long-Term',
          subtitle: 'Continuous Growth',
          title: 'Portfolio Building',
          description: 'Strategic portfolio structuring designed for compounding multi-asset expansion.',
        },
        'off-market': {
          tag: 'Private Exclusivity',
          subtitle: 'Exclusive Access',
          title: 'Off-Market Opportunities',
          description: 'Discreet transactions requiring strategic discernment and timely decision-making.',
        },
      },
    },
    profileAnalysis: {
      eyebrow: 'ANALYSE MY PROFILE',
      headlinePart1: 'The right opportunity starts with the ',
      headlineGold: 'right strategy',
      headlinePart2: '.',
      subheadline:
        'Tell us about your investment goals, circumstances and available capital, and we’ll help identify the property strategy best suited to you.',
      sectionTitle: 'What Prospera evaluates before the property',
      pillars: [
        {
          title: '1. Objective',
          desc: 'What are your primary goals for this investment?',
        },
        {
          title: '2. Capital',
          desc: 'What capital framework is available today?',
        },
        {
          title: '3. Timeframe',
          desc: 'What is your target investment horizon?',
        },
        {
          title: '4. Profile',
          desc: 'Which strategy best aligns with your risk tolerance and goals?',
        },
      ],
      trustBadges: ['32+ Years in the UK', 'PROSPERA Method', 'Strategic Advisory'],
      formTitle: 'Preliminary Diagnostic',
      formSubtitle: 'Please complete the details below so we can understand your investment goals.',
      labels: {
        name: 'Full Name *',
        email: 'Email Address *',
        phone: 'WhatsApp / Phone (with country code) *',
        country: 'Country of Residence',
        capital: 'Approximate Capital Band',
        goal: 'Primary Investment Objective',
      },
      placeholders: {
        name: 'e.g. Robert Smith',
        email: 'your.email@example.com',
        phone: '+44 7911 123456',
      },
      capitalOptions: [
        '£0 – £15,000',
        '£15,000 – £50,000',
        '£50,000 – £100,000',
        '£100,000 – £250,000',
        '£250,000 – £500,000',
        '£500,000+',
      ],
      goalOptions: [
        'Recurring income in GBP (Yield / Buy-to-Let / HMO)',
        'Wealth preservation in hard currency (GBP)',
        'Capital growth & Flip / Retrofit',
        'Portfolio building and international legacy',
      ],
      countryOptions: ['Brazil', 'United Kingdom', 'United States', 'Portugal', 'Other'],
      submitButton: 'ANALYSE MY PROFILE',
      submitButtonWhatsApp: 'SEND MY PROFILE ON WHATSAPP',
      submittingButton: 'SUBMITTING...',
      microcopy: 'Your information is handled with strict confidentiality.',
      successTitle: 'Request Successfully Received',
      successDesc:
        'Thank you. Our senior advisors will review your preliminary details and reach out confidentially.',
      newRequestButton: 'Submit another request',
      finalQuote: '“Your wealth begins with a well-structured decision.”',
      finalSubtext:
        'Prospera helps you transform intention into strategy, and strategy into enduring wealth.',
    },
    footer: {
      tagline:
        'Strategic guidance, investment structuring and dedicated advice for prime UK property investment.',
      location: 'London, United Kingdom',
      navTitle: 'Navigation',
      diagnosticLink: 'Prospera Diagnostic →',
      complianceTitle: 'Legal Notice',
      complianceText1:
        'Prospera Investment provides strategic guidance and investment structuring in relation to UK property. Past performance is not a guarantee of future results. Investors should consider their individual circumstances and seek appropriate independent legal, financial and tax advice before making investment decisions.',
      complianceText2:
        'International property and corporate transactions may require specialist due diligence and formal representation by suitably qualified UK solicitors, accountants, tax advisers or other regulated professionals.',
      copyright: 'All rights reserved.',
      backToTop: 'Back to top ↑',
    },
  },
}
