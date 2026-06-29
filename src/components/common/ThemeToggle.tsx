"use client";

import { Moon, Sun } from "lucide-react";
import { useThemeStore } from "@/store/theme-store";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
      className="relative p-2.5 rounded-none border border-border bg-bg-card hover:bg-bg-secondary transition-colors text-text-secondary hover:text-text-primary shadow-brutal-sm"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
