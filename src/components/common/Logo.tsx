import { cn } from "@/lib/utils";

type LogoProps = {
  size?: number;
  className?: string;
  showName?: boolean;
};

/**
 * Single Ali Paint & Hardware logo — A · P · H monogram with HUD brackets.
 */
export default function Logo({ size = 40, className, showName = false }: LogoProps) {
  const height = size;
  const width = Math.round(size * 1.55);

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 80 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
        className="shrink-0"
      >
        {/* HUD brackets */}
        <path
          d="M4 14V4H14M66 4H76V14M4 34V44H14M66 44H76V34"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="square"
          className="text-text-primary"
        />

        {/* A */}
        <path
          d="M18 38L24 12L30 38M20.5 29H27.5"
          stroke="currentColor"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-text-primary"
        />
        <circle cx="24" cy="10" r="2.5" fill="currentColor" className="text-accent-brand" />

        {/* P + paint drip */}
        <path
          d="M38 38V12H46C51.5 12 54 15.5 54 20C54 24.5 51.5 28 46 28H38"
          stroke="currentColor"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-text-primary"
        />
        <path
          d="M50 32C50 32 52 36 50 39C48 42 46 39 46 36C46 34 50 32 50 32Z"
          fill="currentColor"
          className="text-accent-brand"
        />

        {/* H — crossbar as hardware bolt */}
        <path
          d="M58 38V12M58 25H70M70 12V38"
          stroke="currentColor"
          strokeWidth="3.2"
          strokeLinecap="round"
          className="text-text-primary"
        />
        <circle cx="64" cy="25" r="2" fill="currentColor" className="text-accent-brand" />
        <circle cx="64" cy="25" r="0.8" fill="currentColor" className="text-bg-primary" />

        {/* Paint swatch bar under letters */}
        <rect x="16" y="41" width="6" height="2" rx="0.5" fill="#2D7A4F" />
        <rect x="24" y="41" width="6" height="2" rx="0.5" fill="#B8860B" />
        <rect x="32" y="41" width="6" height="2" rx="0.5" fill="#C0392B" />
        <rect x="40" y="41" width="6" height="2" rx="0.5" fill="#7A5C2E" />
        <rect x="48" y="41" width="6" height="2" rx="0.5" fill="#2D7A4F" />
        <rect x="56" y="41" width="6" height="2" rx="0.5" fill="#B8860B" />
      </svg>

      {showName && (
        <div className="leading-none">
          <span className="block text-base font-bold font-heading tracking-tight text-text-primary">
            Ali <span className="text-accent-brand">Paint</span>
          </span>
          <span className="block text-[10px] text-text-muted tracking-[0.18em] uppercase mt-0.5">
            & Hardware
          </span>
        </div>
      )}
    </div>
  );
}
