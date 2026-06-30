import Link from "next/link";
import { cn } from "@/lib/utils";

type HudButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  icon?: React.ReactNode;
};

export default function HudButton({
  href,
  children,
  variant = "primary",
  className,
  icon,
}: HudButtonProps) {
  const isPrimary = variant === "primary";

  return (
    <Link
      href={href}
      className={cn(
        "group/hud relative inline-flex min-w-[180px] items-center justify-center px-8 py-4 cursor-pointer",
        "font-mono text-xs sm:text-sm font-semibold uppercase tracking-[0.2em]",
        "text-text-primary dark:text-[#ece8df]",
        "transition-colors duration-700",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-brand focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary",
        className
      )}
    >
      {/* Diagonal hatch — visible at rest, fades on hover */}
      <span
        aria-hidden
        className={cn(
          "absolute inset-[5px] pointer-events-none transition-opacity duration-700 ease-out",
          "opacity-[0.18] group-hover/hud:opacity-0",
          "dark:opacity-[0.22]"
        )}
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, currentColor 0px, currentColor 1px, transparent 1px, transparent 7px)",
        }}
      />

      {/* Slow color fill on hover */}
      <span
        aria-hidden
        className={cn(
          "absolute inset-[5px] pointer-events-none origin-left scale-x-0 group-hover/hud:scale-x-100",
          "transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
          isPrimary
            ? "bg-accent-brand"
            : "bg-text-primary/10 dark:bg-[#ece8df]/15"
        )}
      />

      {/* Corner brackets */}
      <span aria-hidden className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-current opacity-90" />
      <span aria-hidden className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-current opacity-90" />
      <span aria-hidden className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-current opacity-90" />
      <span aria-hidden className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-current opacity-90" />

      {/* Label */}
      <span
        className={cn(
          "relative z-10 inline-flex items-center gap-2 transition-colors duration-700",
          isPrimary && "group-hover/hud:text-primary-foreground"
        )}
      >
        {children}
        {icon && (
          <span className="transition-transform duration-300 group-hover/hud:translate-x-1">
            {icon}
          </span>
        )}
      </span>
    </Link>
  );
}
