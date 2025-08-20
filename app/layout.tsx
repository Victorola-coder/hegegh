import "./global.css";
import { Toaster } from "sonner";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import type { Metadata, Viewport } from "next";
import Header from "./components/Header";
import Footer from "./components/Footer";

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
  metadataBase: new URL("https://university-of-wisdom.vercel.app"),
  icons: {
    icon: "/favicon.svg",
  },
  title: "University of Wisdom and Understanding - Get Your Certificate",
  description:
    "Join the University of Wisdom and Understanding. Get certified in life skills, financial wisdom, and street intelligence. Enroll now and get your certificate!",
  applicationName: "University of Wisdom and Understanding",
  authors: [{ name: "GehGeh", url: "https://twitter.com/gehgeh" }],
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
  ],
  creator: "GehGeh",
  publisher: "University of Wisdom and Understanding",
  generator: "Next.js",
  referrer: "origin",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: "https://university-of-wisdom.vercel.app",
    title: "University of Wisdom and Understanding - Get Your Certificate",
    siteName: "University of Wisdom and Understanding",
    locale: "en_US",
    images: [
      {
        url: "https://university-of-wisdom.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "University of Wisdom and Understanding",
      },
    ],
  },
  twitter: {
    site: "university-of-wisdom",
    creator: "gehgeh",
    title: "University of Wisdom and Understanding - Get Your Certificate",
    description:
      "Join the University of Wisdom and Understanding. Get certified in life skills, financial wisdom, and street intelligence.",
    card: "summary_large_image",
    images: ["https://university-of-wisdom.vercel.app/og-image.png"],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${plusJakartaSans.className} ${inter.variable} antialiased`}
      >
        <Toaster richColors />
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
