"use client";

import Link from "next/link";
import { useState } from "react";
import { GraduationCap, Menu, X } from "lucide-react";
import { motion } from "framer-motion";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="relative flex items-center justify-between p-2 px-8 bg-gray-100 sm:px-24">
      <Link href="/">
        <div className="cursor-pointer flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-lg text-dark-800 hidden sm:block">
            University of Wisdom
          </span>
        </div>
      </Link>

      <div className="flex items-center gap-12">
        <ul className="hidden md:flex items-center gap-12">
          <Link href="/">
            <li className="font-bold text-gray-800 hover:text-primary-600 cursor-pointer transition-colors">
              Home
            </li>
          </Link>
          <a
            href="https://www.github.com/gehgeh"
            target="_blank"
            rel="noopener noreferrer"
          >
            <li className="font-bold text-gray-800 hover:text-primary-600 cursor-pointer transition-colors">
              My Github
            </li>
          </a>
          <a
            href="https://chat.whatsapp.com/your-group-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <li className="font-bold text-gray-800 hover:text-primary-600 cursor-pointer transition-colors">
              Join Group
            </li>
          </a>
        </ul>
        <Link href="/enroll">
          <button className="hidden md:block whitespace-nowrap items-center gap-2 p-2 px-6 text-lg text-white rounded bg-gradient-to-r from-primary-600 to-primary-700 font-semibold hover:from-primary-700 hover:to-primary-800 transition-all duration-300">
            <GraduationCap className="w-4 h-4" />
            Get Certified
          </button>
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="block md:hidden p-2 text-gray-800 hover:text-primary-600 transition-colors"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-200 md:hidden z-50"
        >
          <div className="flex flex-col p-4 space-y-4">
            <Link href="/" onClick={() => setIsOpen(false)}>
              <div className="font-bold text-gray-800 hover:text-primary-600 cursor-pointer transition-colors py-2">
                Home
              </div>
            </Link>
            <a
              href="https://www.github.com/gehgeh"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
            >
              <div className="font-bold text-gray-800 hover:text-primary-600 cursor-pointer transition-colors py-2">
                My Github
              </div>
            </a>
            <a
              href="https://chat.whatsapp.com/your-group-link"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
            >
              <div className="font-bold text-gray-800 hover:text-primary-600 cursor-pointer transition-colors py-2">
                Join Group
              </div>
            </a>
            <Link href="/enroll" onClick={() => setIsOpen(false)}>
              <button className="w-full inline-flex items-center justify-center gap-2 p-3 text-white rounded bg-gradient-to-r from-primary-600 to-primary-700 font-semibold hover:from-primary-700 hover:to-primary-800 transition-all duration-300">
                <GraduationCap className="w-4 h-4" />
                Get Certified
              </button>
            </Link>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
