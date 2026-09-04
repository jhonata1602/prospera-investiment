import { Header } from '@/components/layout/Header'
import { CinematicHero } from '@/components/sections/CinematicHero'
import { AdrianaAuthority } from '@/components/sections/AdrianaAuthority'
import { Footer } from '@/components/layout/Footer'

export default function App() {
  return (
    <div id="topo" className="min-h-screen bg-[#07110D] text-prospera-white flex flex-col justify-between selection:bg-prospera-green selection:text-prospera-gold">
      <Header />

      <main className="flex-1">
        <CinematicHero />
        <AdrianaAuthority />
      </main>

      <Footer />
    </div>
  )
}
