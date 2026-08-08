"use client";

import { AuthCard } from "@/components/auth/auth-card";
import { AuthLayout } from "@/components/auth/auth-layout";
import { RegisterForm } from "@/components/auth/register-form";
import { AnimatedPage } from "@/components/ui/AnimatedPage";

export default function RegisterPage() {
  return (
    <AnimatedPage>
      <AuthLayout title="Create your account" description="Join Mingalar Bangkok today.">
        <AuthCard title="Create your account">
          <RegisterForm onSubmit={() => Promise.resolve()} />
        </AuthCard>
      </AuthLayout>
    </AnimatedPage>
  );
}
