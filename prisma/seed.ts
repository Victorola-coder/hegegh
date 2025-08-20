import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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

const sampleStudents = [
  {
    name: "Hehpvpefw",
    tag: "hehpvpefw",
    department: "Street Intelligence",
    gpa: 2.55,
    degree: "Diploma"
  },
  {
    name: "Warith Abdulkareem",
    tag: "warithabdulkareem",
    department: "Financial Wisdom 101",
    gpa: 3.19,
    degree: "Bachelor"
  },
  {
    name: "Peter Essiet",
    tag: "peteressiet",
    department: "Legacy & Leadership",
    gpa: 4.84,
    degree: "Master"
  },
  {
    name: "Okelola Ayobami",
    tag: "okelolaayobami",
    department: "Asset Building & Wealth Creation",
    gpa: 2.5,
    degree: "Diploma"
  },
  {
    name: "Oketch Samuel Ivan",
    tag: "oketchsamuelivan",
    department: "International Vawulence",
    gpa: 2.49,
    degree: "Diploma"
  },
  {
    name: "Victor Gold",
    tag: "victorgold",
    department: "Building Generational Wealth",
    gpa: 4.64,
    degree: "Master"
  },
  {
    name: "Nazor",
    tag: "nazor",
    department: "Smart Hustling & Survival",
    gpa: 2.33,
    degree: "Diploma"
  },
  {
    name: "Abdulkarim Warith",
    tag: "abdulkarimwarith",
    department: "Financial Wisdom 101",
    gpa: 4.9,
    degree: "Doctorate"
  },
  {
    name: "Khalid Vawuletor Surajo",
    tag: "khalidvawuletorsurajo",
    department: "Wahala Management Sciences",
    gpa: 4.42,
    degree: "Master"
  },
  {
    name: "Essiet Peter Nelson Jnr",
    tag: "essietpeternelsonjnr",
    department: "Legacy & Leadership",
    gpa: 2.45,
    degree: "Diploma"
  },
  {
    name: "Halilu Yarima Usman",
    tag: "haliluyarimausman",
    department: "Data & Vawulence Structures",
    gpa: 4.49,
    degree: "Master"
  },
  {
    name: "Davo Lex",
    tag: "davolex",
    department: "International Vawulence",
    gpa: 4.36,
    degree: "Master"
  },
  {
    name: "Victor Godl",
    tag: "victorgodl",
    department: "Building Generational Wealth",
    gpa: 4.29,
    degree: "Master"
  },
  {
    name: "Ty Test",
    tag: "tytest",
    department: "International Vawulence",
    gpa: 4.98,
    degree: "Doctorate"
  },
  {
    name: "GehGeh Wisdom",
    tag: "gehgehwisdom",
    department: "Department of Sense",
    gpa: 4.95,
    degree: "Doctorate"
  },
  {
    name: "Aisha Financial",
    tag: "aishafinancial",
    department: "Financial Wisdom 101",
    gpa: 3.87,
    degree: "Bachelor"
  },
  {
    name: "Bola Street",
    tag: "bolastreet",
    department: "Street Intelligence",
    gpa: 4.12,
    degree: "Bachelor"
  },
  {
    name: "Chinedu Patience",
    tag: "chinedupatience",
    department: "Discipline & Patience Studies",
    gpa: 3.65,
    degree: "Bachelor"
  },
  {
    name: "Damilola Relationship",
    tag: "damilolarelationship",
    department: "Relationship Understanding",
    gpa: 4.23,
    degree: "Bachelor"
  },
  {
    name: "Emeka Asset",
    tag: "emekaasset",
    department: "Asset Building & Wealth Creation",
    gpa: 4.67,
    degree: "Master"
  }
];

async function main() {
  console.log('🌱 Starting database seed...');

  // Clear existing students
  await prisma.student.deleteMany({});
  console.log('🗑️ Cleared existing students');

  // Create new students
  for (const student of sampleStudents) {
    await prisma.student.create({
      data: student
    });
  }

  console.log(`✅ Created ${sampleStudents.length} students`);
  console.log('🎓 University of Wisdom and Understanding database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
