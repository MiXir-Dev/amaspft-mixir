import { introExperienceContent } from "@/consts/introExperience.const";
import { IntroQuestionType } from "@/enums/intro-question-type.enum";

type IntroTextInputProps = {
  type: IntroQuestionType.Text | IntroQuestionType.Email;
  value: string;
  label: string;
  onChange: (value: string) => void;
};

const IntroTextInput = ({ type, value, label, onChange }: IntroTextInputProps) => {
  return (
    <input
      type={type}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={
        type === IntroQuestionType.Email
          ? introExperienceContent.form.emailPlaceholder
          : introExperienceContent.form.inputPlaceholder
      }
      className="w-full bg-tradingbg-800/60 rounded-lg px-4 py-3 text-white text-base sm:text-lg shadow-[0_0_24px_rgba(193,225,194,0.08)] ring-1 ring-mintgreen-300/20 focus:ring-mintgreen-300/60 focus:outline-none"
      aria-label={label}
    />
  );
};

export default IntroTextInput;
