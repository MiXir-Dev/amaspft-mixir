import { FaXTwitter, FaInstagram, FaYoutube, FaTiktok, FaDiscord } from "react-icons/fa6";
import type { SocialLink } from "@/types/social";
import { WhopIcon } from "@/components/icons/WhopIcon";

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "X", href: "https://x.com/amaspft", icon: FaXTwitter },
  { label: "Instagram", href: "https://www.instagram.com/amas.pft", icon: FaInstagram },
  { label: "YouTube", href: "https://youtube.com/@amaspft", icon: FaYoutube },
  { label: "TikTok", href: "https://www.tiktok.com/@amas_pft", icon: FaTiktok },
  { label: "Discord", href: "https://discord.com/invite/jVWuy5CvDX", icon: FaDiscord },
  { label: "Whop", href: "https://whop.com/vip-ff-e142/", icon: WhopIcon },
];
