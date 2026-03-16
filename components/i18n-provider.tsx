"use client";

import { useState, useEffect, useCallback, type ReactNode } from "react";
import {
  I18nContext,
  LOCALES,
  LOCALE_LABELS,
  detectLocale,
  translations,
  type Locale,
} from "@/hooks/use-i18n";

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    setLocaleState(detectLocale());
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("hedge-calc-locale", newLocale);
  }, []);

  const t = useCallback(
    (key: string): string => {
      return translations[key]?.[locale] || key;
    },
    [locale]
  );

  return (
    <I18nContext.Provider
      value={{ locale, locales: LOCALES, localeLabels: LOCALE_LABELS, t, setLocale }}
    >
      {children}
    </I18nContext.Provider>
  );
}
