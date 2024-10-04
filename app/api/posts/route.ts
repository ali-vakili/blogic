import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import posts from "@/json/posts.json";

export const revalidate = 0;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const isMetadataRequest = searchParams.get("metadata") === "true";

    if (!isMetadataRequest) {
      const isUserAuthenticated = await isAuthenticated();
      if (!isUserAuthenticated) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

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
    console.error("Error in /api/posts:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
