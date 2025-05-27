import { Calculator } from "lucide-react";
import { ThemeSwitcher } from "./theme-switcher";
import { LanguageSwitcher } from "./language-switcher";
import { useI18n } from "@/hooks/use-i18n";

export const Header = () => {
  const { t } = useI18n();

  return (
    <div className="relative">
      <div className="absolute top-0 right-0 flex gap-3">
        <LanguageSwitcher />
        <ThemeSwitcher />
      </div>
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-600 dark:from-cyan-500 dark:via-purple-500 dark:to-pink-500 rounded-xl shadow-lg">
            <Calculator className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 dark:from-cyan-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
            {t("header.title")}
          </h1>
        </div>
        <p className="text-slate-600 dark:text-slate-300 text-lg">
          {t("header.subtitle")}
        </p>
      </div>
    </div>
  );
};
