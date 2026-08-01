import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";

export async function GET() {
  try {
    const count = await prisma.user.count();

    return NextResponse.json({
      success: true,
      users: count,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? {
                name: error.name,
                message: error.message,
                stack: error.stack,
              }
            : String(error),
      },
      {
        status: 500,
      }
    );
  }
}
