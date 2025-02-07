import { NextResponse } from "next/server";
import useAuth from "@/hooks/useAuth";

export async function GET() {
  const { isAuthenticated } = await useAuth();
  return NextResponse.json({ isAuthenticated });
}
