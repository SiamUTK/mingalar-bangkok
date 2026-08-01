import { createClient } from "@/lib/supabase/client";

export interface UpdateProfilePayload {
  fullName?: string;
  avatarUrl?: string;
}

class UserService {
  private supabase = createClient();

  async getCurrentUser() {
    const {
      data: { user },
      error,
    } = await this.supabase.auth.getUser();

    if (error) {
      throw error;
    }

    return user;
  }

  async getProfile() {
    const response = await fetch("/api/user/profile", {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to load profile.");
    }

    return response.json();
  }

  async updateProfile(data: UpdateProfilePayload) {
    const response = await fetch("/api/user/profile", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to update profile.");
    }

    return response.json();
  }

  async uploadAvatar(file: File) {
    const user = await this.getCurrentUser();

    if (!user) {
      throw new Error("User not found.");
    }

    const extension = file.name.split(".").pop();

    const path = `${user.id}/avatar.${extension}`;

    const { error } = await this.supabase.storage.from("avatars").upload(path, file, {
      upsert: true,
    });

    if (error) {
      throw error;
    }

    const { data } = this.supabase.storage.from("avatars").getPublicUrl(path);

    await this.updateProfile({
      avatarUrl: data.publicUrl,
    });

    return data.publicUrl;
  }

  async deleteAvatar() {
    const user = await this.getCurrentUser();

    if (!user) {
      throw new Error("User not found.");
    }

    const { data } = await this.supabase.storage.from("avatars").list(user.id);

    if (!data?.length) {
      return;
    }

    await this.supabase.storage
      .from("avatars")
      .remove(data.map((file) => `${user.id}/${file.name}`));

    await this.updateProfile({
      avatarUrl: "",
    });
  }
}

export const userService = new UserService();
