import { cn } from "@/lib/utils";

type Props = {
  value: string;
  label: string;
  className?: string;
};

export function MetricPill({ value, label, className }: Props) {
  return (
    <div
      className={cn(
        "flex items-baseline gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 backdrop-blur-sm",
        className,
      )}
    >
      <span className="text-sm font-semibold text-mint">{value}</span>
      <span className="text-xs text-muted-foreground tracking-wide">{label}</span>
    </div>
  );
}
