import { lazy, Suspense, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const Lightbox = lazy(() => import("yet-another-react-lightbox"));

type LightboxImageProps = {
  src: string;
  alt: string;
  className?: string;
  children: ReactNode;
};

export function LightboxImage({
  src,
  alt,
  className,
  children,
}: LightboxImageProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "block w-full rounded-2xl text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-4 focus-visible:ring-offset-background",
          className,
        )}
        aria-label={`Open image preview: ${alt}`}
      >
        {children}
      </button>

      {open && (
        <Suspense fallback={null}>
          <Lightbox
            open
            close={() => setOpen(false)}
            slides={[{ src, alt }]}
            controller={{ closeOnBackdropClick: true }}
          />
        </Suspense>
      )}
    </>
  );
}
