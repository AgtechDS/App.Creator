import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { X, Send, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface SubscriptionFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan?: string;
}

export function SubscriptionFormModal({ isOpen, onClose, selectedPlan }: SubscriptionFormModalProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // Dati del Cliente
    nomeCompleto: "",
    partitaIva: "",
    email: "",
    telefono: "",
    
    // Dati dell'Attività
    nomeLocale: "",
    indirizzo: "",
    cittaCap: "",
    sitoWeb: "",
    
    // Piano scelto
    pianoScelto: selectedPlan || "",
    
    // Opzioni aggiuntive
    supportoPrioritario: false,
    backupGiornalieri: false,
    dominioPersonalizzato: false,
    
    // Metodo di pagamento
    metodoPagamento: "",
    
    // Note
    note: "",
    
    // Data
    data: new Date().toLocaleDateString("it-IT")
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nomeCompleto || !formData.email || !formData.telefono || !formData.nomeLocale) {
      toast({
        title: "Errore",
        description: "Compila tutti i campi obbligatori",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await apiRequest("POST", "/api/send-subscription-form", {
        formData
      });

      if (response.ok) {
        toast({
          title: "Modulo inviato!",
          description: "Riceverai una conferma via email entro 24 ore",
        });
        onClose();
        // Reset form
        setFormData({
          nomeCompleto: "",
          partitaIva: "",
          email: "",
          telefono: "",
          nomeLocale: "",
          indirizzo: "",
          cittaCap: "",
          sitoWeb: "",
          pianoScelto: "",
          supportoPrioritario: false,
          backupGiornalieri: false,
          dominioPersonalizzato: false,
          metodoPagamento: "",
          note: "",
          data: new Date().toLocaleDateString("it-IT")
        });
      } else {
        throw new Error("Errore nell'invio del modulo");
      }
    } catch (error) {
      toast({
        title: "Errore",
        description: "Si è verificato un errore durante l'invio. Riprova più tardi.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <Card className="shadow-xl">
          <CardHeader className="border-b border-gray-200 flex flex-row items-center justify-between">
            <CardTitle className="text-2xl text-secondary">Modulo di Attivazione Abbonamento</CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-6 w-6" />
            </Button>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Dati del Cliente */}
              <div>
                <h3 className="text-lg font-semibold text-secondary mb-4">Dati del Cliente</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nomeCompleto">Nome e Cognome / Ragione Sociale *</Label>
                    <Input
                      id="nomeCompleto"
                      required
                      value={formData.nomeCompleto}
                      onChange={(e) => setFormData(prev => ({ ...prev, nomeCompleto: e.target.value }))}
                      placeholder="Mario Rossi / Ristorante Bella Vista S.r.l."
                    />
                  </div>
                  <div>
                    <Label htmlFor="partitaIva">Partita IVA / Codice Fiscale *</Label>
                    <Input
                      id="partitaIva"
                      required
                      value={formData.partitaIva}
                      onChange={(e) => setFormData(prev => ({ ...prev, partitaIva: e.target.value }))}
                      placeholder="12345678901"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="mario@ristorante.it"
                    />
                  </div>
                  <div>
                    <Label htmlFor="telefono">Telefono *</Label>
                    <Input
                      id="telefono"
                      type="tel"
                      required
                      value={formData.telefono}
                      onChange={(e) => setFormData(prev => ({ ...prev, telefono: e.target.value }))}
                      placeholder="+39 123 456 7890"
                    />
                  </div>
                </div>
              </div>

              {/* Dati dell'Attività */}
              <div>
                <h3 className="text-lg font-semibold text-secondary mb-4">Dati dell'Attività</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nomeLocale">Nome del Locale *</Label>
                    <Input
                      id="nomeLocale"
                      required
                      value={formData.nomeLocale}
                      onChange={(e) => setFormData(prev => ({ ...prev, nomeLocale: e.target.value }))}
                      placeholder="Ristorante Bella Vista"
                    />
                  </div>
                  <div>
                    <Label htmlFor="indirizzo">Indirizzo</Label>
                    <Input
                      id="indirizzo"
                      value={formData.indirizzo}
                      onChange={(e) => setFormData(prev => ({ ...prev, indirizzo: e.target.value }))}
                      placeholder="Via Roma 123"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cittaCap">Città / CAP</Label>
                    <Input
                      id="cittaCap"
                      value={formData.cittaCap}
                      onChange={(e) => setFormData(prev => ({ ...prev, cittaCap: e.target.value }))}
                      placeholder="Roma / 00100"
                    />
                  </div>
                  <div>
                    <Label htmlFor="sitoWeb">Sito Web (se esistente)</Label>
                    <Input
                      id="sitoWeb"
                      type="url"
                      value={formData.sitoWeb}
                      onChange={(e) => setFormData(prev => ({ ...prev, sitoWeb: e.target.value }))}
                      placeholder="https://www.ristorante.it"
                    />
                  </div>
                </div>
              </div>

              {/* Scelta del Piano */}
              <div>
                <h3 className="text-lg font-semibold text-secondary mb-4">Scelta del Piano</h3>
                <RadioGroup 
                  value={formData.pianoScelto} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, pianoScelto: value }))}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Gratis" id="gratis" />
                    <Label htmlFor="gratis">Piano Free – 30 giorni di prova / max 10 prodotti / max 50 ordini</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Starter" id="starter" />
                    <Label htmlFor="starter">Starter – €19/mese – fino a 30 prodotti – 3 template base</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Pro" id="pro" />
                    <Label htmlFor="pro">Pro – €49/mese – prodotti illimitati – 10+ template – funzioni avanzate</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Enterprise" id="enterprise" />
                    <Label htmlFor="enterprise">Enterprise – su misura – funzionalità e design custom</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Opzioni Aggiuntive */}
              <div>
                <h3 className="text-lg font-semibold text-secondary mb-4">Opzioni Aggiuntive (facoltative)</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="supportoPrioritario"
                      checked={formData.supportoPrioritario}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, supportoPrioritario: !!checked }))}
                    />
                    <Label htmlFor="supportoPrioritario">Supporto tecnico prioritario (€9/mese)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="backupGiornalieri"
                      checked={formData.backupGiornalieri}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, backupGiornalieri: !!checked }))}
                    />
                    <Label htmlFor="backupGiornalieri">Backup giornalieri dedicati (€5/mese)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="dominioPersonalizzato"
                      checked={formData.dominioPersonalizzato}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, dominioPersonalizzato: !!checked }))}
                    />
                    <Label htmlFor="dominioPersonalizzato">Dominio personalizzato (.com, .it) (€12/anno)</Label>
                  </div>
                </div>
              </div>

              {/* Metodo di Pagamento */}
              <div>
                <h3 className="text-lg font-semibold text-secondary mb-4">Metodo di Pagamento</h3>
                <RadioGroup 
                  value={formData.metodoPagamento} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, metodoPagamento: value }))}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="carta" id="carta" />
                    <Label htmlFor="carta">Carta di credito (Stripe)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="bonifico" id="bonifico" />
                    <Label htmlFor="bonifico">Bonifico bancario</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal">PayPal</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Note del Cliente */}
              <div>
                <Label htmlFor="note">Note del Cliente</Label>
                <Textarea
                  id="note"
                  value={formData.note}
                  onChange={(e) => setFormData(prev => ({ ...prev, note: e.target.value }))}
                  placeholder="Eventuali richieste specifiche o note aggiuntive..."
                  rows={4}
                />
              </div>

              {/* Autorizzazione */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-secondary mb-2">Autorizzazione e Conferma</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Il cliente dichiara di aver preso visione delle condizioni di servizio e di autorizzare 
                  l'attivazione del piano scelto.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Data</Label>
                    <Input value={formData.data} disabled />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline" onClick={onClose}>
                  Annulla
                </Button>
                <Button 
                  type="submit" 
                  className="bg-primary text-white hover:bg-primary/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Invio in corso...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Invia Modulo
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}