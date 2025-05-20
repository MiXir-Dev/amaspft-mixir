import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import StarRating from "@/components/StarRating";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const testimonials = [
  {
    id: 1,
    name: "Alex K.",
    comment: "Since joining Amas's program, I've gone from inconsistent results to having my first profitable month ever. The NQ strategy is simply unreal.",
    rating: 5,
    category: "results",
    discordImage: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    name: "Sarah M.",
    comment: "The mentorship is worth every penny. Amas doesn't just teach you what to do, but actually shows you in real-time during live trading sessions.",
    rating: 5,
    category: "mentorship",
    discordImage: "https://images.unsplash.com/photo-1614680376739-8360a55ebb2c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    name: "David L.",
    comment: "The Discord community and daily support have been game-changers. Whenever I have a question, I get a thoughtful response within hours.",
    rating: 5,
    category: "support",
    discordImage: "https://images.unsplash.com/photo-1614680376408-16afefe3f873?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    name: "Michael R.",
    comment: "3 months in and my win rate jumped from 40% to 78%. The backtesting classes helped me understand the 'why' behind each setup.",
    rating: 5,
    category: "results",
    discordImage: "https://images.unsplash.com/photo-1614680376408-16afefe3f873?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 5,
    name: "Jennifer T.",
    comment: "What sets this apart is how Amas teaches risk management. It's not just about wins, but sustainable growth with controlled drawdowns.",
    rating: 5,
    category: "mentorship",
    discordImage: "https://images.unsplash.com/photo-1614680376408-16afefe3f873?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 6,
    name: "Robert W.",
    comment: "The weekly PDFs are incredibly detailed. I've learned more in one month than I did in a year of trying to figure things out on my own.",
    rating: 4,
    category: "support",
    discordImage: "https://images.unsplash.com/photo-1614680376408-16afefe3f873?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
  }
];

const categories = [
  { id: "all", label: "All" },
  { id: "results", label: "Results" },
  { id: "mentorship", label: "Mentorship" },
  { id: "support", label: "Support" }
];

const TestimonialsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const filteredTestimonials = 
    activeCategory === "all" 
      ? testimonials 
      : testimonials.filter(t => t.category === activeCategory);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    
    const scrollAmount = direction === 'left' ? -300 : 300;
    scrollContainerRef.current.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <section id="testimonials" className="section-padding bg-tradingbg-700">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Client Success Stories</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Real traders sharing real results and experiences.
          </p>
          
          <div className="inline-flex mt-8 mb-4 overflow-x-auto border border-gray-700 rounded-full p-1 bg-tradingbg-800">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
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
        </div>

        <div className="relative">
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-4 md:gap-6 pb-8 testimonial-container scrollbar-none"
          >
            {filteredTestimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="flex-none w-[260px] sm:w-[280px] md:w-[320px] bg-tradingbg-800 p-4 md:p-6 rounded-lg border border-gray-800 hover:border-mintgreen-300/30 transition-all testimonial-item"
              >
                <StarRating rating={testimonial.rating} className="mb-3 md:mb-4" />
                <p className="text-gray-300 mb-3 md:mb-4 text-sm sm:text-base">"{testimonial.comment}"</p>
                <div className="flex items-center justify-between">
                  <p className="text-mintgreen-300 font-medium">{testimonial.name}</p>
                  {testimonial.discordImage && (
                    <Dialog>
                      <DialogTrigger>
                        <div className="bg-tradingbg-700 hover:bg-tradingbg-600 transition-colors p-1.5 rounded-md cursor-pointer">
                          <div className="w-5 h-5 rounded-md bg-[#5865F2] flex items-center justify-center">
                            <svg viewBox="0 0 24 24" width="14" height="14" fill="white">
                              <path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09-.01-.02-.04-.03-.07-.03-1.5.26-2.93.71-4.27 1.33-.01 0-.02.01-.03.02-2.72 4.07-3.47 8.03-3.1 11.95 0 .02.01.04.03.05 1.8 1.32 3.53 2.12 5.24 2.65.03.01.06 0 .07-.02.4-.55.76-1.13 1.07-1.74.02-.04 0-.08-.04-.09-.57-.22-1.11-.48-1.64-.78-.04-.02-.04-.08-.01-.11.11-.08.22-.17.33-.25.02-.02.05-.02.07-.01 3.44 1.57 7.15 1.57 10.55 0 .02-.01.05-.01.07.01.11.09.22.17.33.26.04.03.04.09-.01.11-.52.31-1.07.56-1.64.78-.04.01-.05.06-.04.09.32.61.68 1.19 1.07 1.74.03.01.06.02.09.01 1.72-.53 3.45-1.33 5.25-2.65.02-.01.03-.03.03-.05.44-4.53-.73-8.46-3.1-11.95-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12 0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12 0 1.17-.83 2.12-1.89 2.12z" />
                            </svg>
                          </div>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="bg-tradingbg-800 border-gray-700">
                        <DialogHeader>
                          <DialogTitle className="text-white">Discord Testimonial</DialogTitle>
                          <DialogDescription className="text-gray-400">
                            Real feedback from our Discord community
                          </DialogDescription>
                        </DialogHeader>
                        <div className="mt-4 bg-tradingbg-900 p-1 rounded-lg">
                          <img 
                            src={testimonial.discordImage} 
                            alt={`${testimonial.name}'s testimonial`}
                            className="w-full rounded-md"
                          />
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredTestimonials.length > 2 && (
            <>
              <Button
                onClick={() => scroll('left')}
                variant="outline"
                size="icon"
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 bg-tradingbg-700 border-gray-800 hover:bg-mintgreen-800 hidden md:flex"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <Button
                onClick={() => scroll('right')}
                variant="outline"
                size="icon"
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 bg-tradingbg-700 border-gray-800 hover:bg-mintgreen-800 hidden md:flex"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
        
        <div className="mt-8 md:mt-12 text-center">
          <blockquote className="text-xl sm:text-2xl md:text-3xl text-white font-light italic max-w-3xl mx-auto">
            "This program changed my trading forever."
          </blockquote>
          <div className="mt-3 text-mintgreen-300">
            <span className="inline-block px-3 py-1 bg-mintgreen-300/10 rounded-full text-sm">66+ reviews</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
