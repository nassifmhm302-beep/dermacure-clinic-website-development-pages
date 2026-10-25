import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Notice, PageHero } from "@/components/ui/Page";
import { ContactForm } from "@/components/contact/ContactForm";
import { InstagramGlyph, WhatsAppGlyph } from "@/components/ui/SocialIcons";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: "تواصل معنا",
  description:
    "أرقام عيادات ديرماكيور، واتساب، إنستغرام، ونموذج يجهّز رسالة واتساب لمراجعتها وإرسالها.",
  alternates: { canonical: "contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="تواصل معنا"
        title="نسعد بخدمتك"
        description="اختر الطريقة الأنسب للتواصل مع فريق ديرماكيور: هاتف، واتساب، إنستغرام، أو إعداد رسالة لإرسالها عبر واتساب."
        icon="phone"
      />

      <div className="container-px section-space">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <div className="space-y-5">
            <div className="rounded-[var(--radius-xl)] border border-line bg-white p-6 shadow-card md:p-7">
              <h2 className="text-[20px] font-bold text-ink">أرقام العيادة</h2>
              <ul className="mt-5 space-y-4">
                {siteConfig.contact.phones.map((phone) => (
                  <li
                    key={phone.value}
                    className="rounded-[var(--radius-md)] border border-line bg-cream/60 p-4"
                  >
                    <p className="text-[15.5px] font-bold text-ink">{phone.label}</p>
                    <p className="mt-2 font-display text-[30px] leading-none text-primary-dark" dir="ltr">
                      {phone.value}
                    </p>
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <a
                        href={`tel:${phone.raw}`}
                        className="btn btn-primary btn-sm px-3"
                        dir="ltr"
                        aria-label={`اتصال بـ ${phone.label} على ${phone.value}`}
                      >
                        <Icon name="phone" className="h-4 w-4" />
                        اتصال مباشر
                      </a>
                      {phone.whatsappUrl ? (
                        <a
                          href={phone.whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-whatsapp btn-sm px-3"
                          aria-label={`واتساب ${phone.label}`}
                        >
                          <WhatsAppGlyph className="h-4 w-4" />
                          واتساب
                        </a>
                      ) : (
                        <span className="btn btn-ghost btn-sm px-3 opacity-60">
                          واتساب غير متاح
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {siteConfig.contact.whatsapp.available ? (
                <a
                  href={siteConfig.contact.whatsapp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-start gap-3 rounded-[var(--radius-lg)] bg-[#128C5E] p-6 text-white transition hover:bg-[#0e7a52]"
                >
                  <WhatsAppGlyph className="h-7 w-7" />
                  <span className="text-[17px] font-bold">واتساب</span>
                  <span className="text-[15px] opacity-90" dir="ltr">
                    {siteConfig.contact.whatsapp.display}
                  </span>
                </a>
              ) : (
                <div className="rounded-[var(--radius-lg)] border border-dashed border-line bg-white p-6">
                  <span className="text-[16px] font-semibold text-muted">
                    رابط واتساب غير متوفر حالياً.
                  </span>
                </div>
              )}

              <a
                href={siteConfig.contact.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-start gap-3 rounded-[var(--radius-lg)] border border-line bg-white p-6 shadow-card transition hover:border-primary"
              >
                <InstagramGlyph className="h-7 w-7 text-primary" />
                <span className="text-[17px] font-bold text-ink">إنستغرام</span>
                <span className="text-[15px] text-primary-dark">
                  @{siteConfig.contact.instagram.handle}
                </span>
              </a>
            </div>

            <div className="rounded-[var(--radius-xl)] bg-primary-dark p-6 text-white">
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/12 text-gold ring-1 ring-gold/50">
                  <Icon name="pin" className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-[17px] font-bold">العنوان</p>
                  {siteConfig.address.available ? (
                    <p className="mt-1 text-[15.5px] leading-8 text-white/85">
                      {siteConfig.address.lines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </p>
                  ) : (
                    <p className="mt-1 text-[15.5px] text-white/85">موقع العيادة قيد التحديث.</p>
                  )}
                  <Link
                    href="/location"
                    className="mt-4 inline-block rounded-full border border-white/40 px-5 py-2.5 text-[14.5px] font-semibold transition hover:bg-white hover:text-ink"
                  >
                    صفحة الموقع
                  </Link>
                </div>
              </div>
            </div>

            <Notice>
              لا نعرض بريداً إلكترونياً رسمياً لعدم التحقق منه في مصادرنا — يُضاف فور توفّره
              رسمياً.
            </Notice>
          </div>

          <ContactForm />
        </div>
      </div>
    </>
  );
}
