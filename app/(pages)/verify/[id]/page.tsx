"use client";

import { motion } from "framer-motion";
import { useEffect, useState, use } from "react";
import {
  GraduationCap,
  CheckCircle,
  XCircle,
  ArrowLeft,
  Award,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

export default function VerifyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const verifyCertificate = async () => {
      try {
        const response = await fetch(`/api/students/${resolvedParams.id}`);

        if (response.ok) {
          const data = await response.json();
          setStudent(data);
          setIsValid(true);
        } else {
          setIsValid(false);
          setError("Certificate not found in our records");
        }
      } catch (error) {
        console.error("Error verifying certificate:", error);
        setIsValid(false);
        setError("Failed to verify certificate");
      } finally {
        setLoading(false);
      }
    };

    verifyCertificate();
  }, [resolvedParams.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-dark-600 text-lg">Verifying certificate...</p>
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
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium text-primary-700 bg-primary-100 rounded-full">
            <Sparkles className="w-4 h-4" />
            <span>University of Wisdom & Understanding</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Certificate Verification</span>
          </h1>
          <p className="text-xl text-dark-600">
            Verify the authenticity of a wisdom certificate
          </p>
        </motion.div>

        {/* Verification Result */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl p-8 shadow-xl border border-dark-100 mb-8"
        >
          {isValid && student ? (
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>

              <h2 className="text-3xl font-bold text-green-600 mb-4">
                ✓ Certificate Verified
              </h2>

              <div className="max-w-2xl mx-auto space-y-4">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-2xl font-bold text-dark-800 mb-2 capitalize">
                    {student.name}
                  </h3>
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

                <div className="text-sm text-dark-500">
                  <p>Certificate ID: {student.tag}</p>
                  <p>Verified on: {new Date().toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <XCircle className="w-12 h-12 text-white" />
              </div>

              <h2 className="text-3xl font-bold text-red-600 mb-4">
                ✗ Certificate Not Found
              </h2>

              <p className="text-lg text-dark-600 mb-6">
                {error ||
                  "This certificate could not be verified in our records."}
              </p>

              <div className="text-sm text-dark-500">
                <p>Certificate ID: {resolvedParams.id}</p>
                <p>Verified on: {new Date().toLocaleDateString()}</p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 text-white bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <GraduationCap className="w-5 h-5" />
              Visit University
            </motion.button>
          </Link>

          <Link href="/enroll">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 text-white bg-gradient-to-r from-secondary-600 to-secondary-700 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Award className="w-5 h-5" />
              Get Certified
            </motion.button>
          </Link>
        </motion.div>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-8"
        >
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 text-primary-600 hover:text-primary-700 font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
