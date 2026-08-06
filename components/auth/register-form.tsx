"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { AuthErrorMessage } from "@/components/auth/auth-error-message";
import { AuthInput } from "@/components/auth/auth-input";
import { AuthSubmitButton } from "@/components/auth/auth-submit-button";

const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters.").trim(),
    email: z.string().email("Please enter a valid email address.").trim(),
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

export type RegisterFormValues = z.infer<typeof registerSchema>;

export interface RegisterFormProps {
  onSubmit: (values: RegisterFormValues) => Promise<void>;
  error?: string | null;
}

export function RegisterForm({ onSubmit, error }: RegisterFormProps) {
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function submit(values: RegisterFormValues) {
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
        id="name"
        type="text"
        label="Full Name"
        placeholder="John Doe"
        autoComplete="name"
        error={errors.name?.message}
        {...register("name")}
      />

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
        autoComplete="new-password"
        error={errors.password?.message}
        {...register("password")}
      />

      <AuthInput
        id="confirmPassword"
        type="password"
        label="Confirm Password"
        placeholder="••••••••"
        autoComplete="new-password"
        error={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />

      <AuthSubmitButton loading={isLoading} loadingText="Creating account...">
        Create Account
      </AuthSubmitButton>
    </form>
  );
}
