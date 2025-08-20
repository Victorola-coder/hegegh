"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { GraduationCap, BookOpen, Sparkles, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

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

export default function EnrollPage() {
  const [name, setName] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(wisdomModules[0]);
  const [secondCourses, setSecondCourses] = useState([...wisdomModules]);
  const [selectedSecondCourse, setSelectedSecondCourse] = useState(
    wisdomModules[1]
  );
  const [loading, setLoading] = useState(false);

  const handleSetFirstChoice = (value: string) => {
    setSelectedCourse(value);
    const newList = wisdomModules.filter((item) => item !== value);
    setSecondCourses(newList);
    setSelectedSecondCourse(newList[0]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (name.trim() === "") {
      toast.error("Please enter your name");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          tag: name
            .toLowerCase()
            .replace(/\s/g, "")
            .replace(/\d/g, "")
            .replace(/[^a-zA-Z]/g, ""),
          choice: selectedCourse,
          secondChoice: selectedSecondCourse,
        }),
      });

      if (response.status === 200) {
        const data = await response.json();
        toast.success("Congratulations! You have graduated with wisdom!");
        setTimeout(() => {
          window.location.href = `/student/${data.tag}`;
        }, 2000);
      } else if (response.status === 409) {
        toast.error(`${name}, you have already graduated!`);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      toast.error("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium text-primary-700 bg-primary-100 rounded-full">
            <Sparkles className="w-4 h-4" />
            <span>Championed by GehGeh</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Wisdom Enrollment</span>
          </h1>
          <p className="text-xl text-dark-600 max-w-2xl mx-auto">
            Join the University of Wisdom and Understanding. Get certified in
            life skills, financial wisdom, and street intelligence.
          </p>
        </motion.div>

        {/* Enrollment Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl p-8 shadow-xl border border-dark-100"
          >
            <div className="space-y-6">
              {/* Name Input */}
              <div>
                <label className="block text-sm font-medium text-dark-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 border border-dark-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                  required
                />
              </div>

              {/* First Choice */}
              <div>
                <label className="block text-sm font-medium text-dark-700 mb-2">
                  First Choice of Wisdom Module
                </label>
                <select
                  value={selectedCourse}
                  onChange={(e) => handleSetFirstChoice(e.target.value)}
                  className="w-full px-4 py-3 border border-dark-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                >
                  {wisdomModules.map((module) => (
                    <option key={module} value={module}>
                      {module}
                    </option>
                  ))}
                </select>
              </div>

              {/* Second Choice */}
              <div>
                <label className="block text-sm font-medium text-dark-700 mb-2">
                  Second Choice of Wisdom Module
                </label>
                <select
                  value={selectedSecondCourse}
                  onChange={(e) => setSelectedSecondCourse(e.target.value)}
                  className="w-full px-4 py-3 border border-dark-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                >
                  {secondCourses.map((module) => (
                    <option key={module} value={module}>
                      {module}
                    </option>
                  ))}
                </select>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <GraduationCap className="w-5 h-5" />
                    Get Your Wisdom Certificate
                  </>
                )}
              </motion.button>
            </div>
          </form>

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 text-center"
          >
            <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-6 border border-primary-100">
              <BookOpen className="w-8 h-8 text-primary-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-dark-800 mb-2">
                What You'll Get
              </h3>
              <p className="text-dark-600">
                A personalized certificate with your wisdom score, degree level,
                and chosen module. Share your achievement on social media and
                join the community of wise individuals!
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
