import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { FeaturedOffers } from "@/components/featured-offers";
import { MenuSection } from "@/components/menu-section";
import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    document.title = "Ristorante Bella Vista - Autentica Cucina Italiana con Delivery";
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Ordina online dal Ristorante Bella Vista. Menu tradizionale italiano, delivery veloce, pagamento sicuro con Stripe."
      );
    }
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        <HeroSection />
        <FeaturedOffers />
        <MenuSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
