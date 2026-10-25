import { describe, expect, it } from "vitest";
import fs from "node:fs";
import {
  services,
  featuredServices,
  serviceGroups,
  getServiceBySlug,
  getServiceGroups,
  getServicesByIds,
  getRelatedServices,
} from "../data/services";
import { doctors, getDoctorsForService, getDoctorBySlug } from "../data/doctors";
import { siteConfig } from "../data/siteConfig";
import { faqs } from "../data/faq";
import {
  isValidDateString,
  isValidPhone,
  isValidTime,
  makeReference,
  todayInRiyadh,
} from "../lib/validation";

/** الخدمات الرسمية كما وردت في موجّه العيادة — لا تُحذف ولا تُضاف */
const OFFICIAL_SERVICES = [
  "علاج أمراض الجلد",
  "الحقن التجميلي (الفيلر / البوتوكس)",
  "معالجة حب الشباب والندبات بأحدث الأجهزة والتقنيات",
  "حقن البوتوكس",
  "علاج الدهون المزدوجة",
  "المعالجة بأجهزة شد الجلد",
  "معالجة الكلف والنمش",
  "علاج مشاكل / أمراض الشعر",
  "حقن نضارة البشرة",
];

describe("الخدمات الرسمية", () => {
  it("تحتوي على 9 خدمات رسمية فقط", () => {
    expect(services).toHaveLength(9);
  });

  it("لا ينقص أي اسم من القائمة الرسمية", () => {
    for (const name of OFFICIAL_SERVICES) {
      expect(services.some((s) => s.name.includes(name))).toBe(true);
    }
  });

  it("لا تُضاف خدمات غير مذكورة (كل خدمة من ا)", () => {
    for (const service of services) {
      expect(
        OFFICIAL_SERVICES.some(
          (name) => service.name.includes(name) || name.includes(service.name.split(" (")[0]),
        ),
      ).toBe(true);
    }
  });

  it("معرّفات و slugs فريدة", () => {
    const ids = services.map((s) => s.id);
    const slugs = services.map((s) => s.slug);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("عرض كل الخدمات في الرئيسية (9 خدمات مختارة)", () => {
    expect(featuredServices).toHaveLength(9);
    for (const service of featuredServices) {
      expect(getServiceBySlug(service.slug)).not.toBeNull();
    }
  });

  it("كل خدمة تحتوي الحقول المطلوبة", () => {
    for (const service of services) {
      expect(service.id).toBeTruthy();
      expect(service.slug).toBeTruthy();
      expect(service.name).toBeTruthy();
      expect(service.shortDescription.length).toBeGreaterThan(10);
      expect(service.description.length).toBeGreaterThan(40);
      expect(["skin", "inject", "devices"]).toContain(service.groupId);
      expect(Array.isArray(service.doctorIds)).toBe(true);
      expect(service.icon).toBeTruthy();
      expect(["verified", "pending", "unavailable"]).toContain(service.verificationStatus);
      expect(typeof service.featured).toBe("boolean");
      expect(typeof service.bookingEnabled).toBe("boolean");
    }
  });

  it("روابط تفاصيل الخدمات تعمل عبر slug فريد", () => {
    for (const service of services) {
      expect(getServiceBySlug(service.slug)?.id).toBe(service.id);
    }
    expect(getServiceBySlug("does-not-exist")).toBeNull();
  });
});

describe("مجموعات الخدمات (بدلاً من الأقسام)", () => {
  it("ثلاث مجموعات فقط", () => {
    expect(serviceGroups).toHaveLength(3);
    expect(serviceGroups.map((g) => g.id).sort()).toEqual(["devices", "inject", "skin"]);
  });

  it("التجميع يغطي كل الخدمات دون تكرار", () => {
    const grouped = getServiceGroups().flatMap((g) => g.items);
    expect(grouped).toHaveLength(9);
    expect(new Set(grouped.map((s) => s.slug)).size).toBe(9);
  });

  it("لا توجد صفحة أقسام بعد إزالتها من الموقع", () => {
    expect(fs.existsSync("src/app/departments")).toBe(false);
  });

  it("الخدمات ذات الصلة لا تتضمن الخدمة نفسها", () => {
    const target = services[0];
    const related = getRelatedServices(target, 4);
    expect(related.every((s) => s.slug !== target.slug)).toBe(true);
    expect(related.length).toBeLessThanOrEqual(4);
  });
});

describe("الأطباء", () => {
  it("ستة أطباء بأسمائهم كما وردت", () => {
    expect(doctors).toHaveLength(6);
    const names = doctors.map((d) => d.name);
    expect(names).toContain("د. ظافر آل حافظ");
    expect(names).toContain("د. فوزية الفيفي");
    expect(names).toContain("د. ابتسام القحطاني");
    expect(names).toContain("د. أحمد القرني");
    expect(names).toContain("د. نسيم منصور");
    expect(names).toContain("د. يوسف المهيرات");
  });

  it("معرّفات و slugs فريدة", () => {
    const ids = doctors.map((d) => d.id);
    const slugs = doctors.map((d) => d.slug);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("لا صور مُختلقة — Placeholder عند غياب الصورة الرسمية", () => {
    for (const doctor of doctors) expect(doctor.image).toBeNull();
  });

  it("الأخصائيان بمسمى قيد التأكيد", () => {
    expect(doctors.filter((d) => d.titleVerification === "pending")).toHaveLength(2);
  });

  it("لا توجد علاقات طبيب/خدمة غير متبادلة الطرفين", () => {
    for (const doctor of doctors) {
      for (const serviceId of doctor.serviceIds) {
        const service = services.find((s) => s.id === serviceId);
        expect(service).toBeDefined();
        expect(service?.doctorIds).toContain(doctor.id);
      }
    }
    for (const service of services) {
      for (const doctorId of service.doctorIds) {
        const doctor = doctors.find((d) => d.id === doctorId);
        expect(doctor).toBeDefined();
        expect(doctor?.serviceIds).toContain(service.id);
      }
    }
  });

  it("الأخصائيين بلا خدمات مؤكدة (لا افتراض علاقات)", () => {
    for (const specialist of doctors.filter((d) => d.group === "specialist")) {
      expect(specialist.serviceIds).toHaveLength(0);
    }
  });

  it("لا يُعرض جميع الأطباء تحت جميع الخدمات", () => {
    const withDoctors = services.filter((s) => s.doctorIds.length > 0);
    expect(withDoctors.length).toBeGreaterThan(0);
    for (const service of withDoctors) {
      expect(getDoctorsForService(service.id).length).toBeLessThan(doctors.length);
    }
  });

  it("صفحة الطبيب تُرجع الخدمات الصحيحة فقط", () => {
    const doctor = getDoctorBySlug("dr-zaher-alhafith");
    expect(doctor).not.toBeNull();
    const linked = getServicesByIds(doctor!.serviceIds);
    expect(linked).toHaveLength(9);
    expect(linked.every((s) => s.doctorIds.includes(doctor!.id))).toBe(true);
  });
});

describe("ساعات العمل", () => {
  it("جدول معتمد بمنطقة زمنية مركزية", () => {
    expect(siteConfig.workingHours.verified).toBe(true);
    expect(siteConfig.timezone).toBe("Asia/Riyadh");
    expect(siteConfig.workingHours.days).toHaveLength(7);
  });

  it("من الواحدة حتى التاسعة مساءً يومياً", () => {
    for (const day of siteConfig.workingHours.days) {
      expect(day.open).toBe("13:00");
      expect(day.close).toBe("21:00");
    }
  });
});

describe("أرقام التواصل الرسمية والعنوان", () => {
  it("ثلاثة أرقام مع الأسماء المعتمدة", () => {
    expect(siteConfig.contact.phones).toHaveLength(3);
    expect(siteConfig.contact.phones.map((p) => p.label)).toEqual([
      "عيادة د. ظافر آل حافظ",
      "عيادات أطباء المركز",
      "الليزر والعناية بالبشرة",
    ]);
    expect(siteConfig.contact.phones.map((p) => p.value)).toEqual([
      "0561418899",
      "0502059900",
      "0561518899",
    ]);
  });

  it("روابط الاتصال والواتساب مبنية على الأرقام نفسها برمز الدولة +966", () => {
    for (const phone of siteConfig.contact.phones) {
      expect(phone.raw).toBe(`+966${phone.value.slice(1)}`);
      expect(phone.whatsappUrl).toBe(`https://wa.me/966${phone.value.slice(1)}`);
      expect(phone.whatsappUrl).toMatch(/^https:\/\/wa\.me\/966\d{9}$/);
    }
    expect(siteConfig.contact.whatsapp.url).toBe("https://wa.me/966561418899");
  });

  it("لا بريد إلكتروني مُخترع", () => {
    expect(siteConfig.contact.email).toBeNull();
  });

  it("العنوان الرسمي كما هو دون إحداثيات محفوظة", () => {
    expect(siteConfig.address.full).toBe(
      "طريق الملك فيصل، أبها، حي النهضة، شارع المطاعم",
    );
    expect(siteConfig.address.coordinates).toBeNull();
    expect(siteConfig.address.mapsUrl).toContain("google.com/maps/search");
  });
});

describe("التحقق من إدخالات الحجز", () => {
  it("يرفض التواريخ غير الصالحة ويقبل تاريخاً صحيحاً", () => {
    const today = todayInRiyadh();
    expect(isValidDateString(today)).toBe(true);
    expect(isValidDateString("2026-13-45")).toBe(false);
    expect(isValidDateString("not-a-date")).toBe(false);
  });

  it("يتحقق من صيغ الوقت", () => {
    expect(isValidTime("13:00")).toBe(true);
    expect(isValidTime("21:30")).toBe(true);
    expect(isValidTime("25:00")).toBe(false);
    expect(isValidTime("9")).toBe(false);
  });

  it("يتحقق من أرقام التواصل السعودية", () => {
    expect(isValidPhone("0561418899")).toBe(true);
    expect(isValidPhone("+966561418899")).toBe(true);
    expect(isValidPhone("05614")).toBe(false);
    expect(isValidPhone("abc")).toBe(false);
  });

  it("يولّد رقم مرجعي فريداً", () => {
    const refs = new Set(Array.from({ length: 50 }, () => makeReference()));
    expect(refs.size).toBe(50);
    expect([...refs][0]).toMatch(/^DC-\d{8}-[A-Z0-9]{4}$/);
  });
});

describe("محتوى إضافي", () => {
  it("توجد أسئلة شائعة لقسم الحجز والقسم العام", () => {
    expect(faqs.some((f) => f.scope === "booking")).toBe(true);
    expect(faqs.some((f) => f.scope === "general")).toBe(true);
  });

  it("رابط إنستغرام الرسمي", () => {
    expect(siteConfig.contact.instagram.url).toContain("instagram.com/dermacuresa");
  });
});
