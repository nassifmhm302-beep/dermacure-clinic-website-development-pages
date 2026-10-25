"use client";

/**
 * الصور الأصلية المشار إليها لم تكن ضمن الأرشيف المرفق.
 * نعرض بديلاً مرئياً ومتاحاً بدلاً من إرسال طلبات لملفات مفقودة.
 */
export function Photo({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  eager?: boolean;
  position?: string;
  sizes?: string;
}) {
  return (
    <div
      role="img"
      aria-label={`${alt} — الصورة غير مرفقة في ملفات الموقع المنشورة`}
      data-original-image={src}
      className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-bl from-aqua via-[#F3FAF9] to-cream ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 pattern-grid opacity-70" aria-hidden />
      <span className="relative rounded-full border border-primary/15 bg-white/75 px-5 py-3 text-center text-[14px] font-medium text-muted shadow-sm">
        الصور التوضيحية غير متوفرة حالياً
      </span>
    </div>
  );
}
