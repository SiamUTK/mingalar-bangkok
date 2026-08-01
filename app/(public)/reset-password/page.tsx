import { AuthCard } from "@/components/auth/auth-card";
import { AuthLayout } from "@/components/auth/auth-layout";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import { AnimatedPage } from "@/components/ui/AnimatedPage";

export default function ResetPasswordPage() {
  return (
    <AnimatedPage>
      <AuthLayout>
        <AuthCard title="Reset Password" description="Create your new password.">
          <ResetPasswordForm />
        </AuthCard>
      </AuthLayout>
    </AnimatedPage>
  );
}
