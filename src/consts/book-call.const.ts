export const bookingContent = {
  title: "Book Your Free Strategy Call",
  description:
    "Schedule a 15-minute call to discuss your trading goals and see how we can help.",
  steps: [
    { id: 1, label: "Email" },
    { id: 2, label: "Schedule" },
    { id: 3, label: "Confirm" },
  ],
  stepHeadings: {
    email: "Enter your email",
    schedule: "Select a date & time",
    confirmation: "Your call is scheduled!",
  },
  emailPlaceholder: "your@email.com",
  buttons: {
    continue: "Continue",
    schedule: "Schedule Call",
  },
  labels: {
    selectDate: "Select a date",
    selectTime: "Select a time",
  },
  toasts: {
    invalidEmail: "Please enter a valid email address",
    missingDateTime: "Please select a date and time",
    scheduled: "Your call has been scheduled!",
  },
  successDetailsLabel: "What happens next?",
  successDetails: [
    "You'll receive a confirmation email with Zoom link",
    "We'll send a calendar invitation for the scheduled time",
    "Prepare any questions about your trading goals",
  ],
  timeConnector: "at",
  dateLocale: "en-US",
  dateFormats: {
    short: { month: "short", day: "numeric" } as const,
    long: { weekday: "long", month: "long", day: "numeric" } as const,
  },
  availableDates: ["2025-05-22", "2025-05-23", "2025-05-24", "2025-05-25"],
  availableTimes: ["10:00 AM", "11:30 AM", "2:00 PM", "3:30 PM", "5:00 PM"],
  bullet: "\u2022",
};
