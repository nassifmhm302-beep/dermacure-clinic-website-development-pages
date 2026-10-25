import type { Metadata } from "next";
import { PageHero } from "@/components/ui/Page";
import { ServicesBrowser } from "@/components/services/ServicesBrowser";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: "جميع الخدمات",
  description:
    "تصفح الخدمات الرسمية التسع لعيادات ديرماكيور: علاج الأمراض الجلدية، الفيلر والبوتوكس، حب الشباب والندبات، الليزر والتصبغات، شد الجلد وإذابة الدهون، النضارة ومشاكل الشعر.",
  alternates: { canonical: "services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="الخدمات"
        title="جميع خدمات ديرماكيور"
        description="الخدمات الرسمية للعيادة كاملة — اضغط على أي بطاقة (كل خدمتين جنباً إلى جنب) لفتح صفحة التفاصيل وشرح الخدمة والأطباء الذين يقدمونها."
        icon="sparkles"
      />
      <div className="container-px section-space">
        <ServicesBrowser />
        <p className="mt-8 text-[14.5px] leading-8 text-muted">
          ملاحظة: هذه القائمة هي الخدمات الرسمية المعتمدة للعيادة كما وردت في مصادرها، وإدراج
          الخدمة لا يعني توافر مواعيد فورية؛ يُرجى إرسال طلب الموعد وسيتواصل معك فريق العيادة
          للتأكيد.
        </p>
      </div>
    </>
  );
}
