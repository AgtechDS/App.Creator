import type { Express } from "express";
import { createServer, type Server } from "http";
import Stripe from "stripe";
import { storage } from "./storage";
import { insertOrderSchema } from "@shared/schema";
import { z } from "zod";
import sgMail from "@sendgrid/mail";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Configure SendGrid if API key is available
if (process.env.SENDGRID_API_EMAIL_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_EMAIL_KEY);
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all menu items
  app.get("/api/menu", async (req, res) => {
    try {
      const items = await storage.getMenuItems();
      res.json(items);
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching menu items: " + error.message });
    }
  });

  // Get menu items by category
  app.get("/api/menu/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const items = await storage.getMenuItemsByCategory(category);
      res.json(items);
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching menu items: " + error.message });
    }
  });

  // Create order and payment intent
  app.post("/api/create-payment-intent", async (req, res) => {
    try {
      const { amount, orderData } = req.body;
      
      // Validate order data
      const validatedOrder = insertOrderSchema.parse(orderData);
      
      // Create order in storage
      const order = await storage.createOrder(validatedOrder);
      
      // Create Stripe payment intent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency: "eur",
        metadata: {
          orderId: order.id,
        },
      });

      // Update order with payment intent ID
      await storage.updateOrderPaymentIntent(order.id, paymentIntent.id);

      res.json({ 
        clientSecret: paymentIntent.client_secret,
        orderId: order.id
      });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid order data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Error creating payment intent: " + error.message });
      }
    }
  });

  // Get order by ID
  app.get("/api/orders/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const order = await storage.getOrder(id);
      
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      
      res.json(order);
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching order: " + error.message });
    }
  });

  // Send subscription form via email
  app.post("/api/send-subscription-form", async (req, res) => {
    try {
      const { formData } = req.body;
      
      if (!process.env.SENDGRID_API_EMAIL_KEY) {
        return res.status(500).json({ 
          message: "Email service not configured. Please contact support directly at agtechdesigne@gmail.com" 
        });
      }

      const emailContent = `
MODULO DI ATTIVAZIONE ABBONAMENTO

=== DATI DEL CLIENTE ===
Nome e Cognome / Ragione Sociale: ${formData.nomeCompleto}
Partita IVA / Codice Fiscale: ${formData.partitaIva}
Email: ${formData.email}
Telefono: ${formData.telefono}

=== DATI DELL'ATTIVITÀ ===
Nome del Locale: ${formData.nomeLocale}
Indirizzo: ${formData.indirizzo || 'Non specificato'}
Città / CAP: ${formData.cittaCap || 'Non specificato'}
Sito Web: ${formData.sitoWeb || 'Non specificato'}

=== SCELTA DEL PIANO ===
Piano Scelto: ${formData.pianoScelto}

=== OPZIONI AGGIUNTIVE ===
Supporto tecnico prioritario (€9/mese): ${formData.supportoPrioritario ? 'SÌ' : 'NO'}
Backup giornalieri dedicati (€5/mese): ${formData.backupGiornalieri ? 'SÌ' : 'NO'}
Dominio personalizzato (€12/anno): ${formData.dominioPersonalizzato ? 'SÌ' : 'NO'}

=== METODO DI PAGAMENTO ===
Metodo preferito: ${formData.metodoPagamento || 'Non specificato'}

=== NOTE DEL CLIENTE ===
${formData.note || 'Nessuna nota aggiuntiva'}

=== AUTORIZZAZIONE ===
Data di invio: ${formData.data}
Il cliente dichiara di aver preso visione delle condizioni di servizio e di autorizzare l'attivazione del piano scelto.
      `;

      // Send to both admin and customer
      const msg = {
        to: ['agtechdesigne@gmail.com', formData.email],
        from: 'app.creator@agxexperience.space',
        subject: `Nuovo Abbonamento - ${formData.pianoScelto} - ${formData.nomeLocale}`,
        text: emailContent,
        html: emailContent.replace(/\n/g, '<br>'),
      };

      const result = await sgMail.send(msg);
      console.log('Email sent result:', result);
      
      res.json({ success: true, message: "Modulo inviato con successo" });
    } catch (error: any) {
      console.error('SendGrid error details:', {
        message: error.message,
        code: error.code,
        response: error.response ? {
          status: error.response.status,
          headers: error.response.headers,
          body: error.response.body
        } : null,
        stack: error.stack
      });
      res.status(500).json({ 
        message: "Errore nell'invio dell'email. Contatta direttamente agtechdesigne@gmail.com",
        error: error.message 
      });
    }
  });

  // Stripe webhook to handle payment completion
  app.post("/api/webhook", async (req, res) => {
    const sig = req.headers['stripe-signature'];
    
    try {
      const event = stripe.webhooks.constructEvent(req.body, sig as string, process.env.STRIPE_WEBHOOK_SECRET || '');
      
      if (event.type === 'payment_intent.succeeded') {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const orderId = paymentIntent.metadata.orderId;
        
        if (orderId) {
          await storage.updateOrderStatus(orderId, 'completed');
        }
      }
      
      res.json({ received: true });
    } catch (error: any) {
      res.status(400).json({ message: "Webhook error: " + error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
