import {
  FaDiscord,
  FaInstagram,
  FaTiktok,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { WhopIcon } from "@/components/icons/WhopIcon";
import type { SocialLink } from "@/types/social";

// TODO: Replace with the final production domain before launch.
export const SITE_URL = "https://REPLACE_WITH_FINAL_DOMAIN";
export const SITE_NAME = "AmasPFT";
export const TRADER_NAME = "AmasPFT";
export const BRAND_DESCRIPTION =
  "Official website of AmasPFT, a futures trader sharing payout proof, monthly results, community testimonials, and application access.";
export const VIDEO_URL = "https://youtu.be/wjySO5qo7aQ";
export const PRIMARY_CTA = "Apply to Work With AmasPFT";
export const LIFETIME_PAYOUTS = "$70,000+";
export const WHOP_RATING = "4.83";
export const WHOP_REVIEW_COUNT = 127;
export const BRAND_IMAGE_PATH = "/amaspft-profile.jpg";
export const SHARE_IMAGE_PATH = "/og-thumbnail.png";
export const X_URL = "https://x.com/amaspft";
export const INSTAGRAM_URL = "https://www.instagram.com/amas.pft";
export const YOUTUBE_URL = "https://youtube.com/@amaspft";
export const TIKTOK_URL = "https://www.tiktok.com/@amas_pft";
export const DISCORD_URL = "https://discord.com/invite/jVWuy5CvDX";
export const WHOP_URL = "https://whop.com/vip-ff-e142/";

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "X", href: X_URL, icon: FaXTwitter },
  { label: "Instagram", href: INSTAGRAM_URL, icon: FaInstagram },
  { label: "YouTube", href: YOUTUBE_URL, icon: FaYoutube },
  { label: "TikTok", href: TIKTOK_URL, icon: FaTiktok },
  { label: "Discord", href: DISCORD_URL, icon: FaDiscord },
  { label: "Whop", href: WHOP_URL, icon: WhopIcon },
];

export const SAME_AS_LINKS = SOCIAL_LINKS.map((link) => link.href);

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}
