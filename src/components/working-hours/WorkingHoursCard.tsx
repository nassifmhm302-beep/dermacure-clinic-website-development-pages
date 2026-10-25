"use client";

import Link from "next/link";
import { useMemo, useSyncExternalStore } from "react";
import { Icon } from "@/components/ui/Icon";
import { WhatsAppGlyph } from "@/components/ui/SocialIcons";
import { siteConfig } from "@/data/siteConfig";

const WEEKDAY_INDEX: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

export function formatClock(value: string): string {
  const [h, m] = value.split(":").map(Number);
  const suffix = h >= 12 ? "م" : "ص";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${suffix}`;
}

function currentRiyadh() {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: siteConfig.timezone,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const parts = formatter.formatToParts(new Date());
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const hour = Number(get("hour")) % 24;
  const minute = Number(get("minute"));
  return {
    day: WEEKDAY_INDEX[get("weekday")] ?? new Date().getDay(),
    minutes: hour * 60 + minute,
  };
}

const toMinutes = (value: string) => {
  const [h, m] = value.split(":").map(Number);
  return h * 60 + m;
};

type ClockState = { day: number; minutes: number };

const SERVER_CLOCK: ClockState = { day: -1, minutes: -1 };
let clockCache: ClockState | null = null;

function subscribeToClock(callback: () => void) {
  const id = window.setInterval(() => {
    clockCache = currentRiyadh();
    callback();
  }, 30_000);
  return () => window.clearInterval(id);
}

function getClockSnapshot(): ClockState {
  if (!clockCache) clockCache = currentRiyadh();
  return clockCache;
}

function getServerClockSnapshot(): ClockState {
  return SERVER_CLOCK;
}

export function WorkingHoursCard({
  compact = false,
  showActions = true,
}: {
  compact?: boolean;
  showActions?: boolean;
}) {
  const hours = siteConfig.workingHours;
  // يمنع اختلاف HTML المُولَّد وقت البناء عن أول عرض في المتصفح (hydration mismatch)
  const now = useSyncExternalStore(subscribeToClock, getClockSnapshot, getServerClockSnapshot);
  const ready = now.day !== -1;

  const status = useMemo(() => {
    if (!hours.verified || !ready) return null;
    const today = hours.days.find((d) => d.day === now.day);
    if (!today?.open || !today.close) {
      return { open: false, label: "مغلق اليوم", detail: "" };
    }
    const openM = toMinutes(today.open);
    const closeM = toMinutes(today.close);
    if (now.minutes >= openM && now.minutes < closeM) {
      return {
        open: true,
        label: "مفتوح الآن",
        detail: `يغلق الساعة ${formatClock(today.close)}`,
      };
    }
    if (now.minutes < openM) {
      return {
        open: false,
        label: "مغلق الآن",
        detail: `يفتح اليوم الساعة ${formatClock(today.open)}`,
      };
    }
    const nextDay = hours.days.find((d) => d.day === (now.day + 1) % 7);
    return {
      open: false,
      label: "مغلق الآن",
      detail: nextDay?.open
        ? `يفتح ${nextDay.dayName} الساعة ${formatClock(nextDay.open)}`
        : "",
    };
  }, [hours, now, ready]);

  return (
    <section
      aria-labelledby="working-hours-title"
      className="overflow-hidden rounded-[var(--radius-xl)] border border-line bg-white shadow-card"
    >
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line bg-gradient-to-l from-aqua to-white px-6 py-5 md:px-8">
        <div className="flex items-center gap-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-[var(--radius-sm)] bg-white text-primary-dark shadow-[0_6px_16px_rgb(23_59_74/8%)]">
            <Icon name="clock" className="h-6 w-6" />
          </span>
          <div>
            <h2 id="working-hours-title" className="text-[20px] font-bold text-ink md:text-[22px]">
              ساعات عمل العيادة
            </h2>
            <p className="mt-0.5 text-[13.5px] text-muted">
              {hours.verified ? `التوقيت المحلي — ${siteConfig.timezone}` : "بيانات غير مؤكدة"}
            </p>
          </div>
        </div>

        {hours.verified && status ? (
          <span
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[14px] font-semibold ${
              status.open
                ? "bg-primary text-white"
                : "border border-line bg-cream text-muted"
            }`}
            role="status"
          >
            <span
              className={`h-2 w-2 rounded-full ${status.open ? "bg-white" : "bg-gold"}`}
              aria-hidden
            />
            {status.label}
            {status.detail ? <span className="font-normal opacity-90">— {status.detail}</span> : null}
          </span>
        ) : null}
      </div>

      {!hours.verified ? (
        <p className="px-6 py-8 text-[16px] leading-8 text-muted md:px-8">
          ساعات العمل قيد التحديث. يرجى التواصل مع العيادة للتحقق.
        </p>
      ) : (
        <ul className={compact ? "divide-y divide-line px-2 py-2" : "divide-y divide-line px-4 py-3 md:px-6"}>
          {hours.days.map((entry) => {
            const isToday = entry.day === now.day;
            return (
              <li
                key={entry.day}
                className={`flex items-center justify-between gap-4 rounded-[var(--radius-sm)] px-4 py-3.5 transition-colors ${
                  isToday ? "bg-aqua" : "hover:bg-cream/70"
                }`}
                aria-current={isToday ? "date" : undefined}
              >
                <span className="flex items-center gap-3">
                  <span
                    className={`h-6 w-[3px] rounded-full ${isToday ? "bg-primary" : "bg-transparent"}`}
                    aria-hidden
                  />
                  <span className={`text-[16px] ${isToday ? "font-bold text-ink" : "font-medium text-ink/85"}`}>
                    {entry.dayName}
                  </span>
                  {isToday ? (
                    <span className="rounded-full bg-primary px-2.5 py-0.5 text-[11.5px] font-semibold text-white">
                      اليوم
                    </span>
                  ) : null}
                </span>
                <span
                  className="text-[15.5px] font-semibold tabular-nums text-muted"
                  dir="ltr"
                >
                  {entry.open && entry.close
                    ? `${formatClock(entry.open)} — ${formatClock(entry.close)}`
                    : "مغلق"}
                </span>
              </li>
            );
          })}
        </ul>
      )}

      <div className="border-t border-line bg-cream/60 px-6 py-5 md:px-8">
        <p className="text-[13.5px] leading-7 text-muted">
          {hours.verified
            ? `المصدر: ${hours.source}. حالة الفتح تُحسب آلياً بتوقيت ${siteConfig.timezone} وقد تختلف عن ميعاد استقبالك الفعلي — يُفضل تأكيد الموعد هاتفياً.`
            : "لا تُعرض حالة الدوام لأن الجدول غير معتمد بعد."}
        </p>

        {showActions ? (
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <Link href="/book" className="btn btn-primary flex-1">
              احجز الآن
            </Link>
            {siteConfig.contact.phones[0] ? (
              <a
                href={`tel:${siteConfig.contact.phones[0].raw}`}
                className="btn btn-outline flex-1"
                dir="ltr"
              >
                <Icon name="phone" className="h-[18px] w-[18px]" />
                اتصل بنا
              </a>
            ) : null}
            {siteConfig.contact.whatsapp.available ? (
              <a
                href={siteConfig.contact.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp flex-1"
              >
                <WhatsAppGlyph className="h-[18px] w-[18px]" />
                تواصل عبر واتساب
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}
