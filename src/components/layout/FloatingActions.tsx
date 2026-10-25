import { siteConfig } from "@/data/siteConfig";
import { WhatsAppGlyph } from "@/components/ui/SocialIcons";
import { Icon } from "@/components/ui/Icon";

/** أزرار التواصل العائمة — تُخفى تلقائياً عند غياب البيانات الرسمية */
export function FloatingActions() {
  const whatsapp = siteConfig.contact.whatsapp;
  const primaryPhone = siteConfig.contact.phones[0];

  return (
    <div className="fixed bottom-5 left-4 z-40 flex flex-col gap-3">
      {primaryPhone ? (
        <a
          href={`tel:${primaryPhone.raw}`}
          className="group flex h-13 w-13 items-center justify-center rounded-full bg-primary-dark text-white shadow-[0_10px_26px_rgb(23_59_74/30%)] transition hover:bg-ink"
          style={{ height: 52, width: 52 }}
          aria-label={`اتصل بنا على ${primaryPhone.value}`}
        >
          <Icon name="phone" className="h-6 w-6" />
        </a>
      ) : null}
      {whatsapp.available ? (
        <a
          href={whatsapp.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center rounded-full bg-[#128C5E] text-white shadow-[0_10px_26px_rgb(18_140_94/32%)] transition hover:bg-[#0e7a52]"
          style={{ height: 52, width: 52 }}
          aria-label="تواصل عبر واتساب"
        >
          <WhatsAppGlyph className="h-6 w-6" />
        </a>
      ) : null}
    </div>
  );
}
