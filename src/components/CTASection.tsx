
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import DiscordProof from "./DiscordProof";

const CTASection = () => {
  return (
    <section className="bg-tradingbg-800 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8 justify-center">
          <div className="text-center md:text-left max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="text-mintgreen-300">Spots are limited.</span> Ready to make 2025 your best trading year yet?
            </h2>
            <p className="text-gray-400 mb-10">
              Join a select community of traders committed to consistent profitability using our proven system.
            </p>
            <Link to="/book">
              <Button className="bg-mintgreen-300 hover:bg-mintgreen-400 text-tradingbg-600 text-lg px-8 py-6 rounded-md font-medium">
                Book Your Free Call
              </Button>
            </Link>
            <p className="text-gray-500 mt-4 text-sm">No credit card required. No obligation.</p>
          </div>
          
          <div className="animate-fade-in mt-8 md:mt-0">
            <DiscordProof imageUrl="/discord/members.png" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
