import { NextResponse } from "next/server";
import { setAuthCookie, removeAuthCookie } from "@/lib/auth";

const user = {
  id: "1",
  username: "test",
  password: "123456",
};

export async function POST(request: Request) {
  const { username, password } = await request.json();

  if (username === user.username && password === user.password) {
    await setAuthCookie(user.id);
    return NextResponse.json({ success: true });
  }

  return NextResponse.json(
    { error: "اطلاعات وارد شده نامعتبر هست." },
    { status: 401 }
  );
}

export async function DELETE() {
  removeAuthCookie();
  return NextResponse.json({ success: true });
}
