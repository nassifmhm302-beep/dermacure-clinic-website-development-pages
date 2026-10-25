"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icon";
import { navLinks, siteConfig } from "@/data/siteConfig";
import { getServiceGroups } from "@/data/services";

const groups = getServiceGroups();

export function Header() {
  const pathname = usePathname();
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const megaRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const servicesBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMegaOpen(false);
        setMobileOpen(false);
        servicesBtnRef.current?.focus();
      }
    };
    const onPointer = (event: MouseEvent) => {
      const target = event.target as Node;
      const insideTrigger = megaRef.current?.contains(target) ?? false;
      const insidePanel = panelRef.current?.contains(target) ?? false;
      if (!insideTrigger && !insidePanel) {
        setMegaOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50">
      <div className="hidden bg-ink text-white/80 md:block">
        <div className="container-px flex h-9 items-center justify-between text-[12.5px]">
          <div className="flex items-center gap-5">
            <span className="text-white/70">{siteConfig.workingHours.note}</span>
          </div>
          <div className="flex items-center gap-5">
            <a
              href={`tel:${siteConfig.contact.phones[0].raw}`}
              className="transition hover:text-gold"
              dir="ltr"
            >
              {siteConfig.contact.phones[0].value}
            </a>
            <a
              href={siteConfig.contact.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-gold"
            >
              Instagram @{siteConfig.contact.instagram.handle}
            </a>
          </div>
        </div>
      </div>

      <div className="border-b border-line bg-cream/92 backdrop-blur-md">
        <div className="container-px flex h-[74px] items-center justify-between gap-4">
          <Logo />

          <nav aria-label="التنقل الرئيسي" className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) =>
              "hasMenu" in link && link.hasMenu ? (
                <div key={link.href} ref={megaRef} className="relative">
                  <button
                    ref={servicesBtnRef}
                    type="button"
                    aria-expanded={megaOpen}
                    aria-haspopup="true"
                    onClick={() => setMegaOpen((v) => !v)}
                    className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-[15px] font-medium transition ${
                      megaOpen || isActive(link.href)
                        ? "bg-aqua text-primary-dark"
                        : "text-ink hover:bg-white"
                    }`}
                  >
                    {link.label}
                    <svg
                      viewBox="0 0 24 24"
                      className={`h-4 w-4 transition-transform duration-200 ${
                        megaOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-full px-4 py-2.5 text-[15px] font-medium transition ${
                    isActive(link.href)
                      ? "bg-aqua text-primary-dark"
                      : "text-ink hover:bg-white"
                  }`}
                >
                  {link.label}
                </Link>
              ),
            )}
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/book" className="btn btn-primary btn-sm hidden sm:inline-flex">
              احجز الآن
            </Link>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink lg:hidden"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? "إغلاق القائمة" : "فتح القائمة"}
              onClick={() => setMobileOpen((v) => !v)}
            >
              <span className="sr-only">{mobileOpen ? "إغلاق القائمة" : "فتح القائمة"}</span>
              {mobileOpen ? (
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                  <path d="M4 7h16M4 12h16M4 17h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* لوحة الخدمات الكبرى — خارج طبقة backdrop-filter ليبقى التموضع محسوباً من نافذة العرض */}
      <div ref={panelRef}>
        <ServicesMegaMenu
          open={megaOpen}
          onNavigate={() => setMegaOpen(false)}
          onClose={() => setMegaOpen(false)}
        />
      </div>

      <div
        id="mobile-menu"
        hidden={!mobileOpen}
        className="max-h-[calc(100dvh-74px)] overflow-y-auto border-b border-line bg-cream lg:hidden"
      >
        <nav aria-label="قائمة الهاتف" className="container-px flex flex-col gap-1 py-5">
          {navLinks.map((link) =>
            "hasMenu" in link && link.hasMenu ? (
              <div key={link.href} className="border-b border-line/70 pb-2">
                <div className="flex items-center justify-between">
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex-1 rounded-xl px-3 py-3.5 text-[17px] font-semibold text-ink"
                  >
                    {link.label}
                  </Link>
                  <button
                    type="button"
                    aria-expanded={mobileServicesOpen}
                    aria-controls="mobile-services"
                    onClick={() => setMobileServicesOpen((v) => !v)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-primary-dark"
                  >
                    <span className="sr-only">إظهار الخدمات</span>
                    <svg
                      viewBox="0 0 24 24"
                      className={`h-5 w-5 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      aria-hidden="true"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>
                </div>
                <div id="mobile-services" hidden={!mobileServicesOpen}>
                  <div className="mt-2 space-y-4 rounded-[var(--radius-md)] bg-aqua/70 p-3">
                    {groups.map((group) => (
                      <MobileGroup key={group.title} title={group.title} items={group.items} />
                    ))}
                    <Link
                      href="/services"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 text-[15px] font-semibold text-white"
                    >
                      تصفح جميع الخدمات
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-3 py-3.5 text-[17px] font-semibold text-ink transition hover:bg-white"
              >
                {link.label}
              </Link>
            ),
          )}
          <div className="mt-3 grid grid-cols-1 gap-3">
            <Link href="/book" className="btn btn-primary" onClick={() => setMobileOpen(false)}>
              احجز موعدك
            </Link>
            <a
              href={`tel:${siteConfig.contact.phones[0].raw}`}
              className="btn btn-outline"
              dir="ltr"
            >
              اتصل بنا: {siteConfig.contact.phones[0].value}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}

