import { createClient } from "@/lib/supabase/client";

class SessionService {
  private supabase = createClient();

  async getSession() {
    const { data, error } = await this.supabase.auth.getSession();

    if (error) {
      throw error;
    }

    return data.session;
  }

  async getUser() {
    const { data, error } = await this.supabase.auth.getUser();

    if (error) {
      throw error;
    }

    return data.user;
  }

  async isAuthenticated(): Promise<boolean> {
    const session = await this.getSession();

    return !!session;
  }

  async refresh() {
    const { data, error } = await this.supabase.auth.refreshSession();

    if (error) {
      throw error;
    }

    return data.session;
  }

  async getAccessToken() {
    const session = await this.getSession();

    return session?.access_token ?? null;
  }

  async getRefreshToken() {
    const session = await this.getSession();

    return session?.refresh_token ?? null;
  }
}

export const sessionService = new SessionService();
