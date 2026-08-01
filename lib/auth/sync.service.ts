import { createClient } from "@/lib/supabase/client";

export interface SyncUserPayload {
  id: string;
  email: string;
  fullName?: string;
  avatarUrl?: string;
}

class SyncService {
  private supabase = createClient();

  async getCurrentUser(): Promise<SyncUserPayload | null> {
    const {
      data: { user },
      error,
    } = await this.supabase.auth.getUser();

    if (error || !user) {
      return null;
    }

    return {
      id: user.id,
      email: user.email ?? "",
      fullName: user.user_metadata?.full_name ?? "",
      avatarUrl: user.user_metadata?.avatar_url ?? "",
    };
  }

  async syncToDatabase() {
    const user = await this.getCurrentUser();

    if (!user) {
      throw new Error("No authenticated user found.");
    }

    const response = await fetch("/api/auth/sync", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("Failed to sync user.");
    }

    return response.json();
  }
}

export const syncService = new SyncService();
