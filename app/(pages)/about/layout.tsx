import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About University of Wisdom - Our Story & Mission",
  description:
    "Learn about the University of Wisdom and Understanding. Discover our mission to provide street intelligence, financial wisdom, and life skills to young people across Nigeria and beyond.",
  keywords: [
    "about university of wisdom",
    "GehGeh university story",
    "wisdom education mission",
    "street intelligence training",
    "financial literacy Nigeria",
    "life skills certification",
    "community building",
    "personal development Nigeria",
  ],
  openGraph: {
    title: "About University of Wisdom - Our Story & Mission",
    description:
      "Learn about the University of Wisdom and Understanding. Discover our mission to provide street intelligence, financial wisdom, and life skills.",
    url: "https://uow.victorola.dev/about",
    images: [
      {
        url: "https://uow.victorola.dev/images/logo.png",
        width: 1200,
        height: 630,
        alt: "About University of Wisdom and Understanding",
      },
    ],
  },
  twitter: {
    title: "About University of Wisdom - Our Story & Mission",
    description:
      "Learn about the University of Wisdom and Understanding. Discover our mission to provide street intelligence, financial wisdom, and life skills.",
  },
  alternates: {
    canonical: "https://uow.victorola.dev/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
