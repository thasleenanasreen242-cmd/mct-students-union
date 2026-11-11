import type { MetadataRoute } from "next";

const siteUrl = "https://mct-students-union.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const publicRoutes = [
    "",
    "/faq",
    "/student-support",
    "/library",
    "/suggestions",
    "/transparency",
    "/initiatives",
  ];

  return publicRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/student-support" || route === "/library" ? 0.8 : 0.6,
  }));
}
