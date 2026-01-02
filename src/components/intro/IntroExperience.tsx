import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import IntroForm from "@/components/intro/IntroForm";
import { IntroStage } from "@/enums/intro-stage.enum";

type IntroExperienceProps = {
  onComplete: () => void;
};

const IntroExperience = ({ onComplete }: IntroExperienceProps) => {
  const [stage, setStage] = useState<IntroStage>(IntroStage.Form);
  const submittedAnswersRef = useRef<Record<string, string> | null>(null);

  useEffect(() => {
    if (stage === IntroStage.Done) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [stage]);

  if (stage === IntroStage.Done) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[9998] bg-black text-white overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black via-tradingbg-900/80 to-black"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(193,225,194,0.08),_transparent_55%)]"></div>
      {stage === IntroStage.Form && (
        <IntroForm
          onComplete={(answers) => {
            submittedAnswersRef.current = answers;
            setStage(IntroStage.Done);
            onComplete();
          }}
        />
      )}
    </motion.div>
  );
};

export default IntroExperience;
