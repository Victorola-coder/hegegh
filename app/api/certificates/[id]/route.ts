import QRCode from "qrcode";
import dayjs from "dayjs";
// import { Resvg } from "@resvg/resvg-js"; // Temporarily disabled due to native binding issues
import { NextRequest, NextResponse } from "next/server";

/**
 * === CONFIG ===
 * - Pass your assets via query params:
 *   ?logo=<URL or data:URL>
 *   ?sig1=<URL or data:URL>   (Chancellor)
 *   ?sig2=<URL or data:URL>   (Registrar)
 * - Toggle QR: ?qr=true|false  (default false to match your mock)
 * - Theme: ?theme=light|dark|royal
 * - Format: ?format=svg|png
 */

const ORIGIN =
  process.env.NEXT_PUBLIC_APP_URL ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");

const THEMES = {
  light: {
    bg: "#FFFFFF",
    ivory: "#FDFBF7",
    navy: "#0F1A2A",
    ink: "#111827",
    muted: "#6B7280",
    strokeSoft: "#E5E7EB",
    goldStops: ["#F6E27A", "#D4AF37", "#B8860B"],
    ribbonFill: "#0F1A2A",
  },
  dark: {
    bg: "#0B0E14",
    ivory: "#0F172A",
    navy: "#E5E7EB",
    ink: "#E5E7EB",
    muted: "#94A3B8",
    strokeSoft: "#1F2937",
    goldStops: ["#EAB308", "#A16207", "#854D0E"],
    ribbonFill: "#111827",
  },
  royal: {
    bg: "#FFFFFF",
    ivory: "#F5F3FF",
    navy: "#1E1B4B",
    ink: "#0F172A",
    muted: "#475569",
    strokeSoft: "#E2E8F0",
    goldStops: ["#C4B5FD", "#A78BFA", "#8B5CF6"], // purple twist
    ribbonFill: "#1E1B4B",
  },
};

