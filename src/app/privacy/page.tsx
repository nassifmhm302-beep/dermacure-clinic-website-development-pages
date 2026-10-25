import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/Page";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: "سياسة الخصوصية",
  description: "توضح هذه السياسة أن موقع ديرماكيور لا يحفظ بيانات النماذج، وأن التواصل يتم عبر واتساب بعد مراجعتك وإرسالك للرسالة.",
  alternates: { canonical: "privacy" },
};

const sections = [
  {
    title: "البيانات التي تدخلها في النموذج",
    body: [
      "يمكنك إدخال الاسم وبيانات التواصل والخدمة والطبيب والوقت المطلوب في نموذج الحجز، أو الاسم وبيانات التواصل والموضوع والرسالة في نموذج التواصل.",
      "لا يرسل الموقع هذه المدخلات إلى خادم ولا يخزنها. تبقى في صفحة المتصفح حتى تختار تجهيز الرسالة أو تغلق الصفحة.",
      "لا تدخل معلومات صحية حساسة مثل التشخيصات أو التقارير الطبية أو نتائج التحاليل في الرسائل.",
    ],
  },
  {
    title: "متى تُشارك المعلومات؟",
    body: [
      "عند اختيار فتح واتساب، ينشئ الموقع رابطاً برسالة جاهزة. لن تُرسل الرسالة إلى العيادة حتى تراجعها وتضغط إرسال داخل تطبيق أو موقع واتساب.",
      "بعد الانتقال إلى واتساب، تخضع البيانات التي تختار إرسالها لشروط وسياسة الخصوصية الخاصة بواتساب ولطريقة تعامل العيادة معها.",
    ],
  },
  {
    title: "التواصل مع العيادة",
    body: [
      "إذا أرسلت الرسالة عبر واتساب، يمكن للعيادة استخدامها للرد على استفسارك أو مراجعة طلب الموعد.",
      "اختيارك فتح واتساب لا يعني أن الرسالة أُرسلت، كما أن إرسال طلب موعد لا يعني تأكيد الموعد.",
    ],
  },
  {
    title: "الاحتفاظ والحذف",
    body: [
      "لا يحتفظ الموقع ببيانات النماذج. إذا أرسلت رسالة إلى العيادة عبر واتساب وأردت الاستفسار عن تلك الرسالة أو حذفها، فتواصل مع العيادة مباشرة.",
    ],
  },
  {
    title: "الإفصاح عن الادعاءات",
    body: [
      "هذه الصفحة تصف ما هو منفَّذ فعلياً في الموقع الآن. لا ندّعي امتثالاً تنظيمياً أو شهادات حماية لم تُنفَّذ تقنياً، ونحدّث هذه الصفحة عند تغيّر الآليات.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="الخصوصية"
        title="سياسة الخصوصية"
        description="معلومات واضحة حول ما يفعله الموقع ببيانات النماذج والتواصل عبر واتساب."
        icon="help"
      />

      <div className="container-px section-space">
        <div className="mx-auto max-w-3xl space-y-6">
          {sections.map((section) => (
            <section
              key={section.title}
              className="rounded-[var(--radius-lg)] border border-line bg-white p-6 shadow-card md:p-8"
            >
              <h2 className="text-[20px] font-bold text-ink">{section.title}</h2>
              <div className="prose-ar mt-3">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}

          <section className="rounded-[var(--radius-lg)] border border-gold/60 bg-[#FBF7EC] p-6 md:p-8">
            <h2 className="text-[20px] font-bold text-ink">حقوقك والتواصل</h2>
            <p className="prose-ar mt-3">
              للاستفسار عن الرسائل التي أرسلتها عبر واتساب، تواصل معنا عبر{" "}
              <Link href="/contact" className="font-semibold text-primary-dark underline underline-offset-4">
                صفحة التواصل
              </Link>{" "}
              أو على أرقام العيادة المعتمدة.
            </p>
            <p className="mt-4 text-[14px] text-muted">
              آخر تحديث لسياسة الخصوصية يُعكس آلياً بآخر تعديل على كود الآليات المذكورة أعلاه.
              رقم التواصل الرسمي:{" "}
              <a href={`tel:${siteConfig.contact.phones[0].raw}`} className="font-semibold" dir="ltr">
                {siteConfig.contact.phones[0].value}
              </a>
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
