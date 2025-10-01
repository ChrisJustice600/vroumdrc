import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function ContactFAQ() {
  return (
    <section className="border-t border-border bg-muted/30 py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-4 text-center text-3xl font-bold text-foreground lg:text-4xl">Questions fréquentes</h2>
          <p className="mb-12 text-center text-muted-foreground">
            Trouvez rapidement des réponses aux questions les plus courantes
          </p>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="rounded-lg border border-border bg-card px-6">
              <AccordionTrigger className="text-left text-card-foreground hover:no-underline">
                Comment fonctionne la mise en relation ?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Notre plateforme met directement en relation les acheteurs et les vendeurs de véhicules. Vous pouvez
                parcourir les annonces, contacter les vendeurs directement, et organiser des visites. Nous vérifions
                tous les profils pour garantir la sécurité des transactions.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="rounded-lg border border-border bg-card px-6">
              <AccordionTrigger className="text-left text-card-foreground hover:no-underline">
                Quels sont les frais de service ?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {
                  "L'inscription et la consultation des annonces sont entièrement gratuites. Nous prélevons une commission uniquement lors de la finalisation d'une vente, avec des tarifs transparents communiqués dès le début du processus."
                }
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="rounded-lg border border-border bg-card px-6">
              <AccordionTrigger className="text-left text-card-foreground hover:no-underline">
                Les véhicules sont-ils vérifiés ?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Oui, nous proposons un service de vérification optionnel pour tous les véhicules. Un expert automobile
                certifié peut inspecter le véhicule et fournir un rapport détaillé sur son état mécanique et esthétique.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="rounded-lg border border-border bg-card px-6">
              <AccordionTrigger className="text-left text-card-foreground hover:no-underline">
                Puis-je essayer le véhicule avant l'achat ?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Absolument ! Nous encourageons toujours les essais routiers. Vous pouvez organiser un rendez-vous
                directement avec le vendeur via notre messagerie sécurisée. Nous recommandons de faire l'essai en
                présence d'un mécanicien de confiance.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="rounded-lg border border-border bg-card px-6">
              <AccordionTrigger className="text-left text-card-foreground hover:no-underline">
                Quel est le délai de réponse moyen ?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Notre équipe s'engage à répondre à toutes les demandes sous 24 heures ouvrées. Pour les questions
                urgentes, vous pouvez nous contacter par téléphone pendant nos horaires d'ouverture pour une réponse
                immédiate.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  )
}
