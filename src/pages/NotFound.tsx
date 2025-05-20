
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-tradingbg-600 px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 text-mintgreen-300">404</h1>
        <p className="text-xl text-gray-300 mb-8">Page not found</p>
        <Link to="/">
          <Button className="bg-mintgreen-300 hover:bg-mintgreen-400 text-tradingbg-600">
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
