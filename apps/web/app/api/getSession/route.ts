"use server";
import { NextResponse } from "next/server";
import { auth } from "../../auth";
export async function GET() {
  const session = await auth();
  const response = NextResponse.json(session);
  if (session?.user) {
    return response.cookies.set("next-auth.session-token", session.user?.id ?? "");
   
  }
}
