
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { navigationLinks } from "@/consts/navigation.const";
import { siteBrand, siteButtons } from "@/consts/site.const";

const Logo = () => (
  <div className="flex items-center gap-2">
    <div className="w-8 h-8 rounded-full overflow-hidden bg-mintgreen-300 flex items-center justify-center">
      <img
        src="/logo/logo.png"
        alt={siteBrand.logoAlt}
        className="w-full h-full object-contain"
      />
    </div>
    <span className="text-xl font-bold text-mintgreen-300">
      {siteBrand.namePrimary}<span className="text-white">{siteBrand.nameAccent}</span>
    </span>
  </div>
);


const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-blur py-3" : "py-5"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-4 md:px-6">
        <Link to="/" className="hover:opacity-80 transition-opacity">
          <Logo />
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          {navigationLinks.header.map((link) => (
            <Link key={link.to} to={link.to} className="text-white hover:text-mintgreen-300 transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <Link to="/book" className="hidden md:block">
            <Button variant="default" className="bg-mintgreen-300 text-tradingbg-600 hover:bg-mintgreen-400">
              {siteButtons.bookCall}
            </Button>
          </Link>
          <Link to="/book" className="md:hidden">
            <Button size="sm" variant="default" className="bg-mintgreen-300 text-tradingbg-600 hover:bg-mintgreen-400">
              {siteButtons.bookCallShort}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
