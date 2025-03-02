import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../db/prismaClient";
import crypto from "crypto";
import { sendVerificationEmail } from "../../../utils/email";

export async function POST(req: NextRequest) {
  try{
  const { email, password } = await req.json();
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (user) {
    if (user.emailVerified) {
      return NextResponse.json({ message: "User already exists" });
    }
      return NextResponse.json({ message: "Please Verify your email" });
  }
  await prisma.user.create({
    data: {
      email: email,
      password: password,
    },
  });
  const emailSent = await prisma.verificationToken.findFirst({
    where: {
      identifier: email,
    },
  });
  if (emailSent) {
    return NextResponse.json({ message: "Email already sent" });
  }
  const verificationToken = crypto.randomBytes(32).toString("hex");

  await prisma.verificationToken.create({
    data: {
      identifier: email,
      token: verificationToken,
      expires: new Date(Date.now() + 60 * 60 * 1000),
    },
  });
  await sendVerificationEmail(email, verificationToken);

  return NextResponse.json({ message: "Email sent!Please verify" });
}catch(err:unknown){
    console.log(err)
    return NextResponse.json({message:err})

}
}
