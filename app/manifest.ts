import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "IgualaBet - Hedge Betting Calculator",
    short_name: "IgualaBet",
    description:
      "Free hedge betting calculator to guarantee profit from sports bets.",
    start_url: "/",
    display: "standalone",
    background_color: "#09090b",
    theme_color: "#16a34a",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
