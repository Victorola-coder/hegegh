import { NextRequest, NextResponse } from "next/server";
import * as Jimp from "jimp";
import { z } from "zod";

const generateCertificateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  department: z.string().min(1, "Department is required"),
  gpa: z.number().min(0).max(5),
  degree: z.string().min(1, "Degree is required"),
  tag: z.string().min(1, "Tag is required"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = generateCertificateSchema.parse(body);

    const { name, department, gpa, degree, tag } = validatedData;

    // Create a new certificate image
    const certificate = await createWisdomCertificate(
      name,
      department,
      gpa,
      degree
    );

    // Convert to base64
    const buffer = await certificate.getBufferAsync(Jimp.MIME_PNG);
    const base64 = buffer.toString("base64");
    const dataUrl = `data:image/png;base64,${base64}`;

    return NextResponse.json({
      certificate: dataUrl,
      success: true,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Error generating certificate:", error);
    return NextResponse.json(
      { error: "Failed to generate certificate" },
      { status: 500 }
    );
  }
}

async function createWisdomCertificate(
  name: string,
  department: string,
  gpa: number,
  degree: string
) {
  // Create a new image with wisdom theme colors
  const width = 1200;
  const height = 800;

  // Create background with gradient effect
  const certificate = new Jimp(width, height, 0xf8fafcff); // Light background

  // Load fonts
  const titleFont = await Jimp.loadFont(Jimp.FONT_SANS_64_BLACK);
  const subtitleFont = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
  const bodyFont = await Jimp.loadFont(Jimp.FONT_SANS_24_BLACK);
  const smallFont = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);

  // Create gradient background effect
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const ratio = y / height;
      const r = Math.floor(248 + ratio * 7); // 248 to 255
      const g = Math.floor(250 + ratio * 5); // 250 to 255
      const b = Math.floor(252 + ratio * 3); // 252 to 255
      const color = Jimp.rgbaToInt(r, g, b, 255);
      certificate.setPixelColor(color, x, y);
    }
  }

  // Add border
  const borderColor = Jimp.rgbaToInt(124, 58, 237, 255); // Purple
  for (let i = 0; i < 8; i++) {
    certificate.setPixelColor(borderColor, i, i);
    certificate.setPixelColor(borderColor, width - 1 - i, i);
    certificate.setPixelColor(borderColor, i, height - 1 - i);
    certificate.setPixelColor(borderColor, width - 1 - i, height - 1 - i);
  }

  // Add corner decorations
  const cornerSize = 60;
  const cornerColor = Jimp.rgbaToInt(245, 158, 11, 255); // Amber

  // Top-left corner
  for (let y = 20; y < 20 + cornerSize; y++) {
    for (let x = 20; x < 20 + cornerSize; x++) {
      if (
        x - 20 < 3 ||
        y - 20 < 3 ||
        x - 20 >= cornerSize - 3 ||
        y - 20 >= cornerSize - 3
      ) {
        certificate.setPixelColor(cornerColor, x, y);
      }
    }
  }

  // Top-right corner
  for (let y = 20; y < 20 + cornerSize; y++) {
    for (let x = width - 20 - cornerSize; x < width - 20; x++) {
      if (
        x - (width - 20 - cornerSize) < 3 ||
        y - 20 < 3 ||
        x - (width - 20 - cornerSize) >= cornerSize - 3 ||
        y - 20 >= cornerSize - 3
      ) {
        certificate.setPixelColor(cornerColor, x, y);
      }
    }
  }

  // Bottom-left corner
  for (let y = height - 20 - cornerSize; y < height - 20; y++) {
    for (let x = 20; x < 20 + cornerSize; x++) {
      if (
        x - 20 < 3 ||
        y - (height - 20 - cornerSize) < 3 ||
        x - 20 >= cornerSize - 3 ||
        y - (height - 20 - cornerSize) >= cornerSize - 3
      ) {
        certificate.setPixelColor(cornerColor, x, y);
      }
    }
  }

  // Bottom-right corner
  for (let y = height - 20 - cornerSize; y < height - 20; y++) {
    for (let x = width - 20 - cornerSize; x < width - 20; x++) {
      if (
        x - (width - 20 - cornerSize) < 3 ||
        y - (height - 20 - cornerSize) < 3 ||
        x - (width - 20 - cornerSize) >= cornerSize - 3 ||
        y - (height - 20 - cornerSize) >= cornerSize - 3
      ) {
        certificate.setPixelColor(cornerColor, x, y);
      }
    }
  }

  // Add title
  const titleText = "University of Wisdom & Understanding";
  const titleWidth = Jimp.measureText(titleFont, titleText);
  const titleX = (width - titleWidth) / 2;
  certificate.print(titleFont, titleX, 80, titleText);

  // Add subtitle
  const subtitleText = "Championed by GehGeh";
  const subtitleWidth = Jimp.measureText(smallFont, subtitleText);
  const subtitleX = (width - subtitleWidth) / 2;
  certificate.print(smallFont, subtitleX, 160, subtitleText);

  // Add certificate text
  const certText = "Certificate of Completion";
  const certWidth = Jimp.measureText(subtitleFont, certText);
  const certX = (width - certWidth) / 2;
  certificate.print(subtitleFont, certX, 220, certText);

  // Add "This is to certify that"
  const certifyText = "This is to certify that";
  const certifyWidth = Jimp.measureText(bodyFont, certifyText);
  const certifyX = (width - certifyWidth) / 2;
  certificate.print(bodyFont, certifyX, 300, certifyText);

  // Add student name
  const nameText = name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  const nameWidth = Jimp.measureText(titleFont, nameText);
  const nameX = (width - nameWidth) / 2;
  certificate.print(titleFont, nameX, 360, nameText);

  // Add "has successfully completed the course of study in"
  const completedText = "has successfully completed the course of study in";
  const completedWidth = Jimp.measureText(bodyFont, completedText);
  const completedX = (width - completedWidth) / 2;
  certificate.print(bodyFont, completedX, 440, completedText);

  // Add department
  const deptWidth = Jimp.measureText(subtitleFont, department);
  const deptX = (width - deptWidth) / 2;
  certificate.print(subtitleFont, deptX, 480, department);

  // Add "and has been awarded a"
  const awardedText = "and has been awarded a";
  const awardedWidth = Jimp.measureText(bodyFont, awardedText);
  const awardedX = (width - awardedWidth) / 2;
  certificate.print(bodyFont, awardedX, 540, awardedText);

  // Add degree
  const degreeWidth = Jimp.measureText(subtitleFont, degree);
  const degreeX = (width - degreeWidth) / 2;
  certificate.print(subtitleFont, degreeX, 580, degree);

  // Add "with a Wisdom Score of"
  const scoreText = "with a Wisdom Score of";
  const scoreWidth = Jimp.measureText(bodyFont, scoreText);
  const scoreX = (width - scoreWidth) / 2;
  certificate.print(bodyFont, scoreX, 640, scoreText);

  // Add GPA
  const gpaText = gpa.toString();
  const gpaWidth = Jimp.measureText(subtitleFont, gpaText);
  const gpaX = (width - gpaWidth) / 2;
  certificate.print(subtitleFont, gpaX, 680, gpaText);

  // Add date
  const date = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const dateText = `Awarded on ${date}`;
  const dateWidth = Jimp.measureText(smallFont, dateText);
  const dateX = (width - dateWidth) / 2;
  certificate.print(smallFont, dateX, 720, dateText);

  // Add wisdom quote
  const quoteText = '"Turning Vibes into Assets"';
  const quoteWidth = Jimp.measureText(smallFont, quoteText);
  const quoteX = (width - quoteWidth) / 2;
  certificate.print(smallFont, quoteX, 750, quoteText);

  return certificate;
}
