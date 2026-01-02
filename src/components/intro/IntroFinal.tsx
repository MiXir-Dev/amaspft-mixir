import { introExperienceContent } from "@/consts/introExperience.const";

type IntroFinalProps = {
  onSubmit: () => void;
};

const IntroFinal = ({ onSubmit }: IntroFinalProps) => {
  return (
    <div className="h-full flex flex-col justify-center px-6 sm:px-10 max-w-2xl mx-auto text-center">
      <div className="space-y-3">
        <h2 className="text-3xl sm:text-4xl font-semibold">
          {introExperienceContent.form.title}
        </h2>
        <p className="text-gray-400 text-base sm:text-lg">
          {introExperienceContent.form.subtitle}
        </p>
      </div>

      <button
        type="button"
        onClick={onSubmit}
        className="mt-10 w-full sm:w-auto self-center px-8 py-4 rounded-md bg-mintgreen-300 text-tradingbg-600 font-medium hover:bg-mintgreen-400 transition-colors"
        aria-label={introExperienceContent.aria.send}
      >
        {introExperienceContent.actions.send}
      </button>
    </div>
  );
};

export default IntroFinal;
