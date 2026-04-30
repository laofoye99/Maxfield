"use client";

import { createContext, useContext, useState } from "react";
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

  function toggle() {
    setLocale((prev) => (prev === "en" ? "zh" : "en"));
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