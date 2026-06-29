"use client";

import { useEffect } from "react";
import { applyThemeToDocument, useThemeStore } from "@/store/theme-store";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useThemeStore((s) => s.theme);

  useEffect(() => {
    applyThemeToDocument(theme);
  }, [theme]);

  useEffect(() => {
    const syncTheme = () => applyThemeToDocument(useThemeStore.getState().theme);

    if (useThemeStore.persist.hasHydrated()) {
      syncTheme();
    }

    return useThemeStore.persist.onFinishHydration(syncTheme);
  }, []);

  return children;
}
