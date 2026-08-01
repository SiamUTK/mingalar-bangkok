"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authService } from "@/lib/auth/auth.service";

const registerSchema = z
  .object({
    fullName: z.string().min(2, "Full name is required"),

    email: z.string().email("Invalid email address"),

    password: z.string().min(8, "Password must be at least 8 characters"),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(values: RegisterFormValues) {
    try {
      setLoading(true);

      await authService.register({
        email: values.email,
        password: values.password,
        fullName: values.fullName,
      });

      setSuccess(true);
    } catch (error) {
      console.error(error);
      alert("Registration failed.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="space-y-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center">
        <h2 className="text-xl font-semibold">Check your email</h2>

        <p className="text-sm text-muted-foreground">
          We&apos;ve sent you a verification email. Please verify your account before logging in.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <Input placeholder="Full name" {...register("fullName")} />

        {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName.message}</p>}
      </div>

      <div>
        <Input type="email" placeholder="Email" {...register("email")} />

        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
      </div>

      <div>
        <Input type="password" placeholder="Password" {...register("password")} />

        {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
      </div>

      <div>
        <Input type="password" placeholder="Confirm Password" {...register("confirmPassword")} />

        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-500">{errors.confirmPassword.message}</p>
        )}
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Creating account..." : "Create Account"}
      </Button>
    </form>
  );
}
