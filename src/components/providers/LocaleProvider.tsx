"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  getTranslation,
  defaultLocale,
  type Locale,
  type Translation,
} from "@/config/i18n";

interface LocaleContextValue {
  locale: Locale;
  tr:     Translation;
  toggle: () => void;
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: defaultLocale,
  tr:     getTranslation(defaultLocale),
  toggle: () => {},
});

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>(defaultLocale);

  // On mount: read localStorage first, then fall back to browser language
  useEffect(() => {
    const stored = localStorage.getItem("locale") as Locale | null;
    if (stored === "en" || stored === "zh") {
      setLocale(stored);
      return;
    }
    const browser = navigator.language || navigator.languages?.[0] || "";
    setLocale(browser.startsWith("zh") ? "zh" : "en");
  }, []);

  function toggle() {
    const next: Locale = locale === "en" ? "zh" : "en";
    localStorage.setItem("locale", next);
    setLocale(next);
  }

  return (
    <LocaleContext.Provider value={{ locale, tr: getTranslation(locale), toggle }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  return useContext(LocaleContext);
}