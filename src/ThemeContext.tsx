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
  
export type Style =
  | "primary"
  | "secondary"
  | "tertiary";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  style: Style;
  setStyle: (style: Style) => void;
  toggleStyle: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
export const useStyle = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useStyle must be used within a ThemeProvider");
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
  const [style, setStyle] = useState<Style>("tertiary");

  useEffect(() => {
    localStorage.setItem("warp-theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
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
  
  
  const toggleStyle = () => {
    const styles: Style[] = [
      "primary",
      "secondary",
      "tertiary",
    ];
    const currentIndex = styles.indexOf(style);
    const nextIndex = (currentIndex + 1) % styles.length;
    setStyle(styles[nextIndex]);
  };

  const value = {
    theme,
    setTheme,
    toggleTheme,
    style,
    setStyle,
    toggleStyle,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
