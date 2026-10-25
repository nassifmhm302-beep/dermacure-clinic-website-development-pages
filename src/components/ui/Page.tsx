import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "./Icon";
import type { IconKey } from "@/data/types";

export function PageHero({
  eyebrow,
  title,
  description,
  icon,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  icon?: IconKey;
  children?: ReactNode;
}) {
  return (
    <header className="relative overflow-hidden border-b border-line bg-cream">
      <div className="pointer-events-none absolute inset-0 pattern-grid opacity-70" aria-hidden />
      <div className="pointer-events-none absolute -top-24 left-[-6rem] h-72 w-72 rounded-full bg-aqua blur-3xl" aria-hidden />
      <div className="container-px relative py-14 md:py-20">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
            <h1 className="mt-4 text-[clamp(30px,5vw,50px)] font-bold leading-[1.25] text-ink">
              {title}
            </h1>
            {description ? (
              <p className="prose-ar mt-4 max-w-xl">{description}</p>
            ) : null}
          </div>
          {icon ? (
            <div className="hidden h-24 w-24 shrink-0 items-center justify-center rounded-full border border-gold/50 bg-white text-primary md:flex">
              <Icon name={icon} className="h-10 w-10" />
            </div>
          ) : null}
        </div>
        {children}
      </div>
      <div className="gold-rule" />
    </header>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  align = "start",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: { href: string; label: string };
  align?: "start" | "center";
}) {
  return (
    <div
      className={`flex flex-col gap-5 md:flex-row md:items-end md:justify-between ${
        align === "center" ? "text-center md:text-start" : ""
      }`}
    >
      <div className="max-w-2xl">
        {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
        <h2 className="mt-3 text-[clamp(24px,3.4vw,38px)] font-bold leading-[1.35] text-ink">
          {title}
        </h2>
        {description ? <p className="prose-ar mt-3">{description}</p> : null}
      </div>
      {action ? (
        <Link
          href={action.href}
          className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-primary/40 bg-white px-6 py-3 text-[15px] font-semibold text-primary-dark transition hover:bg-aqua"
        >
          {action.label}
          <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M19 12H5" />
            <path d="m12 19-7-7 7-7" />
          </svg>
        </Link>
      ) : null}
    </div>
  );
}

export function Notice({
  tone = "info",
  children,
}: {
  tone?: "info" | "warn";
  children: ReactNode;
}) {
  const styles =
    tone === "warn"
      ? "border-gold/60 bg-[#FBF7EC] text-[#6B5F33]"
      : "border-primary/30 bg-aqua text-primary-dark";
  return (
    <div
      className={`flex items-start gap-3 rounded-[var(--radius-md)] border px-5 py-4 text-[15px] leading-relaxed ${styles}`}
      role="note"
    >
      <Icon name="help" className="mt-0.5 h-5 w-5 shrink-0" />
      <div>{children}</div>
    </div>
  );
}
