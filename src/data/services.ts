import type { Service, ServiceGroup, ServiceGroupId } from "./types";

/** مجموعات الخدمات الرسمية للعيادة كما وردت في المصادر الرسمية */
export const serviceGroups: ServiceGroup[] = [
  {
    id: "skin",
    title: "العناية بالجلد والشعر",
    description: "علاج الأمراض الجلدية والتصبغات وحب الشباب والندبات ومشاكل الشعر والنضارة.",
  },
  {
    id: "inject",
    title: "الحقن التجميلي والبوتوكس",
    description: "الفيلر والبوتوكس وحقن النضارة ضمن تقييم طبي مسبق.",
  },
  {
    id: "devices",
    title: "أجهزة شد الجلد وإذابة الدهون",
    description: "الإنفنيتي / فيفاتشي / الثيرا، وإبر إذابة الدهون وأجهزة شد الجلد.",
  },
];

const CONSULTANTS = ["doc-01", "doc-02", "doc-03", "doc-04"];

/**
 * الخدمات الرسمية للعيادة (9 خدمات) — لا تُحذف ولا تُضاف خدمات غير المذكورة.
 * verificationStatus تشير إلى إدراج الخدمة في القائمة الرسمية، ولا تعني توافر مواعيد فورية.
 */
export const services: Service[] = [
  {
    id: "svc-01",
    slug: "skin-diseases",
    name: "علاج أمراض الجلد",
    shortDescription: "تشخيص وعلاج الحالات الجلدية بعد فحص طبي مباشر ووضع خطة متابعة.",
    description:
      "تشمل الخدمة تشخيص وعلاج الحالات الجلدية بعد الفحص الطبي المباشر، مع وضع خطة علاجية تناسب طبيعة الحالة ومتابعة استجابتها. تختلف مدة العلاج والتعليمات من حالة لأخرى ولا تُعمَّم على الجميع، ولا يُحدد أي إجراء قبل التقييم الطبي.",
    groupId: "skin",
    doctorIds: CONSULTANTS,
    icon: "stethoscope",
    featured: true,
    verificationStatus: "verified",
    bookingEnabled: true,
  },
  {
    id: "svc-02",
    slug: "injectables",
    name: "الحقن التجميلي (الفيلر / البوتوكس)",
    shortDescription: "فيلر وبوتوكس تُجرى بعد استشارة وتقييم ملاءمة الحالة.",
    description:
      "الحقن التجميلي يشمل الفيلر والبوتوكس ويُجرى بعد الاستشارة والتأكد من ملاءمة الحالة، مع مناقشة الخيارات والمدة المتوقعة والأثر المحتمل لكل إجراء. لا تُجرى أي جلسة قبل التقييم الطبي المباشر.",
    groupId: "inject",
    doctorIds: CONSULTANTS,
    icon: "syringe",
    featured: true,
    verificationStatus: "verified",
    bookingEnabled: true,
  },
  {
    id: "svc-03",
    slug: "acne-scars",
    name: "معالجة حب الشباب والندبات بأحدث الأجهزة والتقنيات",
    shortDescription: "تقييم حالات حب الشباب والندبات ثم اختيار التقنية المناسبة لها.",
    description:
      "تبدأ الخدمة بتقييم نوع الحبوبة ودرجة الندبات وحالة البشرة، ثم اختيار التقنية المناسبة من الأجهزة المتوفرة. تُشرح عدد الجلسات والتعليمات بعد التقييم، وتختلف الخطة من حالة لأخرى.",
    groupId: "skin",
    doctorIds: CONSULTANTS,
    icon: "bandage",
    featured: true,
    verificationStatus: "verified",
    bookingEnabled: true,
  },
  {
    id: "svc-04",
    slug: "botox",
    name: "حقن البوتوكس لعلاج التجاعيد التعبيرية والابتسامة اللثوية وفرط التعرق",
    shortDescription: "بوتوكس لثلاث حالات محددة تُقيَّم قبل الجلسة وفق الحالة.",
    description:
      "تُستخدم جلسات البوتوكس ضمن الحالات المذكورة رسمياً: التجاعيد التعبيرية، والابتسامة اللثوية، وفرط التعرق. يُحدد مكان الجرعة وكميتها بعد تقييم الحالة، وتُشرح المدة المتوقعة للأثر ومراجعته ضمن خطة المتابعة.",
    groupId: "inject",
    doctorIds: CONSULTANTS,
    icon: "smile",
    featured: true,
    verificationStatus: "verified",
    bookingEnabled: true,
  },
  {
    id: "svc-05",
    slug: "fat-dissolve",
    name: "علاج الدهون المزدوجة بإبر إذابة الدهون وأجهزة شد الجلد",
    shortDescription: "إبر إذابة الدهون مع أجهزة شد الجلد وفق تقييم المنطقة.",
    description:
      "الخدمة مخصصة لمنطقة الدهون المزدوجة، وتجمع بين إبر إذابة الدهون وأجهزة شد الجلد وفق ما يحدده الطبيب بعد تقييم المنطقة وحالة الجلد. تُخطط عدد الجلسات والفاصل بينها لكل حالة على حدة.",
    groupId: "devices",
    doctorIds: CONSULTANTS,
    icon: "droplet",
    featured: true,
    verificationStatus: "verified",
    bookingEnabled: true,
  },
  {
    id: "svc-06",
    slug: "skin-tightening",
    name: "المعالجة بأجهزة شد الجلد (الإنفنيتي / فيفاتشي / الثيرا)",
    shortDescription: "شد ترهل الوجه والرقبة ورفع الحواجب بأجهزة شد الجلد المعتمدة.",
    description:
      "تشمل الخدمة استخدام أجهزة شد الجلد (الإنفنيتي / فيفاتشي / الثيرا) لشد ترهل الوجه والرقبة ورفع الحواجب. يُحدد الجهاز المناسب وعدد الجلسات بعد تقييم درجة الترهل وحالة البشرة، وتُشرح التوقعات الواقعية قبل بدء الجلسات.",
    groupId: "devices",
    doctorIds: CONSULTANTS,
    icon: "layers",
    featured: true,
    verificationStatus: "verified",
    bookingEnabled: true,
  },
  {
    id: "svc-07",
    slug: "pigmentation",
    name: "معالجة الكلف والنمش وجميع أنواع تصبغات البشرة بالليزر والتقشير البارد والكيميائي",
    shortDescription: "تقييم نوع التصبغ أولاً ثم اختيار الليزر أو التقشير المناسب.",
    description:
      "تُعالج حالات الكلف والنمش وتصبغات البشرة بالليزر أو التقشير البارد أو الكيميائي، بعد تقييم نوع التصبغ وعمقه وحالة البشرة. يُختار البروتوكول المناسب لكل حالة مع وضع قواعد الحماية من الشمس وما بعد الجلسة.",
    groupId: "skin",
    doctorIds: CONSULTANTS,
    icon: "zap",
    featured: true,
    verificationStatus: "verified",
    bookingEnabled: true,
  },
  {
    id: "svc-08",
    slug: "hair",
    name: "علاج مشاكل / أمراض الشعر",
    shortDescription: "تقييم مشكلات الشعر وأسبابها المحتملة ثم خطة علاجية متابعة.",
    description:
      "تشمل الخدمة تقييم مشكلات الشعر وأمراضه وأسبابها المحتملة ووضع خطة علاجية تناسب الحالة، مع متابعة الاستجابة عبر المواعيد المحددة. تختلف المدة والنتيجة من حالة لأخرى.",
    groupId: "skin",
    doctorIds: CONSULTANTS,
    icon: "wind",
    featured: true,
    verificationStatus: "verified",
    bookingEnabled: true,
  },
  {
    id: "svc-09",
    slug: "skin-radiance",
    name: "حقن نضارة البشرة",
    shortDescription: "جلسات نضارة تُخطط وفق تقييم البشرة والحالة الفردية.",
    description:
      "جلسات حقن نضارة البشرة تُجرى بعد تقييم حالة البشرة وتحديد ما يناسبها، مع شرح عدد الجلسات والتعليمات المطلوبة بعدها. تختلف الاستجابة والمدة من شخص لآخر ولا تُعد نتيجة مضمونة.",
    groupId: "inject",
    doctorIds: CONSULTANTS,
    icon: "sparkles",
    featured: true,
    verificationStatus: "verified",
    bookingEnabled: true,
  },
];

/** الخدمات المعروضة في الصفحة الرئيسية (كل الخدمات الرسمية) */
export const featuredServices = services.filter((s) => s.featured);

export const getServiceBySlug = (slug: string) =>
  services.find((s) => s.slug === slug) ?? null;

export const getServicesByIds = (ids: string[]) =>
  ids.map((id) => services.find((s) => s.id === id)).filter(Boolean) as Service[];

export const getGroupById = (id: ServiceGroupId) =>
  serviceGroups.find((g) => g.id === id) ?? null;

export const getServiceGroups = () =>
  serviceGroups.map((group) => ({
    ...group,
    items: services.filter((service) => service.groupId === group.id),
  }));

export const getRelatedServices = (service: Service, limit = 4) => {
  const sameGroup = services.filter(
    (s) => s.groupId === service.groupId && s.slug !== service.slug,
  );
  const others = services.filter(
    (s) => s.groupId !== service.groupId && s.slug !== service.slug,
  );
  return [...sameGroup, ...others].slice(0, limit);
};
