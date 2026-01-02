import { X } from "lucide-react";
import StarRating from "@/components/StarRating";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import {
  formatTestimonialQuote,
  testimonialImageAlt,
  testimonialsSectionContent,
} from "@/consts/testimonials.const";
import { MotionVariant } from "@/enums/motion-variant.enum";

type TestimonialItem = {
  id: number;
  name: string;
  comment: string;
  rating: number;
  category: string;
  discordImage?: string;
};

type TestimonialCardProps = {
  testimonial: TestimonialItem;
  index: number;
  fadeInUp: {
    hidden: { opacity: number; y: number };
    visible: { opacity: number; y: number };
  };
};

const TestimonialCard = ({ testimonial, index, fadeInUp }: TestimonialCardProps) => {
  return (
    <Dialog key={testimonial.id}>
      <DialogTrigger asChild>
        <motion.div
          className="flex-none w-[260px] sm:w-[280px] md:w-[320px] bg-tradingbg-800 p-4 md:p-6 rounded-lg border border-gray-800 transition-all duration-200 cursor-pointer group active:scale-95 hover:border-mintgreen-300/40 focus:outline-none focus:ring-2 focus:ring-mintgreen-300"
          variants={fadeInUp}
          initial={MotionVariant.Hidden}
          whileInView={MotionVariant.Visible}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.4, delay: index * 0.04 }}
        >
          <StarRating rating={testimonial.rating} className="mb-3 md:mb-4" />
          <p className="text-gray-300 mb-3 md:mb-4 text-sm sm:text-base text-justify line-clamp-6">
            {formatTestimonialQuote(testimonial.comment)}
          </p>
          <div className="flex items-center justify-between">
            <p className="text-mintgreen-300 font-medium">{testimonial.name}</p>

            {testimonial.discordImage && (
              <div className="bg-tradingbg-700 p-1.5 rounded-md transition-colors group-hover:bg-tradingbg-600">
                <div className="w-5 h-5 rounded-md bg-[#5865F2] flex items-center justify-center">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="white">
                    <path d="M19.27 5.33C17.94 4.71...Z" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </DialogTrigger>

      <DialogContent className="bg-tradingbg-800 border-gray-700">
        <DialogHeader>
          <DialogClose
            className="absolute top-4 right-4 text-gray-400 hover:text-mintgreen-300 transition"
            aria-label={testimonialsSectionContent.dialog.closeLabel}
          >
            <X className="w-5 h-5" />
          </DialogClose>
          <DialogTitle className="text-white">{testimonialsSectionContent.dialog.title}</DialogTitle>
          <DialogDescription className="text-gray-400">
            {testimonialsSectionContent.dialog.description}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 bg-tradingbg-900 p-1 rounded-lg">
          <img
            src={testimonial.discordImage}
            alt={testimonialImageAlt(testimonial.name)}
            className="w-full rounded-md"
            loading="lazy"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TestimonialCard;
