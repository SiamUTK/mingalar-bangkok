"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { AuthErrorMessage } from "@/components/auth/auth-error-message";
import { AuthInput } from "@/components/auth/auth-input";
import { AuthSubmitButton } from "@/components/auth/auth-submit-button";

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
      .regex(/[0-9]/, "Password must contain at least one number."),
    confirmPassword: z.string().min(1, "Please confirm your password."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export interface ResetPasswordFormProps {
  onSubmit: (values: ResetPasswordFormValues) => Promise<void>;
  error?: string | null;
}

export function ResetPasswordForm({ onSubmit, error }: ResetPasswordFormProps) {
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function submit(values: ResetPasswordFormValues) {
    try {
      setIsLoading(true);
      await onSubmit(values);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-6">
      <AuthErrorMessage message={error} />

      <AuthInput
        id="password"
        type="password"
        label="New Password"
        placeholder="••••••••"
        autoComplete="new-password"
        error={errors.password?.message}
        {...register("password")}
      />

      <AuthInput
        id="confirmPassword"
        type="password"
        label="Confirm New Password"
        placeholder="••••••••"
        autoComplete="new-password"
        error={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />

      <AuthSubmitButton loading={isLoading} loadingText="Resetting...">
        Reset Password
      </AuthSubmitButton>
    </form>
  );
}
