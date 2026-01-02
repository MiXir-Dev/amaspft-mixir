import { motion } from "framer-motion";
import { formatTestimonialQuote, testimonialsSectionContent } from "@/consts/testimonials.const";

type TestimonialsFooterProps = {
  fadeInUp: {
    hidden: { opacity: number; y: number };
    visible: { opacity: number; y: number };
  };
};

const TestimonialsFooter = ({ fadeInUp }: TestimonialsFooterProps) => {
  return (
    <motion.div
      className="mt-8 md:mt-12 text-center"
      variants={fadeInUp}
      transition={{ delay: 0.2 }}
    >
      <blockquote className="text-xl sm:text-2xl md:text-3xl text-white font-light italic max-w-3xl mx-auto">
        {formatTestimonialQuote(testimonialsSectionContent.quote)}
      </blockquote>
      <div className="mt-3 text-mintgreen-300">
        <span className="inline-block px-3 py-1 bg-mintgreen-300/10 rounded-full text-sm">
          {testimonialsSectionContent.reviewsLabel}
        </span>
      </div>
    </motion.div>
  );
};

export default TestimonialsFooter;
