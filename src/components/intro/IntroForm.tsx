import { useEffect, useRef, useState } from "react";
import IntroSlides from "@/components/intro/IntroSlides";
import { introFormQuestions } from "@/consts/introForm.const";
import { introExperienceContent } from "@/consts/introExperience.const";
import useIntroNavigation from "@/components/intro/useIntroNavigation";

type IntroFormProps = {
  onComplete: (answers: Record<string, string>) => void;
};

const IntroForm = ({ onComplete }: IntroFormProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const containerRef = useRef<HTMLDivElement>(null);
  const questions = introFormQuestions;
  const isFinalScreen = currentIndex === questions.length;
  useEffect(() => {
    containerRef.current?.focus();
  }, []);
  const isValid = () => {
    if (isFinalScreen) return true;
    const question = questions[currentIndex];
    const value = answers[question.id] ?? "";
    if (!question.required) return true;
    if (question.type === "email") {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }
    return value.trim().length > 0;
  };
  const getError = () => {
    const question = questions[currentIndex];
    if (!question.required) return undefined;
    if (question.type === "email") {
      return introExperienceContent.validation.email;
    }
    return introExperienceContent.validation.required;
  };
  const handleDown = () => {
    setErrorMessage(undefined);
    setCurrentIndex((prev) => Math.min(prev + 1, questions.length));
  };
  const handleUp = () => {
    setErrorMessage(undefined);
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };
  const handleInvalid = () => setErrorMessage(getError());
  const { handleWheel, handleKeyDown, handleTouchStart, handleTouchEnd } = useIntroNavigation({
    canGoDown: isValid,
    onDown: handleDown,
    onUp: handleUp,
    onInvalid: handleInvalid,
  });
  const handleAnswerChange = (id: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
    if (errorMessage) setErrorMessage(undefined);
  };
  const handleSubmit = () => onComplete({ ...answers });

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      className="h-full w-full overflow-hidden outline-none"
      onWheel={handleWheel}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label={introExperienceContent.aria.form}
    >
      <IntroSlides
        questions={questions}
        currentIndex={currentIndex}
        answers={answers}
        errorMessage={errorMessage}
        onAnswerChange={handleAnswerChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default IntroForm;
