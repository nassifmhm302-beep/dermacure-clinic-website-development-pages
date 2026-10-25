import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

export default function NotFound() {
  return (
    <div className="container-px flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
      <span className="flex h-24 w-24 items-center justify-center rounded-full border border-gold/60 bg-white text-primary shadow-[0_16px_40px_rgb(23_59_74/10%)]">
        <Icon name="help" className="h-11 w-11" />
      </span>
      <p className="mt-7 font-display text-[13px] tracking-[0.4em] text-gold-ink">404</p>
      <h1 className="mt-3 text-[clamp(26px,4.4vw,40px)] font-bold text-ink">
        الصفحة غير موجودة
      </h1>
      <p className="prose-ar mx-auto mt-4 max-w-lg">
        عذراً، لم نعثر على الصفحة التي تبحث عنها. ربما تم نقلها أو أن الرابط غير صحيح.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn btn-primary">
          العودة إلى الرئيسية
        </Link>
        <Link href="/services" className="btn btn-outline">
          تصفح الخدمات
        </Link>
      </div>
      <nav aria-label="روابط سريعة" className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[15px]">
        {[
          { href: "/doctors", label: "الأطباء" },
          { href: "/working-hours", label: "ساعات العمل" },
          { href: "/book", label: "حجز موعد" },
          { href: "/contact", label: "تواصل معنا" },
        ].map((link) => (
          <Link key={link.href} href={link.href} className="text-primary-dark underline underline-offset-4">
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
