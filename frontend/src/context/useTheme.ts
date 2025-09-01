import { useContext } from "react";
import { ThemeContext } from "./ThemeContextContext";
import type { ThemeMode } from "./ThemeContext";

interface ThemeContextType {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
}

export const useTheme = (): ThemeContextType => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};