function escapeXML(s = "") {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function certificateSVG({
  theme = "light",
  studentName = "VickyJay",
  certLevel = "Bachelor of Financial Wisdom",
  module = "Financial Wisdom 101",
  score = "4.35 / 5.00",
  date = dayjs().format("Do MMMM, YYYY"),
  certId = "UWU-2025-08-20-AX93K7",
  logoURL = "/images/logo.png",
  sig1URL = "/images/signature.png", // Chancellor
  sig2URL = "", // Registrar
  qrDataURL = "", // optional
  withQR = false,
}) {
  const t = THEMES[theme as keyof typeof THEMES] || THEMES.light;

  const qrBlock = withQR
    ? `
  <g transform="translate(1180,740)">
    <rect x="-100" y="-100" width="160" height="160" rx="12" fill="#FFFFFF" stroke="${t.strokeSoft}" stroke-width="2"/>
    <image href="${qrDataURL}" x="-92" y="-92" width="144" height="144" />
  </g>`
    : "";

  return `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!-- GehGeh University of Wisdom & Understanding – Certificate (updated) -->
<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1100" viewBox="0 0 1600 1100">
  <defs>
    <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${t.goldStops[0]}"/>
      <stop offset="50%" stop-color="${t.goldStops[1]}"/>
      <stop offset="100%" stop-color="${t.goldStops[2]}"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="6" stdDeviation="10" flood-color="#000" flood-opacity="0.18"/>
    </filter>
    <style>
      .brand { font-family: "Georgia", "Times New Roman", serif; }
      .serif { font-family: "Georgia", "Times New Roman", serif; }
      .sans  { font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial; }
      .muted { fill: ${t.muted}; }
      .label { fill: ${
        t.muted
      }; letter-spacing: .08em; text-transform: uppercase; }
      .navy  { fill: ${t.navy}; }
      .ink   { fill: ${t.ink}; }
      .ivory { fill: ${t.ivory}; }
      .strokeSoft { stroke: ${t.strokeSoft}; }
    </style>
  </defs>

  <!-- Background + borders -->
  <rect x="0" y="0" width="1600" height="1100" fill="${t.bg}"/>
  <rect x="20" y="20" width="1560" height="1060" rx="20" fill="none" stroke="url(#goldGrad)" stroke-width="10"/>
  <rect x="40" y="40" width="1520" height="1020" rx="18" fill="${
    t.bg
  }" stroke="#EAEAEA" stroke-width="2"/>

  <!-- Big faint circle backdrop -->
  <g opacity=".35">
    <circle cx="820" cy="640" r="420" class="ivory"/>
  </g>

  <!-- Crest/logo ring + logo -->
  <g transform="translate(100,70)">
    <circle r="65" cx="80" cy="80" fill="${
      t.bg
    }" stroke="url(#goldGrad)" stroke-width="8"/>
    ${
      logoURL
        ? `<image href="${logoURL}" x="30" y="30" width="100" height="100" preserveAspectRatio="xMidYMid meet"/>`
        : ``
    }
  </g>

  <!-- Title -->
  <g transform="translate(0,70)">
    <text x="800" y="64" class="brand navy" style="font-size:60px; font-weight:700;" text-anchor="middle">
      GehGeh University of Wisdom and
    </text>
    <text x="800" y="122" class="brand navy" style="font-size:60px; font-weight:700;" text-anchor="middle">
      Understanding
    </text>
  </g>

  <!-- Ribbon moved DOWN and WIDER -->
  <g transform="translate(0,212)">
    <rect x="520" y="0" width="560" height="56" rx="16" fill="${
      t.ribbonFill
    }" filter="url(#shadow)"/>
    <text x="800" y="36" class="sans" fill="#FFFFFF" text-anchor="middle" style="font-size:20px; letter-spacing:.1em;">
      ADMISSION BOARD • FACULTY OF LIFE MASTERY
    </text>
  </g>

  <!-- Motto -->
  <text x="800" y="292" class="sans muted" text-anchor="middle" style="font-size:18px;">
    "Real lessons. Real assets."
  </text>

  <!-- Recipient -->
  <g transform="translate(0,352)">
    <text x="800" y="56" class="label sans" text-anchor="middle" style="font-size:14px;">THIS CERTIFIES THAT</text>
    <text x="800" y="120" class="brand navy" text-anchor="middle" style="font-size:76px; font-weight:700;">
      ${escapeXML(studentName)}
    </text>
    <line x1="300" y1="140" x2="1300" y2="140" class="strokeSoft" stroke-width="2"/>
  </g>

  <!-- Award details -->
  <g transform="translate(120,520)">
    <text x="0" y="0" class="label sans" style="font-size:14px;">HAS BEEN AWARDED</text>
    <text x="0" y="46" class="serif" style="font-size:38px; font-weight:700; fill:${
      t.ink
    };">
      ${escapeXML(certLevel)}
    </text>
    <text x="0" y="112" class="label sans" style="font-size:14px;">IN</text>
    <text x="0" y="158" class="serif ink" style="font-size:34px;">
      ${escapeXML(module)}
    </text>
  </g>

  <!-- Score & Date card -->
  <g transform="translate(1000,520)">
    <rect x="0" y="0" width="480" height="220" rx="16" fill="${
      t.bg
    }" class="strokeSoft" stroke-width="2" filter="url(#shadow)"/>
    <text x="30" y="46" class="label sans" style="font-size:13px;">WISDOM SCORE</text>
    <text x="30" y="98" class="serif navy" style="font-size:40px; font-weight:700;">${escapeXML(
      score
    )}</text>
    <text x="30" y="142" class="label sans" style="font-size:13px;">DATE</text>
    <text x="30" y="178" class="sans ink" style="font-size:20px;">${escapeXML(
      date
    )}</text>
  </g>

  <!-- Seal -->
  <g transform="translate(1270,775)">
    <circle r="82" fill="${t.bg}" stroke="url(#goldGrad)" stroke-width="8"/>
    <circle r="64" fill="url(#goldGrad)" opacity=".18"/>
    <text y="-6" text-anchor="middle" class="brand muted" style="font-size:16px;">OFFICIAL SEAL</text>
    <text y="22" text-anchor="middle" class="sans navy" style="font-size:16px; font-weight:700;">U W &amp; U</text>
  </g>

  <!-- Signatures -->
  <g transform="translate(120,840)">
    ${
      sig1URL
        ? `<image href="${sig1URL}" x="0" y="-54" width="230" height="76" preserveAspectRatio="xMidYMid meet"/>`
        : ""
    }
    <line x1="0" y1="0" x2="360" y2="0" class="strokeSoft" stroke-width="2"/>
    <text x="0" y="28" class="sans ink" style="font-size:16px;">GehGeh</text>
    <text x="0" y="50" class="sans muted" style="font-size:13px;">Chancellor</text>
  </g>

  <g transform="translate(560,840)">
    ${
      sig2URL
        ? `<image href="${sig2URL}" x="0" y="-54" width="230" height="76" preserveAspectRatio="xMidYMid meet"/>`
        : ""
    }
    <line x1="0" y1="0" x2="360" y2="0" class="strokeSoft" stroke-width="2"/>
    <text x="0" y="28" class="sans ink" style="font-size:16px;">Registrar</text>
    <text x="0" y="50" class="sans muted" style="font-size:13px;">Admissions &amp; Records</text>
  </g>

  ${qrBlock}

  <!-- Footer meta -->
  <text x="120" y="1000" class="sans muted" style="font-size:13px;">
    ${escapeXML(certId)}
  </text>
</svg>`;
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await context.params;
    const { id } = resolvedParams;
    const { searchParams } = new URL(request.url);

    const {
      name = "VickyJay",
      level = "Bachelor of Financial Wisdom",
      module = "Financial Wisdom 101",
      score = "4.35 / 5.00",
      date = dayjs().format("Do MMMM, YYYY"),
      theme = "light",
      format = "svg",
      logo = "", // URL or data:URL
      sig1 = "", // URL or data:URL (Chancellor)
      sig2 = "", // URL or data:URL (Registrar)
      qr = "false", // "true" to include QR
    } = Object.fromEntries(searchParams);

    const withQR = qr === "true";

    // Build QR only if requested
    let qrDataURL = "";
    if (withQR) {
      const verifyUrl = `${ORIGIN}/verify/${encodeURIComponent(id)}`;
      qrDataURL = await QRCode.toDataURL(verifyUrl, {
        margin: 0,
        scale: 6,
        errorCorrectionLevel: "M",
        color: { dark: "#000000", light: "#FFFFFF" },
      });
    }

    const svg = certificateSVG({
      theme,
      studentName: name,
      certLevel: level,
      module,
      score,
      date,
      certId: id,
      logoURL: logo,
      sig1URL: sig1,
      sig2URL: sig2 || sig1, // fallback: use the same signature for both if only one provided
      qrDataURL,
      withQR,
    });

    if (format === "png") {
      // PNG generation is now handled client-side with html2canvas
      return NextResponse.json(
        {
          error:
            "PNG generation is handled client-side. Please use the download button on the certificate page.",
        },
        { status: 503 }
      );
    }

    return new NextResponse(svg, {
      headers: {
        "Content-Type": "image/svg+xml; charset=utf-8",
        "Content-Disposition": `inline; filename="${id}.svg"`,
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to generate certificate" },
      { status: 500 }
    );
  }
}
