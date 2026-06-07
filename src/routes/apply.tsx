import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronDown } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { CTAButton } from "@/components/ui/CTAButton";
import { COUNTRIES } from "@/constants/countries.const";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/apply")({
  head: () => ({
    meta: [
      { title: "Apply — AmasPFT" },
      {
        name: "description",
        content: "Apply to work with Amas. For serious traders only.",
      },
      { property: "og:title", content: "Apply — AmasPFT" },
      {
        property: "og:description",
        content: "Apply to work with Amas. For serious traders only.",
      },
    ],
  }),
  component: ApplyPage,
});

const EXPERIENCE_LEVELS = [
  { value: "new", label: "New" },
  { value: "intermediate", label: "Intermediate" },
  { value: "experimented", label: "Experimented" },
] as const;

type ExperienceLevel = (typeof EXPERIENCE_LEVELS)[number]["value"];

const cleanHandle = (v: string) =>
  v.trim().replace(/^@+/, "").trim();

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
        return Number.isInteger(n) && n >= 13 && n <= 99;
      }, "Enter a valid age"),
    country: z.string().min(1, "Select your country"),
    experience: z.enum(["new", "intermediate", "experimented"], {
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

const labelCls = "block text-xs uppercase tracking-[0.18em] text-muted-foreground mb-2";
const inputCls =
  "w-full rounded-xl bg-surface-1 border border-white/10 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-mint/60 focus:ring-2 focus:ring-mint/20 transition";

function ApplyPage() {
  const [submitted, setSubmitted] = useState<{ contact: "Instagram" | "X" } | null>(null);

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

  const onSubmit = async (data: FormData) => {
    // eslint-disable-next-line no-console
    console.log("Application submitted", data);
    await new Promise((r) => setTimeout(r, 500));
    const ig = cleanHandle(data.instagram);
    setSubmitted({ contact: ig ? "Instagram" : "X" });
  };

  return (
    <PageShell>
      <section className="relative pt-28 sm:pt-36 md:pt-44 pb-20 sm:pb-24">
        <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-[500px] w-[700px] rounded-full bg-mint/[0.05] blur-[120px]" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <span className="font-medium uppercase tracking-[0.22em] text-mint text-xs sm:text-sm">
              APPLICATION
            </span>
            <h1 className="mt-4 text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-balance">
              Apply To Work With Amas
            </h1>
          </div>

          {submitted ? (
            <SuccessState contact={submitted.contact} />
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6 rounded-2xl "
              noValidate
            >
              <div>
                <label className={labelCls}>Name</label>
                <input {...register("name")} className={inputCls} autoComplete="name" />
                {errors.name && (
                  <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>
                )}
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelCls}>Instagram handle</label>
                  <input
                    {...register("instagram")}
                    placeholder="@username"
                    className={inputCls}
                  />
                  {errors.instagram && (
                    <p className="mt-1 text-xs text-destructive">{errors.instagram.message}</p>
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
                    <p className="mt-1 text-xs text-destructive">{errors.xHandle.message}</p>
                  )}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
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
                    <p className="mt-1 text-xs text-destructive">{errors.age.message}</p>
                  )}
                </div>
                <div>
                  <label className={labelCls}>Where are you from?</label>
                  <Controller
                    control={control}
                    name="country"
                    render={({ field }) => (
                      <CountrySelect value={field.value} onChange={field.onChange} />
                    )}
                  />
                  {errors.country && (
                    <p className="mt-1 text-xs text-destructive">{errors.country.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className={labelCls}>Experience level</label>
                <Controller
                  control={control}
                  name="experience"
                  render={({ field }) => (
                    <ExperienceSelector value={field.value} onChange={field.onChange} />
                  )}
                />
                {errors.experience && (
                  <p className="mt-1 text-xs text-destructive">{errors.experience.message}</p>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center rounded-full bg-mint px-6 py-3.5 text-sm font-medium text-primary-foreground hover:bg-mint-hover transition disabled:opacity-60"
                >
                  {isSubmitting ? "Submitting…" : "Submit Application"}
                </button>
                <p className="mt-4 text-[11px] text-muted-foreground/80 text-center leading-relaxed">
                  By submitting, you understand that trading involves risk and results are not
                  guaranteed.
                </p>
              </div>
            </form>
          )}
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
        <ChevronDown className="h-4 w-4 opacity-60 shrink-0 ml-2" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-20" onClick={() => setOpen(false)} />
          <div className="absolute z-30 mt-2 w-full overflow-hidden rounded-xl border border-white/10 bg-surface-2 shadow-2xl">
            <div className="p-2 border-b border-white/10">
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search…"
                className="w-full rounded-lg bg-surface-1 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:border-mint/50"
              />
            </div>
            <ul className="max-h-60 overflow-y-auto py-1">
              {filtered.length === 0 && (
                <li className="px-4 py-3 text-xs text-muted-foreground">No matches</li>
              )}
              {filtered.map((c) => {
                const selected = c === value;
                return (
                  <li key={c}>
                    <button
                      type="button"
                      onClick={() => {
                        onChange(c);
                        setOpen(false);
                        setQuery("");
                      }}
                      className={cn(
                        "flex w-full items-center justify-between px-4 py-2.5 text-sm hover:bg-white/[0.04] transition",
                        selected && "text-mint",
                      )}
                    >
                      <span>{c}</span>
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

function SuccessState({ contact }: { contact: "Instagram" | "X" }) {
  return (
    <div className="rounded-2xl border border-mint/30 bg-mint/[0.04] p-8 sm:p-10 text-center">
      <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-mint/15 border border-mint/40">
        <Check className="h-6 w-6 text-mint" />
      </div>
      <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Submitted.</h2>
      <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-sm mx-auto">
        Amas will contact you on {contact}.
      </p>
      <div className="mt-7">
        <CTAButton to="/" variant="ghost">
          Back Home
        </CTAButton>
      </div>
    </div>
  );
}
