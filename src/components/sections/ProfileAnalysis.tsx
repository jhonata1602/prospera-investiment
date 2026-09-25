import { useState, useEffect, useRef, FormEvent } from 'react'
import {
  ArrowUpRight,
  CheckCircle2,
  Lock,
  Sparkles,
} from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

/**
 * Ícone vetorial oficial do WhatsApp em SVG puro
 * Resolução cristalina, leveza total e sem dependência externa
 */
function WhatsAppIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

/**
 * ============================================================================
 * CONFIGURAÇÃO OFICIAL DO WHATSAPP — PROSPERA INVESTMENT
 * ============================================================================
 * Insira abaixo o número de atendimento oficial com código de país e DDD.
 * Exemplo para Reino Unido: '447000000000'
 * Exemplo para Brasil: '5511999999999'
 * 
 * Se mantido como '' (vazio), o link abrirá a tela do WhatsApp com o texto
 * pré-formatado pronto para ser enviado ao contato corporativo da Prospera.
 * ============================================================================
 */
const PROSPERA_OFFICIAL_WHATSAPP_NUMBER = ''

interface FormDataState {
  name: string
  email: string
  phone: string
  country: string
  capital: string
  goal: string
}

export function ProfileAnalysis() {
  const { t, language } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const [formData, setFormData] = useState<FormDataState>({
    name: '',
    email: '',
    phone: '',
    country: 'Brasil',
    capital: '£0 – £15,000',
    goal: 'Renda recorrente em libras (Yield / Buy-to-Let / HMO)',
  })

  // Validação dinâmica dos 6 campos obrigatórios do formulário
  const isFormValid = Boolean(
    formData.name.trim().length >= 3 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim()) &&
    formData.phone.trim().replace(/\D/g, '').length >= 8 &&
    formData.country.trim().length > 0 &&
    formData.capital.trim().length > 0 &&
    formData.goal.trim().length > 0
  )

  useEffect(() => {
    if (typeof window === 'undefined') return

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (motionQuery.matches) {
      setPrefersReducedMotion(true)
      setIsVisible(true)
      return
    }

    if (window.location.hash === '#diagnostico' || window.location.hash === '#perfil') {
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (!isFormValid) {
      formRef.current?.reportValidity()
      return
    }

    setIsSubmitting(true)

    // Monta a mensagem estruturada com os dados do perfil sem envio automático
    const whatsappMessage = [
      language === 'en'
        ? 'Hello! I would like to request a strategic profile analysis at Prospera Investment.'
        : 'Olá! Gostaria de solicitar uma análise estratégica de perfil na Prospera Investimentos.',
      '',
      `*Nome:* ${formData.name.trim()}`,
      `*E-mail:* ${formData.email.trim()}`,
      `*WhatsApp:* ${formData.phone.trim()}`,
      `*País de Residência:* ${formData.country}`,
      `*Faixa de Capital:* ${formData.capital}`,
      `*Objetivo:* ${formData.goal}`,
    ].join('\n')

    const cleanTargetNumber = PROSPERA_OFFICIAL_WHATSAPP_NUMBER.replace(/\D/g, '')
    const whatsappUrl = cleanTargetNumber
      ? `https://wa.me/${cleanTargetNumber}?text=${encodeURIComponent(whatsappMessage)}`
      : `https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`

    // Abre o WhatsApp com a mensagem estruturada (o usuário revisa e envia)
    if (typeof window !== 'undefined') {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
    }

    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 600)
  }

  return (
    <section
      id="diagnostico"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#F6F1E8] text-[#0A221A] pt-10 sm:pt-12 lg:pt-14 pb-6 sm:pb-8 lg:pb-10 selection:bg-[#1A4D3F] selection:text-[#FAF8F3]"
      aria-label="Analisar Meu Perfil — Diagnóstico Estratégico Prospera"
    >
      {/* Âncora alternativa de navegação */}
      <div id="perfil" className="absolute -top-24 pointer-events-none" aria-hidden="true" />

      {/* =========================================================================
          1. FUNDO REFINADO EM BEGE NOBRE / CREME CHAMPAGNE
          - Base nobre e acolhedora off-white perolada
          - Imagem do escritório com alta visibilidade e nitidez (sem névoa lavada)
          - Ambiente executivo nítido com móveis, janelas e luz natural
         ========================================================================= */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
        {/* Base Creme Champagne Quente e Acolhedora — Sem Branco Estourado */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 100% 85% at 50% 20%, #FAF7F2 0%, #F4ECE0 55%, #EDE2D0 100%)',
          }}
        />

        {/* Imagem de Escritório Executivo Private Banking / Wealth Management com Definição e Nitidez Aumentadas */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.76] sm:opacity-[0.80] lg:opacity-[0.85] mix-blend-multiply" aria-hidden="true">
          <img
            src="/assets/prospera/profile-office-bg.jpg"
            alt=""
            className="w-full h-full object-cover object-[center_32%] sm:object-[center_35%] lg:object-center brightness-[1.01] contrast-[1.12] saturate-[1.10]"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* Véu Translúcido Ultraleve — Névoa Reduzida em mais de 75% para Mostrar o Escritório Natural */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 45%, rgba(255, 253, 248, 0.12) 0%, rgba(250, 246, 238, 0.04) 50%, transparent 80%)',
          }}
        />

        {/* Brilho Atmosférico Dourado Perolado */}
        <div
          className="absolute bottom-10 right-10 w-[450px] h-[450px] rounded-full pointer-events-none blur-3xl opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(212, 175, 55, 0.18) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* =========================================================================
          TRANSIÇÃO & SOMBRA DIFUSA ELEGANTE: 5ª DOBRA (OPORTUNIDADES) → 6ª DOBRA (PERFIL)
          - Ocupa 100% da largura da tela (de ponta a ponta)
          - Sombra difusa, profunda e suave que se estende para dentro da 6ª dobra
          - Transição orgânica e contínua sem linha seca, corte reto ou faixa escura pesada
          - pointer-events-none z-20
         ========================================================================= */}
      <div
        className="absolute inset-x-0 top-0 w-full h-[56px] sm:h-[72px] lg:h-[92px] xl:h-[108px] pointer-events-none z-20"
        style={{
          background:
            'linear-gradient(to bottom, rgba(15, 59, 46, 0.12) 0%, rgba(15, 59, 46, 0.08) 22%, rgba(15, 59, 46, 0.045) 48%, rgba(15, 59, 46, 0.018) 72%, rgba(15, 59, 46, 0.005) 88%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      <div className="container-luxury relative z-10">
        {/* =======================================================================
            2. CABEÇALHO DA 6ª DOBRA
            - Eyebrow institucional padronizado
            - Headline elegante com destaque em ouro nobre sólido
            - Subheadline reflexiva com alto contraste
           ======================================================================= */}
        <div
          className={`relative mx-auto max-w-2xl text-center transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isVisible || prefersReducedMotion
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-5'
          }`}
        >
          {/* Sombra focal difusa atrás da copy para realçar nitidez do texto claro no fundo */}
          <div
            className="absolute -inset-x-8 -inset-y-6 sm:-inset-x-16 sm:-inset-y-10 pointer-events-none -z-10 blur-3xl opacity-75"
            style={{
              background:
                'radial-gradient(ellipse 80% 75% at 50% 50%, rgba(5, 16, 11, 0.68) 0%, rgba(5, 16, 11, 0.28) 55%, transparent 80%)',
            }}
            aria-hidden="true"
          />

          {/* Eyebrow Institucional Padronizado */}
          <div className="inline-flex items-center justify-center mb-4 sm:mb-4 lg:mb-3.5">
            <div className="badge-section-pill">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" aria-hidden="true" />
              <span>{t.profileAnalysis.eyebrow}</span>
            </div>
          </div>

          {/* Headline Principal: Predominantemente em branco nobre com destaque em ouro sólido */}
          <h2
            className="font-serif text-2xl sm:text-3xl lg:text-[2.65rem] font-medium sm:font-semibold leading-[1.16] tracking-tight text-[#FFFFFF] max-w-[320px] sm:max-w-lg lg:max-w-2xl mx-auto"
            style={{
              textShadow: '0 2px 4px rgba(0,0,0,0.85), 0 4px 18px rgba(4,10,7,0.75)',
            }}
          >
            {t.profileAnalysis.headlinePart1}
            <span
              className="italic font-serif font-semibold text-[#F5D982] sm:whitespace-nowrap"
              style={{
                textShadow: '0 0 16px rgba(245,217,130,0.35), 0 2px 4px rgba(0,0,0,0.85)',
              }}
            >
              {t.profileAnalysis.headlineGold}
            </span>
            {t.profileAnalysis.headlinePart2}
          </h2>

          {/* Subheadline com alta nitidez em tom Off-White para contraste otimizado */}
          <p
            className="mt-4 sm:mt-4 lg:mt-3.5 text-[14.5px] sm:text-[15.5px] lg:text-[1.05rem] font-medium leading-[1.68] text-[#FAF5EC] max-w-xl mx-auto"
            style={{
              textShadow: '0 1px 3px rgba(0,0,0,0.85), 0 2px 8px rgba(4,10,7,0.75)',
            }}
          >
            {t.profileAnalysis.subheadline}
          </p>
        </div>

        {/* =======================================================================
            3. FORMULÁRIO COMPACTO, INTEGRADO AO FUNDO E ELEGANTE (MAX-W ~580px)
            - Fundo claro sofisticado integrado à fotografia do escritório
            - Borda suave quase imperceptível sem moldura pesada
            - Sombra orgânica suave para profundidade
            - Campos com visual limpo e ótima legibilidade
           ======================================================================= */}
        <div
          className={`max-w-[560px] sm:max-w-[580px] mx-auto mt-5 sm:mt-6 lg:mt-7 transition-all duration-700 delay-100 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isVisible || prefersReducedMotion
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="relative rounded-3xl bg-gradient-to-b from-[#FAF7F2]/68 via-[#F7F2E7]/62 to-[#F1E9DA]/58 backdrop-blur-md p-5 sm:p-7 shadow-[0_28px_55px_-18px_rgba(15,59,46,0.07)]">
            {isSubmitted ? (
              /* Estado de Sucesso */
              <div className="py-7 text-center flex flex-col items-center justify-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/60 flex items-center justify-center text-[#1A4D3F] shadow-xs">
                  <CheckCircle2 className="w-7 h-7 text-[#B88922]" />
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1A4D3F]">
                  {t.profileAnalysis.successTitle}
                </h3>
                <p className="text-xs sm:text-sm text-[#18241D] max-w-md leading-relaxed font-semibold">
                  {t.profileAnalysis.successDesc}
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="mt-3 text-xs font-semibold tracking-wider text-[#7A5A12] underline hover:text-[#1A4D3F] cursor-pointer"
                >
                  {t.profileAnalysis.newRequestButton}
                </button>
              </div>
            ) : (
              /* Formulário Ativo */
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-3.5">
                <div className="border-b border-[#EAE3D6] pb-3">
                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#0E1612] tracking-tight">
                    {t.profileAnalysis.formTitle}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-[#142019] font-bold mt-0.5 leading-relaxed">
                    {t.profileAnalysis.formSubtitle}
                  </p>
                </div>

                {/* Campo: Nome */}
                <div>
                  <label
                    htmlFor="profile-name"
                    className="block text-xs font-bold uppercase tracking-wider text-[#101A15] mb-1.5"
                  >
                    {t.profileAnalysis.labels.name}
                  </label>
                  <input
                    id="profile-name"
                    type="text"
                    required
                    placeholder={t.profileAnalysis.placeholders.name}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full h-[44px] sm:h-[46px] rounded-xl border border-[#DCD5C9] hover:border-[#B5A894] focus:border-[#1A4D3F] bg-white/95 px-3.5 text-xs sm:text-[13.5px] text-[#0E1612] font-semibold placeholder-[#554C3F] shadow-[0_1px_3px_rgba(0,0,0,0.02)] focus:outline-none focus:ring-2 focus:ring-[#1A4D3F]/15 transition-all"
                  />
                </div>

                {/* Campos em Linha Dupla: E-mail e WhatsApp */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="profile-email"
                      className="block text-xs font-bold uppercase tracking-wider text-[#101A15] mb-1.5"
                    >
                      {t.profileAnalysis.labels.email}
                    </label>
                    <input
                      id="profile-email"
                      type="email"
                      required
                      placeholder={t.profileAnalysis.placeholders.email}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full h-[44px] sm:h-[46px] rounded-xl border border-[#DCD5C9] hover:border-[#B5A894] focus:border-[#1A4D3F] bg-white/95 px-3.5 text-xs sm:text-[13.5px] text-[#0E1612] font-semibold placeholder-[#554C3F] shadow-[0_1px_3px_rgba(0,0,0,0.02)] focus:outline-none focus:ring-2 focus:ring-[#1A4D3F]/15 transition-all"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="profile-phone"
                      className="block text-xs font-bold uppercase tracking-wider text-[#101A15] mb-1.5"
                    >
                      {t.profileAnalysis.labels.phone}
                    </label>
                    <input
                      id="profile-phone"
                      type="tel"
                      required
                      placeholder={t.profileAnalysis.placeholders.phone}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full h-[44px] sm:h-[46px] rounded-xl border border-[#DCD5C9] hover:border-[#B5A894] focus:border-[#1A4D3F] bg-white/95 px-3.5 text-xs sm:text-[13.5px] text-[#0E1612] font-semibold placeholder-[#554C3F] shadow-[0_1px_3px_rgba(0,0,0,0.02)] focus:outline-none focus:ring-2 focus:ring-[#1A4D3F]/15 transition-all"
                    />
                  </div>
                </div>

                {/* Campos em Linha Dupla: País e Faixa de Capital */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="profile-country"
                      className="block text-xs font-bold uppercase tracking-wider text-[#101A15] mb-1.5"
                    >
                      {t.profileAnalysis.labels.country}
                    </label>
                    <select
                      id="profile-country"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full h-[44px] sm:h-[46px] rounded-xl border border-[#DCD5C9] hover:border-[#B5A894] focus:border-[#1A4D3F] bg-white/95 px-3.5 text-xs sm:text-[13.5px] text-[#0E1612] font-semibold shadow-[0_1px_3px_rgba(0,0,0,0.02)] focus:outline-none focus:ring-2 focus:ring-[#1A4D3F]/15 transition-all cursor-pointer"
                    >
                      {t.profileAnalysis.countryOptions.map((opt, i) => (
                        <option key={i} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="profile-capital"
                      className="block text-xs font-bold uppercase tracking-wider text-[#101A15] mb-1.5"
                    >
                      {t.profileAnalysis.labels.capital}
                    </label>
                    <select
                      id="profile-capital"
                      value={formData.capital}
                      onChange={(e) => setFormData({ ...formData, capital: e.target.value })}
                      className="w-full h-[44px] sm:h-[46px] rounded-xl border border-[#DCD5C9] hover:border-[#B5A894] focus:border-[#1A4D3F] bg-white/95 px-3.5 text-xs sm:text-[13.5px] text-[#0E1612] font-semibold shadow-[0_1px_3px_rgba(0,0,0,0.02)] focus:outline-none focus:ring-2 focus:ring-[#1A4D3F]/15 transition-all cursor-pointer"
                    >
                      {t.profileAnalysis.capitalOptions.map((opt, i) => (
                        <option key={i} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Campo: Objetivo Principal */}
                <div>
                  <label
                    htmlFor="profile-goal"
                    className="block text-xs font-bold uppercase tracking-wider text-[#101A15] mb-1.5"
                  >
                    {t.profileAnalysis.labels.goal}
                  </label>
                  <select
                    id="profile-goal"
                    value={formData.goal}
                    onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                    className="w-full h-[44px] sm:h-[46px] rounded-xl border border-[#DCD5C9] hover:border-[#B5A894] focus:border-[#1A4D3F] bg-white/95 px-3.5 text-xs sm:text-[13.5px] text-[#0E1612] font-semibold shadow-[0_1px_3px_rgba(0,0,0,0.02)] focus:outline-none focus:ring-2 focus:ring-[#1A4D3F]/15 transition-all cursor-pointer"
                  >
                    {t.profileAnalysis.goalOptions.map((opt, i) => (
                      <option key={i} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Botão de Ação Dinâmico: Dourado (incompleto) → Verde WhatsApp Elegante (completo) */}
                <div className="pt-2 flex flex-col items-center justify-center space-y-1.5">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`group relative overflow-hidden inline-flex items-center justify-center rounded-full py-3.5 px-8 sm:px-10 min-h-[50px] sm:min-h-[54px] text-xs sm:text-[13px] font-bold tracking-[0.13em] uppercase transition-all duration-300 ease-out cursor-pointer hover:scale-[1.015] w-full sm:w-auto ${
                      isFormValid
                        ? 'shadow-[0_8px_24px_rgba(25,111,61,0.34),inset_0_1px_1px_rgba(255,255,255,0.25)]'
                        : 'shadow-[0_8px_26px_rgba(212,175,55,0.38),inset_0_1px_1px_rgba(255,255,255,0.45)]'
                    }`}
                  >
                    {/* Camada 1: Dourado Premium (Ativo quando formulário incompleto) */}
                    <span
                      className={`absolute inset-0 bg-gradient-to-r from-[#FBE6A2] via-[#DFBA4E] to-[#C8992D] transition-opacity duration-300 ease-out ${
                        isFormValid ? 'opacity-0' : 'opacity-100'
                      }`}
                      aria-hidden="true"
                    />

                    {/* Camada 2: Verde WhatsApp Nobre & Elegante — Sem Efeito Neon */}
                    <span
                      className={`absolute inset-0 bg-gradient-to-r from-[#1E824C] via-[#196F3D] to-[#145A32] transition-opacity duration-300 ease-out ${
                        isFormValid ? 'opacity-100' : 'opacity-0'
                      }`}
                      aria-hidden="true"
                    />

                    {/* Efeito de Shimmer/Flash idêntico aos demais CTAs dourados */}
                    <span
                      className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none animate-button-shine"
                      aria-hidden="true"
                    />

                    {/* Conteúdo do Botão com transição suave de cor e ícones */}
                    <span
                      className={`relative z-10 inline-flex items-center justify-center gap-2.5 transition-colors duration-300 ease-out ${
                        isFormValid ? 'text-white' : 'text-[#07110D]'
                      }`}
                    >
                      {isFormValid && (
                        <WhatsAppIcon className="w-4 h-4 shrink-0 fill-current text-white" />
                      )}

                      <span>
                        {isSubmitting
                          ? t.profileAnalysis.submittingButton
                          : isFormValid
                          ? t.profileAnalysis.submitButtonWhatsApp
                          : t.profileAnalysis.submitButton}
                      </span>

                      {!isFormValid && (
                        <ArrowUpRight className="w-4 h-4 text-[#07110D] shrink-0" />
                      )}
                    </span>
                  </button>

                  {/* Microcopy de Confidencialidade */}
                  <div className="pt-2 flex items-center justify-center gap-1.5 text-xs font-semibold text-[#3D2D0C]">
                    <Lock className="w-3.5 h-3.5 text-[#8C6514] shrink-0" />
                    <span>{t.profileAnalysis.microcopy}</span>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* =========================================================================
          6. TRANSIÇÃO CIRÚRGICA 6ª DOBRA → FOOTER
          - Fade curto e suave (~18–28px em desktop, menor em mobile/tablet)
          - Sem faixa preta ou linha dura
          - Verde institucional translúcido dissolvendo suavemente para o footer
         ========================================================================= */}
      <div
        className="absolute inset-x-0 bottom-0 h-5 sm:h-6 lg:h-7 pointer-events-none z-10"
        style={{
          background:
            'linear-gradient(to bottom, transparent 0%, rgba(26, 77, 63, 0.10) 30%, rgba(26, 77, 63, 0.40) 70%, #1A4D3F 100%)',
        }}
        aria-hidden="true"
      />
    </section>
  )
}
