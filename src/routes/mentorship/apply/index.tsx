import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronDown } from "lucide-react";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";
import { PageShell } from "@/components/layout/PageShell";
import { COUNTRIES } from "@/constants/countries.const";
import {
  MENTORSHIP_SUCCESS_CONTACTS,
  type MentorshipContactChannel,
  TRADER_NAME,
} from "@/constants/app.const";
import { getMentorshipApplyHead } from "../-meta";
import { cn } from "@/lib/utils";
import { sendTelegramApplication } from "@/server/send-telegram-application";

export const Route = createFileRoute("/mentorship/apply/")({
  head: () => getMentorshipApplyHead(),
  component: MentorshipApply,
});

const EXPERIENCE_LEVELS = [
  { value: "new", label: "New" },
  { value: "intermediate", label: "Intermediate" },
  { value: "experienced", label: "Experienced" },
] as const;

type ExperienceLevel = (typeof EXPERIENCE_LEVELS)[number]["value"];

const cleanHandle = (value: string) =>
  value
    .trim()
    .replace(/^https?:\/\/(www\.)?(instagram\.com|x\.com|twitter\.com)\//i, "")
    .replace(/^@+/, "")
    .replace(/^\/+/, "")
    .split("?")[0]
    .split("/")[0]
    .trim();

const schema = z
  .object({
    name: z.string().trim().min(1, "Required").max(100),
    instagram: z.string().trim().max(60),
    xHandle: z.string().trim().max(60),
    age: z
      .string()
      .min(1, "Required")
      .refine((v) => {
        const n = Number(v);
        return Number.isInteger(n) && n >= 18 && n <= 99;
      }, "Enter a valid age (18+)"),
    country: z.string().min(1, "Select your country"),
    experience: z.enum(["new", "intermediate", "experienced"], {
      message: "Select your experience",
    }),
  })
  .superRefine((data, ctx) => {
    if (!cleanHandle(data.instagram) && !cleanHandle(data.xHandle)) {
      const msg = "Enter your Instagram or X handle so Amas can contact you.";
      ctx.addIssue({ code: "custom", path: ["instagram"], message: msg });
      ctx.addIssue({ code: "custom", path: ["xHandle"], message: msg });
    }
  });

type FormData = z.infer<typeof schema>;

const labelCls =
  "block text-xs uppercase tracking-[0.18em] text-muted-foreground mb-2";

const inputCls =
  "w-full rounded-xl bg-surface-1 border border-white/10 px-4 py-3 text-base sm:text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-mint/60 focus:ring-2 focus:ring-mint/20 transition";

export function MentorshipApply() {
  const [submitted, setSubmitted] = useState<{
    contact: MentorshipContactChannel;
  } | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      instagram: "",
      xHandle: "",
      age: "",
      country: "",
      experience: undefined as unknown as ExperienceLevel,
    },
  });

  useEffect(() => {
    if (!submitted || typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    window.requestAnimationFrame(() => {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    });
  }, [submitted]);

  const onSubmit = async (data: FormData) => {
    try {
      await sendTelegramApplication({ data });
      setSubmitted({
        contact: cleanHandle(data.instagram) ? "Instagram" : "X",
      });
    } catch (error) {
      console.error("Application submission failed:", error);
    }
  };

  if (submitted) {
    const details = MENTORSHIP_SUCCESS_CONTACTS[submitted.contact];
    const ContactIcon =
      submitted.contact === "Instagram" ? FaInstagram : FaXTwitter;

    return (
      <PageShell>
        <section className="relative overflow-hidden px-4 pt-28 pb-8 sm:px-6 sm:pt-36 lg:px-8">
          <div className="pointer-events-none absolute -top-32 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-mint/[0.05] blur-[120px]" />
          <div className="relative mx-auto flex max-w-sm flex-col items-center text-center">
            <a
              href={details.actionHref}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col items-center focus:outline-none"
              aria-label={details.ariaLabel}
            >
              <img
                src={details.imagePath}
                alt={details.imageAlt}
                className="h-24 w-24 rounded-full object-cover sm:h-28 sm:w-28"
              />
              <div className="mt-4 flex items-center gap-1.5">
                <span className="text-base font-medium tracking-tight text-foreground sm:text-lg">
                  {details.handle}
                </span>
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-mint text-background">
                  <Check className="h-2.5 w-2.5 stroke-[3]" />
                </span>
              </div>
            </a>

            <h2 className="mt-7 text-2xl font-semibold tracking-tight sm:text-3xl">
              DM {TRADER_NAME} on {details.label}.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
              He is waiting for your message now.
            </p>
            <a
              href={details.actionHref}
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-mint px-6 py-3.5 text-sm font-medium text-primary-foreground transition hover:bg-mint-hover"
            >
              <ContactIcon
                className="h-4 w-4 shrink-0"
                style={{ color: details.iconColor }}
                aria-hidden="true"
              />
              {details.actionLabel}
            </a>
          </div>
        </section>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <section className="relative pt-28 pb-20 sm:pt-36 sm:pb-24 md:pt-44">
        <div className="pointer-events-none absolute -top-32 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-mint/[0.05] blur-[120px]" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center sm:mb-12">
            <span className="font-medium uppercase tracking-[0.22em] text-mint text-xs sm:text-sm">
              APPLICATION
            </span>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl">
              Apply To Work With AmasPFT
            </h1>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 rounded-2xl"
            noValidate
          >
            <div>
              <label className={labelCls}>Name</label>
              <input
                {...register("name")}
                className={inputCls}
                autoComplete="name"
              />
              {errors.name && (
                <p className="mt-1 text-xs text-destructive">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={labelCls}>Instagram handle</label>
                <input
                  {...register("instagram")}
                  placeholder="@username"
                  className={inputCls}
                />
                {errors.instagram && (
                  <p className="mt-1 text-xs text-destructive">
                    {errors.instagram.message}
                  </p>
                )}
              </div>

              <div>
                <label className={labelCls}>𝕏 handle (twitter)</label>
                <input
                  {...register("xHandle")}
                  placeholder="@username"
                  className={inputCls}
                />
                {errors.xHandle && (
                  <p className="mt-1 text-xs text-destructive">
                    {errors.xHandle.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={labelCls}>How old are you?</label>
                <input
                  type="number"
                  inputMode="numeric"
                  min={13}
                  max={99}
                  {...register("age")}
                  className={inputCls}
                />
                {errors.age && (
                  <p className="mt-1 text-xs text-destructive">
                    {errors.age.message}
                  </p>
                )}
              </div>

              <div>
                <label className={labelCls}>Where are you from?</label>
                <Controller
                  control={control}
                  name="country"
                  render={({ field }) => (
                    <CountrySelect
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                {errors.country && (
                  <p className="mt-1 text-xs text-destructive">
                    {errors.country.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className={labelCls}>Experience level</label>
              <Controller
                control={control}
                name="experience"
                render={({ field }) => (
                  <ExperienceSelector
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.experience && (
                <p className="mt-1 text-xs text-destructive">
                  {errors.experience.message}
                </p>
              )}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                aria-label="Apply to Work With AmasPFT"
                className="inline-flex w-full items-center justify-center rounded-full bg-mint px-6 py-3.5 text-sm font-medium text-primary-foreground transition hover:bg-mint-hover disabled:opacity-60"
              >
                {isSubmitting ? "Submitting…" : "Submit Application"}
              </button>
              <p className="mt-4 text-center text-[11px] leading-relaxed text-muted-foreground/80">
                By submitting, you understand that trading involves risk and
                results are not guaranteed.
              </p>
            </div>
          </form>
        </div>
      </section>
    </PageShell>
  );
}

function ExperienceSelector({
  value,
  onChange,
}: {
  value: ExperienceLevel | undefined;
  onChange: (v: ExperienceLevel) => void;
}) {
  return (
    <div
      role="radiogroup"
      aria-label="Experience level"
      className="flex flex-wrap items-center justify-between sm:gap-5"
    >
      {EXPERIENCE_LEVELS.map((opt) => {
        const selected = value === opt.value;

        return (
          <label
            key={opt.value}
            className={cn(
              "group flex cursor-pointer items-center gap-2 rounded-full py-1 text-sm font-medium transition-colors",
              selected
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <input
              type="radio"
              name="experience"
              value={opt.value}
              checked={selected}
              onChange={() => onChange(opt.value)}
              className="sr-only"
            />
            <span
              className={cn(
                "flex h-5 w-5 items-center justify-center rounded-full border transition-all duration-200",
                selected
                  ? "border-mint shadow-[0_0_18px_rgba(193,225,194,0.55)]"
                  : "border-white/20 group-hover:border-mint/50",
              )}
            >
              <span
                className={cn(
                  "h-2.5 w-2.5 rounded-full transition-all duration-200",
                  selected
                    ? "scale-100 bg-mint shadow-[0_0_14px_rgba(193,225,194,0.9)]"
                    : "scale-0",
                )}
              />
            </span>
            <span>{opt.label}</span>
          </label>
        );
      })}
    </div>
  );
}

function CountrySelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const filtered = query
    ? COUNTRIES.filter((c) => c.toLowerCase().includes(query.toLowerCase()))
    : COUNTRIES;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          inputCls,
          "flex items-center justify-between text-left",
          !value && "text-muted-foreground/60",
        )}
      >
        <span className="truncate">{value || "Select country"}</span>
        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-60" />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-20" onClick={() => setOpen(false)} />
          <div className="absolute z-30 mt-2 w-full overflow-hidden rounded-xl border border-white/10 bg-surface-2 shadow-2xl">
            <div className="border-b border-white/10 p-2">
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search…"
                className="w-full rounded-lg border border-white/10 bg-surface-1 px-3 py-2 text-base focus:border-mint/50 focus:outline-none sm:text-sm"
              />
            </div>

            <ul className="max-h-60 overflow-y-auto py-1">
              {filtered.length === 0 && (
                <li className="px-4 py-3 text-xs text-muted-foreground">
                  No matches
                </li>
              )}

              {filtered.map((country) => {
                const selected = country === value;
                return (
                  <li key={country}>
                    <button
                      type="button"
                      onClick={() => {
                        onChange(country);
                        setOpen(false);
                        setQuery("");
                      }}
                      className={cn(
                        "flex w-full items-center justify-between px-4 py-2.5 text-sm transition hover:bg-white/[0.04]",
                        selected && "text-mint",
                      )}
                    >
                      <span>{country}</span>
                      {selected && <Check className="h-4 w-4" />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
