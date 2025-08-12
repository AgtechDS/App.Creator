import { Card, CardContent } from "@/components/ui/card";
import { Percent, Truck, Clock } from "lucide-react";

export function FeaturedOffers() {
  const offers = [
    {
      icon: Percent,
      title: "Sconto 20%",
      description: "Su ordini superiori a €25",
      validity: "Valido fino al 31/12",
      gradient: "from-primary to-orange-600",
    },
    {
      icon: Truck,
      title: "Delivery Gratuito",
      description: "Per ordini sopra i €15",
      validity: "Zona centro città",
      gradient: "from-accent to-green-600",
    },
    {
      icon: Clock,
      title: "Menu del Giorno",
      description: "Primi + Secondi a €12",
      validity: "Dal lunedì al venerdì",
      gradient: "from-secondary to-blue-800",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-bold text-center text-secondary mb-12">
          Offerte Speciali
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          {offers.map((offer, index) => (
            <Card 
              key={index}
              className={`bg-gradient-to-br ${offer.gradient} border-0 text-white transform hover:scale-105 transition-transform duration-300 cursor-pointer`}
            >
              <CardContent className="p-6">
                <offer.icon className="w-8 h-8 mb-4" />
                <h4 className="text-xl font-bold mb-2">{offer.title}</h4>
                <p className="mb-4">{offer.description}</p>
                <p className="text-sm opacity-90">{offer.validity}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
