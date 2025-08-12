import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Theme {
  id: string;
  name: string;
  description: string;
  preview: string;
  heroImage: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  mood: string;
  style: string;
}

export const themes: Theme[] = [
  {
    id: "classic-italian",
    name: "Classico Italiano",
    description: "Eleganza tradizionale con colori caldi e accoglienti",
    preview: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080",
    colors: {
      primary: "hsl(25, 95%, 53%)", // Arancione terracotta
      secondary: "hsl(15, 25%, 25%)", // Marrone scuro
      accent: "hsl(45, 90%, 60%)", // Oro antico
      background: "hsl(30, 25%, 95%)", // Crema avorio
      surface: "hsl(25, 30%, 98%)", // Bianco caldo
      text: "hsl(15, 25%, 15%)", // Marrone molto scuro
      textSecondary: "hsl(15, 15%, 45%)", // Grigio marrone
    },
    fonts: {
      heading: "Playfair Display, serif",
      body: "Source Sans Pro, sans-serif",
    },
    mood: "Elegante e tradizionale",
    style: "Classico"
  },
  {
    id: "modern-minimal",
    name: "Moderno Minimale",
    description: "Design pulito e contemporaneo con linee essenziali",
    preview: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400&h=300&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080",
    colors: {
      primary: "hsl(220, 90%, 56%)", // Blu elettrico
      secondary: "hsl(210, 40%, 15%)", // Blu navy profondo
      accent: "hsl(175, 70%, 45%)", // Teal moderno
      background: "hsl(220, 20%, 97%)", // Grigio azzurrino
      surface: "hsl(220, 15%, 99%)", // Bianco freddo
      text: "hsl(210, 40%, 10%)", // Quasi nero
      textSecondary: "hsl(210, 15%, 50%)", // Grigio medio
    },
    fonts: {
      heading: "Inter, sans-serif",
      body: "Inter, sans-serif",
    },
    mood: "Pulito e professionale",
    style: "Moderno"
  },
  {
    id: "rustic-warm",
    name: "Rustico Caldo",
    description: "Atmosfera accogliente con materiali naturali",
    preview: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080",
    colors: {
      primary: "hsl(30, 60%, 45%)", // Terra di siena
      secondary: "hsl(20, 30%, 20%)", // Marrone terra
      accent: "hsl(120, 35%, 35%)", // Verde bosco
      background: "hsl(25, 35%, 90%)", // Sabbia calda
      surface: "hsl(30, 40%, 94%)", // Legno chiaro
      text: "hsl(20, 30%, 15%)", // Marrone scuro
      textSecondary: "hsl(20, 20%, 40%)", // Marrone medio
    },
    fonts: {
      heading: "Merriweather, serif",
      body: "Open Sans, sans-serif",
    },
    mood: "Accogliente e naturale",
    style: "Rustico"
  },
  {
    id: "elegant-luxury",
    name: "Lusso Elegante",
    description: "Raffinatezza e prestigio con dettagli dorati",
    preview: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080",
    colors: {
      primary: "hsl(45, 100%, 50%)", // Oro champagne
      secondary: "hsl(240, 15%, 15%)", // Nero elegante
      accent: "hsl(270, 50%, 35%)", // Viola profondo
      background: "hsl(45, 15%, 94%)", // Champagne pallido
      surface: "hsl(45, 20%, 97%)", // Avorio luxury
      text: "hsl(240, 15%, 10%)", // Nero carbone
      textSecondary: "hsl(240, 10%, 35%)", // Grigio antracite
    },
    fonts: {
      heading: "Cormorant Garamond, serif",
      body: "Lato, sans-serif",
    },
    mood: "Lussuoso e raffinato",
    style: "Elegante"
  },
  {
    id: "fresh-green",
    name: "Fresco Verde",
    description: "Freschezza naturale con toni verdi rilassanti",
    preview: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=400&h=300&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080",
    colors: {
      primary: "hsl(120, 60%, 45%)", // Verde bosco
      secondary: "hsl(135, 25%, 25%)", // Verde pino
      accent: "hsl(60, 70%, 60%)", // Lime brillante
      background: "hsl(120, 25%, 95%)", // Verde menta
      surface: "hsl(120, 20%, 98%)", // Bianco natura
      text: "hsl(135, 25%, 15%)", // Verde molto scuro
      textSecondary: "hsl(135, 15%, 45%)", // Verde grigio
    },
    fonts: {
      heading: "Nunito, sans-serif",
      body: "Nunito, sans-serif",
    },
    mood: "Fresco e naturale",
    style: "Naturale"
  },
  {
    id: "vintage-retro",
    name: "Vintage Retrò",
    description: "Nostalgia anni '50 con colori pastello",
    preview: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=400&h=300&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080",
    colors: {
      primary: "hsl(195, 80%, 55%)", // Azzurro vintage
      secondary: "hsl(345, 60%, 55%)", // Rosa vintage
      accent: "hsl(320, 50%, 65%)", // Rosa shocking
      background: "hsl(195, 20%, 92%)", // Celeste polveroso
      surface: "hsl(195, 25%, 96%)", // Azzurro ghiaccio
      text: "hsl(210, 25%, 25%)", // Blu navy vintage
      textSecondary: "hsl(210, 15%, 50%)", // Grigio blu
    },
    fonts: {
      heading: "Lobster, cursive",
      body: "Raleway, sans-serif",
    },
    mood: "Nostalgico e giocoso",
    style: "Vintage"
  },
  {
    id: "dark-sophisticated",
    name: "Scuro Sofisticato",
    description: "Eleganza notturna con contrasti drammatici",
    preview: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&h=300&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080",
    colors: {
      primary: "hsl(45, 100%, 60%)", // Oro brillante
      secondary: "hsl(220, 15%, 15%)", // Carbone
      accent: "hsl(280, 70%, 65%)", // Viola neon
      background: "hsl(220, 20%, 12%)", // Nero profondo
      surface: "hsl(220, 15%, 18%)", // Grigio scuro
      text: "hsl(0, 0%, 95%)", // Bianco perla
      textSecondary: "hsl(220, 15%, 70%)", // Grigio platino
    },
    fonts: {
      heading: "Oswald, sans-serif",
      body: "Roboto, sans-serif",
    },
    mood: "Drammatico e sofisticato",
    style: "Scuro"
  },
  {
    id: "mediterranean-blue",
    name: "Blu Mediterraneo", 
    description: "Freschezza marina con blu e bianchi",
    preview: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080",
    colors: {
      primary: "hsl(200, 85%, 55%)", // Blu Santorini
      secondary: "hsl(210, 60%, 25%)", // Blu profondo
      accent: "hsl(35, 80%, 70%)", // Sabbia greca
      background: "hsl(200, 40%, 96%)", // Cielo estivo
      surface: "hsl(200, 30%, 99%)", // Bianco onde
      text: "hsl(210, 60%, 15%)", // Blu notte
      textSecondary: "hsl(210, 30%, 45%)", // Blu grigio
    },
    fonts: {
      heading: "Montserrat, sans-serif",
      body: "Open Sans, sans-serif",
    },
    mood: "Fresco e marino",
    style: "Mediterraneo"
  },
  {
    id: "warm-sunset",
    name: "Tramonto Caldo",
    description: "Calore del tramonto con arancioni e rossi",
    preview: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080",
    colors: {
      primary: "hsl(15, 90%, 60%)", // Arancione vulcano
      secondary: "hsl(0, 70%, 45%)", // Rosso magma
      accent: "hsl(280, 60%, 50%)", // Viola crepuscolo
      background: "hsl(25, 35%, 94%)", // Pesca dorata
      surface: "hsl(25, 25%, 97%)", // Corallo pallido
      text: "hsl(0, 70%, 25%)", // Rosso mogano
      textSecondary: "hsl(15, 40%, 40%)", // Marrone cannella
    },
    fonts: {
      heading: "Dancing Script, cursive",
      body: "Poppins, sans-serif",
    },
    mood: "Caldo e romantico",
    style: "Romantico"
  },
  {
    id: "urban-industrial",
    name: "Urbano Industriale",
    description: "Stile metropolitano con metalli e cemento",
    preview: "https://images.unsplash.com/photo-1555244162-803834f70033?w=400&h=300&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080",
    colors: {
      primary: "hsl(30, 30%, 50%)", // Rame ossidato
      secondary: "hsl(210, 10%, 25%)", // Acciaio
      accent: "hsl(180, 50%, 45%)", // Verde militare
      background: "hsl(210, 10%, 92%)", // Cemento chiaro
      surface: "hsl(210, 8%, 95%)", // Alluminio spazzolato
      text: "hsl(210, 10%, 20%)", // Ferro battuto
      textSecondary: "hsl(210, 8%, 45%)", // Ghisa
    },
    fonts: {
      heading: "Roboto Condensed, sans-serif",
      body: "Source Sans Pro, sans-serif",
    },
    mood: "Industriale e urbano",
    style: "Industriale"
  }
];

