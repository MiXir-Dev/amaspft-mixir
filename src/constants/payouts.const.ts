import type { Payout } from "@/types/payout";
import pay1 from "@/assets/payouts/pay1.webp";
import pay1Live from "@/assets/payouts/pay1_live.webp";
import pay2 from "@/assets/payouts/pay2.webp";
import pay2Live from "@/assets/payouts/pay2_live.webp";
import pay3 from "@/assets/payouts/pay3.webp";
import pay3Live from "@/assets/payouts/pay3_liv.webp";
import pay4 from "@/assets/payouts/pay4.webp";
import pay5 from "@/assets/payouts/pay5.webp";
import pay6 from "@/assets/payouts/pay6.webp";
import pay7 from "@/assets/payouts/pay7.webp";
import pay8 from "@/assets/payouts/pay8.webp";

export const PAYOUTS: Payout[] = [
  { id: "payout-001", amount: "$X,XXX", imageSrc: pay1, alt: "Payout proof 1" },
  { id: "payout-002", amount: "$X,XXX", imageSrc: pay1Live, alt: "Live payout proof 1", live: true },
  { id: "payout-003", amount: "$X,XXX", imageSrc: pay2, alt: "Payout proof 2" },
  { id: "payout-004", amount: "$X,XXX", imageSrc: pay2Live, alt: "Live payout proof 2", live: true },
  { id: "payout-005", amount: "$X,XXX", imageSrc: pay3, alt: "Payout proof 3" },
  { id: "payout-006", amount: "$X,XXX", imageSrc: pay3Live, alt: "Live payout proof 3", live: true },
  { id: "payout-007", amount: "$X,XXX", imageSrc: pay4, alt: "Payout proof 4" },
  { id: "payout-008", amount: "$X,XXX", imageSrc: pay5, alt: "Payout proof 5" },
  { id: "payout-009", amount: "$X,XXX", imageSrc: pay6, alt: "Payout proof 6" },
  { id: "payout-010", amount: "$X,XXX", imageSrc: pay7, alt: "Payout proof 7" },
  { id: "payout-011", amount: "$X,XXX", imageSrc: pay8, alt: "Payout proof 8" },
];
