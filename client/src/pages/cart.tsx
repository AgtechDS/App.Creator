import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "@/store/cart-store";
import { Link } from "wouter";
import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react";
import { useEffect } from "react";

export default function Cart() {
  const { state, dispatch } = useCart();

  useEffect(() => {
    document.title = "Carrello - Ristorante Bella Vista";
  }, []);

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  };

  const removeItem = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-secondary mb-8 flex items-center">
              <ShoppingCart className="mr-3 h-8 w-8" />
              Il Tuo Carrello
            </h1>

            {state.items.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <ShoppingCart className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                  <h2 className="text-xl font-semibold text-gray-600 mb-2">Il carrello è vuoto</h2>
                  <p className="text-gray-500 mb-6">Aggiungi alcuni prodotti dal nostro menu</p>
                  <Link href="/menu">
                    <Button className="bg-primary text-white hover:bg-primary/90">
                      Vai al Menu
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                  {state.items.map((item) => (
                    <Card key={item.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-4">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">{item.name}</h3>
                            <p className="text-primary font-bold text-lg">€{item.price.toFixed(2)}</p>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="font-semibold text-lg w-8 text-center">
                              {item.quantity}
                            </span>
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="text-red-500 hover:text-red-700"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="lg:col-span-1">
                  <Card className="sticky top-24">
                    <CardHeader>
                      <CardTitle>Riepilogo Ordine</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        {state.items.map((item) => (
                          <div key={item.id} className="flex justify-between text-sm">
                            <span>{item.name} x{item.quantity}</span>
                            <span>€{(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                      <div className="border-t pt-4">
                        <div className="flex justify-between font-bold text-lg">
                          <span>Totale:</span>
                          <span className="text-primary">€{state.total.toFixed(2)}</span>
                        </div>
                      </div>
                      <Link href="/checkout">
                        <Button className="w-full bg-primary text-white hover:bg-primary/90 mt-4">
                          Procedi al Checkout
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
