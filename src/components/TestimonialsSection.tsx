import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { testimonialsSectionContent } from "@/consts/testimonials.const";
import { testimonialsData } from "@/consts/testimonials-data.const";
import TestimonialsHeader from "@/components/testimonials/TestimonialsHeader";
import TestimonialsCarousel from "@/components/testimonials/TestimonialsCarousel";
import TestimonialsFooter from "@/components/testimonials/TestimonialsFooter";
import { MotionVariant } from "@/enums/motion-variant.enum";
import { ScrollDirection } from "@/enums/scroll-direction.enum";

const fadeInUp = {
  [MotionVariant.Hidden]: { opacity: 0, y: 30 },
  [MotionVariant.Visible]: { opacity: 1, y: 0 }
};

const TestimonialsSection = () => {
  const [activeCategory, setActiveCategory] = useState(testimonialsSectionContent.allCategoryId);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const filteredTestimonials = 
    activeCategory === testimonialsSectionContent.allCategoryId 
      ? testimonialsData 
      : testimonialsData.filter(t => t.category === activeCategory);

  const scroll = (direction: ScrollDirection) => {
    if (!scrollContainerRef.current) return;
    
    const scrollAmount = direction === ScrollDirection.Left ? -300 : 300;
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
      initial={MotionVariant.Hidden}
      whileInView={MotionVariant.Visible}
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
