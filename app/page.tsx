"use client";

import {
  GraduationCap,
  Users,
  Award,
  BookOpen,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cacheManager } from "./lib/cache";
import { useEffect, useState } from "react";
import { StudentCard } from "./components/molecule";

export default function HomePage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const cacheKey = "homepage-students-data";

      // Try to get cached data first
      const cachedData = cacheManager.get<CachedData>(cacheKey);

      if (cachedData) {
        setStudents(cachedData.students);
        setCount(cachedData.count);
        setLoading(false);
        return;
      }

      // If no cached data, fetch from API
      try {
        const response = await fetch("/api/students");
        const data = await response.json();

        const studentsData = data[0] || [];
        const countData = data[1] || 0;

        setStudents(studentsData);
        setCount(countData);

        // Cache the data for 10 minutes
        cacheManager.set(
          cacheKey,
          {
            students: studentsData,
            count: countData,
          },
          10
        );
      } catch (error) {
        console.error("Error fetching students data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalCount = new Intl.NumberFormat("en-US").format(
    count == 0 ? 0 : 141128 + count
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-100/20 via-transparent to-secondary-100/20" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-sm font-medium text-primary-700 bg-primary-100 rounded-full"
          >
            <Sparkles className="w-4 h-4" />
            <span>Championed by GehGeh</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="gradient-text">University of Wisdom</span>
            <br />
            <span className="text-dark-800">& Understanding</span>
          </h1>

          <p className="text-xl md:text-2xl text-dark-600 mb-8 max-w-2xl mx-auto">
            Join thousands of young people gaining wisdom, knowledge, and
            understanding about money, relationships, and life.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/enroll">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <GraduationCap className="w-5 h-5" />
                Get Your Certificate
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold text-primary-700 bg-white border-2 border-primary-200 rounded-full hover:bg-primary-50 transition-all duration-300"
            >
              <BookOpen className="w-5 h-5" />
              Learn More
            </motion.button>
          </div>
        </motion.div>

        {/* Floating elements */}
        <motion.div
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 text-primary-300 opacity-20"
        >
          <Award className="w-16 h-16" />
        </motion.div>

        <motion.div
          animate={{ y: [10, -10, 10] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-32 right-10 text-secondary-300 opacity-20"
        >
          <Users className="w-12 h-12" />
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-primary-600 mb-2">
                {totalCount}+
              </div>
              <div className="text-dark-600">Wisdom Seekers</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-secondary-600 mb-2">
                25+
              </div>
              <div className="text-dark-600">Wisdom Modules</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-accent-600 mb-2">
                100%
              </div>
              <div className="text-dark-600">Street Intelligence</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Current Students Section */}
      <section className="flex flex-col items-center w-full p-4 py-6 bg-gray-200">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl font-bold text-center text-dark-800 mb-4">
            Current Holders of Wisdom
          </h2>
        </motion.div>

        {loading ? (
          <div className="text-center my-12">
            <div className="inline-block w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-dark-600">Loading wisdom seekers...</p>
          </div>
        ) : (
          <div className="flex flex-col items-stretch w-full mb-8 sm:w-3/4 sm:grid-cols-2 sm:grid">
            {students.map((student) => (
              <StudentCard key={student.id} student={student} />
            ))}
          </div>
        )}

        <p className="mb-12 text-dark-600 font-medium">
          And {totalCount} other wisdom seekers
        </p>

        <Link href="/enroll">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <GraduationCap className="w-5 h-5" />
            Enroll here
          </motion.button>
        </Link>
      </section>
    </div>
  );
}
