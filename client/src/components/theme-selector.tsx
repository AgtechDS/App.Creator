import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Palette, Check } from "lucide-react";
import { useTheme, Theme } from "@/store/theme-store";

interface ThemeSelectorProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ThemeSelector({ isOpen, onClose }: ThemeSelectorProps) {
  const { currentTheme, setTheme, themes } = useTheme();
  const [previewTheme, setPreviewTheme] = useState<Theme | null>(null);

  const handleThemeSelect = (themeId: string) => {
    setTheme(themeId);
    onClose();
  };

  const handlePreview = (theme: Theme) => {
    setPreviewTheme(theme);
    // Apply preview temporarily
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
  };

  const resetPreview = () => {
    setPreviewTheme(null);
    // Reset to current theme
    const root = document.documentElement;
    root.style.setProperty('--theme-primary', currentTheme.colors.primary);
    root.style.setProperty('--theme-secondary', currentTheme.colors.secondary);
    root.style.setProperty('--theme-accent', currentTheme.colors.accent);
    root.style.setProperty('--theme-background', currentTheme.colors.background);
    root.style.setProperty('--theme-surface', currentTheme.colors.surface);
    root.style.setProperty('--theme-text', currentTheme.colors.text);
    root.style.setProperty('--theme-text-secondary', currentTheme.colors.textSecondary);
    root.style.setProperty('--theme-font-heading', currentTheme.fonts.heading);
    root.style.setProperty('--theme-font-body', currentTheme.fonts.body);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <Card className="shadow-xl" style={{ backgroundColor: 'var(--theme-surface)' }}>
          <CardHeader className="border-b border-gray-200 flex flex-row items-center justify-between" 
                      style={{ backgroundColor: 'var(--theme-surface)' }}>
            <div>
              <CardTitle className="text-2xl flex items-center" style={{ color: 'var(--theme-text)' }}>
                <Palette className="mr-3 h-6 w-6" />
                Scegli il Tuo Tema
              </CardTitle>
              <p className="text-sm mt-2" style={{ color: 'var(--theme-text-secondary)' }}>
                Seleziona uno stile per personalizzare l'aspetto del tuo ristorante
              </p>
            </div>
            <Button variant="ghost" size="icon" onClick={() => { resetPreview(); onClose(); }}>
              <X className="h-6 w-6" />
            </Button>
          </CardHeader>
          <CardContent className="p-6" style={{ backgroundColor: 'var(--theme-background)' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {themes.map((theme) => (
                <Card 
                  key={theme.id} 
                  className={`cursor-pointer transition-all duration-200 hover:shadow-lg relative ${
                    currentTheme.id === theme.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onMouseEnter={() => handlePreview(theme)}
                  onMouseLeave={resetPreview}
                  onClick={() => handleThemeSelect(theme.id)}
                >
                  {currentTheme.id === theme.id && (
                    <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1">
                      <Check className="h-4 w-4" />
                    </div>
                  )}
                  
                  <div className="aspect-video relative overflow-hidden rounded-t-lg">
                    <img 
                      src={theme.preview} 
                      alt={theme.name}
                      className="w-full h-full object-cover"
                    />
                    <div 
                      className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
                    />
                    <div className="absolute bottom-2 left-2 text-white">
                      <h4 className="font-semibold text-sm">{theme.name}</h4>
                      <p className="text-xs opacity-90">{theme.style}</p>
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-semibold text-sm" style={{ color: theme.colors.text }}>
                          {theme.name}
                        </h3>
                        <p className="text-xs" style={{ color: theme.colors.textSecondary }}>
                          {theme.description}
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs">
                        <span style={{ color: theme.colors.textSecondary }}>Mood:</span>
                        <span style={{ color: theme.colors.text }}>{theme.mood}</span>
                      </div>
                      
                      <div className="flex space-x-1">
                        <div 
                          className="w-4 h-4 rounded-full border"
                          style={{ backgroundColor: theme.colors.primary }}
                          title="Colore primario"
                        />
                        <div 
                          className="w-4 h-4 rounded-full border"
                          style={{ backgroundColor: theme.colors.secondary }}
                          title="Colore secondario"
                        />
                        <div 
                          className="w-4 h-4 rounded-full border"
                          style={{ backgroundColor: theme.colors.accent }}
                          title="Colore accent"
                        />
                      </div>
                      
                      <Button 
                        size="sm" 
                        className="w-full text-xs"
                        style={{ 
                          backgroundColor: theme.colors.primary,
                          color: theme.colors.surface
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleThemeSelect(theme.id);
                        }}
                      >
                        {currentTheme.id === theme.id ? 'Tema Attivo' : 'Seleziona'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-sm" style={{ color: 'var(--theme-text-secondary)' }}>
                Passa il mouse sopra un tema per vedere l'anteprima in tempo reale
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}