"use server";
import { prisma } from "../../../db/prismaClient";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../auth";

interface obj {
  team: string;
  name: string;
  description?: string;
}

export const POST = async (req: NextRequest) => {
  try {
    // Parse request body safely
    const { team, name, description }: obj = await req.json();

    // Get user session
    const session = await auth();
    if (!session || !session.user?.id) {
      return NextResponse.json(
        { message: "Sorry, not authenticated" },
        { status: 401 }
      );
    }

    // Log session (for debugging)
    console.log("Session:", JSON.stringify(session, null, 2));

    // Create a new game in the database
    await prisma.game.create({
      data: {
        userId: session.user.id,
        team,
        name,
        description: description || "play it!!",
        role: "ADMIN",
      },
    });

    return NextResponse.json(
      { message: "Game created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating game:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
};
