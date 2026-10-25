export type VerificationStatus = "verified" | "pending" | "unavailable";

/** مجموعات الخدمات المعتمدة (لا توجد أقسام منفصلة) */
export type ServiceGroupId = "skin" | "inject" | "devices";

export type IconKey =
  | "scissors"
  | "wrench"
  | "flower"
  | "gem"
  | "baby"
  | "activity"
  | "waves"
  | "stethoscope"
  | "droplet"
  | "bandage"
  | "zap"
  | "syringe"
  | "wind"
  | "smile"
  | "ear"
  | "layers"
  | "eye"
  | "bone"
  | "target"
  | "sparkles"
  | "heart"
  | "clock"
  | "pin"
  | "phone"
  | "message"
  | "calendar"
  | "user"
  | "book"
  | "help"
  | "image";

export interface Service {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  groupId: ServiceGroupId;
  /** فقط العلاقات المؤكدة. العلاقات غير المؤكدة تبقى فارغة ولا تُخترع. */
  doctorIds: string[];
  icon: IconKey;
  featured: boolean;
  verificationStatus: VerificationStatus;
  bookingEnabled: boolean;
  /** ملاحظة تظهر عند غياب ربط مؤكد للأطباء */
  doctorsNote?: string;
}

export interface Doctor {
  id: string;
  slug: string;
  name: string;
  /** المسمى الرسمي المؤكد فقط */
  title: string;
  /** التخصص المذكور في المصادر الرسمية */
  specialties: string[];
  titleVerification: VerificationStatus;
  /** فقط الخدمات المؤكدة بتخصص الطبيب الموثق */
  serviceIds: string[];
  image: string | null;
  verificationStatus: VerificationStatus;
  group: "consultant" | "specialist";
}

export interface ServiceGroup {
  id: ServiceGroupId;
  title: string;
  description: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  scope: "general" | "booking" | string;
  serviceSlug?: string;
}
