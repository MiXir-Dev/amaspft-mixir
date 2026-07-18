import {
  FaDiscord,
  FaInstagram,
  FaTiktok,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { WhopIcon } from "@/components/icons/WhopIcon";
import type { SocialLink } from "@/types/social";

export type MentorshipContactChannel = "Instagram" | "X";

export const SITE_URL = "https://amaspft.com";
export const SITE_NAME = "AmasPFT";
export const TRADER_NAME = "AmasPFT";
export const ALTERNATE_BRAND_NAME = "Pockets Full Trading";
export const AppRoute = {
  HOME: "/mentorship",
  MENTORSHIP_APPLY: "/mentorship/apply",
  INSTAGRAM: "/ig",
  YOUTUBE: "/ytb",
} as const;
export const BRAND_DESCRIPTION =
  "Official website of AmasPFT, also known as Pockets Full Trading, a futures trader sharing payout proof, monthly results, community testimonials, and application access.";
export const VIDEO_URL = "https://youtu.be/6jM0S5_Um9M";
export const PRIMARY_CTA = "Apply for 1-on-1 Mentorship";
export const LIFETIME_PAYOUTS = "$200,000+";
export const WHOP_RATING = "4.83";
export const WHOP_REVIEW_COUNT = 127;
export const BRAND_IMAGE_PATH = "/amaspft-profile.webp";
export const OG_IMAGE_PATH = "/og.webp";
export const OG_X_IMAGE_PATH = "/og_x.webp";
export const X_URL = "https://x.com/amaspft";
export const INSTAGRAM_URL = "https://www.instagram.com/amas.pft";
export const YOUTUBE_URL = "https://youtube.com/@amaspft";
export const TIKTOK_URL = "https://www.tiktok.com/@amas_pft";
export const DISCORD_URL = "https://discord.com/invite/jVWuy5CvDX";
export const WHOP_URL = "https://whop.com/vip-ff-e142/";
export const INSTAGRAM_DM_URL = "https://ig.me/m/amas.pft";
export const INSTAGRAM_PROFILE_IMAGE_PATH = "/amaspft-profile-ig.webp";
export const X_PROFILE_IMAGE_PATH = "/amaspft-profile-x.webp";

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "X", href: X_URL, icon: FaXTwitter },
  { label: "Instagram", href: INSTAGRAM_URL, icon: FaInstagram },
  { label: "YouTube", href: YOUTUBE_URL, icon: FaYoutube },
  { label: "TikTok", href: TIKTOK_URL, icon: FaTiktok },
  { label: "Discord", href: DISCORD_URL, icon: FaDiscord },
  { label: "Whop", href: WHOP_URL, icon: WhopIcon },
];

export const SAME_AS_LINKS = SOCIAL_LINKS.map((link) => link.href);

export const MENTORSHIP_SUCCESS_CONTACTS: Record<
  MentorshipContactChannel,
  {
    actionHref: string;
    actionLabel: string;
    ariaLabel: string;
    handle: string;
    iconColor: string;
    imageAlt: string;
    imagePath: string;
    label: "Instagram" | "𝕏";
    message: string;
  }
> = {
  Instagram: {
    actionHref: INSTAGRAM_DM_URL,
    actionLabel: 'DM "MENTORSHIP" on Instagram',
    ariaLabel: "DM AmasPFT for mentorship on Instagram",
    handle: "@amas.pft",
    iconColor: "#E4405F",
    imageAlt: "AmasPFT Instagram profile photo",
    imagePath: INSTAGRAM_PROFILE_IMAGE_PATH,
    label: "Instagram",
    message: "He is waiting for your message now.",
  },
  X: {
    actionHref: X_URL,
    actionLabel: 'DM "MENTORSHIP" on 𝕏',
    ariaLabel: "DM AmasPFT for mentorship on 𝕏",
    handle: "@AmasPFT",
    iconColor: "#111111",
    imageAlt: "AmasPFT X profile photo",
    imagePath: X_PROFILE_IMAGE_PATH,
    label: "𝕏",
    message: "He is waiting for your message now.",
  },
};

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}
