"use client";

import { useState } from "react";
import type { FaqItem } from "@/data/types";

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="divide-y divide-line overflow-hidden rounded-[var(--radius-lg)] border border-line bg-white shadow-card">
      {items.map((item) => {
        const expanded = openId === item.id;
        const panelId = `faq-panel-${item.id}`;
        const buttonId = `faq-button-${item.id}`;
        return (
          <div key={item.id}>
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpenId(expanded ? null : item.id)}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-right transition-colors hover:bg-aqua/60 md:px-7"
              >
                <span className="text-[16.5px] font-semibold leading-8 text-ink md:text-[17.5px]">
                  {item.question}
                </span>
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors ${
                    expanded
                      ? "border-primary bg-primary text-white"
                      : "border-line bg-cream text-primary-dark"
                  }`}
                  aria-hidden
                >
                  <svg
                    viewBox="0 0 24 24"
                    className={`h-4 w-4 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!expanded}
              className="px-5 pb-6 md:px-7"
            >
              <p className="prose-ar border-e-2 border-gold/60 pe-4 text-[15.5px]">{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
