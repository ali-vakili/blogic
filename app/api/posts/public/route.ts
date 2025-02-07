import { NextResponse } from "next/server";
import posts from "@/json/posts.json";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
      const post = posts.find(
        (p) => p.id.toString() === id && p.status === "publish"
      );
      if (!post) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
      }
      return NextResponse.json(post);
    }

    return NextResponse.json(posts.filter((p) => p.status === "publish"));
  } catch (error) {
    console.error("Error in /api/posts/public:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
