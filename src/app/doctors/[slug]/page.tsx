import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { Notice, PageHero } from "@/components/ui/Page";
import { ServiceCard } from "@/components/services/ServiceCard";
import { doctors, getDoctorBySlug } from "@/data/doctors";
import { getServicesByIds } from "@/data/services";

interface Params {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return doctors.map((doctor) => ({ slug: doctor.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const doctor = getDoctorBySlug(slug);
  if (!doctor) return { title: "طبيب غير موجود" };
  return {
    title: doctor.name,
    description: `${doctor.name} — ${doctor.title}. تعرّف على التخصص والخدمات التي يقدمها في ديرماكيور.`,
    alternates: { canonical: `doctors/${doctor.slug}` },
  };
}

export default async function DoctorDetailPage({ params }: Params) {
  const { slug } = await params;
  const doctor = getDoctorBySlug(slug);
  if (!doctor) notFound();

  const linkedServices = getServicesByIds(doctor.serviceIds);
  const pending = doctor.titleVerification === "pending";

  return (
    <>
      <PageHero
        eyebrow={doctor.group === "consultant" ? "استشاري" : "أخصائي"}
        title={doctor.name}
        description={doctor.title}
        icon="user"
      >
        <nav aria-label="مسار التنقل" className="mt-6 flex flex-wrap items-center gap-2 text-[14px] text-muted">
          <Link href="/" className="hover:text-primary-dark">الرئيسية</Link>
          <span aria-hidden>/</span>
          <Link href="/doctors" className="hover:text-primary-dark">الأطباء</Link>
          <span aria-hidden>/</span>
          <span className="text-ink">{doctor.name}</span>
        </nav>
      </PageHero>

      <div className="container-px section-space">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.25fr] lg:items-start">
          <aside className="overflow-hidden rounded-[var(--radius-xl)] border border-line bg-white shadow-card">
            <div className="relative flex h-64 items-center justify-center bg-gradient-to-bl from-aqua via-[#F3FAF9] to-cream">
              <div className="pointer-events-none absolute inset-0 pattern-grid opacity-60" aria-hidden />
              <div className="relative flex flex-col items-center gap-3">
                <span className="flex h-24 w-24 items-center justify-center rounded-full border border-gold/50 bg-white/85 text-primary-dark">
                  <Icon name="user" className="h-12 w-12" strokeWidth={1.4} />
                </span>
                <span className="rounded-full border border-line bg-white/90 px-4 py-1.5 text-[12.5px] text-muted">
                  {doctor.image ? "الصورة الرسمية" : "الصورة الرسمية قيد التحديث"}
                </span>
              </div>
            </div>

            <div className="p-6">
              <h2 className="text-[19px] font-bold text-ink">المسمى والتخصص</h2>
              <p className={`mt-3 text-[16px] font-semibold leading-8 ${pending ? "text-[#8A7B3F]" : "text-primary-dark"}`}>
                {doctor.title}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {doctor.specialties.map((specialty) => (
                  <li
                    key={specialty}
                    className="rounded-full border border-line bg-cream/70 px-3.5 py-1.5 text-[13.5px] text-muted"
                  >
                    {specialty}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-col gap-3">
                <Link href={`/book?doctor=${doctor.slug}`} className="btn btn-primary w-full">
                  <Icon name="calendar" className="h-5 w-5" />
                  اطلب موعداً
                </Link>
                <Link href="/doctors" className="btn btn-outline w-full">
                  العودة إلى قائمة الأطباء
                </Link>
              </div>
            </div>
          </aside>

          <div className="space-y-6">
            <article className="rounded-[var(--radius-xl)] border border-line bg-white p-6 shadow-card md:p-9">
              <span className="eyebrow">نبذة</span>
              <h2 className="mt-3 text-[22px] font-bold text-ink">عن {doctor.name}</h2>
              <div className="prose-ar mt-4">
                <p>
                  {doctor.name} — {doctor.title}. التخصص المذكور مأخوذ من المصادر الرسمية
                  المتاحة لنا، ولم نضف إليه مؤهلات أو تخصصات غير مؤكدة.
                </p>
                {pending ? (
                  <p>
                    ملاحظة: المسمى الوظيفي النهائي قيد التأكيد الرسمي، ويُحدَّث فور توفّر
                    البيانات المعتمدة.
                  </p>
                ) : null}
                <p>
                  يمكنك إرسال طلب موعد مع {doctor.name} عبر نموذج الحجز، وسيقوم فريق العيادة
                  بمراجعة الطلب وتأكيد الموعد معك.
                </p>
              </div>

              {pending ? (
                <div className="mt-6">
                  <Notice tone="warn">
                    يرجى العلم أن بيانات ربط هذا الطبيب بخدمات محددة قيد التحديث، ولن نعرض
                    علاقة غير موثقة.
                  </Notice>
                </div>
              ) : null}
            </article>

            <section aria-labelledby="doctor-services" className="rounded-[var(--radius-xl)] border border-line bg-white p-6 shadow-card md:p-9">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <span className="eyebrow">الخدمات</span>
                  <h2 id="doctor-services" className="mt-3 text-[22px] font-bold text-ink">
                    الخدمات التي يقدمها فعلياً
                  </h2>
                </div>
                <Link href="/services" className="text-[14.5px] font-semibold text-primary-dark underline underline-offset-4">
                  جميع الخدمات
                </Link>
              </div>

              {linkedServices.length > 0 ? (
                <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-5">
                  {linkedServices.map((service, index) => (
                    <ServiceCard key={service.slug} service={service} index={index} />
                  ))}
                </div>
              ) : (
                <div className="mt-6">
                  <Notice tone="warn">
                    لا تتوفر حالياً قائمة خدمات مؤكدة مرتبطة بهذا الطبيب؛ المعلومات قيد
                    التحديث. يمكنك تصفح جميع الخدمات أو إرسال طلب موعد عام.
                  </Notice>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link href="/services" className="btn btn-outline btn-sm">
                      تصفح الخدمات
                    </Link>
                    <Link href="/book" className="btn btn-primary btn-sm">
                      إرسال طلب موعد
                    </Link>
                  </div>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
