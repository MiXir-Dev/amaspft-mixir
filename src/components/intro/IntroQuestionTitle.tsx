import type { IntroTitlePart } from "@/consts/introForm.const";

type IntroQuestionTitleProps = {
  title: string;
  titleParts?: IntroTitlePart[];
  subtitle?: string;
};

const IntroQuestionTitle = ({ title, titleParts, subtitle }: IntroQuestionTitleProps) => {
  return (
    <div className="space-y-3">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
        {titleParts?.length
          ? titleParts.map((part, index) => (
              <span
                key={`${part.text}-${index}`}
                className={part.accent ? "text-mintgreen-300" : "text-white"}
              >
                {part.text}{" "}
              </span>
            ))
          : title}
      </h2>
      {subtitle && <p className="text-gray-400 text-sm sm:text-base">{subtitle}</p>}
    </div>
  );
};

export default IntroQuestionTitle;
