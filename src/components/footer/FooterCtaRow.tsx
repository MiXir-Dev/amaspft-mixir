import { Button } from "@/components/ui/button";
import { Download, Instagram, Youtube } from "lucide-react";
import { footerContent } from "@/consts/site.const";
import { navigationLinks } from "@/consts/navigation.const";

const FooterCtaRow = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8 pb-8 border-b border-gray-800">
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <Button className="bg-tradingbg-700 hover:bg-tradingbg-600 text-white flex gap-2 items-center px-6 py-5 h-auto">
          <Download size={18} />
          <span>{footerContent.ctaPdfLabel}</span>
        </Button>

        <a
          href={navigationLinks.whop.href}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full md:w-auto"
        >
          <Button className="bg-[#7467F0] hover:bg-[#6355E8] text-white px-6 py-5 h-auto w-full md:w-auto">
            {footerContent.joinWhopLabel}
          </Button>
        </a>
      </div>

      <div className="flex gap-4">
        {/* Twitter */}
        <a
          href={navigationLinks.social.twitter.href}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-tradingbg-700 p-2.5 rounded-full text-gray-400 hover:text-mintgreen-300 hover:bg-tradingbg-600 transition-all"
          aria-label={navigationLinks.social.twitter.ariaLabel}
        >
          <img
            src="/icons/x.png"
            alt={navigationLinks.social.twitter.iconAlt}
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
          href={navigationLinks.social.instagram.href}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-tradingbg-700 p-2.5 rounded-full text-gray-400 hover:text-mintgreen-300 hover:bg-tradingbg-600 transition-all"
          aria-label={navigationLinks.social.instagram.ariaLabel}
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
          href={navigationLinks.social.youtube.href}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-tradingbg-700 p-2.5 rounded-full text-gray-400 hover:text-mintgreen-300 hover:bg-tradingbg-600 transition-all"
          aria-label={navigationLinks.social.youtube.ariaLabel}
        >
          <Youtube size={18} />
        </a>

        {/* Discord */}
        <a
          href={navigationLinks.social.discord.href}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-tradingbg-700 p-2.5 rounded-full text-gray-400 hover:text-mintgreen-300 hover:bg-tradingbg-600 transition-all"
          aria-label={navigationLinks.social.discord.ariaLabel}
        >
          <img
            src="/icons/discord.png"
            alt={navigationLinks.social.discord.iconAlt}
            className="w-[18px] h-[18px]"
          />
        </a>
      </div>
    </div>
  );
};

export default FooterCtaRow;
