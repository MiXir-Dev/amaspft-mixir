import type { Payout } from "@/types/payout";
import payout1 from "@/assets/payout-1.jpg";
import payout2 from "@/assets/payout-2.jpg";
import payout3 from "@/assets/payout-3.jpg";
import payout4 from "@/assets/payout-4.jpg";
import payout5 from "@/assets/payout-5.jpg";

export const PAYOUTS: Payout[] = [
  { id: "payout-001", amount: "$10,000", imageSrc: payout1, alt: "$10,000 payout proof" },
  { id: "payout-002", amount: "$6,000", imageSrc: payout2, alt: "$6,000 payout proof" },
  { id: "payout-003", amount: "$5,000", imageSrc: payout3, alt: "$5,000 payout proof" },
  { id: "payout-004", amount: "$8,500", imageSrc: payout4, alt: "$8,500 payout proof" },
  { id: "payout-005", amount: "$12,000", imageSrc: payout5, alt: "$12,000 payout proof" },
  { id: "payout-006", amount: "$7,200", imageSrc: payout2, alt: "$7,200 payout proof" },
  { id: "payout-007", amount: "$4,800", imageSrc: payout3, alt: "$4,800 payout proof" },
  { id: "payout-008", amount: "$9,400", imageSrc: payout4, alt: "$9,400 payout proof" },
];
