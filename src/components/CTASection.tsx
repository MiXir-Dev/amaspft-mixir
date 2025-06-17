import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import DiscordProof from "./DiscordProof";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const CTASection = () => {
  return (
    <motion.section
      className="bg-tradingbg-800 py-16 md:py-24"
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8 justify-center">
          <motion.div
            className="text-center md:text-left max-w-2xl"
            variants={fadeInUp}
            transition={{ delay: 0.1 }}
          >
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
            <p className="text-gray-500 mt-4 text-sm">Limited spots available.</p>
          </motion.div>

          <motion.div
            className="mt-8 md:mt-0"
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
          >
            <DiscordProof imageUrl="/discord/members.png" />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default CTASection;
