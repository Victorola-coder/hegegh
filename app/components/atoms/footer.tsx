const Footer = () => (
  <footer className="flex flex-col items-center md:grid md:grid-cols-2 gap-4 p-4 text-center pt-12 bg-gray-100">
    <a
      href="https://www.github.com/gehgeh"
      target="_blank"
      rel="noopener noreferrer"
      className="font-semibold text-primary underline underline-primary hover:text-primary-700 transition-colors"
    >
      Created by GehGeh
    </a>

    <a
      href="https://instagram.com/gehgeh?igshid=YmMyMTA2M2Y="
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="font-bold text-primary underline underline-primary hover:text-gray-500 cursor-pointer transition-colors">
        Follow GehGeh
      </div>
    </a>

    <a
      href="https://www.twitter.com/gehgeh"
      target="_blank"
      rel="noopener noreferrer"
      className="font-semibold text-primary underline underline-primary hover:text-primary-700 transition-colors"
    >
      Follow On Twitter
    </a>

    <a
      href="https://instagram.com/universityofwisdom?r=nametag"
      target="_blank"
      rel="noopener noreferrer"
      className="font-semibold text-primary underline underline-primary hover:text-primary-700 transition-colors"
    >
      Follow On Instagram
    </a>

    <a
      href="https://www.twitter.com/wisdomuniversity"
      target="_blank"
      rel="noopener noreferrer"
      className="font-semibold text-primary underline underline-primary hover:text-primary-700 transition-colors"
    >
      Follow Wisdom University
    </a>

    <a
      href="https://t.me/+your-telegram-link"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="font-bold text-primary underline underline-primary hover:text-gray-500 cursor-pointer transition-colors">
        Join the Telegram
      </div>
    </a>

    <a
      href="https://discord.gg/your-discord-link"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="font-bold text-primary underline underline-primary hover:text-gray-500 cursor-pointer transition-colors">
        Join the Discord
      </div>
    </a>

    <a
      href="https://chat.whatsapp.com/your-whatsapp-link"
      target="_blank"
      rel="noopener noreferrer"
      className="font-semibold text-primary underline underline-primary hover:text-primary-700 transition-colors"
    >
      Join the Wisdom Nation
    </a>
  </footer>
);

export default Footer;
