import type { Metadata } from "next";
import { PageHero, Notice } from "@/components/ui/Page";
import { DoctorCard } from "@/components/doctors/DoctorCard";
import { doctors } from "@/data/doctors";

export const metadata: Metadata = {
  title: "الأطباء",
  description:
    "فريق أطباء ديرماكيور: أربعة استشاريين في طب الجلدية والتجميل والعلاج بالليزر، وأخصائيان — مع صفحات مستقلة لكل طبيب.",
  alternates: { canonical: "doctors" },
};

export default function DoctorsPage() {
  const consultants = doctors.filter((d) => d.group === "consultant");
  const specialists = doctors.filter((d) => d.group === "specialist");

  return (
    <>
      <PageHero
        eyebrow="فريقنا"
        title="أطباء ديرماكيور"
        description="اضغط على أي بطاقة لفتح صفحة الطبيب، حيث تجدها التخصص المؤكد والخدمات التي يقدمها فعلياً."
        icon="user"
      />

      <div className="container-px section-space">
        <section aria-labelledby="consultants-title">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="eyebrow">الاستشاريون</span>
              <h2 id="consultants-title" className="mt-3 text-[clamp(22px,3.2vw,32px)] font-bold text-ink">
                الاستشاريون
              </h2>
            </div>
            <span className="rounded-full border border-line bg-white px-4 py-2 text-[14px] font-semibold text-muted">
              {consultants.length} استشاريين
            </span>
          </div>
          <div className="mt-7 grid grid-cols-2 gap-3 sm:gap-5">
            {consultants.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        </section>

        <section className="mt-14" aria-labelledby="specialists-title">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="eyebrow">الأخصائيون</span>
              <h2 id="specialists-title" className="mt-3 text-[clamp(22px,3.2vw,32px)] font-bold text-ink">
                الأخصائيون
              </h2>
            </div>
            <span className="rounded-full border border-line bg-white px-4 py-2 text-[14px] font-semibold text-muted">
              {specialists.length} أخصائيين
            </span>
          </div>
          <div className="mt-7 grid grid-cols-2 gap-3 sm:gap-5">
            {specialists.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
          <div className="mt-7">
            <Notice tone="warn">
              المسمى الوظيفي النهائي للأخصائيين قيد التأكيد الرسمي، لذا يُعرض كما هو مع توضيح
              أن المسمى بانتظار التأكيد.
            </Notice>
          </div>
        </section>
      </div>
    </>
  );
}
