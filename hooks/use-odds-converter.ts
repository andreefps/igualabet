import { useCallback } from "react";

export type OddsFormat = "american" | "decimal";

export const useOddsConverter = () => {
  const toDecimalOdds = useCallback(
    (odds: string, format: OddsFormat): number => {
      const num = Number.parseFloat(odds);
      if (isNaN(num)) return 0;

      if (format === "decimal") {
        return num;
      } else {
        // American odds
        if (num > 0) {
          return num / 100 + 1;
        } else {
          return 100 / Math.abs(num) + 1;
        }
      }
    },
    []
  );

  return { toDecimalOdds };
};
