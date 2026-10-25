import type { Doctor } from "./types";

/**
 * الأطباء الستة كما وردوا في موجّه المشروع بالأسماء نفسها.
 * الصور الرسمية غير متوفرة حالياً → image: null ويُستخدم Placeholder أنيق.
 * المسمى النهائي للأخصائيين يحتاج تأكيداً رسمياً (titleVerification: pending).
 *
 * ربط الخدمات: الاستشاريون الأربعة بتخصص «طب الجلدية والتجميل والعلاج بالليزر»
 * مرتبطون بالخدمات الجلدية والتجميلية الرسمية للعيادة. الأخصائيان بلا ربط مؤكد بعد.
 */
const CONSULTANT_SERVICES = [
  "svc-01",
  "svc-02",
  "svc-03",
  "svc-04",
  "svc-05",
  "svc-06",
  "svc-07",
  "svc-08",
  "svc-09",
];

export const doctors: Doctor[] = [
  {
    id: "doc-01",
    slug: "dr-zaher-alhafith",
    name: "د. ظافر آل حافظ",
    title: "استشاري طب الجلدية والتجميل والمعالجة بالليزر",
    specialties: ["طب الجلدية", "التجميل", "المعالجة بالليزر"],
    titleVerification: "verified",
    serviceIds: CONSULTANT_SERVICES,
    image: null,
    verificationStatus: "verified",
    group: "consultant",
  },
  {
    id: "doc-02",
    slug: "dr-fawzia-alfifi",
    name: "د. فوزية الفيفي",
    title: "استشارية طب الجلدية والتجميل والعلاج بالليزر",
    specialties: ["طب الجلدية", "التجميل", "العلاج بالليزر"],
    titleVerification: "verified",
    serviceIds: CONSULTANT_SERVICES,
    image: null,
    verificationStatus: "verified",
    group: "consultant",
  },
  {
    id: "doc-03",
    slug: "dr-ebtesam-alkahtani",
    name: "د. ابتسام القحطاني",
    title: "استشارية طب الجلدية والتجميل والعلاج بالليزر",
    specialties: ["طب الجلدية", "التجميل", "العلاج بالليزر"],
    titleVerification: "verified",
    serviceIds: CONSULTANT_SERVICES,
    image: null,
    verificationStatus: "verified",
    group: "consultant",
  },
  {
    id: "doc-04",
    slug: "dr-ahmed-alqarni",
    name: "د. أحمد القرني",
    title: "استشاري طب الجلدية والتجميل والعلاج بالليزر",
    specialties: ["طب الجلدية", "التجميل", "العلاج بالليزر"],
    titleVerification: "verified",
    serviceIds: CONSULTANT_SERVICES,
    image: null,
    verificationStatus: "verified",
    group: "consultant",
  },
  {
    id: "doc-05",
    slug: "dr-nasim-mansour",
    name: "د. نسيم منصور",
    title: "أخصائي — المسمى قيد التأكيد الرسمي",
    specialties: ["أخصائي"],
    titleVerification: "pending",
    serviceIds: [],
    image: null,
    verificationStatus: "pending",
    group: "specialist",
  },
  {
    id: "doc-06",
    slug: "dr-yousef-almaheirat",
    name: "د. يوسف المهيرات",
    title: "أخصائي — المسمى قيد التأكيد الرسمي",
    specialties: ["أخصائي"],
    titleVerification: "pending",
    serviceIds: [],
    image: null,
    verificationStatus: "pending",
    group: "specialist",
  },
];

export const getDoctorBySlug = (slug: string) =>
  doctors.find((d) => d.slug === slug) ?? null;

export const getDoctorsByIds = (ids: string[]) =>
  ids.map((id) => doctors.find((d) => d.id === id)).filter(Boolean) as Doctor[];

/** الأطباء الذين يقدمون خدمة محددة فعلياً (علاقات مؤكدة فقط) */
export const getDoctorsForService = (serviceId: string) =>
  doctors.filter((d) => d.serviceIds.includes(serviceId));
