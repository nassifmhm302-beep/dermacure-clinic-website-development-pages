import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";

/**
 * علامة DermaCure — رسم متجهي أصلي (فراشة/ورقة) بخطوط نظيفة،
 * مأخوذ من روح الهوية البصرية للعيادة.
 */
export function LogoMark({ className = "h-11 w-11" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label="علامة ديرماكيور"
      fill="none"
    >
      <defs>
        <linearGradient id="dc-wing" x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2AA8B4" />
          <stop offset="1" stopColor="#176F79" />
        </linearGradient>
      </defs>
      <path
        d="M32 15C25.5 7.5 13.5 6 8.6 12.4c-5 6.6-1.4 17.6 7.6 21.7 5.7 2.6 12.4 1.6 15.8-1.6Z"
        fill="url(#dc-wing)"
      />
      <path
        d="M32 15c6.5-7.5 18.5-9 23.4-2.6 5 6.6 1.4 17.6-7.6 21.7-5.7 2.6-12.4 1.6-15.8-1.6Z"
        fill="url(#dc-wing)"
        opacity="0.82"
      />
      <path
        d="M32 38.5c-3.7 6-12.4 11.4-18.3 9.4-5-1.7-6.4-8.4-2.4-13.2 4.2-5 13-5.6 20.7 3.8Z"
        fill="#2AA8B4"
        opacity="0.6"
      />
      <path
        d="M32 38.5c3.7 6 12.4 11.4 18.3 9.4 5-1.7 6.4-8.4 2.4-13.2-4.2-5-13-5.6-20.7 3.8Z"
        fill="#2AA8B4"
        opacity="0.6"
      />
      <path
        d="M32 13.5c1.7 0 2.9 1.4 2.9 3.1v22.9c0 1.8-1.3 3.2-2.9 3.2s-2.9-1.4-2.9-3.2V16.6c0-1.7 1.3-3.1 2.9-3.1Z"
        fill="#C6B77A"
      />
      <path
        d="M30.4 12.6c-1.4-2.6-3.9-4.3-6.7-4.6"
        stroke="#C6B77A"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M33.6 12.6c1.4-2.6 3.9-4.3 6.7-4.6"
        stroke="#C6B77A"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Logo({
  tone = "dark",
  compact = false,
  href = "/",
}: {
  tone?: "dark" | "light";
  compact?: boolean;
  href?: string;
}) {
  const titleColor = tone === "light" ? "text-white" : "text-ink";
  const subColor = tone === "light" ? "text-white/70" : "text-muted";

  return (
    <Link href={href} className="group flex items-center gap-3" aria-label={`${siteConfig.name} — الرئيسية`}>
      <span className="relative inline-flex items-center justify-center rounded-full border border-gold/50 bg-white/85 p-1.5 shadow-[0_6px_18px_rgb(23_59_74/8%)] transition-transform duration-300 group-hover:-translate-y-0.5">
        <LogoMark className="h-9 w-9" />
      </span>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span
            className={`font-display text-[13px] tracking-[0.34em] ${
              tone === "light" ? "text-gold" : "text-gold-ink"
            }`}
          >
            ديرماكيور
          </span>
          <span className={`font-display text-[26px] tracking-wide ${titleColor}`}>
            Derma<span className="text-primary">Cure</span>
          </span>
          <span className={`mt-1 text-[10.5px] font-medium tracking-[0.12em] ${subColor}`}>
            عيادات الجلدية والتجميل
          </span>
        </span>
      )}
    </Link>
  );
}
