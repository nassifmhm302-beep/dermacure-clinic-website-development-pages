import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/Page";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { faqs } from "@/data/faq";

export const metadata: Metadata = {
  title: "الأسئلة الشائعة",
  description:
    "إجابات عن الأسئلة الشائعة في ديرماكيور: طلب الموعد وتأكيده، اختيار الطبيب، البيانات المطلوبة، ساعات العمل والموقع.",
  alternates: { canonical: "faq" },
};

export default function FaqPage() {
  const bookingFaqs = faqs.filter((f) => f.scope === "booking");
  const generalFaqs = faqs.filter((f) => f.scope === "general");

  return (
    <>
      <PageHero
        eyebrow="الأسئلة الشائعة"
        title="أسئلة يطرحها مرضانا كثيراً"
        description="إجابات مختصرة ومحدّثة. لا نُدرج إجابات طبية غير موثقة في هذه الصفحة."
        icon="help"
      />

      <div className="container-px section-space">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <div className="space-y-8">
            <section aria-labelledby="faq-booking">
              <h2 id="faq-booking" className="text-[clamp(21px,3vw,28px)] font-bold text-ink">
                الحجز وطلب الموعد
              </h2>
              <div className="mt-5">
                <FaqAccordion items={bookingFaqs} />
              </div>
            </section>

            <section aria-labelledby="faq-general">
              <h2 id="faq-general" className="text-[clamp(21px,3vw,28px)] font-bold text-ink">
                عام
              </h2>
              <div className="mt-5">
                <FaqAccordion items={generalFaqs} />
              </div>
            </section>
          </div>

          <aside className="space-y-5">
            <div className="rounded-[var(--radius-xl)] border border-line bg-white p-6 shadow-card">
              <h2 className="text-[19px] font-bold text-ink">لم تجد إجابتك؟</h2>
              <p className="mt-3 text-[15px] leading-8 text-muted">
                تواصل معنا مباشرة وسنجيبك خلال ساعات الدوام، أو أرسل طلب موعدك إلكترونياً.
              </p>
              <div className="mt-5 grid gap-3">
                <Link href="/contact" className="btn btn-primary btn-sm">
                  تواصل معنا
                </Link>
                <Link href="/book" className="btn btn-outline btn-sm">
                  احجز موعداً
                </Link>
              </div>
            </div>

            <div className="rounded-[var(--radius-xl)] border border-line bg-aqua/70 p-6">
              <h2 className="text-[19px] font-bold text-ink">صفحات مفيدة</h2>
              <ul className="mt-4 space-y-3 text-[15px]">
                <li>
                  <Link href="/how-to-book" className="font-medium text-primary-dark underline underline-offset-4">
                    كيفية الحجز
                  </Link>
                </li>
                <li>
                  <Link href="/working-hours" className="font-medium text-primary-dark underline underline-offset-4">
                    ساعات العمل
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="font-medium text-primary-dark underline underline-offset-4">
                    جميع الخدمات
                  </Link>
                </li>
                <li>
                  <Link href="/doctors" className="font-medium text-primary-dark underline underline-offset-4">
                    الأطباء
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
