import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'

export default function App() {
  return (
    <div id="topo" className="min-h-screen bg-[var(--prospera-white)]">
      <Header />

      <main>
        <section className="container-prospera py-20 sm:py-28">
          <div className="max-w-3xl">
            <div className="eyebrow">Prospera Investment</div>
            <h1 className="mt-5 font-serif text-4xl leading-tight text-[var(--prospera-green)] sm:text-5xl lg:text-6xl">
              Fundação técnica pronta para a nova experiência Prospera.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-black/65">
              Estrutura inicial criada com foco em performance, responsividade, identidade premium e crescimento modular. A primeira dobra visual será construída somente após validação desta base.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
