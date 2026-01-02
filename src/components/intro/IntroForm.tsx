import { useEffect, useRef, useState } from "react";
import IntroSlides from "@/components/intro/IntroSlides";
import { introFormQuestions, introFormSlides } from "@/consts/introForm.const";
import { introExperienceContent } from "@/consts/introExperience.const";
import useIntroNavigation from "@/components/intro/useIntroNavigation";
import { IntroQuestionType } from "@/enums/intro-question-type.enum";

type IntroFormProps = {
  onComplete: (answers: Record<string, string | string[]>) => void;
};

const IntroForm = ({ onComplete }: IntroFormProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const containerRef = useRef<HTMLDivElement>(null);
  const slides = introFormSlides;
  const questionMap = introFormQuestions;
  const isFinalScreen = currentIndex === slides.length;
  useEffect(() => {
    containerRef.current?.focus();
  }, []);
  const getValueArray = (value: string | string[] | undefined) =>
    Array.isArray(value) ? value : value ? [value] : [];
  const isQuestionValid = (questionId: string) => {
    const question = questionMap[questionId];
    if (!question.required) return true;
    const value = answers[questionId];
    if (question.type === IntroQuestionType.Email) {
      return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }
    if (question.type === IntroQuestionType.Options && question.multi) {
      return getValueArray(value).length > 0;
    }
    return typeof value === "string" ? value.trim().length > 0 : getValueArray(value).length > 0;
  };
  const isValid = () => {
    if (isFinalScreen) return true;
    return introFormSlides[currentIndex].questions.every(isQuestionValid);
  };
  const getCurrentInvalidIds = () => {
    if (isFinalScreen) return [];
    return introFormSlides[currentIndex].questions.filter((id) => !isQuestionValid(id));
  };
  const getError = () => {
    const [firstInvalidId] = getCurrentInvalidIds();
    const question = firstInvalidId ? questionMap[firstInvalidId] : undefined;
    if (!question?.required) return undefined;
    if (question.type === IntroQuestionType.Email) return introExperienceContent.validation.email;
    return introExperienceContent.validation.required;
  };
  const handleDown = () => {
    setErrorMessage(undefined);
    setCurrentIndex((prev) => Math.min(prev + 1, slides.length));
  };
  const handleUp = () => {
    setErrorMessage(undefined);
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };
  const handleInvalid = () => setErrorMessage(getError());
  const { handleKeyDown, handleTouchStart, handleTouchEnd } = useIntroNavigation({
    canGoDown: isValid,
    onDown: handleDown,
    onUp: handleUp,
    onInvalid: handleInvalid,
    containerRef,
  });
  const handleAnswerChange = (id: string, value: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
    if (errorMessage) setErrorMessage(undefined);
  };
  const handleSubmit = () => onComplete({ ...answers });
  const invalidQuestionIds = !errorMessage ? [] : getCurrentInvalidIds();

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      className="relative z-10 h-full w-full overflow-hidden outline-none"
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label={introExperienceContent.aria.form}
    >
      <IntroSlides
        slides={slides}
        questionMap={questionMap}
        currentIndex={currentIndex}
        answers={answers}
        invalidQuestionIds={invalidQuestionIds}
        errorMessage={errorMessage}
        onAnswerChange={handleAnswerChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default IntroForm;
