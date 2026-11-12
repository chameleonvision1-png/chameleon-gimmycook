import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/", "/order/"],
      },
    ],
    sitemap: "https://gimmycook.chameleon.vision/sitemap.xml",
  };
}
