import posts from "@/json/posts.json";

import { MetadataRoute } from "next";

export const revalidate = 0;

const HOST =
  process.env.NEXT_PUBLIC_NEXT_PRODUCTION_URL ??
  "https://blogic-next.vercel.app";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const postPath = posts.map((post) => {
    return {
      url: `${HOST}/products/ps-${post.id}/${post.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    } as const;
  });
  return [
    {
      url: HOST,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${HOST}/posts`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${HOST}/sign-in`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...postPath,
  ];
}
