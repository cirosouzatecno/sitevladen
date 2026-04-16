import Link from "next/link";
import type { ReactNode } from "react";

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  target?: string;
  rel?: string;
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
  target,
  rel,
}: ButtonLinkProps) {
  const variants = {
    primary:
      "bg-[var(--color-olive)] text-white shadow-[0_20px_40px_rgba(63,75,55,0.22)] hover:bg-[var(--color-olive-strong)]",
    secondary:
      "border border-[rgba(197,164,109,0.55)] bg-white/70 text-[var(--color-ink)] hover:bg-white",
    ghost:
      "text-[var(--color-ink)] hover:bg-white/60",
  };

  return (
    <Link
      href={href}
      target={target}
      rel={rel}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-[0.16em] uppercase transition duration-300 ${variants[variant]} ${className}`}
    >
      <span>{children}</span>
      <span aria-hidden="true">↗</span>
    </Link>
  );
}
