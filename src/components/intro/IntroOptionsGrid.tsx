import { introExperienceContent } from "@/consts/introExperience.const";

type IntroOption = {
  label: string;
  value: string;
};

type IntroOptionsGridProps = {
  options: IntroOption[];
  selectedValues: string[];
  multi?: boolean;
  onToggle: (value: string) => void;
};

const IntroOptionsGrid = ({ options, selectedValues, multi, onToggle }: IntroOptionsGridProps) => {
  return (
    <div className="grid gap-3 sm:grid-cols-2" aria-label={introExperienceContent.form.optionsLabel}>
      {options.map((option) => {
        const isSelected = selectedValues.includes(option.value);
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onToggle(option.value)}
            className={`px-4 py-4 rounded-lg text-left transition-colors ${
              isSelected
                ? "text-mintgreen-300 bg-tradingbg-800/80 shadow-[0_0_24px_rgba(193,225,194,0.35)] ring-1 ring-mintgreen-300/60"
                : "text-white bg-tradingbg-800/50 shadow-[0_0_18px_rgba(0,0,0,0.4)] ring-1 ring-white/10 hover:ring-mintgreen-300/40"
            }`}
          >
            <div className="text-sm sm:text-base md:text-lg font-medium">{option.label}</div>
          </button>
        );
      })}
      {multi && (
        <div className="text-xs text-gray-400">
          {introExperienceContent.form.multiHint}
        </div>
      )}
    </div>
  );
};

export default IntroOptionsGrid;
