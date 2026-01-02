import { IntroQuestionType } from "@/enums/intro-question-type.enum";

export type IntroTitlePart = {
  text: string;
  accent?: boolean;
};

export type IntroQuestion = {
  id: string;
  type: IntroQuestionType;
  title: string;
  titleParts?: IntroTitlePart[];
  subtitle?: string;
  required: boolean;
  options?: { label: string; value: string }[];
  multi?: boolean;
};

export const introFormQuestions: Record<string, IntroQuestion> = {
  name: {
    id: "name",
    type: IntroQuestionType.Text,
    title: "What should we call you?",
    titleParts: [{ text: "What should we call" }, { text: "you?", accent: true }],
    subtitle: "Share your first name so we can personalize the experience.",
    required: true,
  },
  email: {
    id: "email",
    type: IntroQuestionType.Email,
    title: "Where can we send your plan?",
    titleParts: [{ text: "Where can we send" }, { text: "your plan?", accent: true }],
    subtitle: "We will only use this to follow up on your onboarding.",
    required: true,
  },
  experience: {
    id: "experience",
    type: IntroQuestionType.Options,
    title: "How long have you been trading?",
    titleParts: [{ text: "How long have you been" }, { text: "trading?", accent: true }],
    subtitle: "Pick the range that fits you best.",
    required: true,
    options: [
      { label: "Just getting started", value: "new" },
      { label: "Less than 1 year", value: "lt1" },
      { label: "1-3 years", value: "1-3" },
      { label: "3+ years", value: "3plus" },
    ],
    multi: false,
  },
  goal: {
    id: "goal",
    type: IntroQuestionType.Options,
    title: "What is your main focus right now?",
    titleParts: [{ text: "What is your main" }, { text: "focus right now?", accent: true }],
    subtitle: "Choose one focus to tailor your intro.",
    required: true,
    options: [
      { label: "Consistency", value: "consistency" },
      { label: "Funded accounts", value: "funded" },
      { label: "Strategy clarity", value: "strategy" },
      { label: "Discipline", value: "discipline" },
    ],
    multi: true,
  },
  budget: {
    id: "budget",
    type: IntroQuestionType.Options,
    title: "What investment level feels right?",
    titleParts: [{ text: "What investment level" }, { text: "feels right?", accent: true }],
    subtitle: "Choose the level that matches your current plan.",
    required: true,
    options: [
      { label: "Starter", value: "starter" },
      { label: "Growth", value: "growth" },
      { label: "Advanced", value: "advanced" },
      { label: "Not sure yet", value: "unsure" },
    ],
    multi: true,
  },
};

export const introFormSlides = [
  { id: "intro", questions: ["name", "email"] },
  { id: "experience", questions: ["experience"] },
  { id: "goals", questions: ["goal"] },
  { id: "budget", questions: ["budget"] },
];
