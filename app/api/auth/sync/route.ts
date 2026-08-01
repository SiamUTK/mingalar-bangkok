import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma/client";
import { createClient } from "@/lib/supabase/server";

export async function POST() {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const syncedUser = await prisma.user.upsert({
      where: {
        supabaseId: user.id,
      },
      update: {
        email: user.email ?? "",
        emailVerified: !!user.email_confirmed_at,
        lastLoginAt: new Date(),
      },
      create: {
        supabaseId: user.id,
        email: user.email ?? "",
        emailVerified: !!user.email_confirmed_at,
        lastLoginAt: new Date(),

        profile: {
          create: {
            displayName: user.user_metadata?.full_name ?? "",
          },
        },

        membership: {
          create: {},
        },

        preference: {
          create: {},
        },
      },

      include: {
        profile: true,
        membership: true,
        preference: true,
      },
    });

    return NextResponse.json({
      success: true,
      user: syncedUser,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}
