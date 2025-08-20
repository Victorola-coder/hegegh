"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { GraduationCap, Sparkles, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium text-primary-700 bg-primary-100 rounded-full">
            <Sparkles className="w-4 h-4" />
            <span>Championed by GehGeh</span>
          </div>

          <h1 className="text-8xl md:text-9xl font-bold mb-4">
            <span className="gradient-text">404</span>
          </h1>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-dark-800 mb-4">
            Oops! Wisdom Not Found 😢
          </h2>
          <p className="text-lg text-dark-600 max-w-md mx-auto mb-6">
            The page you&apos;re looking for seems to have graduated from our
            university without leaving a forwarding address.
          </p>
          <p className="text-sm text-dark-500 italic">
            &quot;Even the wisest among us sometimes get lost in the digital realm.&quot;
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 text-white bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </motion.button>
          </Link>

          <Link href="/enroll">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 text-primary-700 bg-white border-2 border-primary-200 rounded-lg hover:bg-primary-50 transition-all duration-300"
            >
              <GraduationCap className="w-4 h-4" />
              Get Your Certificate
            </motion.button>
          </Link>
        </motion.div>

        {/* Footer Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12"
        >
          <p className="text-sm text-dark-500">
            University of Wisdom and Understanding
          </p>
        </motion.div>
      </div>
    </div>
  );
}
