import { motion } from "framer-motion";
import { pnlSectionContent } from "@/consts/stats.const";

type PnLHeaderProps = {
  fadeInUp: {
    hidden: { opacity: number; y: number };
    visible: { opacity: number; y: number };
  };
};

const PnLHeader = ({ fadeInUp }: PnLHeaderProps) => {
  return (
    <motion.div
      className="text-center mb-12"
      variants={fadeInUp}
      transition={{ delay: 0.1 }}
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-4">{pnlSectionContent.title}</h2>
      <p className="text-gray-400 max-w-2xl mx-auto">{pnlSectionContent.description}</p>
    </motion.div>
  );
};

export default PnLHeader;
