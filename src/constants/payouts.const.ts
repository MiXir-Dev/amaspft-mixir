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
  {
    id: "payout-001",
    amount: "12,000$",
    imageSrc: pay1,
    alt: "AmasPFT futures trading payout screenshot showing a $12,000 withdrawal",
  },
  {
    id: "payout-002",
    amount: "$860",
    imageSrc: pay1Live,
    alt: "AmasPFT live payout screenshot showing an $860 withdrawal",
    live: true,
  },
  {
    id: "payout-003",
    amount: "$15,000",
    imageSrc: pay2,
    alt: "AmasPFT futures trading payout screenshot showing a $15,000 withdrawal",
  },
  {
    id: "payout-004",
    amount: "$2,300",
    imageSrc: pay2Live,
    alt: "AmasPFT live payout screenshot showing a $2,300 withdrawal",
    live: true,
  },
  {
    id: "payout-005",
    amount: "$15,000",
    imageSrc: pay3,
    alt: "AmasPFT futures trading payout screenshot showing a $15,000 withdrawal",
  },
  {
    id: "payout-006",
    amount: "$1,390",
    imageSrc: pay3Live,
    alt: "AmasPFT live payout screenshot showing a $1,390 withdrawal",
    live: true,
  },
  {
    id: "payout-010",
    amount: "$12,445",
    imageSrc: pay7,
    alt: "AmasPFT futures trading payout screenshot showing a $12,445 withdrawal",
  },
  {
    id: "payout-007",
    amount: "$10,467",
    imageSrc: pay4,
    alt: "AmasPFT futures trading payout screenshot showing a $10,467 withdrawal",
  },
  {
    id: "payout-008",
    amount: "$3,000",
    imageSrc: pay5,
    alt: "AmasPFT futures trading payout screenshot showing a $3,000 withdrawal",
  },
  {
    id: "payout-011",
    amount: "$9,444",
    imageSrc: pay8,
    alt: "AmasPFT futures trading payout screenshot showing a $9,444 withdrawal",
  },
  {
    id: "payout-009",
    amount: "$3,000",
    imageSrc: pay6,
    alt: "AmasPFT futures trading payout screenshot showing a $3,000 withdrawal",
  },
];
