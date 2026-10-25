import type { Metadata } from "next";
import Link from "next/link";
import { Notice, PageHero } from "@/components/ui/Page";
import { WorkingHoursCard } from "@/components/working-hours/WorkingHoursCard";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: "ساعات العمل",
  description:
    "ساعات عمل عيادات ديرماكيور: يومياً من الواحدة ظهراً حتى التاسعة مساءً، مع تمييز اليوم الحالي وحالة الفتح بتوقيت الرياض.",
  alternates: { canonical: "working-hours" },
};

export default function WorkingHoursPage() {
  return (
    <>
      <PageHero
        eyebrow="ساعات العمل"
        title="متى نستقبلكم"
        description="الجدول أدناه معتمد من العيادة، ويُحسب اليوم الحالي وحالة «مفتوح الآن» آلياً بتوقيت الرياض."
        icon="clock"
      />

      <div className="container-px section-space">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <WorkingHoursCard />

          <aside className="space-y-5">
            <div className="rounded-[var(--radius-xl)] border border-line bg-white p-6 shadow-card">
              <h2 className="text-[19px] font-bold text-ink">تفاصيل مهمة</h2>
              <ul className="mt-4 space-y-4 text-[15px] leading-8 text-muted">
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
                  الجدول معتمد {siteConfig.workingHours.source} ويُخصّ جميع أيام الأسبوع.
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
                  الحالة (مفتوح/مغلق) تُحسب بتوقيت {siteConfig.timezone} ولا تعتمد على لغة
                  المتصفح.
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
                  حالة الدوام لا تعني بالضرورة استقبال آخر مريض في التوقيت نفسه؛ يُفضّل تأكيد
                  الموعد مسبقاً.
                </li>
              </ul>
            </div>

            <Notice>
              {siteConfig.workingHours.note} للتأكد من الاستقبال في يوم معيّن، يُرجى التواصل
              الهاتفي قبل الزيارة.
            </Notice>

            <div className="flex flex-col gap-3">
              <Link href="/book" className="btn btn-primary">
                احجز موعداً
              </Link>
              <Link href="/location" className="btn btn-outline">
                موقع العيادة
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
