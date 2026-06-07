import { FaXTwitter, FaInstagram, FaYoutube, FaTiktok, FaDiscord } from "react-icons/fa6";
import type { SocialLink } from "@/types/social";

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "X", href: "https://x.com/AmasPFT", icon: FaXTwitter },
  { label: "Instagram", href: "https://instagram.com/amas.pft", icon: FaInstagram },
  { label: "YouTube", href: "#", icon: FaYoutube },
  { label: "TikTok", href: "#", icon: FaTiktok },
  { label: "Discord", href: "#", icon: FaDiscord },
];
