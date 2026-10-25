import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import type { Doctor } from "@/data/types";

const initialsOf = (name: string) =>
  name
    .replace(/^د\.\s*/, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("");

/** بطاقة طبيب — كل طبيبين جنباً إلى جنب في كل مقاس شاشة، مع Placeholder أنيق لغياب الصورة الرسمية */
export function DoctorCard({ doctor }: { doctor: Doctor }) {
  const pending = doctor.titleVerification === "pending";

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-line bg-white shadow-card transition-all duration-[260ms] hover:-translate-y-1 hover:border-primary/50 hover:shadow-hover">
      <div className="relative flex h-32 items-center justify-center overflow-hidden bg-gradient-to-bl from-aqua via-[#F3FAF9] to-cream sm:h-52">
        <div className="pointer-events-none absolute inset-0 pattern-grid opacity-60" aria-hidden />
        <div className="pointer-events-none absolute -bottom-10 -left-8 h-40 w-40 rounded-full border border-gold/40" aria-hidden />
        <div className="relative flex flex-col items-center gap-1 sm:gap-2">
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/50 bg-white/80 text-primary-dark sm:h-20 sm:w-20">
            <Icon name="user" className="h-7 w-7 sm:h-10 sm:w-10" strokeWidth={1.4} />
          </span>
          <span className="font-display text-[17px] tracking-[0.2em] text-primary-dark/70 sm:text-[26px]">
            {initialsOf(doctor.name)}
          </span>
        </div>
        <span className="absolute bottom-2 rounded-full border border-line bg-white/90 px-2 py-0.5 text-[9.5px] font-medium text-muted sm:bottom-3 sm:px-3 sm:py-1 sm:text-[11.5px]">
          {doctor.image ? "الصورة الرسمية" : "الصورة الرسمية قيد التحديث"}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-6">
        <h3 className="text-[16px] font-bold leading-snug text-ink sm:text-[21px]">{doctor.name}</h3>
        <p
          className={`mt-1.5 text-[13px] font-semibold leading-6 sm:mt-2 sm:text-[15px] sm:leading-7 ${
            pending ? "text-[#8A7B3F]" : "text-primary-dark"
          }`}
        >
          {doctor.title}
        </p>
        <p className="mt-2 flex-1 text-[12.5px] leading-6 text-muted sm:mt-3 sm:text-[14.5px] sm:leading-7">
          {doctor.specialties.join(" • ")}
        </p>

        <Link
          href={`/doctors/${doctor.slug}`}
          className="mt-3 inline-flex items-center gap-1.5 self-start text-[13.5px] font-semibold text-ink transition group-hover:text-primary-dark sm:mt-5 sm:gap-2 sm:text-[15px]"
          aria-label={`عرض الملف الشخصي للدكتور ${doctor.name}`}
        >
          عرض الملف الشخصي
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M19 12H5" />
            <path d="m12 19-7-7 7-7" />
          </svg>
        </Link>

        <div className="mt-3 border-t border-line pt-3 sm:mt-5 sm:pt-5">
          <Link
            href={`/book?doctor=${doctor.slug}`}
            className="btn btn-primary btn-sm w-full px-2 text-[13px] sm:px-5 sm:text-[14.5px]"
            aria-label={`اطلب موعداً مع ${doctor.name}`}
          >
            <Icon name="calendar" className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
            اطلب موعداً
          </Link>
        </div>
      </div>
    </article>
  );
}
