"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { AuthErrorMessage } from "@/components/auth/auth-error-message";
import { AuthInput } from "@/components/auth/auth-input";
import { AuthSubmitButton } from "@/components/auth/auth-submit-button";

const forgotPasswordSchema = z.object({
  email: z.email("Please enter a valid email address.").trim(),
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

interface ForgotPasswordFormProps {
  onSubmit: (values: ForgotPasswordFormValues) => Promise<void>;

  error?: string | null;
}

export function ForgotPasswordForm({ onSubmit, error }: ForgotPasswordFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function submit(values: ForgotPasswordFormValues) {
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
        id="email"
        type="email"
        label="Email"
        placeholder="name@example.com"
        autoComplete="email"
        error={errors.email?.message}
        {...register("email")}
      />

      <AuthSubmitButton loading={isLoading} loadingText="Sending...">
        Send Reset Link
      </AuthSubmitButton>
    </form>
  );
}

