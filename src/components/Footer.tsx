import { Link } from "react-router-dom";
import { Instagram, Youtube, X as TwitterIcon, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-tradingbg-800 pt-8 pb-4 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Top tier - CTA links */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8 pb-8 border-b border-gray-800">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <Button className="bg-tradingbg-700 hover:bg-tradingbg-600 text-white flex gap-2 items-center px-6 py-5 h-auto">
              <Download size={18} />
              <span>Free Trading Strategy PDF</span>
            </Button>

            <a
              href="https://whop.com/vip-ff-e142/?a=amasteinem"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:w-auto"
            >
              <Button className="bg-[#7467F0] hover:bg-[#6355E8] text-white px-6 py-5 h-auto w-full md:w-auto">
                Join on Whop
              </Button>
            </a>
          </div>

          <div className="flex gap-4">
            {/* Twitter */}
            <a
              href="https://x.com/Sten4PF"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-tradingbg-700 p-2.5 rounded-full text-gray-400 hover:text-mintgreen-300 hover:bg-tradingbg-600 transition-all"
              aria-label="Twitter"
            >
              <img
                src="/icons/x.png"
                alt="X"
                className="w-[18px] h-[18px]"
              />
            </a>

            {/* Instagram 
            
                if it ever gets depreciated, use custom logo 
                <img
                  src="/icons/instagram.png"
                  alt="Instagram"
                  className="w-[18px] h-[18px]"
                />
            */}
            <a
              href="https://www.instagram.com/amaspft"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-tradingbg-700 p-2.5 rounded-full text-gray-400 hover:text-mintgreen-300 hover:bg-tradingbg-600 transition-all"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>

            {/* YouTube
                if it ever gets depreciated, use custom logo 
                <img
                  src="/icons/instagram.png"
                  alt="Instagram"
                  className="w-[18px] h-[18px]"
                />
            */
            }
            <a
              href="www.youtube.com/@AmasPFT"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-tradingbg-700 p-2.5 rounded-full text-gray-400 hover:text-mintgreen-300 hover:bg-tradingbg-600 transition-all"
              aria-label="YouTube"
            >
              
              
              <Youtube size={18} />
            </a>

            {/* Discord */}
            <a
              href="https://discord.com/invite/gJMwsJ4BGK"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-tradingbg-700 p-2.5 rounded-full text-gray-400 hover:text-mintgreen-300 hover:bg-tradingbg-600 transition-all"
              aria-label="Discord"
            >
              <img
                src="/icons/discord.png"
                alt="Discord"
                className="w-[18px] h-[18px]"
              />
            </a>
          </div>
        </div>

        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Column */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-full overflow-hidden bg-mintgreen-300 flex items-center justify-center">
                <img
                  src="/logo/logo.png"
                  alt="Amas Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xl font-bold text-mintgreen-300">
                AMAS<span className="text-white">PFT</span>
              </span>
            </div>
            <p className="text-gray-400">
              Stop guessing. Start winning with a proven trading system.
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="flex flex-col">
            <h4 className="text-white font-medium mb-6 text-lg">Quick Links</h4>
            <nav className="flex flex-col space-y-3">
              <Link to="/" className="text-gray-400 hover:text-mintgreen-300 transition-colors w-fit">Home</Link>
              <Link to="/book" className="text-gray-400 hover:text-mintgreen-300 transition-colors w-fit">Book a Call</Link>
            </nav>
          </div>

          {/* Legal Column */}
          <div className="flex flex-col">
            <h4 className="text-white font-medium mb-6 text-lg">Legal</h4>
            <nav className="flex flex-col space-y-3">
              <Link to="/privacy" className="text-gray-400 hover:text-mintgreen-300 transition-colors w-fit">Privacy Policy</Link>
              <Link to="/terms" className="text-gray-400 hover:text-mintgreen-300 transition-colors w-fit">Terms of Service</Link>
            </nav>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="border-t border-gray-800 mt-6 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {currentYear} Amas Trading. All rights reserved.
          </p>
          <div className="text-gray-600 text-sm">
            <span className="text-mintgreen-300 font-medium">+66</span> traders mentored
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
