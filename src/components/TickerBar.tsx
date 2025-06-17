import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const highlights = [
  "Funded in under 2 weeks",
  "80% Win Rate Model",
  "Real PnL posted monthly",
  "Live trading sessions",
  "24/7 Discord support"
];

const TickerBar = () => {
  const tickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tickerElement = tickerRef.current;
    if (!tickerElement) return;

    const scrollTicker = () => {
      if (tickerElement.scrollLeft >= tickerElement.scrollWidth / 2) {
        tickerElement.scrollLeft = 0;
      } else {
        tickerElement.scrollLeft += 1;
      }
    };

    const intervalId = setInterval(scrollTicker, 30);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <motion.div
      className="bg-tradingbg-700 py-3 overflow-hidden border-y border-gray-800"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div
        ref={tickerRef}
        className="whitespace-nowrap overflow-hidden flex"
      >
        {[...highlights, ...highlights].map((item, index) => (
          <div key={index} className="flex items-center px-6">
            <span className="text-mintgreen-300 font-medium">{item}</span>
            <span className="mx-4 text-gray-600">•</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default TickerBar;
