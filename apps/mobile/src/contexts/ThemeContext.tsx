import React, { createContext, useContext, useState, ReactNode } from "react";
import { useColorScheme } from "react-native";
import { colors, typography, spacing, Theme } from "../constants/theme";

type ThemeMode = "light" | "dark" | "auto";

interface ThemeContextType {
  theme: Theme;
  themeMode: ThemeMode;
  isDark: boolean;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>("auto");
  const systemColorScheme = useColorScheme();

  const isDark =
    themeMode === "dark" ||
    (themeMode === "auto" && systemColorScheme === "dark");

  const theme: Theme = {
    colors: isDark ? colors.dark : colors.light,
    typography,
    spacing,
  };

  const toggleTheme = () => {
    setThemeMode((current) => (current === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeMode,
        isDark,
        setThemeMode,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};
