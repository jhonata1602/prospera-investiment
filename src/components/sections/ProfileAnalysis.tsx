import { useState, useEffect, useRef, FormEvent } from 'react'
import {
  Target,
  ShieldCheck,
  ArrowUpRight,
  CheckCircle2,
  Lock,
  Sparkles,
} from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

interface FormDataState {
  name: string
  email: string
  phone: string
  country: string
  capital: string
  goal: string
}

export function ProfileAnalysis() {
  const { t } = useLanguage()
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
    capital: '£100,000 – £250,000',
    goal: 'Renda recorrente em libras (Yield / Buy-to-Let / HMO)',
  })

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
    setIsSubmitting(true)

    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 600)
  }

  return (
    <section
      id="diagnostico"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#F6F1E8] text-[#0A221A] py-12 sm:py-14 lg:py-16 selection:bg-[#0F3B2E] selection:text-[#FAF8F3]"
      aria-label="Analisar Meu Perfil — Diagnóstico Estratégico Prospera"
    >
      {/* Âncora alternativa de navegação */}
      <div id="perfil" className="absolute -top-24 pointer-events-none" aria-hidden="true" />

      {/* =========================================================================
          1. FUNDO REFINADO EM BEGE NOBRE / CREME CHAMPAGNE
          - Base nobre e acolhedora off-white perolada
          - Textura arquitetônica de interiores britânicos com baixíssima opacidade
          - Nunca verde pesado dominante, nunca preto
         ========================================================================= */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
        {/* Base Creme Champagne Quente */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 95% 85% at 50% 15%, #FDFBF7 0%, #F8F4EC 50%, #F3ECE0 100%)',
          }}
        />

        {/* Imagem Opaca e Clara de Escritório Executivo Private Banking / Wealth Management */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.11] mix-blend-multiply" aria-hidden="true">
          <img
            src="/assets/prospera/profile-office-bg.jpg"
            alt=""
            className="w-full h-full object-cover object-center"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* Brilho Atmosférico Dourado Perolado */}
        <div
          className="absolute bottom-10 right-10 w-[450px] h-[450px] rounded-full pointer-events-none blur-3xl opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(212, 175, 55, 0.16) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Transição difusa suave da 5ª para a 6ª dobra */}
      <div
        className="absolute inset-x-0 top-0 h-10 sm:h-14 pointer-events-none z-10"
        style={{
          background:
            'linear-gradient(to bottom, rgba(250, 247, 242, 0.85) 0%, rgba(246, 241, 232, 0.35) 60%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      <div className="container-luxury relative z-10">
        {/* =======================================================================
            2. CABEÇALHO DA 6ª DOBRA
            - Eyebrow em ouro e marfim
            - Headline elegante com destaque em ouro nobre
            - Subheadline reflexiva com largura equilibrada
           ======================================================================= */}
        <div
          className={`mx-auto max-w-2xl text-center transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isVisible || prefersReducedMotion
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-5'
          }`}
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-[11px] sm:text-[11.5px] font-bold tracking-[0.22em] uppercase text-[#7A5A12] bg-[#D4AF37]/15 border border-[#D4AF37]/35 shadow-xs mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B88922]" />
            <span>{t.profileAnalysis.eyebrow}</span>
          </div>

          {/* Headline Principal */}
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-[2.5rem] font-bold leading-[1.18] tracking-tight text-[#0F3B2E] max-w-2xl mx-auto">
            {t.profileAnalysis.headlinePart1}
            <span className="text-gold-metallic font-serif italic whitespace-nowrap">
              {t.profileAnalysis.headlineGold}
            </span>
            {t.profileAnalysis.headlinePart2}
          </h2>

          {/* Subheadline */}
          <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm lg:text-[0.98rem] font-normal leading-[1.6] text-[#3D4A41] max-w-xl mx-auto">
            {t.profileAnalysis.subheadline}
          </p>
        </div>

        {/* =======================================================================
            3. PILARES DE ANÁLISE COMPACTOS (SUBIDOS E APROXIMADOS DA COPY)
           ======================================================================= */}
        <div
          className={`max-w-[640px] sm:max-w-[660px] mx-auto mt-4 sm:mt-5 transition-all duration-700 delay-100 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isVisible || prefersReducedMotion
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="text-center mb-2">
            <span className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#7A5A12] inline-flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-[#B88922]" />
              {t.profileAnalysis.sectionTitle}
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
            {t.profileAnalysis.pillars.map((pillar, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-[#FCFAF5]/90 border border-[#D4AF37]/25 text-left shadow-xs">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#0F3B2E] uppercase font-serif">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                  {pillar.title}
                </div>
                <p className="text-[11px] text-[#3D4A41] mt-0.5 leading-snug line-clamp-2">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* =======================================================================
            4. FORMULÁRIO COMPACTO, CENTRALIZADO E ELEGANTE (MAX-W ~660px)
            - Largura contida: max-w-[640px] sm:max-w-[660px]
            - Subido para ficar próximo da copy
            - Campos com altura uniforme (h-11 / 44px)
            - Fundo dos inputs em tom creme claro perolado (#F6F1E8)
            - Opções de capital padronizadas em libras (£)
            - Apenas UM CTA principal: QUERO ANALISAR MEU PERFIL
            - Microcopy de confidencialidade
           ======================================================================= */}
        <div
          className={`max-w-[640px] sm:max-w-[660px] mx-auto mt-3.5 sm:mt-4 transition-all duration-700 delay-150 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isVisible || prefersReducedMotion
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-5'
          }`}
        >
          <div className="relative rounded-2xl bg-[#FCFAF5] border border-[#D4AF37]/35 p-5 sm:p-7 shadow-[0_8px_28px_rgba(212,175,55,0.08)]">
            {isSubmitted ? (
              /* Estado de Sucesso */
              <div className="py-7 text-center flex flex-col items-center justify-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/60 flex items-center justify-center text-[#0F3B2E] shadow-xs">
                  <CheckCircle2 className="w-7 h-7 text-[#B88922]" />
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0F3B2E]">
                  {t.profileAnalysis.successTitle}
                </h3>
                <p className="text-xs sm:text-sm text-[#3D4A41] max-w-md leading-relaxed">
                  {t.profileAnalysis.successDesc}
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="mt-3 text-xs font-semibold tracking-wider text-[#7A5A12] underline hover:text-[#0F3B2E] cursor-pointer"
                >
                  {t.profileAnalysis.newRequestButton}
                </button>
              </div>
            ) : (
              /* Formulário Ativo */
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-3.5">
                <div className="border-b border-[#D4AF37]/20 pb-2.5">
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#0F3B2E]">
                    {t.profileAnalysis.formTitle}
                  </h3>
                  <p className="text-xs text-[#3D4A41] mt-0.5">
                    {t.profileAnalysis.formSubtitle}
                  </p>
                </div>

                {/* Campo: Nome */}
                <div>
                  <label
                    htmlFor="profile-name"
                    className="block text-[11px] font-semibold uppercase tracking-wider text-[#0F3B2E] mb-1"
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
                    className="w-full h-11 rounded-xl border border-[#D4AF37]/30 bg-[#F6F1E8] px-3.5 text-xs sm:text-sm text-[#0F3B2E] placeholder-[#7A6B4E]/60 focus:border-[#D4AF37] focus:bg-[#FFFDF8] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]/40 transition-colors"
                  />
                </div>

                {/* Campos em Linha Dupla: E-mail e WhatsApp */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="profile-email"
                      className="block text-[11px] font-semibold uppercase tracking-wider text-[#0F3B2E] mb-1"
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
                      className="w-full h-11 rounded-xl border border-[#D4AF37]/30 bg-[#F6F1E8] px-3.5 text-xs sm:text-sm text-[#0F3B2E] placeholder-[#7A6B4E]/60 focus:border-[#D4AF37] focus:bg-[#FFFDF8] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]/40 transition-colors"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="profile-phone"
                      className="block text-[11px] font-semibold uppercase tracking-wider text-[#0F3B2E] mb-1"
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
                      className="w-full h-11 rounded-xl border border-[#D4AF37]/30 bg-[#F6F1E8] px-3.5 text-xs sm:text-sm text-[#0F3B2E] placeholder-[#7A6B4E]/60 focus:border-[#D4AF37] focus:bg-[#FFFDF8] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]/40 transition-colors"
                    />
                  </div>
                </div>

                {/* Campos em Linha Dupla: País e Faixa de Capital */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="profile-country"
                      className="block text-[11px] font-semibold uppercase tracking-wider text-[#0F3B2E] mb-1"
                    >
                      {t.profileAnalysis.labels.country}
                    </label>
                    <select
                      id="profile-country"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full h-11 rounded-xl border border-[#D4AF37]/30 bg-[#F6F1E8] px-3.5 text-xs sm:text-sm text-[#0F3B2E] focus:border-[#D4AF37] focus:bg-[#FFFDF8] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]/40 transition-colors cursor-pointer"
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
                      className="block text-[11px] font-semibold uppercase tracking-wider text-[#0F3B2E] mb-1"
                    >
                      {t.profileAnalysis.labels.capital}
                    </label>
                    <select
                      id="profile-capital"
                      value={formData.capital}
                      onChange={(e) => setFormData({ ...formData, capital: e.target.value })}
                      className="w-full h-11 rounded-xl border border-[#D4AF37]/30 bg-[#F6F1E8] px-3.5 text-xs sm:text-sm text-[#0F3B2E] focus:border-[#D4AF37] focus:bg-[#FFFDF8] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]/40 transition-colors cursor-pointer"
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
                    className="block text-[11px] font-semibold uppercase tracking-wider text-[#0F3B2E] mb-1"
                  >
                    {t.profileAnalysis.labels.goal}
                  </label>
                  <select
                    id="profile-goal"
                    value={formData.goal}
                    onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                    className="w-full h-11 rounded-xl border border-[#D4AF37]/30 bg-[#F6F1E8] px-3.5 text-xs sm:text-sm text-[#0F3B2E] focus:border-[#D4AF37] focus:bg-[#FFFDF8] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]/40 transition-colors cursor-pointer"
                  >
                    {t.profileAnalysis.goalOptions.map((opt, i) => (
                      <option key={i} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Apenas UM Botão de Ação Centralizado */}
                <div className="pt-2 flex flex-col items-center justify-center space-y-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-gold-primary relative overflow-hidden inline-flex items-center justify-center gap-2 rounded-full py-3 px-8 sm:px-10 text-xs sm:text-[13px] font-bold tracking-[0.12em] uppercase text-[#07110D] shadow-[0_4px_18px_rgba(212,175,55,0.32)] transition-all duration-300 hover:scale-[1.02] cursor-pointer w-full sm:w-auto"
                  >
                    <span>
                      {isSubmitting
                        ? t.profileAnalysis.submittingButton
                        : t.profileAnalysis.submitButton}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-[#07110D]" />
                  </button>

                  {/* Microcopy de Confidencialidade */}
                  <div className="pt-1 flex items-center justify-center gap-1.5 text-[11px] font-medium text-[#7A5A12]">
                    <Lock className="w-3.5 h-3.5 text-[#B88922]" />
                    <span>{t.profileAnalysis.microcopy}</span>
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* Selos de Confiança Compactos */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 text-[11px] font-medium text-[#0F3B2E]">
            {t.profileAnalysis.trustBadges.map((badge, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-[#D4AF37]/25 shadow-xs"
              >
                <ShieldCheck className="w-3 h-3 text-[#B88922]" />
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* =======================================================================
            5. FECHAMENTO DA 6ª DOBRA
           ======================================================================= */}
        <div
          className={`mt-7 sm:mt-8 max-w-xl mx-auto text-center transition-all duration-700 delay-250 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isVisible || prefersReducedMotion
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
        >
          <p className="font-serif text-base sm:text-lg font-medium text-[#0F3B2E] italic">
            {t.profileAnalysis.finalQuote}
          </p>
          <p className="mt-1 text-xs text-[#3D4A41] leading-relaxed max-w-md mx-auto">
            {t.profileAnalysis.finalSubtext}
          </p>
        </div>
      </div>

      {/* =========================================================================
          6. TRANSIÇÃO SUAVE 6ª DOBRA → FOOTER
          - Dissolve continuamente o bege nobre (#F6F1E8) no rodapé British Green (#0B2119)
         ========================================================================= */}
      <div
        className="absolute inset-x-0 bottom-0 h-16 sm:h-20 lg:h-24 pointer-events-none z-10"
        style={{
          background:
            'linear-gradient(to bottom, transparent 0%, rgba(246, 241, 232, 0.35) 25%, rgba(15, 59, 46, 0.08) 55%, rgba(11, 33, 25, 0.50) 80%, #0B2119 100%)',
        }}
        aria-hidden="true"
      />
    </section>
  )
}
