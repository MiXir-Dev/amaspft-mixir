
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Placeholder for PnL data - we would replace these with actual images
const pnlData = [
  { id: 1, month: "January 2025", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80" },
  { id: 2, month: "February 2025", image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80" },
  { id: 3, month: "March 2025", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80" },
  { id: 4, month: "April 2025", image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80" },
  { id: 5, month: "May 2025", image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80" }
];

const PnLCarousel = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    
    const scrollAmount = direction === 'left' ? -400 : 400;
    scrollContainerRef.current.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <section id="results" className="section-padding bg-tradingbg-600">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Monthly Results</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Transparency is key - browse through our actual monthly trading results.
          </p>
        </div>
        
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto pb-8 gap-4 md:gap-6 scrollbar-none"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {pnlData.map((item) => (
              <div
                key={item.id}
                className="flex flex-col flex-none w-[280px] sm:w-[320px] md:w-[360px]"
                style={{ scrollSnapAlign: 'start' }}
              >
                <div className="bg-tradingbg-800 border border-gray-800 rounded-lg overflow-hidden hover:border-mintgreen-300/30 transition-all">
                  <img
                    src={item.image}
                    alt={`PnL for ${item.month}`}
                    className="w-full aspect-video object-cover"
                  />
                  <div className="p-3 md:p-4">
                    <h3 className="text-lg font-medium text-white">{item.month}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <Button
            onClick={() => scroll('left')}
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 bg-tradingbg-700 border-gray-800 hover:bg-mintgreen-800 hidden md:flex"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <Button
            onClick={() => scroll('right')}
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 bg-tradingbg-700 border-gray-800 hover:bg-mintgreen-800 hidden md:flex"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex justify-center mt-6 gap-2">
          {pnlData.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-mintgreen-300' : 'bg-gray-700'} hover:bg-mintgreen-200 transition-colors cursor-pointer`}
              onClick={() => {
                if (!scrollContainerRef.current) return;
                scrollContainerRef.current.scrollLeft = i * (window.innerWidth < 640 ? 280 : window.innerWidth < 768 ? 320 : 360);
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PnLCarousel;
