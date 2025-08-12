import { type MenuItem, type InsertMenuItem, type Order, type InsertOrder } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Menu Items
  getMenuItems(): Promise<MenuItem[]>;
  getMenuItemsByCategory(category: string): Promise<MenuItem[]>;
  getMenuItem(id: string): Promise<MenuItem | undefined>;
  
  // Orders
  createOrder(order: InsertOrder): Promise<Order>;
  getOrder(id: string): Promise<Order | undefined>;
  updateOrderStatus(id: string, status: string): Promise<Order | undefined>;
  updateOrderPaymentIntent(id: string, paymentIntentId: string): Promise<Order | undefined>;
}

export class MemStorage implements IStorage {
  private menuItems: Map<string, MenuItem>;
  private orders: Map<string, Order>;

  constructor() {
    this.menuItems = new Map();
    this.orders = new Map();
    
    // Initialize with sample menu items from the design
    this.initializeMenuItems();
  }

  private initializeMenuItems() {
    const items: MenuItem[] = [
      {
        id: "1",
        name: "Caffè Espresso",
        description: "Classico espresso italiano",
        price: "1.00",
        image: "https://images.unsplash.com/photo-1510707577719-ae7c14805e76?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        category: "bevande",
        available: 1,
      },
      {
        id: "2",
        name: "Cappuccino",
        description: "Con latte caldo e schiuma",
        price: "1.50",
        image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        category: "bevande",
        available: 1,
      },
      {
        id: "3",
        name: "Panino Prosciutto e Formaggio",
        description: "Pane fresco con prosciutto cotto e formaggio",
        price: "4.00",
        image: "https://images.unsplash.com/photo-1539252554453-80ab65ce3586?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        category: "panini",
        available: 1,
      },
      {
        id: "4",
        name: "Torta della Casa",
        description: "Dolce fatto in casa con ingredienti freschi",
        price: "3.50",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        category: "dolci",
        available: 1,
      },
      {
        id: "5",
        name: "Bibita Gassata",
        description: "Scelta tra Coca-Cola, Fanta, Sprite",
        price: "2.00",
        image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        category: "bevande",
        available: 1,
      },
      {
        id: "6",
        name: "Spaghetti alla Marinara",
        description: "Con pomodoro fresco e basilico",
        price: "8.50",
        image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        category: "primi",
        available: 1,
      },
      {
        id: "7",
        name: "Risotto ai Funghi",
        description: "Cremoso risotto con funghi porcini",
        price: "10.00",
        image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        category: "primi",
        available: 1,
      },
      {
        id: "8",
        name: "Tiramisù",
        description: "Il classico dolce al cucchiaio italiano",
        price: "4.50",
        image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        category: "dolci",
        available: 1,
      },
    ];

    items.forEach(item => {
      this.menuItems.set(item.id, item);
    });
  }

  async getMenuItems(): Promise<MenuItem[]> {
    return Array.from(this.menuItems.values());
  }

  async getMenuItemsByCategory(category: string): Promise<MenuItem[]> {
    return Array.from(this.menuItems.values()).filter(item => item.category === category);
  }

  async getMenuItem(id: string): Promise<MenuItem | undefined> {
    return this.menuItems.get(id);
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = randomUUID();
    const order: Order = {
      ...insertOrder,
      id,
      notes: insertOrder.notes || null,
      customerEmail: insertOrder.customerEmail || null,
      stripePaymentIntentId: null,
      createdAt: new Date(),
    };
    this.orders.set(id, order);
    return order;
  }

  async getOrder(id: string): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async updateOrderStatus(id: string, status: string): Promise<Order | undefined> {
    const order = this.orders.get(id);
    if (order) {
      order.status = status;
      this.orders.set(id, order);
      return order;
    }
    return undefined;
  }

  async updateOrderPaymentIntent(id: string, paymentIntentId: string): Promise<Order | undefined> {
    const order = this.orders.get(id);
    if (order) {
      order.stripePaymentIntentId = paymentIntentId;
      this.orders.set(id, order);
      return order;
    }
    return undefined;
  }
}

export const storage = new MemStorage();
