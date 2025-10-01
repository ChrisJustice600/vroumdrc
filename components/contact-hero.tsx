export function ContactHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted">
      <div className="absolute inset-0 bg-[url('/abstract-automotive-pattern.jpg')] opacity-5" />
      <div className="container relative mx-auto px-4 py-20 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-6 text-balance font-sans text-4xl font-bold tracking-tight text-foreground lg:text-6xl">
            Contactez-nous
          </h1>
          <p className="text-pretty text-lg text-muted-foreground lg:text-xl">
            {
              "Notre équipe est là pour vous accompagner dans votre projet d'achat ou de vente de véhicule. Nous vous répondons sous 24h."
            }
          </p>
        </div>
      </div>
    </section>
  )
}