function MobileGroup({
  title,
  items,
}: {
  title: string;
  items: { slug: string; name: string }[];
}) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between rounded-lg px-2 py-2 text-[15px] font-semibold text-ink"
      >
        {title}
        <svg
          viewBox="0 0 24 24"
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      <ul hidden={!open} className="mt-1 space-y-1">
        {items.map((item) => (
          <li key={item.slug}>
            <Link
              href={`/services/${item.slug}`}
              className="block rounded-lg bg-white/70 px-3 py-2.5 text-[14.5px] text-ink"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ServicesMegaMenu({
  open,
  onNavigate,
  onClose,
}: {
  open: boolean;
  onNavigate: () => void;
  onClose: () => void;
}) {
  return (
    <div
      className={`fixed inset-x-0 top-[110px] z-40 hidden lg:block ${
        open ? "visible pointer-events-auto" : "invisible pointer-events-none"
      }`}
      aria-hidden={!open}
    >
      <div className="container-px">
        <div
          className={`origin-top rounded-[var(--radius-xl)] border border-line bg-white p-7 shadow-[0_28px_60px_rgb(23_59_74/14%)] transition-all duration-[260ms] ${
            open ? "scale-100 opacity-100 translate-y-0" : "scale-[0.98] opacity-0 -translate-y-2"
          }`}
        >
          <div className="mb-5 flex items-end justify-between gap-6 border-b border-line pb-4">
            <div>
              <span className="eyebrow">قائمة الخدمات</span>
              <h2 className="mt-2 text-2xl font-bold text-ink">
                جميع خدمات ديرماكيور
              </h2>
            </div>
            <Link
              href="/services"
              onClick={onNavigate}
              className="rounded-full border border-primary/40 px-5 py-2.5 text-sm font-semibold text-primary-dark transition hover:bg-aqua"
            >
              تصفح جميع الخدمات
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {groups.map((group) => (
              <section key={group.title} aria-label={group.title}>
                <h3 className="mb-3 flex items-center gap-2 text-[13px] font-bold tracking-[0.12em] text-muted">
                  <span className="h-px w-6 bg-gold" />
                  {group.title}
                </h3>
                <ul className="grid grid-cols-1 gap-1">
                  {group.items.map((service) => (
                    <li key={service.slug}>
                      <Link
                        href={`/services/${service.slug}`}
                        onClick={onNavigate}
                        className="group relative flex items-center gap-3 rounded-[var(--radius-sm)] px-3 py-2.5 text-[14.5px] text-ink transition-colors duration-200 hover:bg-aqua focus-visible:bg-aqua"
                      >
                        <span
                          className="absolute inset-y-1 right-0 w-[3px] rounded-full bg-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
                          aria-hidden
                        />
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cream text-primary-dark transition-colors group-hover:bg-white">
                          <Icon name={service.icon} className="h-[18px] w-[18px]" />
                        </span>
                        <span className="leading-snug">{service.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between gap-4 rounded-[var(--radius-md)] bg-cream px-5 py-4">
            <p className="text-[14.5px] text-muted">
              تحتاج مساعدة في اختيار الخدمة؟ تواصل مع العيادة وسنوجّهك.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="text-sm font-semibold text-primary-dark underline underline-offset-4"
            >
              إغلاق القائمة
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
