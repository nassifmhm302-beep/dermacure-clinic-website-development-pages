import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import { Notice, PageHero } from "@/components/ui/Page";
import { ServiceCard } from "@/components/services/ServiceCard";
import { DoctorCard } from "@/components/doctors/DoctorCard";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { getDoctorsForService } from "@/data/doctors";
import {
  getGroupById,
  getRelatedServices,
  getServiceBySlug,
  services,
} from "@/data/services";
import { faqs } from "@/data/faq";

interface Params {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "خدمة غير موجودة" };
  return {
    title: service.name,
    description: service.shortDescription,
    alternates: { canonical: `services/${service.slug}` },
    openGraph: { title: service.name, description: service.shortDescription },
  };
}

export default async function ServiceDetailPage({ params }: Params) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const group = getGroupById(service.groupId);
  const linkedDoctors = getDoctorsForService(service.id);
  const related = getRelatedServices(service, 4);
  const relatedFaqs = faqs.filter((faq) => faq.scope === "booking").slice(0, 4);

  return (
    <>
      <PageHero
        eyebrow={group?.title ?? "الخدمات"}
        title={service.name}
        description={service.shortDescription}
        icon={service.icon}
      >
        <nav aria-label="مسار التنقل" className="mt-6 flex flex-wrap items-center gap-2 text-[14px] text-muted">
          <Link href="/" className="hover:text-primary-dark">الرئيسية</Link>
          <span aria-hidden>/</span>
          <Link href="/services" className="hover:text-primary-dark">الخدمات</Link>
          <span aria-hidden>/</span>
          <span className="text-ink">{service.name}</span>
        </nav>
      </PageHero>

      <div className="container-px section-space">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <article className="rounded-[var(--radius-xl)] border border-line bg-white p-6 shadow-card md:p-9">
            <div className="flex flex-wrap items-center gap-3">
              <span className="flex h-14 w-14 items-center justify-center rounded-[var(--radius-md)] bg-aqua text-primary-dark">
                <Icon name={service.icon} className="h-7 w-7" />
              </span>
              <span className="rounded-full border border-line bg-cream px-4 py-2 text-[13.5px] font-semibold text-muted">
                {service.verificationStatus === "verified"
                  ? "ضمن الخدمات الرسمية للعيادة"
                  : "قيد التحقق"}
              </span>
              <span className="rounded-full border border-primary/40 bg-aqua px-4 py-2 text-[13.5px] font-semibold text-primary-dark">
                {service.bookingEnabled ? "متاح إرسال طلب موعد" : "الحجز غير متاح حالياً"}
              </span>
            </div>

            <h2 className="mt-7 text-[22px] font-bold text-ink">عن الخدمة</h2>
            <div className="prose-ar mt-3">{service.description}</div>

            <div className="mt-7 rounded-[var(--radius-md)] border border-line bg-cream/70 p-5">
              <p className="text-[14.5px] leading-8 text-muted">
                هذه المعلومات تعريفية عامة بالخدمة ولا تُغني عن الاستشارة الطبية. تختلف الخطة
                ومدة العلاج والنتيجة من حالة لأخرى.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {service.bookingEnabled ? (
                <Link href={`/book?service=${service.slug}`} className="btn btn-primary">
                  <Icon name="calendar" className="h-5 w-5" />
                  اطلب موعداً
                </Link>
              ) : null}
              <Link href="/services" className="btn btn-outline">
                العودة إلى الخدمات
              </Link>
            </div>
          </article>

          <aside className="rounded-[var(--radius-xl)] border border-line bg-white p-6 shadow-card">
            <Photo
              src="/images/clinic/procedure.jpg"
              alt="صورة توضيحية لأخصائية تستخدم جهاز عناية بالبشرة؛ ليست صورة موثقة لعيادة DermaCure."
              className="h-44 rounded-[var(--radius-md)]"
              position="center 35%"
            />
            <p className="mt-2 text-[13px] text-muted">صورة توضيحية مستخرجة من التسجيل المرفق، وليست صورة رسمية للعيادة.</p>

            <h2 className="mt-6 text-[20px] font-bold text-ink">الأطباء الذين يقدمون الخدمة</h2>
            {linkedDoctors.length > 0 ? (
              <ul className="mt-4 grid grid-cols-2 gap-3">
                {linkedDoctors.map((doctor) => (
                  <li key={doctor.id}>
                    <DoctorCard doctor={doctor} />
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mt-4">
                <Notice tone="warn">
                  معلومات ربط الأطباء بهذه الخدمة قيد التحديث. لا نعرض قائمة أطباء غير مؤكدة
                  لمجرد تشابه التخصص.
                </Notice>
              </div>
            )}
            <p className="mt-5 text-[13.5px] leading-7 text-muted">
              التوفر الفعلي للأطباء والمواعيد يُثبَّت من العيادة عند مراجعة طلبك.
            </p>
          </aside>
        </div>

        {related.length > 0 ? (
          <section className="mt-14" aria-labelledby="related-services">
            <div className="flex items-end justify-between gap-4">
              <h2 id="related-services" className="text-[clamp(21px,3vw,30px)] font-bold text-ink">
                خدمات ذات صلة
              </h2>
              <Link href="/services" className="text-[15px] font-semibold text-primary-dark underline underline-offset-4">
                جميع الخدمات
              </Link>
            </div>
            <p className="mt-2 text-[14.5px] text-muted">ضمن مجموعة: {group?.title}</p>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-5">
              {related.map((item, index) => (
                <ServiceCard key={item.slug} service={item} index={index} />
              ))}
            </div>
          </section>
        ) : null}

        <section className="mt-14" aria-labelledby="service-faq">
          <h2 id="service-faq" className="text-[clamp(21px,3vw,30px)] font-bold text-ink">
            أسئلة متكررة قبل الحجز
          </h2>
          <p className="mt-2 text-[14.5px] text-muted">
            ملاحظة: لا تتوفر حالياً أسئلة شائعة موثقة خاصة بهذه الخدمة، لذا نعرض الأسئلة العامة
            الأعلى صلة بالحجز.
          </p>
          <div className="mt-6">
            <FaqAccordion items={relatedFaqs} />
          </div>
          <div className="mt-6">
            <Link href="/faq" className="btn btn-outline btn-sm">
              جميع الأسئلة الشائعة
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
