import type { IntroQuestion as IntroQuestionType } from "@/consts/introForm.const";
import { IntroQuestionType } from "@/enums/intro-question-type.enum";
import IntroOptionsGrid from "@/components/intro/IntroOptionsGrid";
import IntroQuestionTitle from "@/components/intro/IntroQuestionTitle";
import IntroTextInput from "@/components/intro/IntroTextInput";

type IntroQuestionProps = {
  question: IntroQuestionType;
  value: string | string[];
  onChange: (value: string | string[]) => void;
  errorMessage?: string;
  isActive: boolean;
  isInvalid: boolean;
};

const IntroQuestion = ({
  question,
  value,
  onChange,
  errorMessage,
  isActive,
  isInvalid,
}: IntroQuestionProps) => {
  const values = Array.isArray(value) ? value : value ? [value] : [];

  const handleOptionToggle = (optionValue: string) => {
    if (question.multi) {
      const nextValues = values.includes(optionValue)
        ? values.filter((item) => item !== optionValue)
        : [...values, optionValue];
      onChange(nextValues);
      return;
    }
    onChange(values.includes(optionValue) ? "" : optionValue);
  };

  return (
    <div className="w-full px-6 sm:px-10 max-w-3xl mx-auto space-y-6">
      <IntroQuestionTitle
        title={question.title}
        titleParts={question.titleParts}
        subtitle={question.subtitle}
      />

      <div className="mt-8 space-y-4">
        {(question.type === IntroQuestionType.Text ||
          question.type === IntroQuestionType.Email) && (
          <IntroTextInput
            type={question.type}
            value={values[0] ?? ""}
            label={question.title}
            onChange={(nextValue) => onChange(nextValue)}
          />
        )}

        {question.type === IntroQuestionType.Options && question.options && (
          <IntroOptionsGrid
            options={question.options}
            selectedValues={values}
            multi={question.multi}
            onToggle={handleOptionToggle}
          />
        )}

        {isActive && isInvalid && errorMessage && (
          <p className="text-sm text-mintgreen-300">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default IntroQuestion;
