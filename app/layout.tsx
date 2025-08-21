import "./global.css";
import { Toaster } from "sonner";
import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Footer, Header } from "./components/atom";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import {
  OrganizationStructuredData,
  WebSiteStructuredData,
} from "./components/global";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const viewport: Viewport = {
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://uow.victorola.dev"),
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  title: "University of Wisdom and Understanding - Get Your Certificate",
  description:
    "Join the University of Wisdom and Understanding. Get certified in life skills, financial wisdom, and street intelligence. Enroll now and get your certificate!",
  applicationName: "University of Wisdom and Understanding",
  authors: [{ name: "VickyJay", url: "https://twitter.com/heyVickyJay" }],
  keywords: [
    "wisdom",
    "understanding",
    "certificate",
    "university",
    "Nigeria",
    "life skills",
    "financial wisdom",
    "street intelligence",
    "GehGeh",
    "certification",
    "education",
    "personal growth",
    "mindset",
    "wealth building",
    "discipline",
    "assets",
    "generational wealth",
    "online education",
    "certificate program",
    "life coaching",
    "financial literacy",
    "personal development",
  ],
  creator: "GehGeh",
  publisher: "University of Wisdom and Understanding",
  generator: "Next.js",
  referrer: "origin",
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
  openGraph: {
    type: "website",
    url: "https://uow.victorola.dev",
    title: "University of Wisdom and Understanding - Get Your Certificate",
    description:
      "Join the University of Wisdom and Understanding. Get certified in life skills, financial wisdom, and street intelligence. Enroll now and get your certificate!",
    siteName: "University of Wisdom and Understanding",
    locale: "en_US",
    images: [
      {
        url: "https://uow.victorola.dev/images/logo.png",
        width: 1200,
        height: 630,
        alt: "University of Wisdom and Understanding",
      },
    ],
  },
  twitter: {
    site: "@heyVickyJay",
    creator: "@heyVickyJay",
    title: "University of Wisdom and Understanding - Get Your Certificate",
    description:
      "Join the University of Wisdom and Understanding. Get certified in life skills, financial wisdom, and street intelligence.",
    card: "summary_large_image",
    images: ["https://uow.victorola.dev/images/logo.png"],
  },
  appleWebApp: {
    capable: true,
    title: "University of Wisdom and Understanding",
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: false,
  },
  abstract:
    "Join the University of Wisdom and Understanding. Get certified in life skills, financial wisdom, and street intelligence.",
  category: "Education",
  classification: "Education",
  alternates: {
    canonical: "https://uow.victorola.dev",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <OrganizationStructuredData />
        <WebSiteStructuredData />
      </head>
      <body
        className={`${plusJakartaSans.className} ${inter.variable} antialiased`}
      >
        <Toaster richColors />
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
