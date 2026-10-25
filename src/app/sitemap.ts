import type { MetadataRoute } from "next";
import { services } from "@/data/services";
import { doctors } from "@/data/doctors";
import { siteConfig } from "@/data/siteConfig";

export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.endsWith("/")
    ? siteConfig.url.slice(0, -1)
    : siteConfig.url;
  const now = new Date();

  const staticRoutes = [
    "/",
    "/services/",
    "/about/",
    "/doctors/",
    "/book/",
    "/how-to-book/",
    "/working-hours/",
    "/faq/",
    "/contact/",
    "/location/",
    "/privacy/",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "/" ? 1 : 0.7,
  }));

  const dynamicRoutes = [
    ...services.map((service) => `/services/${service.slug}/`),
    ...doctors.map((doctor) => `/doctors/${doctor.slug}/`),
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...dynamicRoutes];
}
