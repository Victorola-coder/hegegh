const Footer = () => (
  <footer className="bg-gradient-to-b from-gray-50 to-gray-100 border-t border-gray-200">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-900">Creator</h3>
          <div className="space-y-2">
            <a
              href="https://www.github.com/gehgeh"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-primary-600 hover:text-primary-800 font-medium transition-colors duration-200"
            >
              Created by GehGeh
            </a>
            <a
              href="https://instagram.com/gehgeh?igshid=YmMyMTA2M2Y="
              target="_blank"
              rel="noopener noreferrer"
              className="block text-primary-600 hover:text-primary-800 font-medium transition-colors duration-200"
            >
              Follow GehGeh
            </a>
            <a
              href="https://www.twitter.com/gehgeh"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-primary-600 hover:text-primary-800 font-medium transition-colors duration-200"
            >
              Follow On Twitter
            </a>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-900">University</h3>
          <div className="space-y-2">
            <a
              href="https://instagram.com/universityofwisdom?r=nametag"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-primary-600 hover:text-primary-800 font-medium transition-colors duration-200"
            >
              Follow On Instagram
            </a>
            <a
              href="https://www.twitter.com/wisdomuniversity"
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
              href="https://t.me/+your-telegram-link"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-primary-600 hover:text-primary-800 font-medium transition-colors duration-200"
            >
              Join the Telegram
            </a>
            <a
              href="https://discord.gg/your-discord-link"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-primary-600 hover:text-primary-800 font-medium transition-colors duration-200"
            >
              Join the Discord
            </a>
            <a
              href="https://chat.whatsapp.com/your-whatsapp-link"
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
            University of Wisdom provides comprehensive education and
            certification programs to help you achieve your learning goals and
            advance your career.
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
