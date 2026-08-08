"use client";

import { AuthCard } from "@/components/auth/auth-card";
import { AuthLayout } from "@/components/auth/auth-layout";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import { AnimatedPage } from "@/components/ui/AnimatedPage";

export default function ResetPasswordPage() {
  return (
    <AnimatedPage>
      <AuthLayout title="Reset Password" description="Create your new password.">
        <AuthCard title="Reset Password">
          <ResetPasswordForm onSubmit={() => Promise.resolve()} />
        </AuthCard>
      </AuthLayout>
    </AnimatedPage>
  );
}
