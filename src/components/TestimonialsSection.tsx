import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { testimonialsSectionContent } from "@/consts/testimonials.const";
import { testimonialsData } from "@/consts/testimonials-data.const";
import TestimonialsHeader from "@/components/testimonials/TestimonialsHeader";
import TestimonialsCarousel from "@/components/testimonials/TestimonialsCarousel";
import TestimonialsFooter from "@/components/testimonials/TestimonialsFooter";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const TestimonialsSection = () => {
  const [activeCategory, setActiveCategory] = useState(testimonialsSectionContent.allCategoryId);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const filteredTestimonials = 
    activeCategory === testimonialsSectionContent.allCategoryId 
      ? testimonialsData 
      : testimonialsData.filter(t => t.category === activeCategory);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    
    const scrollAmount = direction === 'left' ? -300 : 300;
    scrollContainerRef.current.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <motion.section
      id="testimonials"
      className="section-padding bg-tradingbg-700"
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto">
        <TestimonialsHeader
          fadeInUp={fadeInUp}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />

        <TestimonialsCarousel
          fadeInUp={fadeInUp}
          testimonials={filteredTestimonials}
          scrollContainerRef={scrollContainerRef}
          onScroll={scroll}
        />

        <TestimonialsFooter fadeInUp={fadeInUp} />
      </div>
    </motion.section>
  );
};

export default TestimonialsSection;
