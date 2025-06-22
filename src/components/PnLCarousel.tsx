import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const pnlData = [
  { id: 4, month: "April 2025", image: "/pnl/april-pnl.png", gain: "+$ 2.36K USD" },
  { id: 3, month: "March 2025", image: "/pnl/march-pnl.png", gain: "+$ 1.12k USD" },
  { id: 2, month: "February 2025", image: "/pnl/feb-pnl.png", gain: "+$3.27k USD " },
  { id: 1, month: "January 2025", image: "/pnl/jan-pnl.png", gain: "+$1.88k USD" },
  { id: 12, month: "December 2024", image: "/pnl/dec-pnl-24.png", gain: "+$2.71K USD" },
  { id: 11, month: "November 2024", image: "/pnl/nov-pnl-24.png", gain: "+$3.82k USD" },
  { id: 10, month: "October 2024", image: "/pnl/october-pnl-24.png", gain: "+$2.96k USD" },
  { id: 8, month: "August 2024", image: "/pnl/aug-pnl-24.png", gain: "+$5.32k USD" },
  { id: 7, month: "July 2024", image: "/pnl/july-pnl-24.png", gain: "+$5.13k USD" },
  { id: 6, month: "June 2024", image: "/pnl/june-pnl-24.png", gain: "+$3.83k USD" },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const PnLCarousel = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = direction === "left" ? -400 : 400;
    scrollContainerRef.current.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const itemWidth = window.innerWidth < 640 ? 280 : window.innerWidth < 768 ? 320 : 360;
      const index = Math.round(scrollLeft / itemWidth);
      setActiveIndex(index);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.section
      id="results"
      className="section-padding bg-tradingbg-600"
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-12"
          variants={fadeInUp}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Monthly Results</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Transparency is key - browse through our actual monthly trading results.
          </p>
        </motion.div>

        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto pb-8 gap-4 md:gap-6 scrollbar-none overflow-y-hidden"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {pnlData.map((item, i) => (
              <motion.div
                key={item.id}
                className="flex flex-col flex-none w-[280px] sm:w-[320px] md:w-[360px]"
                style={{ scrollSnapAlign: "start" }}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <div className="bg-tradingbg-800 border border-gray-800 rounded-lg overflow-hidden hover:border-mintgreen-300/30 transition-all">
                  <img
                    src={item.image}
                    alt={`PnL for ${item.month}`}
                    className="w-full aspect-video cursor-pointer"
                    onClick={() => setSelectedImage(item.image)}
                  />
                  <div className="p-3 md:p-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium text-white">{item.month}</h3>
                      <span className="text-mintgreen-300 text-sm font-semibold">{item.gain}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <Button
            onClick={() => scroll("left")}
            variant="outline"
            size="icon"
            className="absolute -left-10 top-1/2 -translate-y-1/2 bg-tradingbg-700 border-gray-800 hover:bg-mintgreen-300 text-white transition hidden md:flex shadow-lg"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            onClick={() => scroll("right")}
            variant="outline"
            size="icon"
            className="absolute -right-10 top-1/2 -translate-y-1/2 bg-tradingbg-700 border-gray-800 hover:bg-mintgreen-300 text-white transition hidden md:flex shadow-lg"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex justify-center mt-6 gap-2">
          {pnlData.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i === activeIndex ? "bg-mintgreen-300" : "bg-gray-700"
              } hover:bg-mintgreen-200 transition-colors cursor-pointer`}
              onClick={() => {
                if (!scrollContainerRef.current) return;
                const width = window.innerWidth < 640 ? 280 : window.innerWidth < 768 ? 320 : 360;
                scrollContainerRef.current.scrollTo({
                  left: i * width,
                  behavior: "smooth",
                });
              }}
            />
          ))}
        </div>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Popup"
            className="max-w-full max-h-full rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </motion.section>
  );
};

export default PnLCarousel;
