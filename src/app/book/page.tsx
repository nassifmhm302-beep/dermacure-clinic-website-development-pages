import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { PageHero, Notice } from "@/components/ui/Page";
import { BookingWizard } from "@/components/booking/BookingWizard";
import { WorkingHoursCard } from "@/components/working-hours/WorkingHoursCard";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: "حجز موعد",
  description:
    "اطلب موعدك في ديرماكيور عبر خمس خطوات: الخدمة، الطبيب، التاريخ والوقت، بيانات التواصل، ثم المراجعة والإرسال.",
  alternates: { canonical: "book" },
};

export default function BookPage() {
  return (
    <>
      <PageHero
        eyebrow="الحجز"
        title="احجز موعدك"
        description="اختر الخدمة والوقت ثم جهّز رسالة موعد لإرسالها يدوياً عبر واتساب."
        icon="calendar"
      />

      <div className="container-px section-space">
        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-start">
          <div>
            <Notice tone="warn">
              لا تُرسل بياناتك إلى الموقع ولا تُحفظ فيه. يفتح نموذج الحجز رسالة جاهزة في واتساب؛
              راجعها وأرسلها بنفسك. الموعد لا يتأكد إلا بعد تواصل العيادة معك.
            </Notice>
            <div className="mt-6">
              <BookingWizard />
            </div>
          </div>

          <aside className="space-y-5">
            <WorkingHoursCard compact />

            <div className="rounded-[var(--radius-xl)] border border-line bg-white p-6 shadow-card">
              <h2 className="text-[19px] font-bold text-ink">تحتاج مساعدة؟</h2>
              <ul className="mt-4 space-y-3">
                {siteConfig.contact.phones.map((phone) => (
                  <li key={phone.value}>
                    <a
                      href={`tel:${phone.raw}`}
                      className="flex items-center justify-between rounded-[var(--radius-md)] border border-line bg-cream/60 px-4 py-3 transition hover:border-primary hover:bg-aqua"
                    >
                      <span className="text-[14.5px] font-medium text-ink">{phone.label}</span>
                      <span className="text-[15.5px] font-bold text-primary-dark" dir="ltr">
                        {phone.value}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-5 grid gap-3">
                <Link href="/how-to-book" className="btn btn-ghost btn-sm">
                  <Icon name="book" className="h-[18px] w-[18px]" />
                  كيف تتم عملية الحجز؟
                </Link>
                <Link href="/faq" className="btn btn-ghost btn-sm">
                  <Icon name="help" className="h-[18px] w-[18px]" />
                  الأسئلة الشائعة
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
