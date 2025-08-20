# University of Wisdom and Understanding

A modern certificate generator web application that creates humorous "university" certificates for the Nigerian social trend championed by GehGeh. This project blends humor, street culture, and practical life lessons into an engaging certificate generation platform.

## 🎯 Overview

The University of Wisdom and Understanding is a fast-rising social trend in Nigeria that blends humor, street culture, and practical life lessons. Championed by GehGeh, a content creator and financial coach, it's not a traditional institution but a movement and online "school" where thousands of young people enroll virtually to gain wisdom, knowledge, and understanding about money, relationships, and life.

## ✨ Features

### Core Functionality

- **User Enrollment System** - Name input and module selection
- **Certificate Generation** - Personalized certificates with wisdom scores
- **Social Sharing** - Share certificates on Twitter, Facebook, WhatsApp
- **Modern UI/UX** - Beautiful, responsive design with animations
- **Database Integration** - PostgreSQL with Prisma ORM

### Wisdom Modules

- Financial Wisdom 101
- Relationship Understanding
- Discipline & Patience Studies
- Street Intelligence
- Legacy & Leadership
- Department of Sense
- No Go Carry Last Engineering
- Chop Life Economics
- Wahala Management Sciences
- And 15+ more modules...

### Degree Levels

- **Doctorate** (4.5+ GPA)
- **Master** (3.5+ GPA)
- **Bachelor** (2.5+ GPA)
- **Diploma** (1.5+ GPA)
- **Certificate** (<1.5 GPA)

## 🛠️ Tech Stack

### Frontend

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations
- **Lucide React** - Beautiful icons
- **Sonner** - Toast notifications

### Backend

- **Next.js API Routes** - Serverless API endpoints
- **Prisma** - Database ORM
- **PostgreSQL** - Primary database
- **Zod** - Schema validation

### Development

- **Bun** - Fast package manager
- **ESLint** - Code linting
- **PostCSS** - CSS processing

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- PostgreSQL database
- Environment variables configured

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd hegegh
   ```

2. **Install dependencies**

   ```bash
   bun install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Add your database URLs:

   ```env
   POSTGRES_PRISMA_URL="your-postgresql-url"
   POSTGRES_URL_NON_POOLING="your-postgresql-direct-url"
   ```

4. **Set up the database**

   ```bash
   bunx prisma generate
   bunx prisma migrate dev
   ```

5. **Run the development server**

   ```bash
   bun dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
hegegh/
├── app/
│   ├── api/
│   │   └── students/
│   │       ├── route.ts          # Main students API
│   │       └── [id]/route.ts     # Individual student API
│   ├── enroll/
│   │   └── page.tsx              # Enrollment form
│   ├── student/
│   │   └── [id]/page.tsx         # Certificate display
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Homepage
├── prisma/
│   └── schema.prisma             # Database schema
├── public/                       # Static assets
├── tailwind.config.ts            # Tailwind configuration
└── package.json                  # Dependencies
```

## 🎨 Design System

### Colors

- **Primary**: Purple (#8B5CF6) - Wisdom and knowledge
- **Secondary**: Amber (#F59E0B) - Achievement and success
- **Accent**: Green (#10B981) - Growth and prosperity
- **Dark**: Gray scale for text and backgrounds

### Typography

- **Plus Jakarta Sans** - Primary font for body text and headers
- **Inter** - Secondary font for UI elements

### Animations

- **Framer Motion** - Page transitions and micro-interactions
- **Custom CSS** - Gradient animations and hover effects

## 🔧 API Endpoints

### Students

- `GET /api/students` - Fetch recent graduates and count
- `POST /api/students` - Create new student enrollment
- `GET /api/students/[id]` - Fetch individual student
- `PUT /api/students/[id]` - Update student data
- `DELETE /api/students/[id]` - Delete student

## 🗄️ Database Schema

### Student Model

```prisma
model Student {
  id          String   @id @default(cuid())
  tag         String   @unique
  name        String
  department  String
  gpa         Float    @default(0)
  certificate String?
  degree      String   @default("Diploma")
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@map("students")
}
```

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Environment Variables

```env
POSTGRES_PRISMA_URL="your-production-postgresql-url"
POSTGRES_URL_NON_POOLING="your-production-postgresql-direct-url"
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **GehGeh** - For championing the wisdom movement
- **Next.js Team** - For the amazing framework
- **Vercel** - For seamless deployment
- **Prisma Team** - For the excellent ORM

## 📞 Contact

- **Creator**: GehGeh
- **Twitter**: [@gehgeh](https://twitter.com/heyVickyJay)
- **Project**: [University of Wisdom and Understanding](https://university-of-wisdom.vercel.app)

---

**"Wisdom is not just about knowledge, but about understanding how to apply it in life."** - GehGeh
