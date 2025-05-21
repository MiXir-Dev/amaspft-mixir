import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { X } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Leon",
    comment: "Been a VIP member for only 3 months now.Blew literally hundreds of evals jumping strats before I joined his group. Amas and his analysts teach you how market moves from Monthly to seconds chart without gatekeeping a single detail, not something you see often in this industry. Not gonna lie prior to joining I thought he's cherry picking trades for twitter, boy was I wrong, he does it all LIVE and actually executes those trades LIVE every day, his edge is insane and he prioritizes teaching us how to look through the same lens as him, instead of copying his trades. Thanks for changing this industry for the better @Amas",
    rating: 5,
    category: "mentorship",
    discordImage: "/testimonials/1.png"
  },  
  {
    id: 2,
    name: "MK ✔",
    comment: "Trading is difficult, but even more difficult than trading is being able to meet someone who is willing to teach you trading skills. Thank you AMAS @Amas for sharing all your trading knowledge. My trading career lasted three years, I watched all ICT videos, watched very very many youtube videos, but you can't profit from these communities because all this content is part of their profitable skills. No one will share the complete trading strategy, except this discord, except AMAS. last week I withdrew my first profit of 1500$, this week is the second one and today I am back in my studio, sitting in front of my computer and writing this. I don't know how to thank you but to write about my experience in the hope that more people can see the value of this community.",
    rating: 5,
    category: "mentorship",
    discordImage: "/testimonials/2.png"
  },
  {
    id: 3,
    name: "A.R",
    comment: "Just wanted to give a big shoutout to my boy Amas for helping me reach this level in trading. These are just some of many other payouts I got using information he taught me and taking some of the same trades as him. I am one of his very first students and the value and knowledge he has given me has no price. Thank you @Amas",
    rating: 5,
    category: "support",
    discordImage: "/testimonials/3.png"
  },
  {
    id: 4,
    name: "VIP RESTROOM ✔",
    comment: "After going through a very tough phase of my life, (not going to talk about details), i stumbled upon trading 8 months ago and in that very moment i immediately knew this was it, my only way of getting away from the fate of being born in a lost cause of a country, it was an all or nothing back against the wall. and as any other trader i struggled a lot at the start despite studying and backtesting and putting in effort 11 hours a day, from the moment i wake up to the moment i close my eyes, no University no nothing. face glued to screen. gaining knowledge but still see no progress when it comes to the actual chart and trading. started to lose hope and wanted to give up on it all. that's when i've come across this guy called @Amas 3 months ago. at first glance i just knew this guy is it the one i want to learn from and that he's as legit as it gets in this community, and i can't tell you how right i was, this guy far exceeded my expectations in every possible way and aspect. as a trader and as a human being who has done some things for me that i cannot speak of here. and he has my utmost respect out of anyone in the community of trading he has fully opened my eyes. i owe you a lot amas and you are seriously the best thing that has happened in my trading journey, thank you for everything mentor A • and lastly. thanks to everyone in the VIP / mentorship section for being so nice and supportive •and to @Leon for doing a giveaway that basically allowed me to be able to get another funded that i was able to pass and get my first payout. this is nothing but a stepping stone and the goal is still ways ahead.",
    rating: 5,
    category: "support",
    discordImage: "/testimonials/4.png"
  },
  {
    id: 5,
    name: "gotanori",
    comment: "If you want to learn trading skills, It is worthwhile to join VIP and mentorship. AMAS will demonstrate how to achieve consistent profits through patience and discipline during the live stream. Thank you @Amas ❤️",
    rating: 5,
    category: "mentorship",
    discordImage: "/testimonials/5.png"
  },
  {
    id: 6,
    name: "captainkhan69",
    comment: "Shoutout @Amas fr. Luckily found him on Twitter when I was going thru a big block in my trading, couldn't pass a eval or anything. Saw how amas only took small base hits and started doing the math on stacking fundeds n going for $200 a day. Joined VIP only for one month, helps listening to him while on the charts to just discipline myself. First payout after 4 years total trading, 1.5years of futures and only like 2 months of fully locking in w my rules. 10/10 would recommend",
    rating: 5,
    category: "mentorship",
    discordImage: "/testimonials/6.png"
  },
  {
    id: 7,
    name: "6rrr",
    comment: "Been trading with amas for 1 year now. I was pretty lost in the beginning and didn't know a single thing about trading. Now I am a multiple 6 Figure Funded trader. Everything is possible if you have the good information and the good mentor to help you master your craft. You guys don't even know HOW LUCKY you guys are finding this discord. He is the Only trader that is 100% straight with his students. Everyone can do it if I did it! He is the real deal! @Amas",
    rating: 5,
    category: "results",
    discordImage: "/testimonials/7.png"
  },
  {
    id: 8,
    name: "Chaos101 ✔",
    comment: "Joined @Amas on the 30th of October...Within 2 weeks, because of his teachings, reasoning behind his Trades taken Live..l was able to read price like he does.. Tomorrow I am gonna make a $3000 withdrawal on Tradeify because of him.. Seriously you don't even need to pay $1000 if you are serious you can learn a lot from his LIVES...He is literally teaching.. Thank you @Amas ..Tomorrow a payout window will open and I will make my first ever withdrawal with a prop firm..",
    rating: 5,
    category: "results",
    discordImage: "/testimonials/8.png"
  },
  {
    id: 9,
    name: "Haps",
    comment: "To start, @Amas is the only mentor who teaches something real and has proven by example, not giving you bullshit and false information.Before Amas, i was a lost soul hunting every new shiny syndrome which obviously were all trash. Even during his mentorship, i was still doing the same! I am glad my mentor knocked me and got me to dig in and that's when everything changed.Detailed backtesting, refining my edge, waiting for A+ setup, noticing the failures, backtest and more backtest with his models and eventually finding our own edge is the reason for this breakthrough for me. My funded payment virginity was no more! My first payment and more pending! The next stage would be more consistency and more payouts! Ps. I believe we are all in the right place here, but it takes time and patience and most definitely, commitment and tons of work! Lets get it!",
    rating: 5,
    category: "mentorship",
    discordImage: "/testimonials/9.png"
  },
  {
    id: 10,
    name: "John",
    comment: "Aint stopping anytime soon thats fasho all thanks to @Amas 🫶",
    rating: 5,
    category: "results",
    discordImage: "/testimonials/10.png"
  },
  {
    id: 11,
    name: "hua",
    comment: "Not even a mentorship student. All using the 30s model. 1 month trading live. Better get right with these models if you want financial freedom",
    rating: 5,
    category: "results",
    discordImage: "/testimonials/11.png"
  },
  {
    id: 12,
    name: "Amirii",
    comment: "Secured this payout by taking the same trades Amas took on live. Told yall its real money in this discord, stop playing cmon bruh ±Amas Appreciate you my dawg. We eating all summer",
    rating: 5,
    category: "results",
    discordImage: "/testimonials/12.png"
  },
  {
    id: 13,
    name: "CaramelMan",
    comment: "I was unprofitable for so long I just had one goal this summer to achieve one payout just 1 to know that what I wanted could be accomplished. I gotta say I got way more than 1. All thx to @Amas SUIII",
    rating: 5,
    category: "results",
    discordImage: "/testimonials/13.png"
  },
  {
    id: 14,
    name: "forekast",
    comment: "Since joining this group I told myself I would ONLY trade 2 of the 25k accounts I have by using only strategies taught by Amas. Focusing on consistency and only 1 trade per day (which is VERY hard to stick to, let's be honest haha). \n This is one of the payouts, just approved minutes ago, from one of the 25k accounts solely withdrawing July's trading profits. \n This game is possible to win, but you cannot cheat your way to payouts and consistency (this is wisdom that Amas bestowed upon me). Put in the work, backtest every single day, study the lives, study the recaps, ask questions when you're stumped, and journal every single day win or lose. \n I have a LOOONG way to go after this to get my consistency to where I'd like, but this is just the beginning. \n The only way is up. Cheers gang!",
    rating: 5,
    category: "results",
    discordImage: "/testimonials/14.png"
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
                <p className="text-gray-300 mb-3 md:mb-4 text-sm sm:text-base text-justify line-clamp-6">"{testimonial.comment}"</p>
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
                        <DialogClose
                          className="absolute top-4 right-4 text-gray-400 hover:text-mintgreen-300 transition"
                          aria-label="Close"
                        >
                          <X className="w-5 h-5" />
                        </DialogClose>

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
                            loading="lazy"
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
                className="absolute -left-10 top-1/2 -translate-y-1/2 bg-tradingbg-700 border-gray-800 hover:bg-mintgreen-300 text-white transition hidden md:flex shadow-lg"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <Button
                onClick={() => scroll('right')}
                variant="outline"
                size="icon"
                className="absolute -right-10 top-1/2 -translate-y-1/2 bg-tradingbg-700 border-gray-800 hover:bg-mintgreen-300 text-white transition hidden md:flex shadow-lg"
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
