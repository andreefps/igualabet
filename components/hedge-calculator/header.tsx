"use client";

import { RotateCcw } from "lucide-react";
import { ThemeSwitcher } from "./theme-switcher";
import { LanguageSwitcher } from "./language-switcher";
import { useI18n } from "@/hooks/use-i18n";

interface HeaderProps {
  onReset: () => void;
}

export const Header = ({ onReset }: HeaderProps) => {
  const { t } = useI18n();

  return (
    <header className="flex items-center justify-between animate-fade-in">
      <div className="flex items-center gap-5">
        {/* Logo mark */}
        <div className="relative">
          <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center glow-primary">
            <span className="text-primary-foreground font-bold text-lg tracking-tight">
              iB
            </span>
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {t("header.appName")}
          </h1>
          <p className="text-[13px] text-muted-foreground mt-0.5 tracking-wide">
            {t("header.tagline")}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-0.5">
        <button
          onClick={onReset}
          className="p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-all duration-200"
          aria-label={t("actions.reset")}
          title={t("actions.reset")}
        >
          <RotateCcw className="h-[18px] w-[18px]" />
        </button>
        <div className="w-px h-5 bg-border mx-1" />
        <LanguageSwitcher />
        <ThemeSwitcher />
      </div>
    </header>
  );
};
