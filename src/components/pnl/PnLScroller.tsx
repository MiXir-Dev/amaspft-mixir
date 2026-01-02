import { Button } from "@/components/ui/button";
import { pnlSectionContent } from "@/consts/stats.const";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { RefObject } from "react";
import { MotionVariant } from "@/enums/motion-variant.enum";
import { ScrollDirection } from "@/enums/scroll-direction.enum";

type PnLItem = {
  id: number;
  month: string;
  image: string;
  gain: string;
};

type PnLScrollerProps = {
  data: PnLItem[];
  fadeInUp: {
    hidden: { opacity: number; y: number };
    visible: { opacity: number; y: number };
  };
  scrollContainerRef: RefObject<HTMLDivElement>;
  onScroll: (direction: ScrollDirection) => void;
  onSelectImage: (image: string) => void;
};

const PnLScroller = ({
  data,
  fadeInUp,
  scrollContainerRef,
  onScroll,
  onSelectImage,
}: PnLScrollerProps) => {
  return (
    <div className="relative">
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto pb-8 gap-4 md:gap-6 scrollbar-none overflow-y-hidden"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {data.map((item, i) => (
          <motion.div
            key={item.id}
            className="flex flex-col flex-none w-[280px] sm:w-[320px] md:w-[360px]"
            style={{ scrollSnapAlign: "start" }}
            variants={fadeInUp}
            initial={MotionVariant.Hidden}
            whileInView={MotionVariant.Visible}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
          >
            <div className="bg-tradingbg-800 border border-gray-800 rounded-lg overflow-hidden hover:border-mintgreen-300/30 transition-all">
              <img
                src={item.image}
                alt={pnlSectionContent.imageAlt(item.month)}
                className="w-full aspect-video cursor-pointer"
                onClick={() => onSelectImage(item.image)}
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
        onClick={() => onScroll(ScrollDirection.Left)}
        variant="outline"
        size="icon"
        className="absolute -left-10 top-1/2 -translate-y-1/2 bg-tradingbg-700 border-gray-800 hover:bg-mintgreen-300 text-white transition hidden md:flex shadow-lg"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Button
        onClick={() => onScroll(ScrollDirection.Right)}
        variant="outline"
        size="icon"
        className="absolute -right-10 top-1/2 -translate-y-1/2 bg-tradingbg-700 border-gray-800 hover:bg-mintgreen-300 text-white transition hidden md:flex shadow-lg"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default PnLScroller;
