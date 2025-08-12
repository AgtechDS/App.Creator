import { Button } from "@/components/ui/button";
import { Utensils, Phone, Palette } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import { ThemeSelector } from "./theme-selector";
import { useTheme } from "@/store/theme-store";

export function HeroSection() {
  const [isThemeSelectorOpen, setIsThemeSelectorOpen] = useState(false);
  const { currentTheme } = useTheme();

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden"
             style={{ background: `linear-gradient(135deg, ${currentTheme.colors.primary}20, ${currentTheme.colors.secondary}20)` }}>
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')"
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>
      
      <div className="relative text-center text-white px-4 max-w-4xl mx-auto animate-fade-in-up">
        <h2 className="text-4xl md:text-6xl font-bold mb-6 text-balance theme-heading"
            style={{ fontFamily: currentTheme.fonts.heading }}>
          Autentica Cucina Italiana
        </h2>
        <p className="text-xl md:text-2xl mb-8 opacity-90 text-balance theme-body"
           style={{ fontFamily: currentTheme.fonts.body }}>
          Tradizione, qualità e sapori unici direttamente a casa tua
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/menu">
            <Button size="lg" className="text-white text-lg"
                    style={{ backgroundColor: currentTheme.colors.primary }}>
              <Utensils className="mr-2 h-5 w-5" />
              Vedi Menu
            </Button>
          </Link>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-2 border-white text-white hover:bg-white text-lg"
            style={{ borderColor: currentTheme.colors.accent }}
            onClick={() => {
              const contactSection = document.querySelector("#contact");
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            <Phone className="mr-2 h-5 w-5" />
            Ordina Ora
          </Button>
          <Button 
            size="lg" 
            className="text-white text-lg"
            style={{ backgroundColor: currentTheme.colors.accent, color: currentTheme.colors.text }}
            onClick={() => setIsThemeSelectorOpen(true)}
          >
            <Palette className="mr-2 h-5 w-5" />
            Crea il Tuo Tema
          </Button>
        </div>
        
        <ThemeSelector 
          isOpen={isThemeSelectorOpen}
          onClose={() => setIsThemeSelectorOpen(false)}
        />
      </div>
    </section>
  );
}
