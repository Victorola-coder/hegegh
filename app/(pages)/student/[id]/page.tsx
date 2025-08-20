"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  GraduationCap,
  Download,
  Share2,
  ArrowLeft,
  Award,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

interface Student {
  id: string;
  name: string;
  department: string;
  gpa: number;
  degree: string;
  tag: string;
  certificate?: string;
}

export default function StudentPage({ params }: { params: { id: string } }) {
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [isValidID, setIsValidID] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await fetch(`/api/students/${params.id}`);

        if (response.ok) {
          const data = await response.json();
          setStudent(data);
          setIsValidID(true);
        } else {
          setIsValidID(false);
        }
      } catch (error) {
        console.error("Error fetching student:", error);
        setIsValidID(false);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [params.id]);

  const handleDownload = () => {
    // For now, we'll just show a toast since we don't have certificate generation yet
    toast.success("Certificate download feature coming soon!");
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = `I just graduated from the University of Wisdom and Understanding with a ${student?.degree} in ${student?.department}! Check out my certificate: ${url}`;

    let shareUrl = "";

    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          text
        )}&hashtags=wisdom,understanding,graduation`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}`;
        break;
      case "whatsapp":
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
          text
        )}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, "_blank");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-dark-600 text-lg">
            Loading your wisdom certificate...
          </p>
        </div>
      </div>
    );
  }

  if (!isValidID || !student) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center">
        <div className="text-center">
          <Award className="w-16 h-16 text-dark-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-dark-800 mb-2">
            Student Not Found
          </h2>
          <p className="text-dark-600 mb-6">
            This wisdom seeker doesn't exist in our records.
          </p>
          <Link href="/enroll">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 text-white bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg"
            >
              <GraduationCap className="w-4 h-4" />
              Enroll Now
            </motion.button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          {/* <Link
            href="/"
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link> */}

          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium text-primary-700 bg-primary-100 rounded-full">
            <Sparkles className="w-4 h-4" />
            <span>Championed by GehGeh</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Congratulations!</span>
          </h1>
          <p className="text-xl text-dark-600">
            You have successfully graduated from the University of Wisdom and
            Understanding
          </p>
        </motion.div>

        {/* Certificate Display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl p-8 shadow-xl border border-dark-100 mb-8"
        >
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <GraduationCap className="w-12 h-12 text-white" />
            </div>

            <h2 className="text-3xl font-bold text-dark-800 mb-2 capitalize">
              {student.name}
            </h2>

            <p className="text-xl text-primary-600 font-semibold mb-2">
              {student.degree} Degree
            </p>

            <p className="text-lg text-dark-700 mb-4 italic">
              {student.department}
            </p>

            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-full">
              <Award className="w-5 h-5 text-primary-600" />
              <span className="text-lg font-bold text-primary-600">
                Wisdom Score: {student.gpa}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleDownload}
            className="inline-flex items-center justify-center gap-2 px-6 py-4 text-white bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Download className="w-5 h-5" />
            Download Certificate
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleShare("twitter")}
            className="inline-flex items-center justify-center gap-2 px-6 py-4 text-white bg-blue-600 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Share2 className="w-5 h-5" />
            Share on Twitter
          </motion.button>
        </motion.div>

        {/* Social Sharing Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleShare("facebook")}
            className="inline-flex items-center justify-center gap-2 px-4 py-3 text-white bg-blue-700 rounded-lg hover:bg-blue-800 transition-all duration-300"
          >
            <Share2 className="w-4 h-4" />
            Facebook
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleShare("whatsapp")}
            className="inline-flex items-center justify-center gap-2 px-4 py-3 text-white bg-green-600 rounded-lg hover:bg-green-700 transition-all duration-300"
          >
            <Share2 className="w-4 h-4" />
            WhatsApp
          </motion.button>

          <Link href="/enroll">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-white bg-gradient-to-r from-secondary-600 to-secondary-700 rounded-lg hover:from-secondary-700 hover:to-secondary-800 transition-all duration-300"
            >
              <GraduationCap className="w-4 h-4" />
              Enroll Friends
            </motion.button>
          </Link>
        </motion.div>

        {/* Footer Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-dark-600 mb-4">
            "Wisdom is not just about knowledge, but about understanding how to
            apply it in life."
          </p>
          <p className="text-sm text-dark-500">
            - GehGeh, University of Wisdom and Understanding
          </p>
        </motion.div>
      </div>
    </div>
  );
}
