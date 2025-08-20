import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Generate random ID
const generateRandomId = (): string => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Validation schema for student creation
const createStudentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  tag: z.string().optional(), // Now optional, will be auto-generated if not provided
  choice: z.string().min(1, "First choice is required"),
  secondChoice: z.string().min(1, "Second choice is required"),
});

// Wisdom modules/departments
const wisdomModules = [
  "Financial Wisdom 101",
  "Relationship Understanding",
  "Discipline & Patience Studies",
  "Street Intelligence",
  "Legacy & Leadership",
  "Department of Sense",
  "No Go Carry Last Engineering",
  "Chop Life Economics",
  "Wahala Management Sciences",
  "Department of Cruise & Reality Studies",
  "Asset Building & Wealth Creation",
  "Emotional Intelligence Studies",
  "Boundary Setting & Self-Respect",
  "Delayed Gratification Mastery",
  "Long-term Thinking & Planning",
  "Navigating Nigeria Safely",
  "Building Generational Wealth",
  "Influence & Leadership Skills",
  "Common Sense Application",
  "Smart Hustling & Survival",
  "Balancing Enjoyment & Responsibility",
  "Conflict Resolution & Peace",
  "Knowing When to Joke vs Serious",
  "Mindset Transformation",
  "Goal Setting & Achievement",
];

// Degree levels based on GPA
const getDegreeLevel = (gpa: number): string => {
  if (gpa >= 4.5) return "Doctorate";
  if (gpa >= 3.5) return "Master";
  if (gpa >= 2.5) return "Bachelor";
  if (gpa >= 1.5) return "Diploma";
  return "Certificate";
};

// Generate random GPA with weighted distribution
const generateRandomGPA = (): number => {
  const weights = [4, 4, 4, 4, 3, 3, 3, 3, 2, 2, 2, 1];
  const baseGPA = weights[Math.floor(Math.random() * weights.length)];
  const randomAddition = Math.random() * 1;
  const gpa = baseGPA + randomAddition;
  return Math.round(gpa * 100) / 100;
};

// Weighted random department selection
const selectDepartment = (choice: string, secondChoice: string): string => {
  const departments = wisdomModules.map((dept) => ({
    name: dept,
    weight: dept === choice ? 15 : dept === secondChoice ? 10 : 1,
  }));

  const totalWeight = departments.reduce((sum, dept) => sum + dept.weight, 0);
  let random = Math.random() * totalWeight;

  for (const dept of departments) {
    random -= dept.weight;
    if (random <= 0) {
      return dept.name;
    }
  }

  return choice; // fallback
};

export async function GET() {
  try {
    // Test database connection first
    await prisma.$connect();

    const students = await prisma.student.findMany({
      select: {
        id: true,
        name: true,
        department: true,
        gpa: true,
        degree: true,
        tag: true,
      },
      orderBy: { createdAt: "desc" },
      take: 20,
    });

    // Add certificate URLs to each student
    const studentsWithCertificates = students.map((student) => {
      const certificateUrl = `${
        process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
      }/api/certificates/${student.tag}?name=${encodeURIComponent(
        student.name
      )}&level=${encodeURIComponent(
        student.degree
      )}%20of%20${encodeURIComponent(
        student.department
      )}&module=${encodeURIComponent(student.department)}&score=${
        student.gpa
      }%20/%205.00&date=${new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}&theme=light&format=svg`;

      return {
        ...student,
        certificate: certificateUrl,
      };
    });

    const count = await prisma.student.count();

    return NextResponse.json([studentsWithCertificates, count]);
  } catch (error) {
    console.error("Error fetching students:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch students",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = createStudentSchema.parse(body);

    const { name, tag, choice, secondChoice } = validatedData;

    // Generate random tag if not provided
    let finalTag = tag;
    if (!finalTag) {
      finalTag = generateRandomId();
    }

    // Check if student already exists
    const existingStudent = await prisma.student.findUnique({
      where: { tag: finalTag },
    });

    if (existingStudent) {
      return NextResponse.json(
        { error: "Student already exists" },
        { status: 409 }
      );
    }

    // Generate student data
    const gpa = generateRandomGPA();
    const department = selectDepartment(choice, secondChoice);
    const degree = getDegreeLevel(gpa);

    // Create new student
    const student = await prisma.student.create({
      data: {
        tag: finalTag,
        name: name.trim(),
        department,
        gpa,
        degree,
      },
    });

    // Generate certificate URL
    const certificateUrl = `${
      process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
    }/api/certificates/${finalTag}?name=${encodeURIComponent(
      name.trim()
    )}&level=${encodeURIComponent(degree)}%20of%20${encodeURIComponent(
      department
    )}&module=${encodeURIComponent(
      department
    )}&score=${gpa}%20/%205.00&date=${new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })}&theme=light&format=svg`;

    // Return student with certificate URL
    return NextResponse.json({
      ...student,
      certificate: certificateUrl,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Error creating student:", error);
    return NextResponse.json(
      {
        error: "Failed to create student",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
