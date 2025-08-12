import { Utensils } from "lucide-react";
import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-secondary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Utensils className="text-primary text-2xl" />
              <h4 className="text-xl font-bold">Bella Vista</h4>
            </div>
            <p className="text-gray-300 text-sm">
              Autentica cucina italiana dal 1985. 
              Tradizione e qualità in ogni piatto.
            </p>
          </div>
          
          <div>
            <h5 className="font-bold mb-4">Link Utili</h5>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/menu">
                  <a className="text-gray-300 hover:text-primary transition-colors">Menu</a>
                </Link>
              </li>
              <li>
                <Link href="/platform">
                  <a className="text-gray-300 hover:text-primary transition-colors">Piattaforma</a>
                </Link>
              </li>
              <li>
                <a 
                  href="#about" 
                  className="text-gray-300 hover:text-primary transition-colors cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.querySelector("#about");
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  Chi Siamo
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  className="text-gray-300 hover:text-primary transition-colors cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.querySelector("#contact");
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  Contatti
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                  Termini e Condizioni
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-bold mb-4">Orari</h5>
            <div className="text-sm text-gray-300 space-y-1">
              <div>Lunedì - Domenica</div>
              <div>11:00 - 23:00</div>
              <div className="pt-2 text-primary">Delivery attivo</div>
            </div>
          </div>
          
          <div>
            <h5 className="font-bold mb-4">Seguici</h5>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <i className="fab fa-facebook text-xl"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <i className="fab fa-whatsapp text-xl"></i>
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-600 mt-8 pt-8 text-center text-sm text-gray-300">
          <p>&copy; 2024 Ristorante Bella Vista. Tutti i diritti riservati.</p>
        </div>
      </div>
    </footer>
  );
}
