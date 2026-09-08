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

function detectInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'pt'

  // 1. Preferência gravada no localStorage
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'pt' || saved === 'en') {
      return saved
    }
  } catch {}

  // 2. Detecção via navegador (navigator.language / navigator.languages)
  try {
    const navLangs = navigator.languages || [navigator.language || '']
    const hasPortuguese = navLangs.some((lang) => lang.toLowerCase().startsWith('pt'))
    if (hasPortuguese) return 'pt'

    const hasEnglish = navLangs.some((lang) => lang.toLowerCase().startsWith('en'))
    if (hasEnglish) return 'en'
  } catch {}

  // 3. Detecção via fuso horário do sistema
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''
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
    if (
      tz.includes('London') ||
      tz.includes('Europe/London') ||
      tz.includes('Belfast') ||
      tz.includes('GMT')
    ) {
      return 'en'
    }
  } catch {}

  // 4. Fallback padrão: Português
  return 'pt'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('pt')

  useEffect(() => {
    const initial = detectInitialLanguage()
    setLanguageState(initial)
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
