import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;

  return {
    title: `Student Certificate - University of Wisdom`,
    description: `View and download your wisdom certificate from the University of Wisdom and Understanding.`,
    keywords: [
      "wisdom certificate",
      "university of wisdom certificate",
      "student certificate",
      "wisdom degree",
      "certificate download",
      "GehGeh university certificate",
    ],
    openGraph: {
      title: `Student Certificate - University of Wisdom`,
      description: `View and download your wisdom certificate from the University of Wisdom and Understanding.`,
      url: `https://uow.victorola.dev/student/${resolvedParams.id}`,
      images: [
        {
          url: "https://uow.victorola.dev/images/logo.png",
          width: 1200,
          height: 630,
          alt: "University of Wisdom Certificate",
        },
      ],
    },
    twitter: {
      title: `Student Certificate - University of Wisdom`,
      description: `View and download your wisdom certificate from the University of Wisdom and Understanding.`,
    },
    alternates: {
      canonical: `https://uow.victorola.dev/student/${resolvedParams.id}`,
    },
  };
}

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
