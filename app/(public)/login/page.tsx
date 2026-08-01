"use client";

import { useRouter } from "next/navigation";

import { AuthLayout } from "@/components/auth/auth-layout";
import { AnimatedPage } from "@/components/ui/AnimatedPage";

import { LoginForm, type LoginFormValues } from "@/components/auth/login-form";

export default function LoginPage() {
  const router = useRouter();

  async function handleLogin(values: LoginFormValues) {
    void values;

    // TODO:
    // Supabase Login
    // auth.service.ts

    router.push("/dashboard");
  }

  return (
    <AnimatedPage>
      <AuthLayout
        title="Welcome Back"
        description="Sign in to your Mingalar Bangkok account."
        footer={
          <p>
            Don&apos;t have an account?{" "}
            <a href="/register" className="font-medium text-primary hover:underline">
              Register
            </a>
          </p>
        }
      >
        <LoginForm onSubmit={handleLogin} />
      </AuthLayout>
    </AnimatedPage>
  );
}
