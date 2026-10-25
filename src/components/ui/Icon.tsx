import type { ComponentType } from "react";
import {
  Activity,
  Baby,
  Bandage,
  BookOpen,
  CalendarDays,
  Clock,
  Droplet,
  Ear,
  Eye,
  FileText,
  Flower2,
  Gem,
  HelpCircle,
  ImageOff,
  Layers,
  MapPin,
  MessageCircle,
  Phone,
  Scissors,
  Smile,
  Sparkles,
  Stethoscope,
  Syringe,
  Target,
  User,
  Waves,
  Wind,
  Wrench,
  Bone,
  Heart,
  Zap,
} from "lucide-react";
import type { IconKey } from "@/data/types";

const icons: Record<IconKey, ComponentType<{ className?: string; strokeWidth?: number }>> = {
  scissors: Scissors,
  wrench: Wrench,
  flower: Flower2,
  gem: Gem,
  baby: Baby,
  activity: Activity,
  waves: Waves,
  stethoscope: Stethoscope,
  droplet: Droplet,
  bandage: Bandage,
  zap: Zap,
  syringe: Syringe,
  wind: Wind,
  smile: Smile,
  ear: Ear,
  layers: Layers,
  eye: Eye,
  bone: Bone,
  target: Target,
  sparkles: Sparkles,
  heart: Heart,
  clock: Clock,
  pin: MapPin,
  phone: Phone,
  message: MessageCircle,
  calendar: CalendarDays,
  user: User,
  book: BookOpen,
  help: HelpCircle,
  image: ImageOff,
};

export function Icon({
  name,
  className = "h-6 w-6",
  strokeWidth = 1.6,
}: {
  name: IconKey;
  className?: string;
  strokeWidth?: number;
}) {
  const Cmp = icons[name] ?? Sparkles;
  return <Cmp className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
}

export { FileText };
