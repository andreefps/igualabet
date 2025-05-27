import { Languages } from "lucide-react";
import { useI18n } from "@/hooks/use-i18n";

export const LanguageSwitcher = () => {
  const { locale, toggleLocale, t } = useI18n();

  return (
    <button
      onClick={toggleLocale}
      className="relative p-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 dark:from-cyan-600 dark:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
      aria-label={t("language.toggle")}
      title={t("language.toggle")}
    >
      <div className="flex items-center gap-2">
        <Languages className="w-5 h-5" />
        <span className="text-sm font-medium">
          {locale === "en" ? "EN" : "PT"}
        </span>
      </div>
      <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </button>
  );
};
