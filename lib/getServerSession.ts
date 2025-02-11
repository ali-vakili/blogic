import { decrypt } from "@/lib/auth";
import { cookies } from "next/headers";

const cookieName = "auth_token";

// Use React cache to prevent duplicate decryption
const getServerSession = async () => {
  const cookieValue = cookies().get(cookieName)?.value;
  if (!cookieValue) return null;

  try {
    const session = await decrypt(cookieValue);
    return session;
  } catch (error) {
    console.error("Failed to decrypt session:", error);
    return null;
  }
};

export default getServerSession;
