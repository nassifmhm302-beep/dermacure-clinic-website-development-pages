import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/siteConfig";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteConfig.url.endsWith("/") ? siteConfig.url.slice(0, -1) : siteConfig.url}/sitemap.xml`,
  };
}
