import dayjs from "dayjs";
import QRCode from "qrcode";
import { NextRequest, NextResponse } from "next/server";
// import { Resvg } from "@resvg/resvg-js"; // Temporarily disabled due to native binding issues

const ORIGIN =
  process.env.NEXT_PUBLIC_APP_URL || process.env.VERCEL_URL?.startsWith("http")
    ? process.env.VERCEL_URL
    : `https://${process.env.VERCEL_URL || "localhost:3000"}`;

const THEMES = {
  light: {
    bg: "#FDFBF7",
    ribbonFrom: "#004225",
    ribbonTo: "#002D1A",
    goldStops: ["#CFAE35", "#B8860B", "#8B6914"],
    titleFill: "url(#goldGrad)",
    bodyText: "#333333",
    muted: "#666666",
    cardStroke: "#E5E7EB",
  },
  dark: {
    bg: "#1A1A1A",
    ribbonFrom: "#004225",
    ribbonTo: "#002D1A",
    goldStops: ["#CFAE35", "#B8860B", "#8B6914"],
    titleFill: "#CFAE35",
    bodyText: "#FDFBF7",
    muted: "#CCCCCC",
    cardStroke: "#333333",
  },
  royal: {
    bg: "#F8F7FF",
    ribbonFrom: "#004225",
    ribbonTo: "#002D1A",
    goldStops: ["#CFAE35", "#B8860B", "#8B6914"],
    titleFill: "#004225",
    bodyText: "#333333",
    muted: "#666666",
    cardStroke: "#E2E8F0",
  },
};