interface ThemeContextType {
  currentTheme: Theme;
  setTheme: (themeId: string) => void;
  themes: Theme[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[0]);

  const setTheme = (themeId: string) => {
    const theme = themes.find(t => t.id === themeId);
    if (theme) {
      setCurrentTheme(theme);
      localStorage.setItem('selectedTheme', themeId);
      
      // Apply theme colors to CSS variables
      const root = document.documentElement;
      root.style.setProperty('--theme-primary', theme.colors.primary);
      root.style.setProperty('--theme-secondary', theme.colors.secondary);
      root.style.setProperty('--theme-accent', theme.colors.accent);
      root.style.setProperty('--theme-background', theme.colors.background);
      root.style.setProperty('--theme-surface', theme.colors.surface);
      root.style.setProperty('--theme-text', theme.colors.text);
      root.style.setProperty('--theme-text-secondary', theme.colors.textSecondary);
      root.style.setProperty('--theme-font-heading', theme.fonts.heading);
      root.style.setProperty('--theme-font-body', theme.fonts.body);
    }
  };

  useEffect(() => {
    // Load saved theme on mount
    const savedThemeId = localStorage.getItem('selectedTheme');
    if (savedThemeId) {
      setTheme(savedThemeId);
    } else {
      setTheme(themes[0].id);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}