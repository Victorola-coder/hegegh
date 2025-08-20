import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

// Validation schema for student creation
const createStudentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  tag: z.string().min(1, "Tag is required"),
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

    const [students, count] = await Promise.all([
      prisma.student.findMany({
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
      }),
      prisma.student.count(),
    ]);

    return NextResponse.json([students, count]);
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

    // Check if student already exists
    const existingStudent = await prisma.student.findUnique({
      where: { tag },
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
        tag,
        name: name.trim(),
        department,
        gpa,
        degree,
      },
    });

    return NextResponse.json(student);
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
