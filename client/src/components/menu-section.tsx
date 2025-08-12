import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useCart } from "@/store/cart-store";
import { useTheme } from "@/store/theme-store";
import { useToast } from "@/hooks/use-toast";
import { MenuItem } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

export function MenuSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const { dispatch } = useCart();
  const { currentTheme } = useTheme();
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
      <section className="py-16" style={{ backgroundColor: currentTheme.colors.background }}>
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
    <section id="menu" className="py-16" style={{ backgroundColor: currentTheme.colors.background }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-4 theme-heading" 
              style={{ color: currentTheme.colors.text, fontFamily: currentTheme.fonts.heading }}>
            Il Nostro Menu
          </h3>
          <p className="max-w-2xl mx-auto theme-body" 
             style={{ color: currentTheme.colors.textSecondary, fontFamily: currentTheme.fonts.body }}>
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
              style={{
                backgroundColor: activeCategory === category.id ? currentTheme.colors.primary : currentTheme.colors.surface,
                color: activeCategory === category.id ? currentTheme.colors.surface : currentTheme.colors.text,
                borderColor: currentTheme.colors.primary,
                fontFamily: currentTheme.fonts.body
              }}
              className="transition-all duration-200"
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
              className="overflow-hidden hover:shadow-xl transition-shadow duration-300"
              style={{ backgroundColor: currentTheme.colors.surface }}
            >
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-4">
                <h4 className="font-bold mb-2 theme-heading" 
                    style={{ color: currentTheme.colors.text, fontFamily: currentTheme.fonts.heading }}>
                  {item.name}
                </h4>
                <p className="text-sm mb-3 line-clamp-2 theme-body" 
                   style={{ color: currentTheme.colors.textSecondary, fontFamily: currentTheme.fonts.body }}>
                  {item.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg" style={{ color: currentTheme.colors.primary }}>
                    €{item.price}
                  </span>
                  <Button 
                    onClick={() => addToCart(item)}
                    style={{ 
                      backgroundColor: currentTheme.colors.primary,
                      color: currentTheme.colors.surface,
                      fontFamily: currentTheme.fonts.body
                    }}
                    disabled={!item.available}
                    className="hover:opacity-90 transition-opacity"
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
            <p className="text-lg theme-body" 
               style={{ color: currentTheme.colors.textSecondary, fontFamily: currentTheme.fonts.body }}>
              Nessun prodotto trovato in questa categoria.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
