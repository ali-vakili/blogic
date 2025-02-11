import { decrypt } from "@/lib/auth";
import type { NextRequest } from "next/server";

const cookieName = "auth_token";

export async function getAuthSession(request: NextRequest) {
  try {
    const cookieValue = request.cookies.get(cookieName)?.value;
    if (!cookieValue) return null;

    const session = await decrypt(cookieValue);
    return session;
  } catch (error) {
    console.error("Failed to get session in middleware:", error);
    return null;
  }
}
