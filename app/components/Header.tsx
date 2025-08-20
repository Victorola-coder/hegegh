"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { GraduationCap, Menu, X, Github, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200"
          : "bg-gray-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" onClick={closeMenu}>
            <div className="cursor-pointer flex items-center gap-3 group">
              {/* <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl text-gray-900 hidden sm:block group-hover:text-primary-600 transition-colors">
                UOW
              </span> */}
              <img
                src="/images/logo.png"
                alt="logo"
                className="w-10 h-10 rounded-full"
              />
            </div>
          </Link>

          <nav className="hidden lg:flex items-center space-x-8">
            <Link href="/">
              <span className="font-semibold text-gray-700 hover:text-primary-600 cursor-pointer transition-colors duration-200">
                Home
              </span>
            </Link>
            <Link href="/about">
              <span className="font-semibold text-gray-700 hover:text-primary-600 cursor-pointer transition-colors duration-200">
                Learn More
              </span>
            </Link>
            <a
              href="https://www.github.com/gehgeh"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-semibold text-gray-700 hover:text-primary-600 cursor-pointer transition-colors duration-200"
            >
              <Github className="w-4 h-4" />
              My Github
            </a>
            <a
              href="https://chat.whatsapp.com/your-group-link"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-semibold text-gray-700 hover:text-primary-600 cursor-pointer transition-colors duration-200"
            >
              <MessageCircle className="w-4 h-4" />
              Join Group
            </a>
          </nav>

          <div className="hidden lg:flex items-center space-x-4">
            <Link href="/enroll">
              <button className="inline-flex items-center gap-2 px-6 py-2.5 text-white rounded-lg bg-gradient-to-r from-primary-600 to-primary-700 font-semibold hover:from-primary-700 hover:to-primary-800 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg">
                <GraduationCap className="w-4 h-4" />
                Get Certified
              </button>
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-white border-t border-gray-200 shadow-lg"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex flex-col space-y-4">
                <Link href="/" onClick={closeMenu}>
                  <div className="font-semibold text-gray-700 hover:text-primary-600 cursor-pointer transition-colors duration-200 py-2 px-3 rounded-md hover:bg-gray-50">
                    Home
                  </div>
                </Link>
                <Link href="/about" onClick={closeMenu}>
                  <div className="font-semibold text-gray-700 hover:text-primary-600 cursor-pointer transition-colors duration-200 py-2 px-3 rounded-md hover:bg-gray-50">
                    Learn More
                  </div>
                </Link>
                <a
                  href="https://www.github.com/gehgeh"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  className="flex items-center gap-2 font-semibold text-gray-700 hover:text-primary-600 cursor-pointer transition-colors duration-200 py-2 px-3 rounded-md hover:bg-gray-50"
                >
                  <Github className="w-4 h-4" />
                  My Github
                </a>
                <a
                  href="https://chat.whatsapp.com/your-group-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  className="flex items-center gap-2 font-semibold text-gray-700 hover:text-primary-600 cursor-pointer transition-colors duration-200 py-2 px-3 rounded-md hover:bg-gray-50"
                >
                  <MessageCircle className="w-4 h-4" />
                  Join Group
                </a>
                <div className="pt-4 border-t border-gray-200">
                  <Link href="/enroll" onClick={closeMenu}>
                    <button className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-white rounded-lg bg-gradient-to-r from-primary-600 to-primary-700 font-semibold hover:from-primary-700 hover:to-primary-800 transition-all duration-200 shadow-md">
                      <GraduationCap className="w-4 h-4" />
                      Get Certified
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
