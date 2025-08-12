import { Header } from "@/components/header";
import { MenuSection } from "@/components/menu-section";
import { Footer } from "@/components/footer";
import { useEffect } from "react";

export default function Menu() {
  useEffect(() => {
    document.title = "Menu - Ristorante Bella Vista | Cucina Italiana Tradizionale";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Scopri il menu completo del Ristorante Bella Vista. Caffè, panini, primi piatti e dolci italiani tradizionali con delivery a domicilio."
      );
    }
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        <MenuSection />
      </main>
      <Footer />
    </div>
  );
}
