import { ChevronLeft, ChevronRight } from "lucide-react";
import type { RefObject } from "react";
import { Button } from "@/components/ui/button";
import TestimonialCard from "@/components/testimonials/TestimonialCard";

type TestimonialItem = {
  id: number;
  name: string;
  comment: string;
  rating: number;
  category: string;
  discordImage?: string;
};

type TestimonialsCarouselProps = {
  fadeInUp: {
    hidden: { opacity: number; y: number };
    visible: { opacity: number; y: number };
  };
  testimonials: TestimonialItem[];
  scrollContainerRef: RefObject<HTMLDivElement>;
  onScroll: (direction: "left" | "right") => void;
};

const TestimonialsCarousel = ({
  fadeInUp,
  testimonials,
  scrollContainerRef,
  onScroll,
}: TestimonialsCarouselProps) => {
  return (
    <div className="relative">
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto gap-4 md:gap-6 pb-8 testimonial-container scrollbar-none"
      >
        {testimonials.map((testimonial, i) => (
          <TestimonialCard
            key={testimonial.id}
            testimonial={testimonial}
            index={i}
            fadeInUp={fadeInUp}
          />
        ))}
      </div>

      {testimonials.length > 2 && (
        <>
          <Button
            onClick={() => onScroll("left")}
            variant="outline"
            size="icon"
            className="absolute -left-10 top-1/2 -translate-y-1/2 bg-tradingbg-700 border-gray-800 hover:bg-mintgreen-300 text-white transition hidden md:flex shadow-lg"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            onClick={() => onScroll("right")}
            variant="outline"
            size="icon"
            className="absolute -right-10 top-1/2 -translate-y-1/2 bg-tradingbg-700 border-gray-800 hover:bg-mintgreen-300 text-white transition hidden md:flex shadow-lg"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </>
      )}
    </div>
  );
};

export default TestimonialsCarousel;
