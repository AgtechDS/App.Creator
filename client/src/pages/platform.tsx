import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Utensils, Smartphone, CreditCard, BarChart3, Settings, Globe, Headphones } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { SubscriptionFormModal } from "@/components/subscription-form-modal";

export default function Platform() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Piattaforma per Ristoranti - Bella Vista | Crea la tua App di Delivery";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Piattaforma completa per bar e ristoranti. Crea rapidamente la tua app di ordinazione online con menu personalizzabile, pagamenti Stripe e design responsive."
      );
    }
  }, []);

  const openFormWithPlan = (planName: string) => {
    setSelectedPlan(planName);
    setIsFormOpen(true);
  };

  const features = [
    {
      icon: Utensils,
      title: "Menu Digitale Personalizzabile",
      description: "Gestisci facilmente prodotti, categorie, prezzi e immagini con interfaccia intuitiva"
    },
    {
      icon: Smartphone,
      title: "Design Responsive",
      description: "Template ottimizzati per tutti i dispositivi, da mobile a desktop"
    },
    {
      icon: CreditCard,
      title: "Pagamenti Sicuri",
      description: "Integrazione nativa Stripe con supporto carte, Apple Pay e Google Pay"
    },
    {
      icon: BarChart3,
      title: "Analytics e Report",
      description: "Dashboard in tempo reale con statistiche ordini e report dettagliati"
    },
    {
      icon: Settings,
      title: "Configurazione Semplice",
      description: "Setup rapido senza competenze tecniche, tutto pronto in pochi click"
    },
    {
      icon: Globe,
      title: "SEO Ottimizzato",
      description: "Visibilità sui motori di ricerca e performance garantite"
    }
  ];

  const scrollToPricing = () => {
    const pricingSection = document.querySelector("#pricing");
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const plans = [
    {
      name: "Gratis",
      price: "0",
      period: "/30 giorni",
      badge: "Prova gratuita",
      badgeColor: "bg-green-100 text-green-800",
      features: [
        "30 giorni di prova gratuita",
        "Max 10 prodotti nel menu",
        "1 template base preimpostato",
        "Carrello & Checkout abilitati",
        "Integrazione Stripe base",
        "Max 50 ordini al mese",
        "Solo documentazione online",
        "Hosting con limiti ridotti",
        "Nessuna carta di credito richiesta"
      ]
    },
    {
      name: "Starter",
      price: "19",
      period: "/mese",
      badge: "Ideale per iniziare",
      badgeColor: "bg-blue-100 text-blue-800",
      features: [
        "Pagina web personalizzata",
        "3 template preimpostati",
        "Menu fino a 30 prodotti",
        "Upload prodotti (CSV o UI)",
        "Integrazione Stripe base",
        "Supporto via email",
        "Hosting e SSL inclusi",
        "Report ordini mensili"
      ]
    },
    {
      name: "Pro",
      price: "49",
      period: "/mese",
      badge: "Più popolare",
      badgeColor: "bg-primary text-white",
      isPopular: true,
      features: [
        "Tutto di Starter, più:",
        "10+ template personalizzabili",
        "Menu illimitato",
        "Promozioni e sconti automatici",
        "Stripe avanzato (Apple/Google Pay)",
        "Dashboard tempo reale",
        "Notifiche push",
        "Supporto via chat",
        "Report dettagliati con export"
      ]
    },
    {
      name: "Enterprise",
      price: "Su misura",
      period: "",
      badge: "Massima flessibilità",
      badgeColor: "bg-accent text-white",
      features: [
        "Tutto di Pro, più:",
        "Design completamente custom",
        "Integrazione API esterne",
        "Multi-lingua e multi-locale",
        "Supporto dedicato 24/7",
        "Account manager personale",
        "Personalizzazioni su richiesta",
        "SLA con garanzia uptime",
        "Backup giornalieri"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary via-orange-500 to-orange-600 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                La Tua Piattaforma di Delivery
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Crea rapidamente la tua app di ordinazione online personalizzata, 
                senza competenze tecniche
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-white text-primary hover:bg-gray-100 text-lg"
                  onClick={scrollToPricing}
                >
                  Inizia Gratis
                </Button>
                <Link href="/">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-2 border-white text-black hover:bg-white hover:text-primary text-lg"
                  >
                    Vedi Demo
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-secondary mb-4">
                Tutto quello che serve al tuo business
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Una soluzione completa che permette ai bar e ristoranti di avere 
                il pieno controllo sulla propria piattaforma di delivery
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <feature.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-secondary mb-6">
                  Perché scegliere la nostra piattaforma?
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Check className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">Personalizzazione Completa</h4>
                      <p className="text-gray-600">Scegli tra template predefiniti o crea il tuo design unico</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Check className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">Menu Flessibile</h4>
                      <p className="text-gray-600">Modifica prodotti, prezzi e categorie in tempo reale</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Check className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">Pagamenti Sicuri</h4>
                      <p className="text-gray-600">Integrazione Stripe nativa per transazioni immediate</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Check className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">Performance Garantite</h4>
                      <p className="text-gray-600">Hosting veloce, SSL incluso e conformità SEO</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                  alt="Dashboard della piattaforma" 
                  className="rounded-xl shadow-lg w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-secondary mb-4">
                Piani di Abbonamento
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Scegli il piano più adatto alle esigenze del tuo locale
              </p>
            </div>

            <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {plans.map((plan, index) => (
                <Card 
                  key={index} 
                  className={`relative ${plan.isPopular ? 'ring-2 ring-primary transform scale-105' : ''} hover:shadow-xl transition-all`}
                >
                  {plan.badge && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className={plan.badgeColor}>
                        {plan.badge}
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-primary">€{plan.price}</span>
                      <span className="text-gray-600">{plan.period}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start space-x-3">
                          <Check className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                          <span className={feature.startsWith("Tutto") ? "font-semibold" : ""}>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className={`w-full mt-6 ${
                        plan.name === "Gratis" ? 'bg-green-600 text-white hover:bg-green-700' :
                        plan.isPopular ? 'bg-primary text-white hover:bg-primary/90' : 
                        'bg-secondary text-white hover:bg-secondary/90'
                      }`}
                      onClick={() => openFormWithPlan(plan.name)}
                    >
                      {plan.name === "Enterprise" ? "Contattaci" : 
                       plan.name === "Gratis" ? "Inizia Prova Gratuita" : "Inizia Ora"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-secondary to-gray-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Pronto a trasformare il tuo business?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Inizia oggi stesso e crea la tua piattaforma di delivery personalizzata
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary text-white hover:bg-primary/90">
                <Headphones className="mr-2 h-5 w-5" />
                Parla con un Esperto
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white hover:text-secondary"
                onClick={() => window.open('https://wa.me/393792787795', '_blank')}
              >
                Prova Gratuita
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      
      <SubscriptionFormModal 
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        selectedPlan={selectedPlan}
      />
    </div>
  );
}
