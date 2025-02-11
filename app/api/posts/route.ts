import { NextResponse } from "next/server";
import posts from "@/json/posts.json";
import getServerSession from "@/lib/getServerSession";

export const revalidate = 0;

export async function GET(request: Request) {
  const session = await getServerSession();
  const isUserAuthenticated = !!session?.userId;

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const isPublicRequest = request.headers.get("x-public-request") === "true";

    if (!isPublicRequest) {
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
