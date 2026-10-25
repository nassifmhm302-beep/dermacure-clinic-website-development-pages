"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { Notice } from "@/components/ui/Page";
import { services, getServiceBySlug } from "@/data/services";
import { getDoctorBySlug, getDoctorsForService } from "@/data/doctors";
import { formatClock } from "@/components/working-hours/WorkingHoursCard";
import { siteConfig } from "@/data/siteConfig";
import { todayInRiyadh } from "@/lib/validation";

const STEP_LABELS = [
  "اختيار الخدمة",
  "اختيار الطبيب",
  "التاريخ والوقت",
  "بيانات التواصل",
  "المراجعة والإرسال",
];

const phonePattern = /^(?:\+?9665\d{8}|05\d{8}|\d{8,15})$/;

interface Props {
  initialServiceSlug?: string;
  initialDoctorSlug?: string;
}

export function BookingWizard({ initialServiceSlug, initialDoctorSlug }: Props) {
  const today = todayInRiyadh();

  const [step, setStep] = useState(1);
  const [serviceSlug, setServiceSlug] = useState(
    getServiceBySlug(initialServiceSlug ?? "") ? initialServiceSlug! : "",
  );
  const [doctorSlug, setDoctorSlug] = useState(
    getDoctorBySlug(initialDoctorSlug ?? "") ? initialDoctorSlug! : "",
  );
  const [noPreference, setNoPreference] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const service = serviceSlug ? getServiceBySlug(serviceSlug) : null;
  const linkedDoctors = useMemo(
    () => (service ? getDoctorsForService(service.id) : []),
    [service],
  );
  const doctor = doctorSlug ? getDoctorBySlug(doctorSlug) : null;

  useEffect(() => {
    if (initialServiceSlug || initialDoctorSlug) return;
    const timer = window.setTimeout(() => {
      const query = new URLSearchParams(window.location.search);
      const requestedService = query.get("service") ?? "";
      const requestedDoctor = query.get("doctor") ?? "";
      if (getServiceBySlug(requestedService)) setServiceSlug(requestedService);
      if (getDoctorBySlug(requestedDoctor)) setDoctorSlug(requestedDoctor);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [initialDoctorSlug, initialServiceSlug]);

  const bookingMessage = [
    "طلب موعد عبر موقع DermaCure — ديرماكيور",
    `الخدمة: ${service?.name ?? "—"}`,
    `الطبيب: ${doctor?.name ?? (noPreference ? "بدون تفضيل" : "—")}`,
    `التاريخ المطلوب: ${date || "—"}`,
    `الوقت المطلوب: ${time || "—"}`,
    `الاسم: ${name.trim() || "—"}`,
    `رقم التواصل: ${contact.trim() || "—"}`,
    email.trim() ? `البريد الإلكتروني: ${email.trim()}` : "",
    notes.trim() ? `ملاحظات: ${notes.trim()}` : "",
  ]
    .filter(Boolean)
    .join("\n");
  const whatsappHref = `${siteConfig.contact.whatsapp.url}?text=${encodeURIComponent(bookingMessage)}`;

  const validateStep = (current: number): Record<string, string> => {
    const next: Record<string, string> = {};
    if (current === 1 && !service) {
      next.service = "يرجى اختيار الخدمة المطلوبة للمتابعة.";
    }
    if (current === 2 && service) {
      const list = getDoctorsForService(service.id);
      if (list.length > 0 && !doctorSlug) {
        next.doctor = "يرجى اختيار طبيب من القائمة أو الرجوع لاختيار خدمة أخرى.";
      }
      if (doctorSlug && !service.doctorIds.includes(doctorSlug)) {
        next.doctor = "الطبيب المختار غير مرتبط بالخدمة المختارة.";
      }
      if (list.length === 0 && !noPreference) {
        next.doctor = "يرجى تأكيد إرسال الطلب دون تفضيل طبيب أو اختيار خدمة أخرى.";
      }
    }
    if (current === 3) {
      if (!date) next.date = "يرجى اختيار التاريخ المطلوب.";
      else if (date < today) next.date = "لا يمكن طلب موعد بتاريخ سابق ليوم اليوم.";
      if (!time) next.time = "يرجى اختيار الوقت المطلوب.";
    }
    if (current === 4) {
      if (name.trim().length < 2) next.name = "يرجى إدخال الاسم الكامل.";
      if (!phonePattern.test(contact.trim()))
        next.contact = "يرجى إدخال رقم تواصل صحيح مثل 05xxxxxxxx.";
      if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim()))
        next.email = "صيغة البريد الإلكتروني غير صحيحة.";
      if (notes.length > 500) notes.slice(0, 500);
    }
    return next;
  };

  const goNext = () => {
    const found = validateStep(step);
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    setStep((s) => Math.min(5, s + 1));
    scrollToForm();
  };

  const goBack = () => {
    setErrors({});
    setStep((s) => Math.max(1, s - 1));
    scrollToForm();
  };

  const scrollToForm = () => {
    if (typeof document !== "undefined") {
      document.getElementById("booking-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div id="booking-form" className="overflow-hidden rounded-[var(--radius-xl)] border border-line bg-white shadow-card">
      {/* مؤشر التقدم */}
      <ol className="grid grid-cols-5 gap-1 border-b border-line bg-cream/70 px-3 py-4 md:px-6" aria-label="خطوات الحجز">
        {STEP_LABELS.map((label, index) => {
          const number = index + 1;
          const active = step === number;
          const done = step > number;
          return (
            <li key={label} className="flex flex-col items-center gap-2 text-center">
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full border text-[13px] font-bold transition-colors ${
                  active
                    ? "border-primary bg-primary text-white"
                    : done
                      ? "border-primary bg-aqua text-primary-dark"
                      : "border-line bg-white text-muted"
                }`}
                aria-hidden
              >
                {done ? "✓" : number}
              </span>
              <span
                className={`hidden text-[12px] leading-5 sm:block ${
                  active ? "font-bold text-ink" : "text-muted"
                }`}
              >
                {label}
              </span>
              <span className={`text-[12px] sm:hidden ${active ? "font-bold text-ink" : "text-muted"}`}>
                {number}
              </span>
            </li>
          );
        })}
      </ol>
      <p className="sr-only" aria-live="polite">
        الخطوة {step} من 5: {STEP_LABELS[step - 1]}
      </p>

      <div className="p-5 md:p-8">
        {/* الخطوة 1 */}
        {step === 1 ? (
          <section aria-labelledby="step-1-title">
            <h2 id="step-1-title" className="text-[22px] font-bold text-ink">
              1. اختر الخدمة
            </h2>
            <p className="mt-2 text-[15px] text-muted">
              جميع الخدمات مدرجة في قائمة العيادة الرسمية. اختيار الخدمة لا يعني توافر موعد فوري.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {services.map((item) => {
                const active = item.slug === serviceSlug;
                return (
                  <button
                    key={item.slug}
                    type="button"
                    aria-pressed={active}
                    onClick={() => {
                      setServiceSlug(item.slug);
                      setDoctorSlug("");
                      setNoPreference(false);
                      setErrors((e) => ({ ...e, service: "", doctor: "" }));
                    }}
                    className={`flex items-center gap-3 rounded-[var(--radius-md)] border p-4 text-right transition-all duration-200 ${
                      active
                        ? "border-primary bg-aqua shadow-[0_8px_20px_rgb(42_168_180/18%)]"
                        : "border-line bg-white hover:border-primary/40 hover:bg-aqua/40"
                    }`}
                  >
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-sm)] ${
                        active ? "bg-white text-primary" : "bg-cream text-primary-dark"
                      }`}
                    >
                      <Icon name={item.icon} className="h-5 w-5" />
                    </span>
                    <span className="flex-1 text-[15.5px] font-semibold leading-7 text-ink">
                      {item.name}
                    </span>
                    <span
                      className={`h-4 w-4 shrink-0 rounded-full border-2 ${
                        active ? "border-primary bg-primary" : "border-line"
                      }`}
                      aria-hidden
                    />
                  </button>
                );
              })}
            </div>
            {errors.service ? (
              <p role="alert" className="mt-3 text-[14.5px] font-semibold text-[#B4462F]">
                {errors.service}
              </p>
            ) : null}
          </section>
        ) : null}

        {/* الخطوة 2 */}
        {step === 2 ? (
          <section aria-labelledby="step-2-title">
            <h2 id="step-2-title" className="text-[22px] font-bold text-ink">
              2. اختر الطبيب
            </h2>
            <p className="mt-2 text-[15px] text-muted">
              تُعرض الأطباء المرتبطين بالخدمة المختارة فقط وفق العلاقات المؤكدة.
            </p>

            {linkedDoctors.length > 0 ? (
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {linkedDoctors.map((item) => {
                  const active = item.slug === doctorSlug;
                  return (
                    <button
                      key={item.slug}
                      type="button"
                      aria-pressed={active}
                      onClick={() => {
                        setDoctorSlug(item.slug);
                        setErrors((e) => ({ ...e, doctor: "" }));
                      }}
                      className={`flex items-center gap-3 rounded-[var(--radius-md)] border p-4 text-right transition-all duration-200 ${
                        active
                          ? "border-primary bg-aqua"
                          : "border-line bg-white hover:border-primary/40 hover:bg-aqua/40"
                      }`}
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/50 bg-cream text-primary-dark">
                        <Icon name="user" className="h-5 w-5" />
                      </span>
                      <span className="flex-1">
                        <span className="block text-[16px] font-bold text-ink">{item.name}</span>
                        <span className="block text-[13.5px] leading-6 text-muted">{item.title}</span>
                      </span>
                      <span
                        className={`h-4 w-4 shrink-0 rounded-full border-2 ${
                          active ? "border-primary bg-primary" : "border-line"
                        }`}
                        aria-hidden
                      />
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="mt-5">
                <Notice tone="warn">
                  بيانات ربط الأطباء بهذه الخدمة قيد التحديث. يمكنك إرسال الطلب دون تفضيل طبيب
                  ليقوم فريق العيادة بتوجيهك للطبيب المناسب.
                </Notice>
                <label className="mt-4 flex cursor-pointer items-start gap-3 rounded-[var(--radius-md)] border border-line bg-cream/60 p-4">
                  <input
                    type="checkbox"
                    checked={noPreference}
                    onChange={(e) => {
                      setNoPreference(e.target.checked);
                      setErrors((x) => ({ ...x, doctor: "" }));
                    }}
                    className="mt-1 h-5 w-5 accent-[#2AA8B4]"
                  />
                  <span className="text-[15px] leading-7 text-ink">
                    أرسل الطلب دون تفضيل طبيب، وأوافق على توجيهي من قِبل العيادة.
                  </span>
                </label>
              </div>
            )}

            {errors.doctor ? (
              <p role="alert" className="mt-3 text-[14.5px] font-semibold text-[#B4462F]">
                {errors.doctor}
              </p>
            ) : null}
          </section>
        ) : null}

        {/* الخطوة 3 */}
        {step === 3 ? (
          <section aria-labelledby="step-3-title">
            <h2 id="step-3-title" className="text-[22px] font-bold text-ink">
              3. التاريخ والوقت المطلوبين
            </h2>
            <p className="mt-2 text-[15px] leading-8 text-muted">
              تُحدَّد الأوقات أدناه كطلب تفضيل منك. لا يوجد نظام مواعيد آلي، ويحتاج الموعد إلى
              تأكيد من العيادة.
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-[15px] font-semibold text-ink">التاريخ المطلوب</span>
                <input
                  type="date"
                  value={date}
                  min={today}
                  onChange={(e) => {
                    setDate(e.target.value);
                    setErrors((x) => ({ ...x, date: "" }));
                  }}
                  aria-invalid={Boolean(errors.date)}
                  aria-describedby={errors.date ? "err-date" : undefined}
                  className="h-13 w-full rounded-[var(--radius-md)] border border-line bg-white px-4 py-3 text-[16px] text-ink outline-none transition focus:border-primary"
                  style={{ height: 52 }}
                />
                {errors.date ? (
                  <span id="err-date" role="alert" className="mt-2 block text-[14.5px] font-semibold text-[#B4462F]">
                    {errors.date}
                  </span>
                ) : null}
              </label>
              <label className="block">
                <span className="mb-2 block text-[15px] font-semibold text-ink">الوقت المطلوب</span>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => {
                    setTime(e.target.value);
                    setErrors((x) => ({ ...x, time: "" }));
                  }}
                  aria-invalid={Boolean(errors.time)}
                  aria-describedby={errors.time ? "err-time" : undefined}
                  className="w-full rounded-[var(--radius-md)] border border-line bg-white px-4 py-3 text-[16px] text-ink outline-none transition focus:border-primary"
                  style={{ height: 52 }}
                />
                {errors.time ? (
                  <span id="err-time" role="alert" className="mt-2 block text-[14.5px] font-semibold text-[#B4462F]">
                    {errors.time}
                  </span>
                ) : null}
              </label>
            </div>
            <div className="mt-4">
              <Notice>
                الدوام المعتمد يومياً من{" "}
                {siteConfig.workingHours.days[0].open
                  ? formatClock(siteConfig.workingHours.days[0].open)
                  : "—"}{" "}
                حتى{" "}
                {siteConfig.workingHours.days[0].close
                  ? formatClock(siteConfig.workingHours.days[0].close)
                  : "—"}{" "}
                — اختر وقتاً ضمن ساعات الدوام إن أمكن، وسياخذ فريق العيادة باقي التنسيق.
              </Notice>
            </div>
          </section>
        ) : null}

        {/* الخطوة 4 */}
        {step === 4 ? (
          <section aria-labelledby="step-4-title">
            <h2 id="step-4-title" className="text-[22px] font-bold text-ink">
              4. بيانات التواصل
            </h2>
            <p className="mt-2 text-[15px] text-muted">
              نجمع الحد الأدنى الضروري فقط. لا تُطلب معلومات صحية حساسة عبر النموذج.
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="block sm:col-span-2">
                <span className="mb-2 block text-[15px] font-semibold text-ink">الاسم الكامل</span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setErrors((x) => ({ ...x, name: "" }));
                  }}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "err-name" : undefined}
                  className="w-full rounded-[var(--radius-md)] border border-line bg-white px-4 py-3 text-[16px] text-ink outline-none transition focus:border-primary"
                  style={{ height: 52 }}
                />
                {errors.name ? (
                  <span id="err-name" role="alert" className="mt-2 block text-[14.5px] font-semibold text-[#B4462F]">
                    {errors.name}
                  </span>
                ) : null}
              </label>

              <label className="block">
                <span className="mb-2 block text-[15px] font-semibold text-ink">رقم التواصل</span>
                <input
                  type="tel"
                  inputMode="tel"
                  dir="ltr"
                  placeholder="05xxxxxxxx"
                  value={contact}
                  onChange={(e) => {
                    setContact(e.target.value);
                    setErrors((x) => ({ ...x, contact: "" }));
                  }}
                  aria-invalid={Boolean(errors.contact)}
                  aria-describedby={errors.contact ? "err-contact" : undefined}
                  className="w-full rounded-[var(--radius-md)] border border-line bg-white px-4 py-3 text-start text-[16px] text-ink outline-none transition focus:border-primary"
                  style={{ height: 52 }}
                />
                {errors.contact ? (
                  <span id="err-contact" role="alert" className="mt-2 block text-[14.5px] font-semibold text-[#B4462F]">
                    {errors.contact}
                  </span>
                ) : null}
              </label>

              <label className="block">
                <span className="mb-2 block text-[15px] font-semibold text-ink">
                  البريد الإلكتروني <span className="font-normal text-muted">(اختياري)</span>
                </span>
                <input
                  type="email"
                  dir="ltr"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors((x) => ({ ...x, email: "" }));
                  }}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "err-email" : undefined}
                  className="w-full rounded-[var(--radius-md)] border border-line bg-white px-4 py-3 text-start text-[16px] text-ink outline-none transition focus:border-primary"
                  style={{ height: 52 }}
                />
                {errors.email ? (
                  <span id="err-email" role="alert" className="mt-2 block text-[14.5px] font-semibold text-[#B4462F]">
                    {errors.email}
                  </span>
                ) : null}
              </label>

              <label className="block sm:col-span-2">
                <span className="mb-2 block text-[15px] font-semibold text-ink">
                  ملاحظات اختيارية <span className="font-normal text-muted">(بدون معلومات صحية)</span>
                </span>
                <textarea
                  rows={3}
                  maxLength={500}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full rounded-[var(--radius-md)] border border-line bg-white px-4 py-3 text-[16px] text-ink outline-none transition focus:border-primary"
                />
                <span className="mt-1 block text-[13px] text-muted">{notes.length}/500 حرف</span>
              </label>
            </div>
          </section>
        ) : null}

        {/* الخطوة 5 */}
        {step === 5 ? (
          <section aria-labelledby="step-5-title">
            <h2 id="step-5-title" className="text-[22px] font-bold text-ink">
              5. مراجعة الطلب وإرساله
            </h2>
            <dl className="mt-5 divide-y divide-line overflow-hidden rounded-[var(--radius-md)] border border-line">
              {[
                { term: "الخدمة", value: service?.name ?? "—", edit: 1 },
                {
                  term: "الطبيب",
                  value: doctor?.name ?? (noPreference ? "بدون تفضيل (توجيه من العيادة)" : "—"),
                  edit: 2,
                },
                { term: "التاريخ المطلوب", value: date, edit: 3 },
                { term: "الوقت المطلوب", value: time, edit: 3 },
                { term: "الاسم", value: name, edit: 4 },
                { term: "رقم التواصل", value: contact, edit: 4 },
                { term: "البريد الإلكتروني", value: email || "—", edit: 4 },
                { term: "ملاحظات", value: notes || "—", edit: 4 },
              ].map((row) => (
                <div key={row.term} className="flex items-center justify-between gap-4 bg-white px-4 py-3.5">
                  <dt className="text-[14.5px] font-semibold text-muted">{row.term}</dt>
                  <dd className="flex items-center gap-3 text-[15.5px] font-medium text-ink">
                    <span className="max-w-[60%] truncate">{row.value}</span>
                    <button
                      type="button"
                      onClick={() => setStep(row.edit)}
                      className="text-[13.5px] font-semibold text-primary-dark underline underline-offset-4"
                    >
                      تعديل
                    </button>
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-5">
              <Notice tone="warn">
                سيفتح الموقع واتساب برسالة جاهزة لمراجعتها. لا يرسل الموقع الطلب ولا يحفظه؛ اضغط
                «إرسال» داخل واتساب لإرساله إلى العيادة. الموعد غير مؤكد حتى تتواصل العيادة معك.
              </Notice>
            </div>
          </section>
        ) : null}

        {/* أزرار التنقل */}
        <div className="mt-8 flex items-center justify-between gap-3 border-t border-line pt-6">
          <button
            type="button"
            onClick={goBack}
            disabled={step === 1}
            className="btn btn-ghost btn-sm disabled:cursor-not-allowed disabled:opacity-40"
          >
            رجوع
          </button>

          {step < 5 ? (
            <button type="button" onClick={goNext} className="btn btn-primary btn-sm">
              التالي
            </button>
          ) : (
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm min-w-[190px]"
            >
              فتح واتساب لإرسال الطلب
            </a>
          )}
        </div>

        <p className="mt-4 text-center text-[13.5px] leading-7 text-muted">
          لديك سؤال؟{" "}
          <Link href="/how-to-book" className="font-semibold text-primary-dark underline underline-offset-4">
            تعرّف على طريقة الحجز
          </Link>{" "}
          أو{" "}
          <Link href="/faq" className="font-semibold text-primary-dark underline underline-offset-4">
            الأسئلة الشائعة
          </Link>
        </p>
      </div>
    </div>
  );
}
