import { useStripe, Elements, PaymentElement, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/store/cart-store";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CreditCard, Loader2 } from "lucide-react";
import { useLocation } from "wouter";

if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  throw new Error('Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY');
}
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const { state, dispatch } = useCart();
  const [, setLocation] = useLocation();
  const [isProcessing, setIsProcessing] = useState(false);
  const [customerData, setCustomerData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    zipCode: '',
    city: '',
    notes: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    if (!customerData.name || !customerData.phone || !customerData.address || !customerData.zipCode || !customerData.city) {
      toast({
        title: "Errore",
        description: "Compila tutti i campi obbligatori",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/success`,
        },
      });

      if (error) {
        toast({
          title: "Errore nel pagamento",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Pagamento completato!",
          description: "Il tuo ordine è stato confermato",
        });
        dispatch({ type: "CLEAR_CART" });
        setLocation("/");
      }
    } catch (error) {
      toast({
        title: "Errore",
        description: "Si è verificato un errore durante il pagamento",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Order Summary */}
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Riepilogo Ordine</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {state.items.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
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
          </CardContent>
        </Card>
      </div>

      {/* Checkout Form */}
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Dati di Consegna e Pagamento</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nome Completo *</Label>
                  <Input
                    id="name"
                    required
                    value={customerData.name}
                    onChange={(e) => setCustomerData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Mario Rossi"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Telefono *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    value={customerData.phone}
                    onChange={(e) => setCustomerData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+39 123 456 7890"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={customerData.email}
                  onChange={(e) => setCustomerData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="mario@email.com"
                />
              </div>

              <div>
                <Label htmlFor="address">Indirizzo di Consegna *</Label>
                <Input
                  id="address"
                  required
                  value={customerData.address}
                  onChange={(e) => setCustomerData(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="Via Roma 123"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="zipCode">CAP *</Label>
                  <Input
                    id="zipCode"
                    required
                    value={customerData.zipCode}
                    onChange={(e) => setCustomerData(prev => ({ ...prev, zipCode: e.target.value }))}
                    placeholder="00100"
                  />
                </div>
                <div>
                  <Label htmlFor="city">Città *</Label>
                  <Input
                    id="city"
                    required
                    value={customerData.city}
                    onChange={(e) => setCustomerData(prev => ({ ...prev, city: e.target.value }))}
                    placeholder="Roma"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="notes">Note (opzionale)</Label>
                <Textarea
                  id="notes"
                  value={customerData.notes}
                  onChange={(e) => setCustomerData(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Istruzioni speciali per la consegna..."
                  rows={3}
                />
              </div>

              <div className="pt-4">
                <Label className="text-base font-semibold">Metodo di Pagamento</Label>
                <div className="mt-2 p-4 border rounded-lg">
                  <PaymentElement />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-primary text-white hover:bg-primary/90"
                disabled={!stripe || isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Elaborazione...
                  </>
                ) : (
                  <>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Paga €{state.total.toFixed(2)}
                  </>
                )}
              </Button>
              
              <p className="text-xs text-gray-500 text-center">
                Pagamento sicuro elaborato da Stripe
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default function Checkout() {
  const { state } = useCart();
  const [clientSecret, setClientSecret] = useState("");
  const [, setLocation] = useLocation();

  useEffect(() => {
    document.title = "Checkout - Ristorante Bella Vista";

    if (state.items.length === 0) {
      setLocation("/cart");
      return;
    }

    // Create PaymentIntent as soon as the page loads
    const orderData = {
      customerName: "",
      customerPhone: "",
      customerEmail: "",
      deliveryAddress: "",
      city: "",
      zipCode: "",
      notes: "",
      items: JSON.stringify(state.items),
      total: state.total.toString(),
      status: "pending",
    };

    apiRequest("POST", "/api/create-payment-intent", { 
      amount: state.total, 
      orderData 
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
      })
      .catch((error) => {
        console.error("Error creating payment intent:", error);
      });
  }, [state.items.length, state.total, setLocation]);

  if (state.items.length === 0) {
    return null;
  }

  if (!clientSecret) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="pt-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-center py-12">
                <Loader2 className="animate-spin w-8 h-8 text-primary mr-2" />
                <span>Preparazione del pagamento...</span>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-secondary mb-8">Checkout</h1>
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm />
            </Elements>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
