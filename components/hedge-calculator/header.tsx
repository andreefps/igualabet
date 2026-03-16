"use client";

import { Calculator, RotateCcw } from "lucide-react";
import { ThemeSwitcher } from "./theme-switcher";
import { LanguageSwitcher } from "./language-switcher";
import { useI18n } from "@/hooks/use-i18n";

interface HeaderProps {
  onReset: () => void;
}

export const Header = ({ onReset }: HeaderProps) => {
  const { t } = useI18n();

  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-primary rounded-2xl text-primary-foreground shadow-sm">
          <Calculator className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {t("header.appName")}
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {t("header.tagline")}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <button
          onClick={onReset}
          className="p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          aria-label={t("actions.reset")}
          title={t("actions.reset")}
        >
          <RotateCcw className="h-4 w-4" />
        </button>
        <LanguageSwitcher />
        <ThemeSwitcher />
      </div>
    </header>
  );
};
