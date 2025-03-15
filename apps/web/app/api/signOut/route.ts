"use server";
import { NextResponse } from "next/server";
import { signOut } from "../../auth";

export async function GET() {
  await signOut();
  return NextResponse.json({ message: "Signed out" });
}
