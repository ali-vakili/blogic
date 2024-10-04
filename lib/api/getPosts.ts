import { PostType } from "@/types";
import { cache } from "react";

const fetchPosts: () => Promise<PostType[]> = cache(async () => {
  const baseURL =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_NEXT_PRODUCTION_URL
      : process.env.NEXT_PUBLIC_NEXT_DEV_URL;
  const res = await fetch(`${baseURL}/api/posts`);
  return res.json();
});

const fetchPost: (id: string, isMetaData?: boolean) => Promise<PostType> =
  cache(async (id: string, isMetaData: boolean = false) => {
    const baseURL =
      process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_NEXT_PRODUCTION_URL
        : process.env.NEXT_PUBLIC_NEXT_DEV_URL;
    const res = await fetch(
      `${baseURL}/api/posts?id=${id}&metadata=${isMetaData}`
    );
    return res.json();
  });

export { fetchPosts, fetchPost };
