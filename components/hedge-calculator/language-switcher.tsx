"use client";

import { useI18n } from "@/hooks/use-i18n";

export const LanguageSwitcher = () => {
  const { locale, toggleLocale, t } = useI18n();

  return (
    <button
      onClick={toggleLocale}
      className="px-2.5 py-2 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
      aria-label={t("language.toggle")}
      title={t("language.toggle")}
    >
      {locale === "en" ? "EN" : "PT"}
    </button>
  );
};
