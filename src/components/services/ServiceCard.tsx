"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type MouseEvent } from "react";
import { Icon } from "@/components/ui/Icon";
import type { Service } from "@/data/types";

/**
 * بطاقة خدمة — كل خدمتين جنباً إلى جنب في كل مقاس شاشة.
 * الضغط يغيّر لونها إلى الأكوا الفاتح بحدود تركوازية ومؤشر تحديد،
 * ثم ينقلك إلى صفحة تفاصيل الخدمة.
 */
export function ServiceCard({ service, index = 0 }: { service: Service; index?: number }) {
  const router = useRouter();
  const [selected, setSelected] = useState(false);
  const href = `/services/${service.slug}`;

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    setSelected(true);
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return; // يكفي السلوكي الافتراضي للرابط

    event.preventDefault();
    window.setTimeout(() => router.push(href), 150);
  };

  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border p-4 transition-all duration-[260ms] sm:p-6 md:p-7 ${
        selected
          ? "border-primary bg-aqua shadow-hover"
          : "border-line bg-white shadow-card hover:-translate-y-1 hover:border-primary/50 hover:shadow-hover"
      }`}
      data-selected={selected ? "true" : "false"}
    >
      <span
        className={`absolute inset-x-0 top-0 h-[3px] transition-opacity ${
          selected ? "bg-primary opacity-100" : "bg-gold opacity-60"
        }`}
        aria-hidden
      />

      <div className="flex items-start justify-between gap-2">
        <span
          className={`flex h-11 w-11 items-center justify-center rounded-[var(--radius-sm)] border transition-colors duration-200 sm:h-14 sm:w-14 sm:rounded-[var(--radius-md)] ${
            selected
              ? "border-primary bg-white text-primary"
              : "border-line bg-aqua text-primary-dark group-hover:bg-white"
          }`}
        >
          <Icon name={service.icon} className="h-5 w-5 sm:h-7 sm:w-7" />
        </span>

        <span
          className={`flex items-center gap-1 rounded-full border px-2 py-1 text-[11px] font-semibold transition-colors sm:gap-1.5 sm:px-3 sm:py-1.5 sm:text-[12px] ${
            selected
              ? "border-primary bg-white text-primary-dark"
              : "border-line bg-cream text-muted"
          }`}
        >
          <span
            className={`flex h-3.5 w-3.5 items-center justify-center rounded-full border sm:h-4 sm:w-4 ${
              selected ? "border-primary bg-primary text-white" : "border-muted/50 text-transparent"
            }`}
            aria-hidden
          >
            <svg viewBox="0 0 24 24" className="h-2.5 w-2.5 sm:h-3 sm:w-3" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m5 13 4 4L19 7" />
            </svg>
          </span>
          {selected ? "محدَّدة" : `#${index + 1}`}
        </span>
      </div>

      <h3 className="mt-3 text-[15.5px] font-bold leading-snug text-ink sm:mt-5 sm:text-[21px] md:text-[23px]">
        {service.name}
      </h3>
      <p className="mt-2 flex-1 text-[13px] leading-6 text-muted sm:mt-3 sm:text-[15.5px] sm:leading-8">
        {service.shortDescription}
      </p>

      <span
        aria-hidden
        className={`pointer-events-none mt-3 inline-flex items-center gap-1 self-start rounded-full border px-3 py-2 text-[12.5px] font-semibold transition-colors duration-200 sm:mt-6 sm:gap-2 sm:px-5 sm:py-2.5 sm:text-[14.5px] ${
          selected
            ? "border-primary bg-primary text-white"
            : "border-primary/40 text-primary-dark group-hover:bg-aqua"
        }`}
      >
        اكتشف الخدمة
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5" />
          <path d="m12 19-7-7 7-7" />
        </svg>
      </span>

      {/* رابط يغطي البطاقة كاملة: ضغط أي مكان يفتح صفحة التفاصيل */}
      <Link
        href={href}
        onClick={handleClick}
        aria-label={`اكتشف خدمة ${service.name}`}
        className="absolute inset-0 z-10 rounded-[inherit] focus-visible:outline-offset-[-4px]"
      />
    </article>
  );
}
