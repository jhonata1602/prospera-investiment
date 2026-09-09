import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { translations, TranslationSchema } from '@/translations'

export type Language = 'pt' | 'en'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: TranslationSchema
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const STORAGE_KEY = 'prospera_language'

/**
 * Lê país/região caso injetado pelo ambiente Vercel (Edge Middleware, cookies ou window globals).
 */
function getInjectedCountry(): string | null {
  if (typeof window === 'undefined') return null

  // A) Cookie de geolocalização Vercel (caso injetado por Edge Middleware ou CDN)
  try {
    const cookies = document.cookie.split(';')
    for (const cookie of cookies) {
      const [k, v] = cookie.trim().split('=')
      if (k === 'vercel_country' || k === 'x-vercel-ip-country' || k === 'country') {
        return decodeURIComponent(v || '').toUpperCase()
      }
    }
  } catch {}

  // B) Variável global injetada no window
  try {
    const w = window as unknown as { __VERCEL_GEO_COUNTRY__?: string; __VERCEL_COUNTRY__?: string }
    if (w.__VERCEL_GEO_COUNTRY__) return w.__VERCEL_GEO_COUNTRY__.toUpperCase()
    if (w.__VERCEL_COUNTRY__) return w.__VERCEL_COUNTRY__.toUpperCase()
  } catch {}

  return null
}

/**
 * Prioridade rigorosa de detecção de idioma:
 * 1. Preferência manual salva (localStorage) — SEMPRE VENCE
 * 2. País/região do visitante (quando disponível no ambiente da Vercel)
 * 3. Idioma do navegador (navigator.languages / navigator.language)
 * 4. Fuso horário do sistema (heurística de região)
 * 5. Fallback padrão: Português (PT-BR)
 */
function detectInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'pt'

  // 1. Preferência gravada no localStorage (A escolha manual do usuário SEMPRE vence)
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'pt' || saved === 'en') {
      return saved
    }
  } catch {}

  // 2. Detecção por país/região no ambiente Vercel
  try {
    const country = getInjectedCountry()
    if (country === 'GB' || country === 'UK') return 'en'
    if (country === 'BR') return 'pt'
  } catch {}

  // 3. Detecção via idioma do navegador (respeitando a ordem de preferência do usuário)
  try {
    const navLangs =
      navigator.languages && navigator.languages.length > 0
        ? navigator.languages
        : [navigator.language || '']

    for (const rawLang of navLangs) {
      const lang = (rawLang || '').toLowerCase().trim()
      if (lang.startsWith('en')) return 'en'
      if (lang.startsWith('pt')) return 'pt'
    }
  } catch {}

  // 4. Detecção via fuso horário do sistema (heurística nativa de localização sem APIs externas)
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''
    if (
      tz.includes('London') ||
      tz.includes('Europe/London') ||
      tz.includes('Belfast') ||
      tz.includes('GMT') ||
      tz.includes('BST')
    ) {
      return 'en'
    }
    if (
      tz.includes('Sao_Paulo') ||
      tz.includes('Fortaleza') ||
      tz.includes('Belem') ||
      tz.includes('Recife') ||
      tz.includes('Cuiaba') ||
      tz.includes('Manaus')
    ) {
      return 'pt'
    }
  } catch {}

  // 5. Fallback padrão: Português (PT-BR)
  return 'pt'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Inicialização síncrona com o idioma detectado (evita qualquer flash ou re-render inicial)
  const [language, setLanguageState] = useState<Language>(() => detectInitialLanguage())

  // Sincroniza tag lang no HTML imediatamente e em cada troca
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en-GB'
    }
  }, [language])

  // Verificação assíncrona opcional de geolocalização na Vercel (se endpoint existir e usuário NÃO tiver preferência salva)
  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY)) return
    } catch {
      return
    }

    let isMounted = true

    fetch('/api/geo')
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { country?: string } | null) => {
        if (!isMounted || !data?.country) return
        try {
          if (localStorage.getItem(STORAGE_KEY)) return
        } catch {
          return
        }

        const c = String(data.country).toUpperCase().trim()
        if (c === 'GB' || c === 'UK') {
          setLanguageState('en')
        } else if (c === 'BR') {
          setLanguageState('pt')
        }
      })
      .catch(() => {
        // Ambiente estático sem backend serverless — mantém com segurança o fallback do navegador
      })

    return () => {
      isMounted = false
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {}
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en-GB'
    }
  }

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: translations[language],
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
