import { decrypt } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const cookieName = "auth_token";

const useAuth = async () => {
  const cookieValue = cookies().get(cookieName)?.value;
  const session = await decrypt(cookieValue);

  const isAuthenticated = !!session?.userId;
  const user = session?.userId;

  const redirectToSignIn = () => {
    if (!session?.userId) {
      redirect("/sign-in");
    }
  };

  return { isAuthenticated, user, redirectToSignIn };
};

export default useAuth;
