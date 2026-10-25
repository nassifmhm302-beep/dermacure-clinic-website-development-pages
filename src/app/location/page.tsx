import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Notice, PageHero } from "@/components/ui/Page";
import { WorkingHoursCard } from "@/components/working-hours/WorkingHoursCard";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: "موقعنا",
  description: "موقع عيادات ديرماكيور — العنوان المعتمد وطرق الوصول وساعات العمل وبيانات التواصل.",
  alternates: { canonical: "location" },
};

export default function LocationPage() {
  const address = siteConfig.address;

  return (
    <>
      <PageHero
        eyebrow="موقعنا"
        title="أين تجدنا"
        description="العنوان المعتمد للعيادة، وساعات العمل، وبيانات التواصل في مكان واحد."
        icon="pin"
      />

      <div className="container-px section-space">
        {address.available ? (
          <div className="overflow-hidden rounded-[var(--radius-xl)] border border-line bg-white shadow-card">
            <div className="grid md:grid-cols-2">
              {/* سطح الخريطة: نمط الهوية بدلاً من إحداثيات مفترضة */}
              <div className="relative flex min-h-[300px] items-center justify-center bg-primary-dark p-8 text-white">
                <div className="pointer-events-none absolute inset-0 pattern-grid-light opacity-70" aria-hidden />
                <div className="pointer-events-none absolute inset-8 rounded-[var(--radius-lg)] border border-gold/40" aria-hidden />
                <div className="relative text-center">
                  <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/12 text-gold ring-1 ring-gold/50">
                    <Icon name="pin" className="h-8 w-8" />
                  </span>
                  <p className="mt-4 font-display text-[13px] tracking-[0.3em] text-gold">موقعنا</p>
                  <p className="mt-3 text-[21px] font-bold leading-9">{address.full}</p>
                  <p className="mt-2 text-[14px] text-white/70">
                    لا تُعرض إحداثيات خريطة مدمجة لعدم التحقق منها رسمياً.
                  </p>
                </div>
              </div>

              <div className="p-7 md:p-9">
                <h2 className="text-[24px] font-bold text-ink">العنوان والوصول</h2>
                <address className="prose-ar mt-4 not-italic">
                  {address.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                  <span className="block">المملكة العربية السعودية</span>
                </address>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={address.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm"
                  >
                    احصل على الاتجاهات
                  </a>
                  <Link href="/book" className="btn btn-outline btn-sm">
                    احجز موعداً
                  </Link>
                </div>

                <div className="mt-7 rounded-[var(--radius-md)] border border-line bg-cream/70 p-5">
                  <h3 className="text-[16.5px] font-bold text-ink">بيانات التواصل</h3>
                  <ul className="mt-3 space-y-2 text-[15px]">
                    {siteConfig.contact.phones.map((phone) => (
                      <li key={phone.value} className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-muted">{phone.label}</span>
                        <a href={`tel:${phone.raw}`} className="font-bold text-primary-dark" dir="ltr">
                          {phone.value}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Notice tone="warn">موقع العيادة قيد التحديث.</Notice>
        )}

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-start">
          <WorkingHoursCard />
          <aside className="rounded-[var(--radius-xl)] border border-line bg-white p-6 shadow-card">
            <h2 className="text-[19px] font-bold text-ink">قبل زيارتك</h2>
            <ul className="mt-4 space-y-3 text-[15px] leading-8 text-muted">
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
                يُفضّل تأكيد الموعد هاتفياً أو عبر واتساب قبل التوجّه للعيادة.
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
                أحضر بيانات التواصل التي استخدمتها في طلب الموعد.
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
                للحالات الطارئة يُرجى الاتصال بالعيادة مباشرة بدل الاعتماد على النموذج.
              </li>
            </ul>
            <Link href="/contact" className="btn btn-outline btn-sm mt-5 w-full">
              صفحة التواصل
            </Link>
          </aside>
        </div>
      </div>
    </>
  );
}
