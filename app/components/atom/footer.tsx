import Link from "next/link";

const Footer = () => (
  <footer className="bg-gradient-to-b from-gray-50 to-gray-100 border-t border-gray-200">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-900">Brain</h3>
          <div className="space-y-2">
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.github.com/victorola-coder"
              className="block text-primary-600 hover:text-primary-800 font-medium transition-colors duration-200"
            >
              VickyJay
            </Link>
            <Link
              href="https://www.instagram.com/victorola.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-primary-600 hover:text-primary-800 font-medium transition-colors duration-200"
            >
              Follow VickyJay
            </Link>
            <Link
              href="https://www.twitter.com/heyVickyJay"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-primary-600 hover:text-primary-800 font-medium transition-colors duration-200"
            >
              Follow On Twitter
            </Link>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-900">University</h3>
          <div className="space-y-2">
            <Link
              href="https://www.instagram.com/victorola.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-primary-600 hover:text-primary-800 font-medium transition-colors duration-200"
            >
              Follow On Instagram
            </Link>
            <a
              href="https://www.twitter.com/heyVickyJay"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-primary-600 hover:text-primary-800 font-medium transition-colors duration-200"
            >
              Follow Wisdom University
            </a>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-900">Community</h3>
          <div className="space-y-2">
            <a
              href="https://t.me/+-0wovPxDU2tkOTY8"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-primary-600 hover:text-primary-800 font-medium transition-colors duration-200"
            >
              Join the Telegram
            </a>
            {/* <a
              href="https://discord.gg/your-discord-link"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-primary-600 hover:text-primary-800 font-medium transition-colors duration-200"
            >
              Join the Discord
            </a> */}
            <a
              href="https://chat.whatsapp.com/ECXQpDNnD1dE8IHkeU5Nvm"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-primary-600 hover:text-primary-800 font-medium transition-colors duration-200"
            >
              Join the Wisdom Nation
            </a>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-900">About</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Vibes and shii, become a certified gehgeh student today, its simple,
            fast and free, claim your name before anyone else will
          </p>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-500 text-sm">
            © 2024 University of Wisdom. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a
              href="/privacy"
              className="text-gray-500 hover:text-primary-600 text-sm transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="text-gray-500 hover:text-primary-600 text-sm transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
