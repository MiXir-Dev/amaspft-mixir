import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { introExperienceContent } from "@/consts/introExperience.const";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 500);
    }, 3200);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = previousOverflow;
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="relative flex flex-col items-center">
        {/* Glow */}
        <div className="absolute inset-0 bg-mintgreen-300/20 rounded-full blur-2xl" />

        {/* SVG Logo */}
        <div className="relative w-[200px] h-[200px] md:w-[260px] md:h-[260px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 160 160"
            className="w-full h-full"
          >
            {/* P */}
            <g className="animate-sword-slash-1">
              <path
                fill="#c1e1c2"
                d="M79.7,125.8 C74.9,124.3 69.7,117.1 69.7,112.5V82.7H53.4c-2.6,0-3.9-0.9-4.6-3.5L40,49.7c13.3-6.4,25.2-15,39.7-15v91.7z
                   M69.7,72.7v-11.2c0-5.2,0-10.1,0-14.9c-6.6,3.1-12.6,6-18.1,8.6l4.3,15.1c0.4,1.5,1.3,2.4,2.6,2.4H69.7z"
              />
            </g>

            {/* F */}
            <g className="animate-sword-slash-2">
              <path
                fill="#c1e1c2"
                d="M110.7,60.25c-0.73-1.66-1.06-3.32-1.59-5.95c-4.7-2.2-10.3-4.8-16.5-7.65v25.6h22.1c0.1,6.7-1.1,9.9-8.6,9.9H92.3
                   c0,9.5-0.8,17.7,0.2,26.6c1.1,9.0-4.1,13.9-9.6,19.1V33.9c6.2,1.7,11.8,2.9,17.2,5.2c6.3,2.8,12.2,6.3,18.4,8.9
                   c3.1,1.3,3.8,3.2,2.9,6.0c-0.5,1.9-0.7,3.7-1.3,5.4H110.7z"
              />
            </g>
          </svg>
        </div>

        {/* Logo Lockup */}
        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <div className="text-2xl font-semibold tracking-widest">
            <span className="text-white">
              {introExperienceContent.logo.titlePrimary}
            </span>
            <span className="text-mintgreen-300">
              {introExperienceContent.logo.titleAccent}
            </span>
          </div>
          <div className="text-sm text-gray-400 mt-1">
            {introExperienceContent.logo.subtitle}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;