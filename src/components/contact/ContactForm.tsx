"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { siteConfig } from "@/data/siteConfig";

type PreparedMessage = { href: string } | null;

export function ContactForm() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [prepared, setPrepared] = useState<PreparedMessage>(null);

  const validate = () => {
    const found: Record<string, string> = {};
    if (name.trim().length < 2) found.name = "يرجى إدخال الاسم (حرفان على الأقل).";
    const value = contact.trim();
    const okPhone = /^(?:[+]?9665[0-9]{8}|05[0-9]{8}|[0-9]{8,15})$/.test(value);
    const okMail = /^[^@ ]+@[^@ ]+[.][^@ ]{2,}$/.test(value);
    if (!okPhone && !okMail)
      found.contact = "يرجى إدخال رقم جوال صحيح أو بريد إلكتروني صحيح.";
    if (message.trim().length < 10) found.message = "يرجى كتابة رسالة من 10 أحرف على الأقل.";
    if (message.trim().length > 1000) found.message = "الرسالة طويلة جداً (الحد 1000 حرف).";
    return found;
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    const text = [
      "رسالة تواصل عبر موقع DermaCure — ديرماكيور",
      `الاسم: ${name.trim()}`,
      `رقم التواصل أو البريد: ${contact.trim()}`,
      subject.trim() ? `الموضوع: ${subject.trim()}` : "",
      `الرسالة: ${message.trim()}`,
    ]
      .filter(Boolean)
      .join(String.fromCharCode(10));
    const baseUrl = siteConfig.contact.whatsapp.url;
    setPrepared({ href: `${baseUrl}?text=${encodeURIComponent(text)}` });
  };

  if (prepared) {
    return (
      <div className="rounded-[var(--radius-xl)] border border-primary/40 bg-aqua p-8 text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-primary">
          <Icon name="message" className="h-8 w-8" />
        </span>
        <h3 className="mt-5 text-[21px] font-bold text-ink">رسالتك جاهزة في واتساب</h3>
        <p className="prose-ar mx-auto mt-3 max-w-md text-[15.5px]">
          لم تُرسل الرسالة أو تُحفظ من الموقع. افتح واتساب، راجع نص الرسالة، ثم اضغط زر الإرسال هناك.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href={prepared.href}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm"
          >
            فتح واتساب ومراجعة الرسالة
          </a>
          <button
            type="button"
            onClick={() => setPrepared(null)}
            className="btn btn-outline btn-sm"
          >
            تعديل الرسالة
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-[var(--radius-xl)] border border-line bg-white p-6 shadow-card md:p-8">
      <h2 className="text-[22px] font-bold text-ink">أرسل لنا رسالة</h2>
      <p className="mt-2 text-[15px] text-muted">
        سيُجهّز الموقع نصاً لإرساله عبر واتساب. لن تُرسل الرسالة أو تُحفظ إلا بعد مراجعتها والضغط على إرسال في واتساب.
      </p>

      <div className="mt-6 grid gap-4">
        <label className="block">
          <span className="mb-2 block text-[15px] font-semibold text-ink">الاسم</span>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setErrors((x) => ({ ...x, name: "" }));
            }}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "c-err-name" : undefined}
            className="w-full rounded-[var(--radius-md)] border border-line bg-white px-4 py-3 text-[16px] outline-none transition focus:border-primary"
            style={{ height: 52 }}
          />
          {errors.name ? (
            <span id="c-err-name" role="alert" className="mt-2 block text-[14.5px] font-semibold text-[#B4462F]">
              {errors.name}
            </span>
          ) : null}
        </label>

        <label className="block">
          <span className="mb-2 block text-[15px] font-semibold text-ink">رقم الجوال أو البريد الإلكتروني</span>
          <input
            type="text"
            dir="ltr"
            value={contact}
            onChange={(e) => {
              setContact(e.target.value);
              setErrors((x) => ({ ...x, contact: "" }));
            }}
            aria-invalid={Boolean(errors.contact)}
            aria-describedby={errors.contact ? "c-err-contact" : undefined}
            className="w-full rounded-[var(--radius-md)] border border-line bg-white px-4 py-3 text-start text-[16px] outline-none transition focus:border-primary"
            style={{ height: 52 }}
          />
          {errors.contact ? (
            <span id="c-err-contact" role="alert" className="mt-2 block text-[14.5px] font-semibold text-[#B4462F]">
              {errors.contact}
            </span>
          ) : null}
        </label>

        <label className="block">
          <span className="mb-2 block text-[15px] font-semibold text-ink">
            الموضوع <span className="font-normal text-muted">(اختياري)</span>
          </span>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full rounded-[var(--radius-md)] border border-line bg-white px-4 py-3 text-[16px] outline-none transition focus:border-primary"
            style={{ height: 52 }}
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-[15px] font-semibold text-ink">الرسالة</span>
          <textarea
            rows={5}
            value={message}
            maxLength={1000}
            onChange={(e) => {
              setMessage(e.target.value);
              setErrors((x) => ({ ...x, message: "" }));
            }}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "c-err-message" : undefined}
            className="w-full rounded-[var(--radius-md)] border border-line bg-white px-4 py-3 text-[16px] outline-none transition focus:border-primary"
          />
          {errors.message ? (
            <span id="c-err-message" role="alert" className="mt-2 block text-[14.5px] font-semibold text-[#B4462F]">
              {errors.message}
            </span>
          ) : null}
        </label>

        <button type="submit" className="btn btn-primary w-full">
          تجهيز الرسالة في واتساب
        </button>
      </div>
    </form>
  );
}
