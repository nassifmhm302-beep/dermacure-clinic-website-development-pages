"use client";

import { useMemo, useState } from "react";
import { ServiceCard } from "@/components/services/ServiceCard";
import { Icon } from "@/components/ui/Icon";
import { services, serviceGroups } from "@/data/services";
import type { ServiceGroupId } from "@/data/types";

const filters: { id: "all" | ServiceGroupId; label: string }[] = [
  { id: "all", label: "كل الخدمات" },
  ...serviceGroups.map((group) => ({ id: group.id, label: group.title })),
];

export function ServicesBrowser() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<"all" | ServiceGroupId>("all");

  const results = useMemo(() => {
    const q = query.trim();
    return services.filter((service) => {
      const matchesGroup = active === "all" || service.groupId === active;
      const matchesQuery =
        !q || service.name.includes(q) || service.shortDescription.includes(q);
      return matchesGroup && matchesQuery;
    });
  }, [query, active]);

  return (
    <div>
      <div className="flex flex-col gap-4 rounded-[var(--radius-lg)] border border-line bg-white p-5 shadow-card md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="تصفية حسب المجموعة">
          {filters.map((filter) => {
            const on = active === filter.id;
            return (
              <button
                key={filter.id}
                type="button"
                aria-pressed={on}
                onClick={() => setActive(filter.id)}
                className={`rounded-full border px-5 py-2.5 text-[14.5px] font-semibold transition ${
                  on
                    ? "border-primary bg-aqua text-primary-dark"
                    : "border-line bg-cream/70 text-muted hover:border-primary/40"
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        <label className="relative block md:w-72">
          <span className="sr-only">ابحث عن خدمة</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث عن خدمة…"
            className="w-full rounded-full border border-line bg-cream/60 px-5 py-3 pe-12 text-[15px] outline-none transition focus:border-primary focus:bg-white"
          />
          <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-muted">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.2-3.2" />
            </svg>
          </span>
        </label>
      </div>

      <p className="mt-5 text-[15px] text-muted" role="status">
        عدد النتائج: {results.length} من {services.length} خدمة
      </p>

      {results.length > 0 ? (
        <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-5">
          {results.map((service, index) => (
            <ServiceCard key={service.slug} service={service} index={index} />
          ))}
        </div>
      ) : (
        <div className="mt-5 flex flex-col items-center gap-3 rounded-[var(--radius-lg)] border border-dashed border-line bg-white px-6 py-14 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-aqua text-primary-dark">
            <Icon name="help" className="h-7 w-7" />
          </span>
          <p className="text-[16px] text-ink">لا توجد نتائج مطابقة لبحثك.</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setActive("all");
            }}
            className="btn btn-outline btn-sm"
          >
            إعادة ضبط البحث
          </button>
        </div>
      )}
    </div>
  );
}
