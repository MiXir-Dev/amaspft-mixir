import { introExperienceContent } from "@/consts/introExperience.const";
import type { IntroQuestion as IntroQuestionType } from "@/consts/introForm.const";

type IntroQuestionProps = {
  question: IntroQuestionType;
  value: string;
  onChange: (value: string) => void;
  errorMessage?: string;
  isActive: boolean;
};

const IntroQuestion = ({
  question,
  value,
  onChange,
  errorMessage,
  isActive,
}: IntroQuestionProps) => {
  return (
    <div className="h-full flex flex-col justify-center px-6 sm:px-10 max-w-3xl mx-auto">
      <div className="space-y-3">
        <h2 className="text-3xl sm:text-4xl font-semibold">{question.title}</h2>
        {question.subtitle && (
          <p className="text-gray-400 text-base sm:text-lg">{question.subtitle}</p>
        )}
      </div>

      <div className="mt-8 space-y-4">
        {(question.type === "text" || question.type === "email") && (
          <input
            type={question.type}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder={
              question.type === "email"
                ? introExperienceContent.form.emailPlaceholder
                : introExperienceContent.form.inputPlaceholder
            }
            className="w-full bg-tradingbg-800/70 border border-gray-800 rounded-md px-4 py-3 text-white focus:border-mintgreen-300 focus:outline-none"
            aria-label={question.title}
          />
        )}

        {question.type === "select" && (
          <select
            value={value}
            onChange={(event) => onChange(event.target.value)}
            className="w-full bg-tradingbg-800/70 border border-gray-800 rounded-md px-4 py-3 text-white focus:border-mintgreen-300 focus:outline-none"
            aria-label={question.title}
          >
            <option value="">{introExperienceContent.form.selectPlaceholder}</option>
            {question.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}

        {question.type === "options" && (
          <div className="grid gap-3 sm:grid-cols-2" aria-label={introExperienceContent.form.optionsLabel}>
            {question.options?.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => onChange(option.value)}
                className={`px-4 py-3 rounded-md border text-left transition-colors ${
                  value === option.value
                    ? "border-mintgreen-300 text-mintgreen-300 bg-tradingbg-800/80"
                    : "border-gray-800 text-white bg-tradingbg-800/60 hover:border-mintgreen-300/60"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}

        {isActive && errorMessage && (
          <p className="text-sm text-mintgreen-300">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default IntroQuestion;
