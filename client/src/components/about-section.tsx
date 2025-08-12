export function AboutSection() {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="lg:order-first">
            <img 
              src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Chef preparando pasta fresca" 
              className="rounded-xl shadow-lg w-full h-auto"
            />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-secondary mb-6">Chi Siamo</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Dal 1985, il Ristorante Bella Vista è sinonimo di tradizione culinaria italiana. 
              La nostra famiglia porta avanti ricette trammandate di generazione in generazione, 
              utilizzando solo ingredienti freschi e di qualità.
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Oggi, con il nostro servizio di delivery, portiamo l'autentico sapore italiano 
              direttamente a casa vostra, mantenendo intatta la qualità e la cura di sempre.
            </p>
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">38+</div>
                <div className="text-sm text-gray-600">Anni di esperienza</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">5000+</div>
                <div className="text-sm text-gray-600">Clienti soddisfatti</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">4.8★</div>
                <div className="text-sm text-gray-600">Rating medio</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
