import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// Prisma client singleton
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function GET() {
  try {
    // Get total number of students
    const totalStudents = await prisma.student.count();

    // Get students with certificates (those who have generated certificates)
    const studentsWithCertificates = await prisma.student.count({
      where: {
        certificate: {
          not: null,
        },
      },
    });

    // Get students without certificates
    const studentsWithoutCertificates =
      totalStudents - studentsWithCertificates;

    // Get department statistics
    const departmentStats = await prisma.student.groupBy({
      by: ["department"],
      _count: {
        department: true,
      },
      orderBy: {
        _count: {
          department: "desc",
        },
      },
    });

    // Get degree level statistics
    const degreeStats = await prisma.student.groupBy({
      by: ["degree"],
      _count: {
        degree: true,
      },
      orderBy: {
        _count: {
          degree: "desc",
        },
      },
    });

    // Get GPA statistics
    const gpaStats = await prisma.student.aggregate({
      _avg: {
        gpa: true,
      },
      _min: {
        gpa: true,
      },
      _max: {
        gpa: true,
      },
    });

    // Get recent activity (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentStudents = await prisma.student.count({
      where: {
        createdAt: {
          gte: sevenDaysAgo,
        },
      },
    });

    // Get students created today
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayStudents = await prisma.student.count({
      where: {
        createdAt: {
          gte: today,
        },
      },
    });

    // Get monthly growth (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const monthlyStudents = await prisma.student.count({
      where: {
        createdAt: {
          gte: thirtyDaysAgo,
        },
      },
    });

    // Calculate certificate generation rate
    const certificateRate =
      totalStudents > 0 ? (studentsWithCertificates / totalStudents) * 100 : 0;

    const analytics = {
      overview: {
        totalStudents,
        studentsWithCertificates,
        studentsWithoutCertificates,
        certificateRate: Math.round(certificateRate * 100) / 100,
      },
      recentActivity: {
        today: todayStudents,
        last7Days: recentStudents,
        last30Days: monthlyStudents,
      },
      gpaStats: {
        average: Math.round((gpaStats._avg.gpa || 0) * 100) / 100,
        minimum: gpaStats._min.gpa || 0,
        maximum: gpaStats._max.gpa || 0,
      },
      departments: departmentStats.map((dept) => ({
        name: dept.department,
        count: dept._count.department,
      })),
      degrees: degreeStats.map((degree) => ({
        level: degree.degree,
        count: degree._count.degree,
      })),
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(analytics);
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch analytics",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
