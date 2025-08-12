import { Link, useLocation } from "wouter";
import { ShoppingCart, Menu, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/store/cart-store";
import { CartModal } from "@/components/cart-modal";
import { useState } from "react";

export function Header() {
  const [location] = useLocation();
  const { state } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/menu", label: "Menu" },
    { href: "/platform", label: "Piattaforma" },
    { href: "#about", label: "Chi Siamo" },
    { href: "#contact", label: "Contatti" },
  ];

  const scrollToSection = (sectionId: string) => {
    if (location !== "/") {
      window.location.href = `/${sectionId}`;
    } else {
      const element = document.querySelector(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <header className="bg-white shadow-lg fixed top-0 left-0 right-0 z-50">
        <nav className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/">
              <div className="flex items-center space-x-2 cursor-pointer">
                <Utensils className="text-primary text-2xl" />
                <h1 className="text-xl font-bold text-secondary">Bella Vista</h1>
              </div>
            </Link>
            
            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                item.href.startsWith("#") ? (
                  <button
                    key={item.href}
                    className="text-secondary hover:text-primary transition-colors cursor-pointer"
                    onClick={() => scrollToSection(item.href)}
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link key={item.href} href={item.href}>
                    <a className="text-secondary hover:text-primary transition-colors cursor-pointer">
                      {item.label}
                    </a>
                  </Link>
                )
              ))}
            </div>

            <div className="flex items-center space-x-3">
              <Button
                onClick={() => setIsCartOpen(true)}
                className="relative bg-primary text-white hover:bg-primary/90"
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Carrello</span>
                {state.itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center font-bold">
                    {state.itemCount}
                  </span>
                )}
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-secondary"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
          
          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
              <div className="flex flex-col space-y-2 pt-4">
                {navItems.map((item) => (
                  item.href.startsWith("#") ? (
                    <button
                      key={item.href}
                      className="text-secondary hover:text-primary transition-colors py-2 cursor-pointer text-left"
                      onClick={() => {
                        scrollToSection(item.href);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      {item.label}
                    </button>
                  ) : (
                    <Link key={item.href} href={item.href}>
                      <a
                        className="text-secondary hover:text-primary transition-colors py-2 cursor-pointer"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </a>
                    </Link>
                  )
                ))}
              </div>
            </div>
          )}
        </nav>
      </header>

      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
