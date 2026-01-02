import { motion } from "framer-motion";
import IntroFinal from "@/components/intro/IntroFinal";
import IntroSlide from "@/components/intro/IntroSlide";
import type { IntroQuestion as IntroQuestionType } from "@/consts/introForm.const";

type IntroSlidesProps = {
  slides: { id: string; questions: string[] }[];
  questionMap: Record<string, IntroQuestionType>;
  currentIndex: number;
  answers: Record<string, string | string[]>;
  invalidQuestionIds: string[];
  errorMessage?: string;
  onAnswerChange: (id: string, value: string | string[]) => void;
  onSubmit: () => void;
};

const IntroSlides = ({
  slides,
  questionMap,
  currentIndex,
  answers,
  invalidQuestionIds,
  errorMessage,
  onAnswerChange,
  onSubmit,
}: IntroSlidesProps) => {
  return (
    <motion.div
      className="h-full"
      animate={{ y: `-${currentIndex * 100}%` }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {slides.map((slide, index) => {
        const slideQuestions = slide.questions.map((id) => questionMap[id]).filter(Boolean);
        return (
          <div key={slide.id} className="h-full">
            <IntroSlide
              questions={slideQuestions}
              answers={answers}
              onAnswerChange={onAnswerChange}
              errorMessage={errorMessage}
              isActive={index === currentIndex}
              invalidQuestionIds={invalidQuestionIds}
            />
          </div>
        );
      })}
      <div className="h-full">
        <IntroFinal onSubmit={onSubmit} />
      </div>
    </motion.div>
  );
};

export default IntroSlides;
