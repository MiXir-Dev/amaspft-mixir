import type { ComponentType, SVGProps } from "react";

export type SocialLink = {
  label: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};
