"use client";

import { useI18n } from "@/hooks/use-i18n";

export const LanguageSwitcher = () => {
  const { locale, locales, localeLabels, setLocale, t } = useI18n();

  const currentIndex = locales.indexOf(locale);
  const cycleLocale = () => {
    const next = locales[(currentIndex + 1) % locales.length];
    setLocale(next);
  };

  return (
    <button
      onClick={cycleLocale}
      className="px-3 py-2.5 rounded-xl text-xs font-bold tracking-wide text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-all duration-200"
      aria-label={t("language.toggle")}
      title={t("language.toggle")}
    >
      {localeLabels[locale]}
    </button>
  );
};
