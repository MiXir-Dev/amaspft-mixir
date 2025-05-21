
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServicesSection from "@/components/ServicesSection";
import PnLCarousel from "@/components/PnLCarousel";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import TickerBar from "@/components/TickerBar";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-tradingbg-600 text-white">
      <Header />
      
      {/* Hero Section - Split layout with image */}
      <section className="pt-24 pb-16 md:pt-36 md:pb-24 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Stop Guessing. <br />
                <span className="text-mintgreen-300">Start Winning</span> <br />
                with a Proven System.
              </h1>
              
              <p className="text-xl text-gray-300 mb-8">
                An 80% win-rate NQ strategy refined over thousands of trades.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/book">
                  <Button className="bg-mintgreen-300 hover:bg-mintgreen-400 text-tradingbg-600 px-6 py-6 rounded-md text-lg w-full sm:w-auto">
                    Book Your Free Call
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
              
              <div className="mt-6 flex flex-wrap gap-3">
                <div className="bg-tradingbg-700/50 px-3 py-1.5 rounded-full border border-gray-800">
                  <span className="text-mintgreen-300 font-medium">66+</span>
                  <span className="text-gray-400 text-sm ml-1">reviews</span>
                </div>
                <div className="bg-tradingbg-700/50 px-3 py-1.5 rounded-full border border-gray-800">
                  <span className="text-mintgreen-300 font-medium">Real students</span>
                  <span className="text-gray-400 text-sm ml-1">real results</span>
                </div>
              </div>
            </div>
            
            <div className="animate-fade-in" style={{animationDelay: '200ms'}}>
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden border-2 border-mintgreen-300/30">
                  <img 
                    src="/logo/hero2.png" 
                    alt="Amas trading" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-tradingbg-800 p-4 rounded-lg border border-gray-700">
                  <div className="text-mintgreen-300 font-semibold">80%+ Win Rate</div>
                  <div className="text-gray-400 text-sm">Proven NQ Strategy</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <TickerBar />
      <ServicesSection />
      <PnLCarousel />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
