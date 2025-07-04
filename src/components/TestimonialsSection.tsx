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
import { motion } from "framer-motion";
import { X } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

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
  },
  {
    id: 15,
    name: "Crypto Bells ✔",
    comment: "Update: Putting my follow up testimonial here @Amas . Tradeify 100k passed by just following the models. Couldn't take too many trades last few weeks, took my time, but reached there thanks to the models taught in the mentorship, the framework, and most importantly for those who were like me, having trouble reading price action, his thought process makes it clear. Have a long way to go still, but let's get there!",
    rating: 5,
    category: "all",
    discordImage: "/testimonials/15.png"
  },
  {
    id: 16,
    name: "Mo ✔",
    comment: "I’ve literally tried everything from supply and demand, order flow, volume profile but nothing ever worked for me. I was stuck thinking that just knowing a bunch of concepts was enough to be profitable but with time, I realized that none of it matters if you don’t actually have a real edge. That’s when I found Amas. With him, I didn’t just learn setups or concepts, I learned what a real edge looks like. For the first time, things started to make sense. Now, I know how to scalp 15 handles a day, consistently. It’s not life-changing money yet, but it’s consistent. It’s solid. And it’s just the beginning. This payout means more than just the $2K. It’s proof that I finally understand what I’m doing and it’s all thanks to @Amas",
    rating: 5,
    category: "results",
    discordImage: "/testimonials/16.png"
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
        <motion.div
          className="text-center mb-10"
          variants={fadeInUp}
          transition={{ delay: 0.1 }}
        >
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
        </motion.div>

        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-4 md:gap-6 pb-8 testimonial-container scrollbar-none"
          >
            {filteredTestimonials.map((testimonial, i) => (
              <Dialog key={testimonial.id}>
                <DialogTrigger asChild>
                  <motion.div
                    className="flex-none w-[260px] sm:w-[280px] md:w-[320px] bg-tradingbg-800 p-4 md:p-6 rounded-lg border border-gray-800 transition-all duration-200 cursor-pointer group active:scale-95 hover:border-mintgreen-300/40 focus:outline-none focus:ring-2 focus:ring-mintgreen-300"
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.4, delay: i * 0.04 }}
                  >
                    <StarRating rating={testimonial.rating} className="mb-3 md:mb-4" />
                    <p className="text-gray-300 mb-3 md:mb-4 text-sm sm:text-base text-justify line-clamp-6">
                      "{testimonial.comment}"
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
                      aria-label="Fermer"
                    >
                      <X className="w-5 h-5" />
                    </DialogClose>
                    <DialogTitle className="text-white">Témoignage client</DialogTitle>
                    <DialogDescription className="text-gray-400">
                      Capture réelle partagée dans notre Discord.
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
            ))}
          </div>

          {filteredTestimonials.length > 2 && (
            <>
              <Button
                onClick={() => scroll("left")}
                variant="outline"
                size="icon"
                className="absolute -left-10 top-1/2 -translate-y-1/2 bg-tradingbg-700 border-gray-800 hover:bg-mintgreen-300 text-white transition hidden md:flex shadow-lg"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                onClick={() => scroll("right")}
                variant="outline"
                size="icon"
                className="absolute -right-10 top-1/2 -translate-y-1/2 bg-tradingbg-700 border-gray-800 hover:bg-mintgreen-300 text-white transition hidden md:flex shadow-lg"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>

        <motion.div
          className="mt-8 md:mt-12 text-center"
          variants={fadeInUp}
          transition={{ delay: 0.2 }}
        >
          <blockquote className="text-xl sm:text-2xl md:text-3xl text-white font-light italic max-w-3xl mx-auto">
            "This program changed my trading forever."
          </blockquote>
          <div className="mt-3 text-mintgreen-300">
            <span className="inline-block px-3 py-1 bg-mintgreen-300/10 rounded-full text-sm">66+ reviews</span>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default TestimonialsSection;
