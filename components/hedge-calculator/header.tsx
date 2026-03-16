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
    <header className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-primary rounded-xl text-primary-foreground">
          <Calculator className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-xl font-semibold tracking-tight">
            {t("header.appName")}
          </h1>
          <p className="text-sm text-muted-foreground">
            {t("header.tagline")}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <button
          onClick={onReset}
          className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
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
