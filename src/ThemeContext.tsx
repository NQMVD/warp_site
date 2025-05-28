import React, { createContext, useContext, useEffect, useState } from "react";

export type Theme =
  | "spacegray"
  | "pastel"
  | "peachclouds"
  | "catppuccin"
  | "vhs"
  | "cosmos"
  | "aquamarine"
  | "milky"
  | "light";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem("warp-theme") as Theme;
    return savedTheme || "spacegray";
  });

  useEffect(() => {
    localStorage.setItem("warp-theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const playTickSound = () => {
      const sound = new Audio("/sounds/button-1.wav");
      if (!mute) {
        sound.play().catch((error) => {
          console.error("Error playing sound:", error);
        });
      }
    };
    const themes: Theme[] = [
      "spacegray",
      "catppuccin",
      "vhs",
      "cosmos",
      "peachclouds",
      "aquamarine",
      "milky",
    ];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  const value = {
    theme,
    setTheme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
