import { Link } from "react-router-dom";
import { footerContent } from "@/consts/site.const";
import { navigationLinks } from "@/consts/navigation.const";

const FooterLinks = () => {
  return (
    <>
      <div className="flex flex-col">
        <h4 className="text-white font-medium mb-6 text-lg">{footerContent.quickLinksTitle}</h4>
        <nav className="flex flex-col space-y-3">
          {navigationLinks.footerQuick.map((link) => (
            <Link key={link.to} to={link.to} className="text-gray-400 hover:text-mintgreen-300 transition-colors w-fit">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex flex-col">
        <h4 className="text-white font-medium mb-6 text-lg">{footerContent.legalTitle}</h4>
        <nav className="flex flex-col space-y-3">
          {navigationLinks.footerLegal.map((link) => (
            <Link key={link.to} to={link.to} className="text-gray-400 hover:text-mintgreen-300 transition-colors w-fit">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

export default FooterLinks;
