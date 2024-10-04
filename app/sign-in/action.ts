"use server";

import { redirect } from "next/navigation";
import { setAuthCookie, removeAuthCookie, isAuthenticated } from "@/lib/auth";

const user = {
  id: "1",
  username: "test",
  password: "ali13802",
};

export type FormState = {
  message: string;
  errors?: {
    username?: string;
    password?: string;
    form?: string;
  };
};

export async function signIn(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const callbackUrl = (formData.get("callbackUrl") as string) || "/posts";

  const errors: { username?: string; password?: string } = {};

  if (!username) {
    errors.username = "نام کاربری الزامی است";
  }

  if (!password) {
    errors.password = "رمز عبور الزامی است";
  }

  if (Object.keys(errors).length > 0) {
    return { message: "خطا در ورود اطلاعات", errors };
  }

  if (username === user.username && password === user.password) {
    await setAuthCookie(user.id);
    redirect(callbackUrl);
  }

  return {
    message: "خطا در ورود",
    errors: { form: "اطلاعات وارد شده نامعتبر هست." },
  };
}

export async function signOut() {
  removeAuthCookie();
  redirect("/");
}

export async function checkAuth() {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    redirect("/sign-in");
  }
}
