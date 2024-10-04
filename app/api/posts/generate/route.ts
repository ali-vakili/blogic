import { NextResponse } from "next/server";
import posts from "@/json/posts.json";

export const revalidate = 0;

export async function GET() {
  const publishedPosts = posts.filter((p) => p.status === "publish");
  return NextResponse.json(publishedPosts);
}
