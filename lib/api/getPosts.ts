import { PostType } from "@/types";
import { cache } from "react";

const baseURL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_NEXT_PRODUCTION_URL
    : process.env.NEXT_PUBLIC_NEXT_DEV_URL;

const fetchPublicPosts: () => Promise<PostType[]> = cache(async () => {
  const res = await fetch(`${baseURL}/api/posts/public`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
});

const fetchPosts: (isPublic?: boolean) => Promise<PostType[]> = cache(
  async (isPublic = false) => {
    const headers: HeadersInit = isPublic ? { "x-public-request": "true" } : {};

    const res = await fetch(`${baseURL}/api/posts`, {
      headers,
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch posts");
    }

    return res.json() as Promise<PostType[]>;
  }
);

const fetchSinglePost: (id: string, isPublic?: boolean) => Promise<PostType> =
  cache(async (id, isPublic = false) => {
    const headers: HeadersInit = isPublic ? { "x-public-request": "true" } : {};

    const res = await fetch(`${baseURL}/api/posts?id=${id}`, {
      headers,
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch post");
    }

    return res.json() as Promise<PostType>;
  });

export { fetchPosts, fetchPublicPosts, fetchSinglePost };
