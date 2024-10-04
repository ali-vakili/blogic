import Posts from "@/components/Posts";
import { Metadata } from "next";
import { openGraphImages, twitterImages } from "../shared-metadata";

export const metadata: Metadata = {
  title: "بلاگ ها",
  alternates: {
    canonical: "/posts",
    languages: {
      "fa-IR": "/posts/fa-IR",
    },
  },
  openGraph: {
    ...openGraphImages,
    title: "بلاگ ها",
    url: `${
      process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_NEXT_PRODUCTION_URL
        : process.env.NEXT_PUBLIC_NEXT_DEV_URL
    }/posts`,
  },
  twitter: {
    ...twitterImages,
    title: "بلاگ ها",
  },
};

export default function PostsPage() {
  return <Posts />;
}
