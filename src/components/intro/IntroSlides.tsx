import { motion } from "framer-motion";
import IntroQuestion from "@/components/intro/IntroQuestion";
import IntroFinal from "@/components/intro/IntroFinal";
import type { IntroQuestion as IntroQuestionType } from "@/consts/introForm.const";

type IntroSlidesProps = {
  questions: IntroQuestionType[];
  currentIndex: number;
  answers: Record<string, string>;
  errorMessage?: string;
  onAnswerChange: (id: string, value: string) => void;
  onSubmit: () => void;
};

const IntroSlides = ({
  questions,
  currentIndex,
  answers,
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
      {questions.map((question, index) => (
        <div key={question.id} className="h-full">
          <IntroQuestion
            question={question}
            value={answers[question.id] ?? ""}
            onChange={(value) => onAnswerChange(question.id, value)}
            errorMessage={errorMessage}
            isActive={index === currentIndex}
          />
        </div>
      ))}
      <div className="h-full">
        <IntroFinal onSubmit={onSubmit} />
      </div>
    </motion.div>
  );
};

export default IntroSlides;
