"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { AuthErrorMessage } from "@/components/auth/auth-error-message";
import { AuthInput } from "@/components/auth/auth-input";
import { AuthSubmitButton } from "@/components/auth/auth-submit-button";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address.").trim(),
  password: z.string().min(1, "Password is required."),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export interface LoginFormProps {
  onSubmit: (values: LoginFormValues) => Promise<void>;
  error?: string | null;
}

export function LoginForm({ onSubmit, error }: LoginFormProps) {
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function submit(values: LoginFormValues) {
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

      <AuthInput
        id="password"
        type="password"
        label="Password"
        placeholder="••••••••"
        autoComplete="current-password"
        error={errors.password?.message}
        {...register("password")}
      />

      <AuthSubmitButton loading={isLoading} loadingText="Signing in...">
        Sign In
      </AuthSubmitButton>
    </form>
  );
}
