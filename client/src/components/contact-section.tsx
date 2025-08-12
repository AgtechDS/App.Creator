import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export function ContactSection() {
  return (
    <section id="contact" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-bold text-center text-secondary mb-12">
          Contatti e Dove Siamo
        </h3>
        
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <h4 className="text-xl font-bold text-secondary mb-6">Informazioni di Contatto</h4>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Phone className="text-primary text-xl w-6" />
                    <div>
                      <div className="font-semibold">Telefono</div>
                      <div className="text-gray-600">+39 06 1234 5678</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <Mail className="text-primary text-xl w-6" />
                    <div>
                      <div className="font-semibold">Email</div>
                      <div className="text-gray-600">info@bellavista.it</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <MapPin className="text-primary text-xl w-6" />
                    <div>
                      <div className="font-semibold">Indirizzo</div>
                      <div className="text-gray-600">Via Roma 123, 00100 Roma</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <Clock className="text-primary text-xl w-6" />
                    <div>
                      <div className="font-semibold">Orari</div>
                      <div className="text-gray-600">Lun-Dom: 11:00 - 23:00</div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h5 className="font-semibold mb-4">Zona di Delivery</h5>
                  <p className="text-gray-600 text-sm">
                    Consegniamo in tutta la zona centro di Roma. 
                    Delivery gratuito per ordini superiori a €15.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="shadow-lg h-full">
              <CardContent className="p-0 h-full">
                <div className="w-full h-96 bg-gray-200 flex items-center justify-center rounded-lg">
                  <div className="text-center text-gray-500">
                    <MapPin className="mx-auto text-4xl mb-2" />
                    <p className="font-semibold">Mappa Google Maps</p>
                    <p className="text-sm">Via Roma 123, Roma</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
