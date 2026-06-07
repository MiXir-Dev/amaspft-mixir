import { FaDiscord, FaInstagram, FaTiktok, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { WhopIcon } from "@/components/icons/WhopIcon";
import type { SocialLink } from "@/types/social";

export const TRADER_NAME = "AmasPFT";
export const PRIMARY_CTA = "Apply to Work With Amas";
export const VIDEO_URL = "https://youtu.be/wjySO5qo7aQ";
export const LIFETIME_PAYOUTS = "$70,000+";
export const WHOP_RATING = "4.83";
export const WHOP_REVIEW_COUNT = 127;

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "X", href: "https://x.com/amaspft", icon: FaXTwitter },
  { label: "Instagram", href: "https://www.instagram.com/amas.pft", icon: FaInstagram },
  { label: "YouTube", href: "https://youtube.com/@amaspft", icon: FaYoutube },
  { label: "TikTok", href: "https://www.tiktok.com/@amas_pft", icon: FaTiktok },
  { label: "Discord", href: "https://discord.com/invite/jVWuy5CvDX", icon: FaDiscord },
  { label: "Whop", href: "https://whop.com/vip-ff-e142/", icon: WhopIcon },
];
