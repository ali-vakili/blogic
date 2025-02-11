import { NextResponse } from "next/server";
import getServerSession from "@/lib/getServerSession";

export async function GET() {
  const session = await getServerSession();
  const isAuthenticated = !!session?.userId;
  return NextResponse.json({ isAuthenticated });
}
