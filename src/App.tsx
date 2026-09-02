import { Header } from '@/components/layout/Header'
import { Hero } from '@/components/sections/Hero'
import { Footer } from '@/components/layout/Footer'

export default function App() {
  return (
    <div id="topo" className="min-h-screen bg-prospera-white text-prospera-graphite flex flex-col justify-between selection:bg-prospera-green selection:text-prospera-gold">
      <Header />

      <main className="flex-1">
        <Hero />
      </main>

      <Footer />
    </div>
  )
}
