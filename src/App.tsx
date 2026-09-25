import { LanguageProvider } from '@/contexts/LanguageContext'
import { Header } from '@/components/layout/Header'
import { CinematicHero } from '@/components/sections/CinematicHero'
import { AdrianaAuthority } from '@/components/sections/AdrianaAuthority'
import { InvestmentRoutes } from '@/components/sections/InvestmentRoutes'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { Opportunities } from '@/components/sections/Opportunities'
import { ProfileAnalysis } from '@/components/sections/ProfileAnalysis'
import { Footer } from '@/components/layout/Footer'

export default function App() {
  return (
    <LanguageProvider>
      <div id="topo" className="w-full overflow-x-hidden min-h-screen bg-transparent text-prospera-white flex flex-col justify-between selection:bg-prospera-green selection:text-prospera-gold">
        <Header />

        <main className="flex-1 bg-transparent">
          <CinematicHero />
          <AdrianaAuthority />
          <InvestmentRoutes />
          <HowItWorks />
          <Opportunities />
          <ProfileAnalysis />
        </main>

        <Footer />
      </div>
    </LanguageProvider>
  )
}
