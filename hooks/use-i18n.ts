"use client";

import { useState, useEffect, useCallback, createContext, useContext } from "react";

export type Locale = "en" | "pt-br" | "es" | "fr";

const LOCALES: Locale[] = ["en", "pt-br", "es", "fr"];

const LOCALE_LABELS: Record<Locale, string> = {
  en: "EN",
  "pt-br": "PT",
  es: "ES",
  fr: "FR",
};

interface Translations {
  [key: string]: Record<Locale, string>;
}

const translations: Translations = {
  // Header
  "header.appName": {
    en: "IgualaBet",
    "pt-br": "IgualaBet",
    es: "IgualaBet",
    fr: "IgualaBet",
  },
  "header.tagline": {
    en: "Compare bets and lock in profit",
    "pt-br": "Compare apostas e garanta seu lucro",
    es: "Compara apuestas y asegura tu ganancia",
    fr: "Comparez vos paris et verrouillez vos profits",
  },

  // Settings
  "settings.oddsFormat": {
    en: "Odds Format",
    "pt-br": "Formato das Odds",
    es: "Formato de Cuotas",
    fr: "Format des Cotes",
  },
  "settings.bothCanLose": {
    en: "Both can lose",
    "pt-br": "Ambas podem perder",
    es: "Ambas pueden perder",
    fr: "Les deux peuvent perdre",
  },
  "settings.decimal": {
    en: "Decimal",
    "pt-br": "Decimal",
    es: "Decimal",
    fr: "Décimal",
  },
  "settings.american": {
    en: "American",
    "pt-br": "Americano",
    es: "Americano",
    fr: "Américain",
  },

  // Bet Input
  "bet.firstBet": {
    en: "First Bet",
    "pt-br": "Primeira Aposta",
    es: "Primera Apuesta",
    fr: "Premier Pari",
  },
  "bet.secondBet": {
    en: "Second Bet",
    "pt-br": "Segunda Aposta",
    es: "Segunda Apuesta",
    fr: "Deuxième Pari",
  },
  "bet.hedgeOdds": {
    en: "Cover Bet",
    "pt-br": "Contra-aposta",
    es: "Contra-apuesta",
    fr: "Pari Opposé",
  },
  "bet.label": {
    en: "Label",
    "pt-br": "Nome",
    es: "Nombre",
    fr: "Nom",
  },
  "bet.odds": {
    en: "Odds",
    "pt-br": "Odds",
    es: "Cuotas",
    fr: "Cotes",
  },
  "bet.stake": {
    en: "Stake",
    "pt-br": "Valor",
    es: "Apuesta",
    fr: "Mise",
  },
  "bet.teamA": {
    en: "Team A",
    "pt-br": "Time A",
    es: "Equipo A",
    fr: "Équipe A",
  },
  "bet.teamB": {
    en: "Team B",
    "pt-br": "Time B",
    es: "Equipo B",
    fr: "Équipe B",
  },

  // Bet Tabs
  "tabs.manualEntry": {
    en: "Manual Entry",
    "pt-br": "Entrada Manual",
    es: "Entrada Manual",
    fr: "Saisie Manuelle",
  },
  "tabs.hedgeOptimizer": {
    en: "Auto Optimizer",
    "pt-br": "Otimizador",
    es: "Optimizador",
    fr: "Optimiseur",
  },
  "tabs.availableOdds": {
    en: "Opposing Odds",
    "pt-br": "Odds Opostas",
    es: "Cuotas Opuestas",
    fr: "Cotes Opposées",
  },
  "tabs.optimizerHint": {
    en: "Enter the opposing odds and we'll find the best stake for you",
    "pt-br": "Insira as odds opostas e encontraremos o melhor valor para você",
    es: "Ingresa las cuotas opuestas y encontraremos la mejor apuesta para ti",
    fr: "Entrez les cotes opposées et nous trouverons la meilleure mise pour vous",
  },

  // Results
  "results.scenarios": {
    en: "Scenarios",
    "pt-br": "Cenários",
    es: "Escenarios",
    fr: "Scénarios",
  },
  "results.recommendations": {
    en: "Recommendations",
    "pt-br": "Recomendações",
    es: "Recomendaciones",
    fr: "Recommandations",
  },
  "results.return": {
    en: "Return",
    "pt-br": "Retorno",
    es: "Retorno",
    fr: "Retour",
  },
  "results.profit": {
    en: "Profit",
    "pt-br": "Lucro",
    es: "Ganancia",
    fr: "Profit",
  },
  "results.bothLose": {
    en: "Both Lose",
    "pt-br": "Ambas Perdem",
    es: "Ambas Pierden",
    fr: "Les Deux Perdent",
  },
  "results.wins": {
    en: "wins",
    "pt-br": "vence",
    es: "gana",
    fr: "gagne",
  },
  "results.recommendedStake": {
    en: "Suggested Bet",
    "pt-br": "Valor Sugerido",
    es: "Apuesta Sugerida",
    fr: "Mise Suggérée",
  },
  "results.totalStake": {
    en: "Total Invested",
    "pt-br": "Total Investido",
    es: "Total Invertido",
    fr: "Total Investi",
  },
  "results.bestOutcome": {
    en: "Best Outcome",
    "pt-br": "Melhor Resultado",
    es: "Mejor Resultado",
    fr: "Meilleur Résultat",
  },
  "results.recommended": {
    en: "Recommended",
    "pt-br": "Recomendado",
    es: "Recomendado",
    fr: "Recommandé",
  },

  // Strategies
  "strategy.guaranteedProfit": {
    en: "Guaranteed Profit",
    "pt-br": "Lucro Garantido",
    es: "Ganancia Garantizada",
    fr: "Profit Garanti",
  },
  "strategy.guaranteedProfitDesc": {
    en: "You win no matter what happens",
    "pt-br": "Você ganha independente do resultado",
    es: "Ganas sin importar el resultado",
    fr: "Vous gagnez quel que soit le résultat",
  },
  "strategy.breakEven": {
    en: "Break Even",
    "pt-br": "Empate",
    es: "Punto de Equilibrio",
    fr: "Seuil de Rentabilité",
  },
  "strategy.breakEvenDesc": {
    en: "No loss if the second bet wins, profit if the first wins",
    "pt-br": "Sem perda se a segunda aposta vencer, lucro se a primeira vencer",
    es: "Sin pérdida si la segunda apuesta gana, ganancia si la primera gana",
    fr: "Pas de perte si le deuxième pari gagne, profit si le premier gagne",
  },
  "strategy.minimizeLoss": {
    en: "Minimize Loss",
    "pt-br": "Minimizar Perda",
    es: "Minimizar Pérdida",
    fr: "Minimiser la Perte",
  },
  "strategy.minimizeLossDesc": {
    en: "Reduce your maximum possible loss across both outcomes",
    "pt-br": "Reduza sua perda máxima possível em ambos os resultados",
    es: "Reduce tu pérdida máxima posible en ambos resultados",
    fr: "Réduisez votre perte maximale possible sur les deux résultats",
  },

  // Warning
  "warning.bothLoseTitle": {
    en: "\"Both Lose\" is on",
    "pt-br": "\"Ambas Perdem\" está ativo",
    es: "\"Ambas Pierden\" está activo",
    fr: "\"Les Deux Perdent\" est activé",
  },
  "warning.bothLoseDesc": {
    en: "Make sure both bets can actually lose at the same time (e.g. different matches or a draw is possible).",
    "pt-br":
      "Confirme que ambas as apostas podem realmente perder ao mesmo tempo (ex: jogos diferentes ou empate possível).",
    es: "Asegúrate de que ambas apuestas puedan realmente perder al mismo tiempo (ej: partidos diferentes o empate posible).",
    fr: "Assurez-vous que les deux paris peuvent réellement perdre en même temps (ex : matchs différents ou match nul possible).",
  },

  // Theme
  "theme.toggle": {
    en: "Toggle theme",
    "pt-br": "Alternar tema",
    es: "Cambiar tema",
    fr: "Changer le thème",
  },

  // Language
  "language.toggle": {
    en: "Change language",
    "pt-br": "Mudar idioma",
    es: "Cambiar idioma",
    fr: "Changer la langue",
  },

  // Actions
  "actions.reset": {
    en: "Reset",
    "pt-br": "Limpar",
    es: "Reiniciar",
    fr: "Réinitialiser",
  },
  "actions.copy": {
    en: "Copy",
    "pt-br": "Copiar",
    es: "Copiar",
    fr: "Copier",
  },
  "actions.copied": {
    en: "Copied!",
    "pt-br": "Copiado!",
    es: "¡Copiado!",
    fr: "Copié !",
  },

  // Tooltips
  "tooltip.oddsDecimal": {
    en: "Decimal odds represent the total payout per unit staked (e.g. 2.50 means 2.50x return)",
    "pt-br":
      "Odds decimais representam o pagamento total por unidade apostada (ex: 2.50 significa 2.50x de retorno)",
    es: "Las cuotas decimales representan el pago total por unidad apostada (ej: 2.50 significa 2.50x de retorno)",
    fr: "Les cotes décimales représentent le paiement total par unité misée (ex : 2.50 signifie 2.50x de retour)",
  },
  "tooltip.oddsAmerican": {
    en: "American odds: positive (+150) shows profit on 100 bet, negative (-110) shows how much to bet to win 100",
    "pt-br":
      "Odds americanas: positivas (+150) mostram lucro em aposta de 100, negativas (-110) mostram quanto apostar para ganhar 100",
    es: "Cuotas americanas: positivas (+150) muestran ganancia en apuesta de 100, negativas (-110) muestran cuánto apostar para ganar 100",
    fr: "Cotes américaines : positives (+150) montrent le profit sur un pari de 100, négatives (-110) montrent combien miser pour gagner 100",
  },
  "tooltip.stake": {
    en: "How much money you're betting on this outcome",
    "pt-br": "Quanto dinheiro você está apostando neste resultado",
    es: "Cuánto dinero estás apostando en este resultado",
    fr: "Combien d'argent vous pariez sur ce résultat",
  },
  "tooltip.bothCanLose": {
    en: "Turn on if it's possible for both bets to lose (e.g. they're on different matches or a draw can happen)",
    "pt-br":
      "Ative se for possível ambas as apostas perderem (ex: jogos diferentes ou empate possível)",
    es: "Activa si es posible que ambas apuestas pierdan (ej: partidos diferentes o empate posible)",
    fr: "Activez si les deux paris peuvent perdre (ex : matchs différents ou match nul possible)",
  },
};

function isValidLocale(value: string): value is Locale {
  return LOCALES.includes(value as Locale);
}

function detectLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const saved = localStorage.getItem("hedge-calc-locale");
  if (saved && isValidLocale(saved)) return saved;

  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith("pt")) return "pt-br";
  if (browserLang.startsWith("es")) return "es";
  if (browserLang.startsWith("fr")) return "fr";
  return "en";
}

interface I18nContextValue {
  locale: Locale;
  locales: Locale[];
  localeLabels: Record<Locale, string>;
  t: (key: string) => string;
  setLocale: (locale: Locale) => void;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export { I18nContext, LOCALES, LOCALE_LABELS, detectLocale, translations };
export type { I18nContextValue };

export const useI18n = (): I18nContextValue => {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return ctx;
};
