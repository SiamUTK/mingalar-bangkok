import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

// import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    // TODO
    // Replace with Prisma
    //
    // const profile = await prisma.profile.findUnique({
    //   where: {
    //     supabaseUserId: user.id,
    //   },
    // });

    return NextResponse.json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        fullName: user.user_metadata?.full_name ?? "",
        avatarUrl: user.user_metadata?.avatar_url ?? "",
      },
    });
  } catch {
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const body = await request.json();

    const fullName = typeof body.fullName === "string" ? body.fullName.trim() : "";

    const avatarUrl = typeof body.avatarUrl === "string" ? body.avatarUrl.trim() : "";

    // TODO
    // await prisma.profile.upsert(...)

    return NextResponse.json({
      success: true,
      data: {
        fullName,
        avatarUrl,
      },
    });
  } catch {
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}
