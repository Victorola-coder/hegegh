import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "University of Wisdom and Understanding",
    short_name: "UoW",
    description: "Get certified in life skills, financial wisdom, and street intelligence",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#6366f1",
    icons: [
      {
        src: "/favicon.png",
        sizes: "any",
        type: "image/png",
      },
      {
        src: "/images/logo.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
  };
}
