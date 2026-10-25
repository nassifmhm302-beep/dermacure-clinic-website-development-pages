export interface DayHours {
  /** 0 = الأحد ... 6 = السبت (مطابق لـ Intl weekday short) */
  day: number;
  dayName: string;
  open: string | null;
  close: string | null;
}

export interface PhoneLine {
  label: string;
  value: string;
  raw: string;
  /** رابط واتساب مبني على الرقم نفسه مع رمز الدولة السعودي الموثق (+966) */
  whatsappUrl: string | null;
}

/** تحويل رقم سعودي 05xxxxxxxx إلى صيغة wa.me دولية دون تخمين رمز الدولة */
const saudiWa = (value: string) =>
  value.startsWith("05") && value.length === 10
    ? `https://wa.me/966${value.slice(1)}`
    : null;

const rawPhone = (value: string) => `+966${value.slice(1)}`;

const phoneLines: PhoneLine[] = [
  { label: "عيادة د. ظافر آل حافظ", value: "0561418899" },
  { label: "عيادات أطباء المركز", value: "0502059900" },
  { label: "الليزر والعناية بالبشرة", value: "0561518899" },
].map((phone) => ({
  ...phone,
  raw: rawPhone(phone.value),
  whatsappUrl: saudiWa(phone.value),
}));

export const siteConfig = {
  nameAr: "ديرماكيور",
  nameEn: "DermaCure",
  name: "DermaCure — ديرماكيور",
  tagline: "عيادات متخصصة في الأمراض الجلدية والتجميل",
  description:
    "DermaCure ديرماكيور — خدمات جلدية وتجميلية متخصصة، باهتمام يضع احتياجاتك في المقدمة.",
  url: "https://nassifmhm302-beep.github.io/dermacure-clinic-website-development-pages/",
  logo: "/images/brand/logo.svg",
  timezone: "Asia/Riyadh",
  locale: "ar-SA",

  colors: {
    primary: "#2AA8B4",
    background: "#F7F5EF",
    text: "#173B4A",
    gold: "#C6B77A",
    aqua: "#E8F6F5",
    surface: "#FFFFFF",
    primaryHover: "#218B96",
    primaryDark: "#176F79",
    textSecondary: "#526A72",
    border: "#DCE8E6",
    focus: "#173B4A",
  },

  contact: {
    phones: phoneLines,

    /** الرقم الرئيسي للاستخدامات المختصرة (أزرار واتساب عامة) */
    primaryPhone: phoneLines[0],

    /** واتساب مشتق من الرقم الرسمي الأول (لا روابط مخترعة) */
    whatsapp: {
      label: `واتساب ${phoneLines[0].label}`,
      display: phoneLines[0].value,
      url: phoneLines[0].whatsappUrl ?? "",
      available: Boolean(phoneLines[0].whatsappUrl),
    },
    instagram: {
      handle: "dermacuresa",
      url: "https://www.instagram.com/dermacuresa/",
      available: true,
    },
    email: null as string | null,
  },

  address: {
    available: true,
    lines: ["طريق الملك فيصل، أبها", "حي النهضة، شارع المطاعم"],
    full: "طريق الملك فيصل، أبها، حي النهضة، شارع المطاعم",
    /** رابط بحث على الخرائط بدون إحداثيات مفترضة */
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent("طريق الملك فيصل أبها حي النهضة شارع المطاعم"),
    coordinates: null as { lat: number; lng: number } | null,
  },

  workingHours: {
    verified: true,
    source: "بتعليمات إدارة العيادة",
    note: "الدوام من الواحدة ظهراً حتى التاسعة مساءً، طوال أيام الأسبوع.",
    days: [
      { day: 0, dayName: "الأحد", open: "13:00", close: "21:00" },
      { day: 1, dayName: "الاثنين", open: "13:00", close: "21:00" },
      { day: 2, dayName: "الثلاثاء", open: "13:00", close: "21:00" },
      { day: 3, dayName: "الأربعاء", open: "13:00", close: "21:00" },
      { day: 4, dayName: "الخميس", open: "13:00", close: "21:00" },
      { day: 5, dayName: "الجمعة", open: "13:00", close: "21:00" },
      { day: 6, dayName: "السبت", open: "13:00", close: "21:00" },
    ] as DayHours[],
  },

  integrations: {
    booking: {
      enabled: true,
      mode: "request" as const,
      provider: "whatsapp",
      description:
        "يُجهّز الموقع رسالة واتساب مسبقة التعبئة؛ على الزائر مراجعتها وإرسالها يدوياً. لا يحفظ الموقع الطلب ولا يؤكد الموعد.",
    },
    contact: {
      enabled: true,
      mode: "whatsapp" as const,
      provider: "whatsapp",
      description:
        "يُجهّز الموقع رسالة واتساب ولا يرسلها أو يحفظها؛ يتطلب الإرسال موافقة الزائر داخل واتساب.",
    },
  },

  social: {
    instagram: "https://www.instagram.com/dermacuresa/",
  },

  brand: {
    hashtag: "#جمالك_باحترافي",
  },
} as const;

export const navLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/about", label: "من نحن" },
  { href: "/services", label: "الخدمات", hasMenu: true },
  { href: "/doctors", label: "الأطباء" },
  { href: "/working-hours", label: "ساعات العمل" },
  { href: "/location", label: "الموقع" },
  { href: "/contact", label: "تواصل معنا" },
] as const;
