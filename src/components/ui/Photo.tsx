"use client";

import Image from "next/image";
import { useState } from "react";

export function Photo({
  src,
  alt,
  className = "",
  imgClassName = "",
  eager = false,
  position = "center",
  sizes = "(max-width: 768px) 100vw, 50vw",
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  eager?: boolean;
  position?: string;
  sizes?: string;
}) {
  const [imageFailed, setImageFailed] = useState(false);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const imageSrc = src.startsWith("/") ? `${basePath}${src}` : src;

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-bl from-aqua via-[#F3FAF9] to-cream ${className}`}
    >
      {!imageFailed ? (
        <Image
          src={imageSrc}
          alt={alt}
          fill
          sizes={sizes}
          className={`object-cover ${imgClassName}`}
          style={{ objectPosition: position }}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          unoptimized
          onError={() => setImageFailed(true)}
        />
      ) : (
        <div
          role="img"
          aria-label={`${alt} — تعذّر تحميل الصورة`}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="pointer-events-none absolute inset-0 pattern-grid opacity-70" aria-hidden />
          <span className="relative rounded-full border border-primary/15 bg-white/75 px-5 py-3 text-center text-[14px] font-medium text-muted shadow-sm">
            تعذّر تحميل الصورة التوضيحية
          </span>
        </div>
      )}
    </div>
  );
}
