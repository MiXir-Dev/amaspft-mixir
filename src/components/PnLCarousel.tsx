import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { pnlData } from "@/consts/stats.const";
import PnLHeader from "@/components/pnl/PnLHeader";
import PnLScroller from "@/components/pnl/PnLScroller";
import PnLDots from "@/components/pnl/PnLDots";
import PnLModal from "@/components/pnl/PnLModal";

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
        <PnLHeader fadeInUp={fadeInUp} />

        <PnLScroller
          data={pnlData}
          fadeInUp={fadeInUp}
          scrollContainerRef={scrollContainerRef}
          onScroll={scroll}
          onSelectImage={setSelectedImage}
        />

        <PnLDots
          count={pnlData.length}
          activeIndex={activeIndex}
          scrollContainerRef={scrollContainerRef}
        />
      </div>

      <PnLModal selectedImage={selectedImage} onClose={() => setSelectedImage(null)} />
    </motion.section>
  );
};

export default PnLCarousel;
