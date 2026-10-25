import Link from "next/link";
import type { Metadata } from "next";
import { Icon } from "@/components/ui/Icon";
import { LogoMark } from "@/components/ui/Logo";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading, Notice } from "@/components/ui/Page";
import { InstagramGlyph, WhatsAppGlyph } from "@/components/ui/SocialIcons";
import { ServiceCard } from "@/components/services/ServiceCard";
import { DoctorCard } from "@/components/doctors/DoctorCard";
import { WorkingHoursCard } from "@/components/working-hours/WorkingHoursCard";
import { doctors } from "@/data/doctors";
import { featuredServices, services, serviceGroups } from "@/data/services";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: `${siteConfig.nameAr} — عناية متخصصة ببشرتك وجمالك`,
  description:
    "DermaCure ديرماكيور: الخدمات الرسمية للعناية بالجلدية والتجميل — علاج الأمراض الجلدية، الفيلر والبوتوكس، حب الشباب والندبات، الليزر والتصبغات، شد الجلد وأجهزة إذابة الدهون، والنضارة ومشاكل الشعر.",
  alternates: { canonical: "." },
};

const bookingSteps = [
  { icon: "sparkles" as const, title: "اختر الخدمة", text: "من قائمة الخدمات الرسمية التسع." },
  { icon: "user" as const, title: "اختر الطبيب", text: "يُعرض الأطباء المرتبطين بالخدمة فقط." },
  { icon: "calendar" as const, title: "حدّد التاريخ والوقت", text: "تفضيلك للموعد، والتأكيد من العيادة." },
  { icon: "message" as const, title: "أدخل بيانات التواصل", text: "الاسم ورقم التواصل فقط." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  name: siteConfig.name,
  alternateName: siteConfig.nameAr,
  description: siteConfig.description,
  url: siteConfig.url,
  telephone: siteConfig.contact.phones[0].raw,
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address.full,
    addressCountry: "SA",
  },
  sameAs: [siteConfig.contact.instagram.url],
  openingHours: "Mo-Su 13:00-21:00",
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1 — Hero */}
      <section className="relative overflow-hidden bg-cream">
        <div className="pointer-events-none absolute inset-0 pattern-grid opacity-60" aria-hidden />
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-aqua blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute -left-16 top-1/3 h-64 w-64 rounded-full border border-gold/40" aria-hidden />

        <div className="container-px relative grid items-center gap-12 py-14 md:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          <Reveal>
            <span className="eyebrow">{siteConfig.name} — عيادات الجلدية والتجميل</span>
            <h1 className="mt-5 text-[clamp(32px,6vw,58px)] font-bold leading-[1.25] text-ink">
              عناية متخصصة
              <span className="block text-primary">ببشرتك وجمالك</span>
            </h1>
            <p className="prose-ar mt-5 max-w-xl text-[17.5px]">
              خدمات جلدية وتجميلية متخصصة، باهتمام يضع احتياجاتك في المقدمة.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/book" className="btn btn-primary">
                <Icon name="calendar" className="h-5 w-5" />
                احجز موعدك
              </Link>
              <Link href="/services" className="btn btn-outline">
                اكتشف الخدمات
              </Link>
            </div>

            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-gold/50 pt-6">
              {[
                { value: `${services.length}`, label: "خدمة رسمية" },
                { value: `${doctors.length}`, label: "أطباء ومختصون" },
                { value: `${serviceGroups.length}`, label: "مجموعات خدمات" },
              ].map((item) => (
                <div key={item.label}>
                  <dt className="font-display text-[30px] leading-none text-primary-dark">{item.value}</dt>
                  <dd className="mt-2 text-[13.5px] text-muted">{item.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {/* صورة رئيسية + شعار العيادة كـ«بؤرة» */}
          <Reveal delay={120} className="relative mx-auto w-full max-w-[520px]">
            <div className="relative">
              <span
                className="absolute -inset-3 rounded-[46%_46%_40%_40%/38%_38%_46%_46%] border border-gold/60"
                aria-hidden
              />
              <Photo
                src="/images/clinic/hero-facial.jpg"
                alt="صورة توضيحية لجلسة عناية بالبشرة؛ مستخرجة من تسجيل الشاشة وليست صورة موثقة لعيادة DermaCure."
                eager
                position="left center"
                className="h-[380px] rounded-[46%_46%_40%_40%/38%_38%_46%_46%] border border-white shadow-[0_28px_60px_rgb(23_59_74/16%)] md:h-[440px]"
              />
              <span className="absolute -bottom-6 right-1/2 flex translate-x-1/2 flex-col items-center gap-1 rounded-[var(--radius-lg)] border border-line bg-white/95 px-6 py-4 shadow-[0_16px_36px_rgb(23_59_74/14%)] backdrop-blur">
                <LogoMark className="h-10 w-10" />
                <span className="font-display text-[12px] tracking-[0.36em] text-gold-ink">ديرماكيور</span>
                <span className="font-display text-[22px] leading-none text-ink">
                  Derma<span className="text-primary">Cure</span>
                </span>
              </span>
            </div>
          </Reveal>
        </div>

        {/* شريط الإجراءات: احجز الآن + اتصل بنا + واتساب كبير */}
        <div className="container-px relative pb-16">
          <div className="grid gap-4 rounded-[var(--radius-xl)] border border-line bg-white p-5 shadow-card md:p-7 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div className="grid grid-cols-2 gap-3">
              <Link href="/book" className="btn btn-primary px-4 text-center">
                احجز الآن
              </Link>
              <a
                href={`tel:${siteConfig.contact.phones[0].raw}`}
                className="btn btn-outline px-4 text-center"
                dir="ltr"
              >
                <Icon name="phone" className="h-[18px] w-[18px]" />
                اتصل بنا
              </a>
            </div>

            <a
              href={siteConfig.contact.whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp w-full text-[17px]"
            >
              <WhatsAppGlyph className="h-6 w-6" />
              تواصل معنا عبر واتساب
            </a>
          </div>
        </div>
        <div className="gold-rule" />
      </section>

      {/* 2 — نبذة قصيرة */}
      <section className="container-px section-space">
        <Reveal>
          <div className="grid items-stretch gap-8 rounded-[var(--radius-xl)] border border-line bg-white p-7 shadow-card md:p-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div>
              <span className="eyebrow">نبذة عن ديرماكيور</span>
              <h2 className="mt-4 text-[clamp(24px,3.4vw,36px)] font-bold leading-snug text-ink">
                عيادة جلدية وتجميلية تعمل بهدوء ودقة
              </h2>
              <p className="prose-ar mt-4">
                DermaCure ديرماكيور عيادات متخصصة في الأمراض الجلدية والتجميل، تضم أربعة
                استشاريين في طب الجلدية والتجميل والعلاج بالليزر إلى جانب أخصائيين. نعرض
                خدماتنا وأطباءنا بشفافية، ونطلب موعدك إلكترونياً ليتم تأكيده من فريق العيادة.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/about" className="btn btn-outline btn-sm">
                  تعرّف على قصتنا
                </Link>
                <Link href="/doctors" className="btn btn-ghost btn-sm">
                  تعرّف على الأطباء
                </Link>
              </div>
            </div>

            <Photo
              src="/images/clinic/treatment.jpg"
              alt="صورة توضيحية لجلسة قناع وعناية بالبشرة؛ ليست صورة موثقة لعيادة DermaCure."
              className="h-[280px] rounded-[var(--radius-lg)] md:h-[340px]"
              position="center 35%"
            />
          </div>
        </Reveal>
      </section>

      {/* 3+4 — الخدمات الرسمية (كل خدمتين جنباً إلى جنب) */}
      <section className="container-px pb-16">
        <Reveal>
          <SectionHeading
            eyebrow="خدماتنا"
            title="الخدمات الرسمية للعيادة"
            description={`اعرضنا الخدمات الرسمية كاملة (${services.length} خدمات) وكل خدمتين جنباً إلى جنب. اضغط على أي بطاقة لتتغير ثم تفتح صفحة تفاصيل الخدمة والأطباء الذين يقدمونها.`}
            action={{ href: "/services", label: "تصفح جميع الخدمات" }}
          />
        </Reveal>

        <div className="mt-9 grid grid-cols-2 gap-3 sm:gap-5">
          {featuredServices.map((service, index) => (
            <Reveal key={service.slug} delay={(index % 2) * 60}>
              <ServiceCard service={service} index={index} />
            </Reveal>
          ))}
        </div>

        <div className="mt-9 flex justify-center">
          <Link href="/services" className="btn btn-outline">
            تصفح جميع الخدمات ({services.length})
          </Link>
        </div>
      </section>

      {/* 5 — من نحن */}
      <section className="bg-aqua/50">
        <div className="container-px section-space">
          <div className="grid items-center gap-9 lg:grid-cols-2">
            <Reveal>
              <span className="eyebrow">من نحن</span>
              <h2 className="mt-4 text-[clamp(24px,3.6vw,38px)] font-bold leading-snug text-ink">
                تعرّف على DermaCure
              </h2>
              <p className="prose-ar mt-4">
                نؤمن أن العناية الجلدية تبدأ بالتقييم الدقيق والحوار الواضح مع المريض. لذلك
                نعرض معلومات خدماتنا وأطبائنا كما هي موثقة، ولا نربط أي علاقة غير مؤكدة بدل
                تقديمها على أنها حقيقة.
              </p>
              <p className="prose-ar mt-4">
                تجد في ديرماكيور عيادات متخصصة في الأمراض الجلدية والتجميل تجمع بين الثقة
                والنظافة والحداثة في تجربة واحدة هادئة.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/about" className="btn btn-primary">
                  تعرّف على قصتنا
                </Link>
                <Link href="/services" className="btn btn-outline">
                  خدماتنا
                </Link>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <Photo
                src="/images/clinic/procedure.jpg"
                alt="صورة توضيحية لأخصائية تستخدم جهاز عناية بالبشرة؛ ليست صورة موثقة لعيادة DermaCure."
                className="h-[300px] rounded-[var(--radius-xl)] border border-line md:h-[380px]"
                position="center 30%"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* 6 — الأطباء (كل طبيبَين جنباً إلى جنب) */}
      <section className="bg-white">
        <div className="container-px section-space">
          <Reveal>
            <SectionHeading
              eyebrow="فريقنا"
              title="الأطباء"
              description="كل طبيبين جنباً إلى جنب، مع Placeholder أنيق لعدم توافر الصور الرسمية."
              action={{ href: "/doctors", label: "جميع الأطباء" }}
            />
          </Reveal>
          <div className="mt-9 grid grid-cols-2 gap-3 sm:gap-5">
            {doctors.map((doctor, index) => (
              <Reveal key={doctor.slug} delay={(index % 2) * 60}>
                <DoctorCard doctor={doctor} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7 — كيفية الحجز */}
      <section className="container-px section-space">
        <Reveal>
          <SectionHeading
            eyebrow="كيفية الحجز"
            title="أربع خطوات لإرسال طلب موعدك"
            description="إرسال الطلب هو الخطوة الأولى؛ التأكيد النهائي يتم من العيادة."
            action={{ href: "/how-to-book", label: "التفاصيل كاملة" }}
          />
        </Reveal>
        <ol className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {bookingSteps.map((item, index) => (
            <Reveal key={item.title} as="li" delay={index * 70} className="h-full">
              <div className="h-full rounded-[var(--radius-lg)] border border-line bg-white p-6 shadow-card">
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-aqua text-primary-dark">
                    <Icon name={item.icon} className="h-5 w-5" />
                  </span>
                  <span className="font-display text-[30px] text-gold-ink">{index + 1}</span>
                </div>
                <h3 className="mt-4 text-[17.5px] font-bold text-ink">{item.title}</h3>
                <p className="mt-2 text-[14.5px] leading-7 text-muted">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
        <div className="mt-8 flex justify-center">
          <Link href="/book" className="btn btn-primary">
            ابدأ طلب الموعد
          </Link>
        </div>
      </section>

      {/* 8 — ساعات العمل */}
      <section className="bg-aqua/50">
        <div className="container-px section-space">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.25fr] lg:items-start">
            <Reveal>
              <span className="eyebrow">ساعات العمل</span>
              <h2 className="mt-4 text-[clamp(24px,3.4vw,36px)] font-bold leading-snug text-ink">
                نستقبلكم يومياً من الواحدة حتى التاسعة مساءً
              </h2>
              <p className="prose-ar mt-4">
                الجدول أدناه معتمد بحسب بيانات العيادة، ويُحسب اليوم الحالي وحالة الفتح آلياً
                بتوقيت الرياض.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/working-hours" className="btn btn-outline btn-sm">
                  كل التفاصيل
                </Link>
                <Link href="/faq" className="btn btn-ghost btn-sm">
                  الأسئلة الشائعة
                </Link>
              </div>
            </Reveal>
            <Reveal delay={90}>
              <WorkingHoursCard />
            </Reveal>
          </div>
        </div>
      </section>

      {/* 9 — التواصل: أرقام رسمية مع اتصال وواتساب لكل رقم */}
      <section className="container-px section-space">
        <Reveal>
          <SectionHeading
            eyebrow="تواصل معنا"
            title="للحجز أو الاستشارة"
            description="الأرقام الرسمية للعيادة كما هي، مع زر اتصال مباشر وزر واتساب لكل قسم."
          />
        </Reveal>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {siteConfig.contact.phones.map((phone, index) => (
            <Reveal key={phone.value} delay={index * 60} className="h-full">
              <article className="flex h-full flex-col gap-4 rounded-[var(--radius-lg)] border border-line bg-white p-6 shadow-card">
                <span className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-aqua text-primary-dark">
                    <Icon name="phone" className="h-5 w-5" />
                  </span>
                  <h3 className="text-[15.5px] font-bold leading-7 text-ink">{phone.label}</h3>
                </span>

                <p className="font-display text-[30px] leading-none text-primary-dark" dir="ltr">
                  {phone.value}
                </p>

                <div className="mt-auto grid grid-cols-2 gap-3">
                  <a href={`tel:${phone.raw}`} className="btn btn-primary btn-sm px-3" dir="ltr">
                    <Icon name="phone" className="h-4 w-4" />
                    اتصال
                  </a>
                  {phone.whatsappUrl ? (
                    <a
                      href={phone.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-whatsapp btn-sm px-3"
                    >
                      <WhatsAppGlyph className="h-4 w-4" />
                      واتساب
                    </a>
                  ) : (
                    <span className="btn btn-ghost btn-sm px-3 opacity-60">واتساب غير متاح</span>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-[var(--radius-lg)] border border-line bg-white p-6 shadow-card">
          <div className="flex items-center gap-3">
            <InstagramGlyph className="h-6 w-6 text-primary" />
            <span className="text-[15.5px] text-ink">
              تابعنا على إنستغرام:{" "}
              <a
                href={siteConfig.contact.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-primary-dark underline underline-offset-4"
              >
                @{siteConfig.contact.instagram.handle}
              </a>
            </span>
          </div>
          <Link href="/contact" className="btn btn-outline btn-sm">
            صفحة التواصل
          </Link>
        </div>
      </section>

      {/* 10 — الموقع (قبل آخر قسم) */}
      <section className="container-px pb-4">
        <Reveal>
          <div className="overflow-hidden rounded-[var(--radius-xl)] border border-line bg-white shadow-card">
            <div className="grid md:grid-cols-2">
              <div className="relative flex min-h-[260px] items-center justify-center bg-primary-dark p-8 text-white">
                <div className="pointer-events-none absolute inset-0 pattern-grid-light opacity-70" aria-hidden />
                <div className="relative text-center">
                  <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/12 text-gold ring-1 ring-gold/50">
                    <Icon name="pin" className="h-8 w-8" />
                  </span>
                  <p className="mt-4 font-display text-[13px] tracking-[0.3em] text-gold">موقعنا</p>
                  <p className="mt-3 text-[20px] font-bold leading-8">
                    {siteConfig.address.available ? siteConfig.address.full : "موقع العيادة قيد التحديث."}
                  </p>
                </div>
              </div>
              <div className="p-7 md:p-9">
                <h2 className="text-[24px] font-bold text-ink">الاتجاهات والموقع</h2>
                <p className="prose-ar mt-3">
                  افتح موقع العيادة على الخرائط للوصول، أو تفقّد بيانات التواصل وساعات العمل
                  في الصفحات المخصصة.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href="/location" className="btn btn-primary btn-sm">
                    صفحة الموقع
                  </Link>
                  {siteConfig.address.available ? (
                    <a
                      href={siteConfig.address.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline btn-sm"
                    >
                      الاتجاهات
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* 11 — CTA (آخر قسم) */}
      <section className="container-px py-14">
        <Reveal>
          <div className="relative overflow-hidden rounded-[var(--radius-xl)] bg-primary px-6 py-12 text-center text-white md:py-16">
            <div className="pointer-events-none absolute inset-0 pattern-grid-light opacity-70" aria-hidden />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-[clamp(24px,4vw,38px)] font-bold leading-snug">
                جاهز لحجز موعدك في ديرماكيور؟
              </h2>
              <p className="mt-4 text-[16.5px] leading-8 text-white/85">
                أرسل طلب موعدك في خمس خطوات، وسنتواصل معك لتأكيد الموعد.
              </p>
              <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link href="/book" className="btn bg-white px-8 text-primary-dark hover:bg-cream">
                  احجز الآن
                </Link>
                <Link
                  href="/contact"
                  className="btn border border-white/60 px-8 text-white hover:bg-white/10"
                >
                  تواصل معنا
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="container-px pb-6">
        <Notice>
          ملاحظة: الصور المستخدمة في الموقع صور توضيحية مرخّصة (Pexels) وليست صور العيادة أو
          أطبائها. بعض المعلومات (كصور الأطباء الرسمية والمسميات) قيد التحديث، ونعرضها كحالة
          مؤقتة بدل تقديمها كمعلومات مؤكدة.
        </Notice>
      </section>
    </>
  );
}
