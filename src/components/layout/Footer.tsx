import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icon";
import { InstagramGlyph, WhatsAppGlyph } from "@/components/ui/SocialIcons";
import { siteConfig } from "@/data/siteConfig";
import { services } from "@/data/services";

const quickLinks = [
  { href: "/about", label: "من نحن" },
  { href: "/doctors", label: "الأطباء" },
  { href: "/how-to-book", label: "كيفية الحجز" },
  { href: "/working-hours", label: "ساعات العمل" },
  { href: "/faq", label: "الأسئلة الشائعة" },
  { href: "/location", label: "موقعنا" },
  { href: "/privacy", label: "سياسة الخصوصية" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-16 bg-ink text-white/80">
      <div className="gold-rule" />
      <div className="container-px grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.3fr]">
        <div>
          <Logo tone="light" />
          <p className="mt-5 max-w-sm text-[15px] leading-8 text-white/70">
            {siteConfig.description}
          </p>
          <p className="mt-4 font-display text-gold">{siteConfig.brand.hashtag}</p>
        </div>

        <nav aria-label="روابط الموقع">
          <h2 className="mb-4 text-[13px] font-bold tracking-[0.16em] text-gold">روابط سريعة</h2>
          <ul className="space-y-2.5 text-[15px]">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="الخدمات">
          <h2 className="mb-4 text-[13px] font-bold tracking-[0.16em] text-gold">خدماتنا</h2>
          <ul className="space-y-2.5 text-[15px]">
            {services.slice(0, 7).map((service) => (
              <li key={service.slug}>
                <Link href={`/services/${service.slug}`} className="transition hover:text-white">
                  {service.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/services" className="text-primary transition hover:text-white">
                جميع الخدمات ({services.length})
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="mb-4 text-[13px] font-bold tracking-[0.16em] text-gold">تواصل معنا</h2>
          <ul className="space-y-4 text-[15px]">
            {siteConfig.contact.phones.map((phone) => (
              <li key={phone.value} className="rounded-[var(--radius-sm)] border border-white/12 bg-white/5 p-3.5">
                <p className="mb-2 text-[14.5px] font-semibold text-white">{phone.label}</p>
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href={`tel:${phone.raw}`}
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-[15px] font-bold text-white transition hover:bg-primary-dark"
                    dir="ltr"
                  >
                    <Icon name="phone" className="h-4 w-4" />
                    {phone.value}
                  </a>
                  {phone.whatsappUrl ? (
                    <a
                      href={phone.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-[#128C5E] px-4 py-2 text-[14.5px] font-semibold text-white transition hover:bg-[#0e7a52]"
                    >
                      <WhatsAppGlyph className="h-4 w-4" />
                      واتساب
                    </a>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>

          <ul className="mt-4 space-y-3 text-[15px]">
            <li className="flex items-start gap-3">
              <Icon name="pin" className="mt-1 h-4 w-4 shrink-0 text-primary" />
              {siteConfig.address.available ? (
                <Link href="/location" className="transition hover:text-white">
                  {siteConfig.address.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </Link>
              ) : (
                <span>موقع العيادة قيد التحديث.</span>
              )}
            </li>
            <li className="flex items-center gap-3">
              <InstagramGlyph className="h-4 w-4 shrink-0 text-primary" />
              <a
                href={siteConfig.contact.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-white"
              >
                @{siteConfig.contact.instagram.handle}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-px flex flex-col items-center justify-between gap-3 py-5 text-[13.5px] text-white/60 md:flex-row">
          <p>© {year} {siteConfig.name} — جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="transition hover:text-white">
              سياسة الخصوصية
            </Link>
            <Link href="/contact" className="transition hover:text-white">
              تواصل معنا
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
