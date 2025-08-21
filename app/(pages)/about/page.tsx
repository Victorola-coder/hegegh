"use client";

import { motion } from "framer-motion";
import {
  GraduationCap,
  Users,
  Award,
  BookOpen,
  Globe,
  Heart,
  Star,
  Target,
  Lightbulb,
  Shield,
  Zap,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About University of Wisdom - Our Story & Mission",
  description: "Learn about the University of Wisdom and Understanding. Discover our mission to provide street intelligence, financial wisdom, and life skills to young people across Nigeria and beyond.",
  keywords: [
    "about university of wisdom",
    "GehGeh university story",
    "wisdom education mission",
    "street intelligence training",
    "financial literacy Nigeria",
    "life skills certification",
    "community building",
    "personal development Nigeria"
  ],
  openGraph: {
    title: "About University of Wisdom - Our Story & Mission",
    description: "Learn about the University of Wisdom and Understanding. Discover our mission to provide street intelligence, financial wisdom, and life skills.",
    url: "https://uow.victorola.dev/about",
    images: [
      {
        url: "https://uow.victorola.dev/images/logo.png",
        width: 1200,
        height: 630,
        alt: "About University of Wisdom and Understanding",
      },
    ],
  },
  twitter: {
    title: "About University of Wisdom - Our Story & Mission",
    description: "Learn about the University of Wisdom and Understanding. Discover our mission to provide street intelligence, financial wisdom, and life skills.",
  },
  alternates: {
    canonical: "https://uow.victorola.dev/about",
  },
};

const AboutPage = () => {
  const stats = [
    { icon: Users, number: "10,000+", label: "Naija People Don Collect" },
    { icon: Award, number: "5,000+", label: "Certificates Issued" },
    { icon: Globe, number: "50+", label: "Countries Reached" },
    { icon: Star, number: "4.9/5", label: "Student Satisfaction" },
  ];

  const values = [
    {
      icon: Heart,
      title: "Community",
      description:
        "We dey build one big family of people wey sabi sense for street and book.",
    },
    {
      icon: Lightbulb,
      title: "Street Smartness",
      description:
        "We combine street wisdom with book knowledge. No forming, just real-life sense.",
    },
    {
      icon: Target,
      title: "Excellence",
      description: "We no dey do shakara. Everything we do na top quality.",
    },
    {
      icon: Shield,
      title: "Integrity",
      description: "We dey honest with our people. No lies, no fake promises.",
    },
  ];

  const features = [
    {
      icon: Zap,
      title: "Sharp-Sharp Certificate",
      description: "Get your certificate immediately, no stress",
    },
    {
      icon: Globe,
      title: "Recognized Across Naija",
      description: "Your certificate fit work anywhere, anytime",
    },
    {
      icon: BookOpen,
      title: "Real Life Wisdom",
      description: "No be book knowledge alone, na practical sense",
    },
    {
      icon: Users,
      title: "Big Family",
      description: "Join our community of wise people",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium text-primary-700 bg-primary-100 rounded-full">
              <GraduationCap className="w-4 h-4" />
              <span>About GehGeh University</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Wisdom Wey You Fit
              </span>
              <br />
              <span className="text-gray-900">Collect Sharp-Sharp</span>
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              No be by long grammar. We dey make am easy for you to collect your
              own &apos;GehGeh&apos; certificate. Just enter, pick your level of
              wisdom, and boom—you don get am!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/enroll">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-8 py-4 text-white bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Start Your Journey
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Our mission na to give everybody for Naija chance to sabi better
                wisdom. No need to spend big money or waka go far. Just collect
                your certificate from your phone.
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    Founded by GehGeh
                  </div>
                  <div className="text-gray-600">
                    Visionary Educator & Wisdom Seeker
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Why Choose Us?</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span>Sharp-sharp digital certificate</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span>Big family of learners</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span>Real life wisdom, no shakara</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span>Lifetime access to wisdom</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do and shape the experience
              we provide to our students.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 rounded-xl hover:bg-gray-50 transition-colors duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              What Makes Us Special
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the unique features that set the University of Wisdom
              apart from traditional education.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Collect Your Wisdom?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Join thousands of people who don already collect their
              certificates.
            </p>

            <Link href="/enroll">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 text-primary-600 bg-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <GraduationCap className="w-5 h-5" />
                Enroll Now
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
