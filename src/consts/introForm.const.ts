export type IntroQuestion = {
  id: string;
  type: "text" | "email" | "select" | "options";
  title: string;
  subtitle?: string;
  required: boolean;
  options?: { label: string; value: string }[];
};

export const introFormQuestions: IntroQuestion[] = [
  {
    id: "name",
    type: "text",
    title: "What should we call you?",
    subtitle: "Share your first name so we can personalize the experience.",
    required: true,
  },
  {
    id: "email",
    type: "email",
    title: "Where can we send your plan?",
    subtitle: "We will only use this to follow up on your onboarding.",
    required: true,
  },
  {
    id: "experience",
    type: "select",
    title: "How long have you been trading?",
    subtitle: "Pick the range that fits you best.",
    required: true,
    options: [
      { label: "Just getting started", value: "new" },
      { label: "Less than 1 year", value: "lt1" },
      { label: "1-3 years", value: "1-3" },
      { label: "3+ years", value: "3plus" },
    ],
  },
  {
    id: "goal",
    type: "options",
    title: "What is your main focus right now?",
    subtitle: "Choose one focus to tailor your intro.",
    required: true,
    options: [
      { label: "Consistency", value: "consistency" },
      { label: "Funded accounts", value: "funded" },
      { label: "Strategy clarity", value: "strategy" },
      { label: "Discipline", value: "discipline" },
    ],
  },
];
