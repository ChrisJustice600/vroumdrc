import { ContactFAQ } from "@/components/contact-faq";
import { ContactForm } from "@/components/contact-form";
import { ContactHero } from "@/components/contact-hero";
import { ContactInfo } from "@/components/contact-info";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      <ContactHero />
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <ContactForm />
          <ContactInfo />
        </div>
      </div>
      <ContactFAQ />
    </main>
  );
}
