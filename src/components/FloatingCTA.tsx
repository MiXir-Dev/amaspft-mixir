import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const FloatingCTA = () => {
  // We're keeping the component but not using it in the main Index.tsx
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const showThreshold = window.innerHeight * 0.3;
      
      if (currentScroll > showThreshold && !visible) {
        setVisible(true);
      } else if (currentScroll <= showThreshold && visible) {
        setVisible(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [visible]);
  
  if (!visible) return null;
  
  return (
    <div className="fixed bottom-6 right-6 z-40 animate-fade-in">
      <Link to="/book">
        <Button className="bg-mintgreen-300 hover:bg-mintgreen-400 text-tradingbg-600 font-medium shadow-lg">
          Book Your Free Call
        </Button>
      </Link>
    </div>
  );
};

export default FloatingCTA;
