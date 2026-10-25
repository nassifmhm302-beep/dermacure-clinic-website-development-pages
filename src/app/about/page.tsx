import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { Notice, PageHero, SectionHeading } from "@/components/ui/Page";
import { ServiceCard } from "@/components/services/ServiceCard";
import { services, serviceGroups } from "@/data/services";
import { doctors } from "@/data/doctors";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: "تعرّف على DermaCure",
  description:
    "من نحن: نبذة عن عيادات ديرماكيور للجلدية والتجميل، خدماتها الرسمية، وفريق الأطباء.",
  alternates: { canonical: "about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="من نحن"
        title="تعرّف على DermaCure"
        description="عيادات متخصصة في الأمراض الجلدية والتجميل — نعرض معلوماتنا كما هي موثقة، ونوضّح ما هو قيد التحديث."
        icon="sparkles"
      />

      <div className="container-px section-space">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-start">
            <article className="rounded-[var(--radius-xl)] border border-line bg-white p-7 shadow-card md:p-10">
              <span className="eyebrow">رؤيتنا في العناية</span>
              <h2 className="mt-4 text-[clamp(23px,3.4vw,34px)] font-bold leading-snug text-ink">
                العناية الجلدية تبدأ بالمعلومة الصادقة
              </h2>
              <div className="prose-ar mt-5">
                <p>
                  {siteConfig.name} — {siteConfig.nameAr} عيادات متخصصة في الأمراض الجلدية
                  والتجميل، وتضم أربعة استشاريين في طب الجلدية والتجميل والعلاج بالليزر إلى
                  جانب أخصائيين في الفريق.
                </p>
                <p>
                  نعرض خدماتنا عبر {services.length} خدمة رسمية موزعة على {serviceGroups.length}{" "}
                  مجموعات: العناية بالجلد والشعر، الحقن التجميلي والبوتوكس، وأجهزة شد الجلد
                  وإذابة الدهون. لكل خدمة صفحة مستقلة تشرحها، وتُعرض الأطباء الذين يقدمونها
                  فقط عندما تكون العلاقة موثقة.
                </p>
                <p>
                  ونحرص على ألا نقدّم مؤهلاً أو علاقة أو نتيجة غير مؤكدة على أنها حقيقة؛ ما لم
                  تتوفر له مصادر رسمية نُصِّ عليه بأنه قيد التحديث.
                </p>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  { icon: "sparkles" as const, value: services.length, label: "خدمة رسمية" },
                  { icon: "user" as const, value: doctors.length, label: "أطباء" },
                  { icon: "calendar" as const, value: 5, label: "خطوات الحجز" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[var(--radius-md)] border border-line bg-cream/70 p-5 text-center"
                  >
                    <Icon name={item.icon} className="mx-auto h-6 w-6 text-primary-dark" />
                    <p className="mt-3 font-display text-[30px] leading-none text-ink">{item.value}</p>
                    <p className="mt-2 text-[13.5px] text-muted">{item.label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/book" className="btn btn-primary">
                  <Icon name="calendar" className="h-5 w-5" />
                  احجز موعداً
                </Link>
                <Link href="/doctors" className="btn btn-outline">
                  فريق الأطباء
                </Link>
              </div>
            </article>

            <aside className="space-y-5">
              <Photo
                src="/images/clinic/reception.jpg"
                alt="مساحة استقبال نظيفة وحديثة في عيادة (صورة توضيحية غير مرفقة بملفات الموقع، وليست لعيادة DermaCure)"
                className="h-[260px] rounded-[var(--radius-xl)] border border-line"
                position="center 45%"
              />

              <div className="rounded-[var(--radius-xl)] border border-line bg-primary-dark p-7 text-white">
                <p className="font-display text-[13px] tracking-[0.3em] text-gold">شعارنا</p>
                <p className="mt-3 text-[19px] font-bold leading-8">
                  رعاية تُبنى على التقييم الدقيق قبل أي إجراء.
                </p>
                <p className="mt-3 text-[15px] leading-8 text-white/80">
                  تبدأ كل خدمة باستشارة لتقييم الحالة، ثم تُبنى خطة المتابعة وفق احتياج كل
                  مريض.
                </p>
              </div>

              <div className="rounded-[var(--radius-xl)] border border-line bg-white p-7 shadow-card">
                <h2 className="text-[19px] font-bold text-ink">روابط سريعة</h2>
                <ul className="mt-4 space-y-3">
                  {[
                    { href: "/services", label: `الخدمات (${services.length})` },
                    { href: "/doctors", label: `الأطباء (${doctors.length})` },
                    { href: "/how-to-book", label: "كيفية الحجز" },
                    { href: "/working-hours", label: "ساعات العمل" },
                    { href: "/location", label: "الموقع" },
                  ].map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="flex items-center justify-between rounded-[var(--radius-sm)] border border-line bg-cream/60 px-4 py-3 text-[15px] font-medium text-ink transition hover:border-primary hover:bg-aqua"
                      >
                        {link.label}
                        <svg viewBox="0 0 24 24" className="h-4 w-4 text-primary-dark" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M19 12H5" />
                          <path d="m12 19-7-7 7-7" />
                        </svg>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <Notice tone="warn">
                لا نعرض تاريخ تأسيس أو اعتمادات أو أعداداً إنجازية غير موثقة رسمياً.
              </Notice>
            </aside>
          </div>
        </Reveal>
      </div>

      <section className="bg-aqua/50">
        <div className="container-px section-space">
          <Reveal>
            <SectionHeading
              eyebrow="خدماتنا"
              title="خدماتنا الرسمية"
              description="كل خدمتين جنباً إلى جنب — اضغط على البطاقة لفتح صفحة التفاصيل."
              action={{ href: "/services", label: "جميع الخدمات" }}
            />
          </Reveal>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5">
            {services.slice(0, 4).map((service, index) => (
              <ServiceCard key={service.slug} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
