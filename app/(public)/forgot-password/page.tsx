"use client";

import { AuthCard } from "@/components/auth/auth-card";
import { AuthLayout } from "@/components/auth/auth-layout";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import { AnimatedPage } from "@/components/ui/AnimatedPage";

export default function ForgotPasswordPage() {
  return (
    <AnimatedPage>
      <AuthLayout
        title="Forgot your password?"
        description="Enter your email to receive a password reset link."
      >
        <AuthCard title="Forgot your password?">
          <ForgotPasswordForm onSubmit={() => Promise.resolve()} />
        </AuthCard>
      </AuthLayout>
    </AnimatedPage>
  );
}