function certificateSVG({
  theme = "light",
  studentName = "John Doe",
  certLevel = "Bachelor of Financial Wisdom",
  module = "Financial Wisdom 101",
  score = "4.35 / 5.00",
  date = dayjs().format("YYYY-MM-DD"),
  certId = "UWU-2025-08-20-AX93K7",
  qrDataURL = "",
}) {
  const t = THEMES[theme as keyof typeof THEMES] || THEMES.light;

  return `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1100" viewBox="0 0 1600 1100">
  <defs>
    <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${t.goldStops[0]}"/>
      <stop offset="50%" stop-color="${t.goldStops[1]}"/>
      <stop offset="100%" stop-color="${t.goldStops[2]}"/>
    </linearGradient>
    <linearGradient id="ribbonGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${t.ribbonFrom}"/>
      <stop offset="100%" stop-color="${t.ribbonTo}"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="6" stdDeviation="10" flood-color="#000" flood-opacity="0.25"/>
    </filter>
    <style>
      .brand { font-family: "Georgia", "Times New Roman", serif; }
      .sans { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif; }
      .serif { font-family: "Georgia", "Times New Roman", serif; }
      .mono  { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; }
      .muted { fill: ${t.muted}; }
      .label { fill: ${
        t.bodyText
      }; opacity: 0.8; letter-spacing: 0.08em; text-transform: uppercase; }
    </style>
  </defs>

  <rect x="0" y="0" width="1600" height="1100" fill="${t.bg}"/>
  <rect x="40" y="40" width="1520" height="1020" fill="none" stroke="url(#goldGrad)" stroke-width="8" rx="24"/>
  <rect x="60" y="60" width="1480" height="980" fill="none" stroke="${
    t.cardStroke
  }" stroke-width="2" rx="20"/>

  <g opacity="0.06">
    <circle cx="800" cy="550" r="420" fill="url(#goldGrad)"/>
  </g>

  <g transform="translate(200,160)" text-anchor="middle">
    <g transform="translate(600,0) scale(1)">
      <circle cx="0" cy="0" r="56" fill="white" stroke="url(#goldGrad)" stroke-width="4" filter="url(#shadow)"/>
      <g transform="translate(0,2)">
        <path d="M -22 -6 L 0 -30 L 22 -6 L 0 18 Z" fill="url(#goldGrad)"/>
        <circle cx="0" cy="20" r="6" fill="url(#goldGrad)"/>
      </g>
    </g>
    <text x="600" y="120" class="brand" style="font-size:54px; font-weight:700; fill:${
      t.titleFill
    };">UNIVERSITY OF WISDOM &amp; UNDERSTANDING</text>
    <text x="600" y="160" class="sans muted" style="font-size:18px;">"Real lessons. Real assets."</text>
  </g>

  <g transform="translate(200,240)">
    <rect x="0" y="0" width="1200" height="58" rx="12" fill="url(#ribbonGrad)" filter="url(#shadow)"/>
    <text x="600" y="38" text-anchor="middle" class="sans" fill="#FFFFFF" style="font-size:22px; letter-spacing:0.1em;">
      ADMISSION BOARD • FACULTY OF LIFE MASTERY
    </text>
  </g>

  <g transform="translate(160,390)">
    <text class="label sans" x="640" y="0" text-anchor="middle" style="font-size:16px;">THIS CERTIFIES THAT</text>
    <text id="studentName" class="brand" x="640" y="72" text-anchor="middle" style="font-size:72px; fill:${
      t.bodyText
    };">
      ${escapeXML(studentName)}
    </text>
    <line x1="260" y1="86" x2="1020" y2="86" stroke="${
      t.cardStroke
    }" stroke-width="2"/>
  </g>

  <g transform="translate(160,520)">
    <text class="label sans" x="0" y="0" style="font-size:16px;">HAS BEEN AWARDED</text>
    <text id="certLevel" class="serif" x="0" y="52" style="font-size:40px; font-weight:700; fill:url(#goldGrad);">
      ${escapeXML(certLevel)}
    </text>

    <text class="label sans" x="0" y="110" style="font-size:16px;">IN</text>
    <text id="module" class="serif" x="0" y="160" style="font-size:36px; fill:${
      t.bodyText
    };">
      ${escapeXML(module)}
    </text>
  </g>

  <g transform="translate(980,510)">
    <rect x="0" y="0" width="420" height="200" rx="16" fill="#FFFFFF" stroke="${
      t.cardStroke
    }" stroke-width="2" filter="url(#shadow)"/>
    <text class="label sans" x="32" y="48" style="font-size:14px;">WISDOM SCORE</text>
    <text id="score" class="serif" x="32" y="98" style="font-size:36px; fill:${
      t.bodyText
    };">${escapeXML(score)}</text>
    <text class="label sans" x="32" y="148" style="font-size:14px;">DATE</text>
    <text id="date" class="sans" x="32" y="178" style="font-size:20px; fill:${
      t.bodyText
    };">${escapeXML(date)}</text>
  </g>

  <g transform="translate(1180,740)">
    <rect x="-100" y="-100" width="160" height="160" rx="12" fill="#FFFFFF" stroke="${
      t.cardStroke
    }" stroke-width="2" filter="url(#shadow)"/>
    <image xlink:href="${qrDataURL}" x="-92" y="-92" width="144" height="144" />

    <g transform="translate(120,0)">
      <circle cx="0" cy="0" r="78" fill="white" stroke="url(#goldGrad)" stroke-width="6" filter="url(#shadow)"/>
      <circle cx="0" cy="0" r="60" fill="url(#goldGrad)" opacity="0.2"/>
      <text x="0" y="-6" text-anchor="middle" class="brand" style="font-size:16px; fill:${
        t.muted
      };">OFFICIAL SEAL</text>
      <text x="0" y="20" text-anchor="middle" class="mono" style="font-size:14px; fill:${
        t.bodyText
      };">U W &amp; U</text>
    </g>
  </g>

  <g transform="translate(200,820)">
    <line x1="0" y1="0" x2="360" y2="0" stroke="${
      t.cardStroke
    }" stroke-width="2"/>
    <text x="0" y="24" class="sans" style="font-size:16px; fill:${
      t.bodyText
    };">GehGeh</text>
    <text x="0" y="46" class="muted sans" style="font-size:14px;">Chancellor</text>
  </g>

  <g transform="translate(600,820)">
    <line x1="0" y1="0" x2="360" y2="0" stroke="${
      t.cardStroke
    }" stroke-width="2"/>
    <text x="0" y="24" class="sans" style="font-size:16px; fill:${
      t.bodyText
    };">Registrar</text>
    <text x="0" y="46" class="muted sans" style="font-size:14px;">Admissions &amp; Records</text>
  </g>

  <g transform="translate(200,950)">
    <text class="mono" style="font-size:14px; fill:${t.muted};">
      Certificate ID: ${escapeXML(certId)} • Verify at: ${(
    ORIGIN || "localhost:3000"
  ).replace(/^https?:\/\//, "https://")}/verify/${encodeURIComponent(certId)}
    </text>
  </g>
</svg>`;
}

function escapeXML(s = "") {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const {
      name = "John Doe",
      level = "Bachelor of Financial Wisdom",
      module = "Financial Wisdom 101",
      score = "4.35 / 5.00",
      date = dayjs().format("YYYY-MM-DD"),
      theme = "light",
      format = "svg",
    } = Object.fromEntries(searchParams);

    const { id } = params;

    const base = (ORIGIN || "localhost:3000").startsWith("http")
      ? ORIGIN
      : `https://${ORIGIN || "localhost:3000"}`;
    const verifyUrl = `${base}/verify/${encodeURIComponent(id)}`;

    const qrDataURL = await QRCode.toDataURL(verifyUrl, {
      margin: 0,
      scale: 6,
      errorCorrectionLevel: "M",
      color: { dark: "#000000", light: "#FFFFFF" },
    });

    const svg = certificateSVG({
      theme,
      studentName: name,
      certLevel: level,
      module,
      score,
      date,
      certId: id,
      qrDataURL,
    });

    if (format === "png") {
      return NextResponse.json(
        {
          error:
            "PNG generation temporarily unavailable. Please use SVG format.",
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
