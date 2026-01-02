import { motion } from "framer-motion";
import { testimonialsSectionContent } from "@/consts/testimonials.const";

type TestimonialsHeaderProps = {
  fadeInUp: {
    hidden: { opacity: number; y: number };
    visible: { opacity: number; y: number };
  };
  activeCategory: string;
  onSelectCategory: (categoryId: string) => void;
};

const TestimonialsHeader = ({
  fadeInUp,
  activeCategory,
  onSelectCategory,
}: TestimonialsHeaderProps) => {
  return (
    <motion.div
      className="text-center mb-10"
      variants={fadeInUp}
      transition={{ delay: 0.1 }}
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-4">{testimonialsSectionContent.title}</h2>
      <p className="text-gray-400 max-w-2xl mx-auto">
        {testimonialsSectionContent.description}
      </p>

      <div className="inline-flex mt-8 mb-4 overflow-x-auto border border-gray-700 rounded-full p-1 bg-tradingbg-800">
        {testimonialsSectionContent.categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={`px-3 sm:px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === category.id
                ? "bg-mintgreen-300 text-tradingbg-600"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default TestimonialsHeader;
