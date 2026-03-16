import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { I18nProvider } from "@/components/i18n-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const siteUrl = "https://igualabet.com";
const siteName = "IgualaBet";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "IgualaBet - Free Hedge Betting Calculator & Optimizer",
    template: "%s | IgualaBet",
  },
  description:
    "Free hedge betting calculator to guarantee profit from sports bets. Calculate optimal hedge stakes, lock in guaranteed returns, and minimize risk across all betting scenarios. Supports decimal & American odds.",
  keywords: [
    "hedge betting calculator",
    "hedge bet calculator",
    "hedging calculator",
    "sports betting calculator",
    "arbitrage betting calculator",
    "guaranteed profit betting",
    "bet hedging tool",
    "stake calculator",
    "hedge optimizer",
    "free betting calculator",
    "betting odds calculator",
    "american odds calculator",
    "decimal odds calculator",
    "sure bet calculator",
    "lock in profit betting",
    "calculadora de apostas",
    "calculadora hedge betting",
    "calculadora de apostas esportivas",
    "calculadora de apuestas",
    "calculadora de cobertura de apuestas",
    "apuestas deportivas calculadora",
    "calculateur paris sportifs",
    "calculateur de couverture",
    "pari couverture calculateur",
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  applicationName: siteName,
  category: "Sports Betting Tools",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["pt_BR", "es_ES", "fr_FR"],
    url: siteUrl,
    siteName,
    title: "IgualaBet - Free Hedge Betting Calculator & Optimizer",
    description:
      "Calculate optimal hedge stakes and guarantee profit from your sports bets. Free tool with decimal & American odds support.",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "IgualaBet - Free Hedge Betting Calculator",
    description:
      "Calculate optimal hedge stakes and guarantee profit from your sports bets. Free, fast, and easy to use.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "IgualaBet",
              alternateName: "Hedge Betting Calculator",
              url: siteUrl,
              description:
                "Free hedge betting calculator to guarantee profit from sports bets. Calculate optimal hedge stakes and minimize risk.",
              applicationCategory: "FinanceApplication",
              operatingSystem: "Any",
              browserRequirements: "Requires a modern web browser",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              featureList: [
                "Hedge betting calculations",
                "Guaranteed profit optimizer",
                "Break-even calculator",
                "Loss minimization",
                "Decimal and American odds support",
                "Multi-language (English, Portuguese, Spanish & French)",
              ],
              inLanguage: ["en", "pt-BR", "es", "fr"],
            }),
          }}
        />
      </head>
      <body className={`${geist.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <I18nProvider>
            <TooltipProvider delayDuration={300}>{children}</TooltipProvider>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
