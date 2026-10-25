import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppGlyph } from "@/components/ui/SocialIcons";
import { Notice, PageHero } from "@/components/ui/Page";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: "كيفية الحجز",
  description:
    "خطوات إرسال طلب موعد في ديرماكيور، والفرق بين إرسال الطلب وتأكيده من العيادة.",
  alternates: { canonical: "how-to-book" },
};

const steps = [
  {
    icon: "sparkles" as const,
    title: "اختر الخدمة",
    text: "من صفحة الخدمات أو من قائمة الخدمات في الأعلى، اضغط على الخدمة التي تريدها لفتح صفحة تفاصيلها.",
  },
  {
    icon: "user" as const,
    title: "اختر الطبيب",
    text: "تُعرض لك الأطباء المرتبطين بالخدمة فقط. إن لم تتوفر قائمة مؤكدة، يمكنك إرسال الطلب دون تفضيل طبيب.",
  },
  {
    icon: "calendar" as const,
    title: "حدّد التاريخ والوقت",
    text: "اختر التاريخ والوقت المطلوبين. لا يُعرض أي موعد كمتاح لأن النظام لا يدير جداول مواعيد آلية.",
  },
  {
    icon: "message" as const,
    title: "أدخل بيانات التواصل",
    text: "الاسم ورقم التواصل، والبريد والملاحظات اختياريان. لا نطلب معلومات صحية حساسة.",
  },
  {
    icon: "help" as const,
    title: "راجع وأرسل",
    text: "تظهر لك ملخص الطلب قبل الإرسال، ويمكنك التعديل من أي خطوة ثم الإرسال مرة واحدة.",
  },
];

export default function HowToBookPage() {
  return (
    <>
      <PageHero
        eyebrow="كيفية الحجز"
        title="كيف تطلب موعدك في ديرماكيور"
        description="دليل مختصر لخمس خطوات، مع توضيح الفرق بين إرسال طلب الموعد وتأكيده."
        icon="book"
      />

      <div className="container-px section-space">
        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-start">
          <div>
            <ol className="space-y-5">
              {steps.map((step, index) => (
                <Reveal key={step.title} as="li" delay={index * 60} className="h-full">
                  <div className="flex h-full gap-5 rounded-[var(--radius-lg)] border border-line bg-white p-6 shadow-card">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-aqua text-primary-dark">
                      <Icon name={step.icon} className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="font-display text-[24px] leading-none text-gold-ink">
                          {index + 1}
                        </span>
                        <h2 className="text-[18.5px] font-bold text-ink">{step.title}</h2>
                      </div>
                      <p className="mt-2 text-[15.5px] leading-8 text-muted">{step.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>

            <div className="mt-8">
              <Notice tone="warn">
                <strong className="text-ink">الفرق بين الطلب والتأكيد:</strong> إرسال الطلب
                يعني وصول معلوماتك إلى العيادة وحفظها برقم مرجعي فقط. أما تأكيد الموعد فيتم
                من قِبل فريق العيادة بعد التواصل معك، ولا تُعرض أي عبارة «تم تأكيد حجزك» إلا
                بعد ذلك التأكيد.
              </Notice>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/book" className="btn btn-primary">
                <Icon name="calendar" className="h-5 w-5" />
                ابدأ طلب الموعد
              </Link>
              <Link href="/faq" className="btn btn-outline">
                الأسئلة الشائعة
              </Link>
            </div>
          </div>

          <aside className="space-y-5">
            <div className="rounded-[var(--radius-xl)] border border-line bg-white p-6 shadow-card">
              <h2 className="text-[19px] font-bold text-ink">طرق التواصل السريعة</h2>
              <ul className="mt-4 space-y-4">
                {siteConfig.contact.phones.map((phone) => (
                  <li key={phone.value} className="rounded-[var(--radius-md)] border border-line bg-cream/60 p-4">
                    <p className="text-[14.5px] font-bold text-ink">{phone.label}</p>
                    <p className="mt-1.5 font-display text-[24px] leading-none text-primary-dark" dir="ltr">
                      {phone.value}
                    </p>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <a
                        href={`tel:${phone.raw}`}
                        className="btn btn-primary btn-sm px-3"
                        dir="ltr"
                        aria-label={`اتصال بـ ${phone.label}`}
                      >
                        اتصال
                      </a>
                      {phone.whatsappUrl ? (
                        <a
                          href={phone.whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-whatsapp btn-sm px-3"
                          aria-label={`واتساب ${phone.label}`}
                        >
                          واتساب
                        </a>
                      ) : (
                        <span className="btn btn-ghost btn-sm px-3 opacity-60">واتساب</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
              {siteConfig.contact.whatsapp.available ? (
                <a
                  href={siteConfig.contact.whatsapp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp mt-4 w-full"
                >
                  تواصل عبر واتساب
                </a>
              ) : null}
            </div>

            <div className="rounded-[var(--radius-xl)] border border-line bg-aqua/70 p-6">
              <h2 className="text-[19px] font-bold text-ink">هل تحتاج توجيهاً؟</h2>
              <p className="mt-3 text-[15px] leading-8 text-muted">
                تواصل مع العيادة وسنساعدك في اختيار الخدمة المناسبة قبل إرسال الطلب.
              </p>
              <Link href="/contact" className="btn btn-outline btn-sm mt-4 w-full">
                صفحة التواصل
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
