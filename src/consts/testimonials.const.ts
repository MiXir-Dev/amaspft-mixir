export const formatTestimonialQuote = (comment: string) => `"${comment}"`;

export const testimonialImageAlt = (name: string) => `${name}'s testimonial`;

export const testimonialsSectionContent = {
  title: "Client Success Stories",
  description: "Real traders sharing real results and experiences.",
  allCategoryId: "all",
  categories: [
    { id: "all", label: "All" },
    { id: "results", label: "Results" },
    { id: "mentorship", label: "Mentorship" },
    { id: "support", label: "Support" },
  ],
  dialog: {
    closeLabel: "Fermer",
    title: "Témoignage client",
    description: "Capture réelle partagée dans notre Discord.",
  },
  quote: "This program changed my trading forever.",
  reviewsLabel: "66+ reviews",
};
