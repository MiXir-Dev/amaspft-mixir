import { cn } from "@/lib/utils";

type Props = {
  imageSrc: string;
  alt: string;
  bottomLeft?: string;
  topLeft?: string;
  topRight?: string;
  bottomRight?: string;
  className?: string;
  aspect?: "portrait" | "landscape";
};

export function ProofCard({
  imageSrc,
  alt,
  bottomLeft,
  topLeft,
  topRight,
  bottomRight,
  className,
  aspect = "portrait",
}: Props) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/10 bg-surface-1",
        aspect === "portrait" ? "aspect-[4/5]" : "aspect-[16/10]",
        className,
      )}
    >
      <img
        src={imageSrc}
        alt={alt}
        loading="lazy"
        decoding="async"
        fetchPriority="low"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/40" />
      {topLeft && (
        <span className="absolute top-4 left-4 text-xs uppercase tracking-[0.15em] text-muted-foreground">
          {topLeft}
        </span>
      )}
      {topRight && (
        <span className="absolute top-4 right-4 text-[10px] uppercase tracking-[0.2em] text-muted-foreground/80 border border-white/10 rounded-full px-2 py-1 bg-black/40 backdrop-blur-sm">
          {topRight}
        </span>
      )}
      {bottomLeft && (
        <span className="absolute bottom-4 left-4 text-2xl sm:text-3xl font-semibold tracking-tight text-mint">
          {bottomLeft}
        </span>
      )}
      {bottomRight && (
        <span className="absolute bottom-5 right-4 text-xs font-medium text-foreground/90">
          {bottomRight}
        </span>
      )}
    </div>
  );
}
