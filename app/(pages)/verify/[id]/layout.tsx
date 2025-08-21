import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;

  return {
    title: `Verify Certificate - University of Wisdom`,
    description: `Verify the authenticity of a wisdom certificate from the University of Wisdom and Understanding.`,
    keywords: [
      "verify certificate",
      "certificate verification",
      "wisdom certificate verification",
      "university of wisdom verification",
      "authenticate certificate",
      "certificate validation",
    ],
    openGraph: {
      title: `Verify Certificate - University of Wisdom`,
      description: `Verify the authenticity of a wisdom certificate from the University of Wisdom and Understanding.`,
      url: `https://uow.victorola.dev/verify/${resolvedParams.id}`,
      images: [
        {
          url: "https://uow.victorola.dev/images/logo.png",
          width: 1200,
          height: 630,
          alt: "Certificate Verification - University of Wisdom",
        },
      ],
    },
    twitter: {
      title: `Verify Certificate - University of Wisdom`,
      description: `Verify the authenticity of a wisdom certificate from the University of Wisdom and Understanding.`,
    },
    alternates: {
      canonical: `https://uow.victorola.dev/verify/${resolvedParams.id}`,
    },
  };
}

export default function VerifyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
