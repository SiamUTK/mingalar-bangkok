import { createClient } from "@/lib/supabase/client";

type RegisterInput = {
  email: string;
  password: string;
  fullName: string;
};

type LoginInput = {
  email: string;
  password: string;
};

class AuthService {
  async register({ email, password, fullName }: RegisterInput) {
    const supabase = createClient();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
        emailRedirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });

    if (error) {
      throw error;
    }

    return data;
  }

  async login({ email, password }: LoginInput) {
    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    await fetch("/api/auth/sync", {
      method: "POST",
    });

    return data;
  }

  async logout() {
    const supabase = createClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
      throw error;
    }
  }

  async getSession() {
    const supabase = createClient();

    const { data, error } = await supabase.auth.getSession();

    if (error) {
      throw error;
    }

    return data.session;
  }

  async getUser() {
    const supabase = createClient();

    const { data, error } = await supabase.auth.getUser();

    if (error) {
      throw error;
    }

    return data.user;
  }

  async resetPassword(email: string) {
    const supabase = createClient();

    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      throw error;
    }

    return data;
  }

  async updatePassword(password: string) {
    const supabase = createClient();

    const { data, error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      throw error;
    }

    return data;
  }

  async refreshSession() {
    const supabase = createClient();

    const { data, error } = await supabase.auth.refreshSession();

    if (error) {
      throw error;
    }

    return data.session;
  }
}

export const authService = new AuthService();
