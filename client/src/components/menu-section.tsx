import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useCart } from "@/store/cart-store";
import { useToast } from "@/hooks/use-toast";
import { MenuItem } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

export function MenuSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const { dispatch } = useCart();
  const { toast } = useToast();

  const { data: menuItems, isLoading } = useQuery<MenuItem[]>({
    queryKey: ["/api/menu"],
  });

  const categories = [
    { id: "all", label: "Tutti" },
    { id: "bevande", label: "Bevande" },
    { id: "panini", label: "Panini" },
    { id: "dolci", label: "Dolci" },
    { id: "primi", label: "Primi Piatti" },
  ];

  const filteredItems = menuItems?.filter(
    item => activeCategory === "all" || item.category === activeCategory
  ) || [];

  const addToCart = (item: MenuItem) => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: item.id,
        name: item.name,
        price: parseFloat(item.price),
        image: item.image,
      },
    });

    toast({
      title: "Prodotto aggiunto!",
      description: `${item.name} è stato aggiunto al carrello`,
    });
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Skeleton className="h-8 w-48 mx-auto mb-4" />
            <Skeleton className="h-4 w-96 mx-auto" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <CardContent className="p-4">
                  <Skeleton className="h-6 w-32 mb-2" />
                  <Skeleton className="h-4 w-full mb-3" />
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-10 w-24" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="menu" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-secondary mb-4">Il Nostro Menu</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Scopri la nostra selezione di piatti tradizionali italiani, preparati con ingredienti freschi e di qualità
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              onClick={() => setActiveCategory(category.id)}
              className={
                activeCategory === category.id
                  ? "bg-primary text-white hover:bg-primary/90"
                  : "bg-white text-secondary hover:bg-primary hover:text-white"
              }
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <Card 
              key={item.id} 
              className="bg-white overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-4">
                <h4 className="font-bold text-secondary mb-2">{item.name}</h4>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-primary font-bold text-lg">€{item.price}</span>
                  <Button 
                    onClick={() => addToCart(item)}
                    className="bg-primary text-white hover:bg-primary/90"
                    disabled={!item.available}
                  >
                    <Plus className="mr-1 h-4 w-4" />
                    Aggiungi
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Nessun prodotto trovato in questa categoria.</p>
          </div>
        )}
      </div>
    </section>
  );
}
