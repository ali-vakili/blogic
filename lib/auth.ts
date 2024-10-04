"server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SignJWT, jwtVerify } from "jose";

const key = new TextEncoder().encode(process.env.SECRET);

const cookie = {
  name: "auth_token",
  options: {
    httpOnly: true,
    secure: true,
    sameSite: "lax" as const,
  },
  duration: 24 * 60 * 60 * 1000,
};

export const encrypt = async (payload: { userId: string; expires: Date }) => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1day")
    .sign(key);
};

export const decrypt = async (token: string | undefined) => {
  try {
    if (token) {
      const { payload } = await jwtVerify(token, key, {
        algorithms: ["HS256"],
      });
      return payload;
    }
    return null;
  } catch {
    return null;
  }
};

export async function setAuthCookie(userId: string) {
  const expires = new Date(Date.now() + cookie.duration);
  const token = await encrypt({ userId, expires });
  cookies().set(cookie.name, token, {
    ...cookie.options,
    expires,
  });
}

export async function isAuthenticated(token?: string) {
  if (token) {
    const session = await decrypt(token);
    return !!session?.userId;
  }
  const cookieValue = cookies().get("auth_token")?.value;
  const session = await decrypt(cookieValue);
  return !!session?.userId;
}

export async function verifySession() {
  const cookieValue = cookies().get(cookie.name)?.value;
  const session = await decrypt(cookieValue);
  if (!session?.userId) {
    redirect("/sign-in");
  }

  return { userId: session.userId };
}

export function removeAuthCookie() {
  cookies().delete(cookie.name);
  redirect("/sign-in");
}
