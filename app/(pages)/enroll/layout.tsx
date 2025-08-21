import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enroll at University of Wisdom - Get Your Certificate Today",
  description:
    "Enroll at the University of Wisdom and Understanding. Choose from 25+ wisdom modules including financial literacy, street intelligence, and life skills. Get certified instantly!",
  keywords: [
    "enroll university of wisdom",
    "wisdom certificate program",
    "financial literacy course",
    "street intelligence training",
    "life skills certification",
    "online wisdom education",
    "GehGeh university enrollment",
    "personal development course",
    "wealth building program",
    "mindset transformation",
  ],
  openGraph: {
    title: "Enroll at University of Wisdom - Get Your Certificate Today",
    description:
      "Enroll at the University of Wisdom and Understanding. Choose from 25+ wisdom modules including financial literacy, street intelligence, and life skills.",
    url: "https://uow.victorola.dev/enroll",
    images: [
      {
        url: "https://uow.victorola.dev/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Enroll at University of Wisdom and Understanding",
      },
    ],
  },
  twitter: {
    title: "Enroll at University of Wisdom - Get Your Certificate Today",
    description:
      "Enroll at the University of Wisdom and Understanding. Choose from 25+ wisdom modules including financial literacy, street intelligence, and life skills.",
  },
  alternates: {
    canonical: "https://uow.victorola.dev/enroll",
  },
};

export default function EnrollLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
