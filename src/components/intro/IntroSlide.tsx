import { motion } from "framer-motion";
import IntroQuestion from "@/components/intro/IntroQuestion";
import type { IntroQuestion as IntroQuestionType } from "@/consts/introForm.const";

type IntroSlideProps = {
  questions: IntroQuestionType[];
  answers: Record<string, string | string[]>;
  onAnswerChange: (id: string, value: string | string[]) => void;
  errorMessage?: string;
  isActive: boolean;
  invalidQuestionIds: string[];
};

const IntroSlide = ({
  questions,
  answers,
  onAnswerChange,
  errorMessage,
  isActive,
  invalidQuestionIds,
}: IntroSlideProps) => {
  return (
    <div className="h-full">
      <motion.div
        className="h-full flex flex-col justify-center gap-6 sm:gap-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut", staggerChildren: 0.08 }}
      >
        {questions.map((question) => (
          <motion.div key={question.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <IntroQuestion
              question={question}
              value={answers[question.id] ?? ""}
              onChange={(value) => onAnswerChange(question.id, value)}
              errorMessage={errorMessage}
              isActive={isActive}
              isInvalid={invalidQuestionIds.includes(question.id)}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default IntroSlide;
