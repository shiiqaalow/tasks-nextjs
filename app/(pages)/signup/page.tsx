"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { AlertCircle, Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signupAction } from "../../actions/user/signup";

const initialStatus = {
  success: false,
  status: 400,
  message: "",
};

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const [state, formAction, isPending] = useActionState(
    signupAction,
    initialStatus,
  );

  return (
    <div className="min-h-screen flex justify-center items-center bg-seconf px-4 py-10">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>
            Enter your details below to get started
          </CardDescription>
        </CardHeader>

        <form action={formAction}>
          <CardContent className="space-y-2">
            {state.message && (
              <div
                role="alert"
                className="flex justify-center items-start gap-2 rounded-md border border-destructive/30 bg-destructive/10 p-2 text-sm text-destructive"
              >
                <AlertCircle className="mt-0.5 size-4 shrink-0" />
                <span>{state.message}</span>
              </div>
            )}
            {/* first name */}
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <Label htmlFor="name">Full name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="John Doe"
                  autoComplete="name"
                  required
                  className="placeholder:text-xs"
                />
              </div>
              {/* last name */}
              <div className="space-y-1">
                <Label htmlFor="name">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="John Doe"
                  autoComplete="family-name"
                  required
                  className="placeholder:text-xs"
                />
              </div>
            </div>
            {/* Email */}
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
                className="placeholder:text-xs"
              />
            </div>
            {/* Password */}
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="At least 6 characters"
                  autoComplete="new-password"
                  className="pr-10 placeholder:text-xs"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-foreground"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
            </div>
            {/* Confirm password */}
            <div className="space-y-1">
              <Label htmlFor="confirmPassword">Confirm password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-enter your password"
                  autoComplete="new-password"
                  className="placeholder:text-xs"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-foreground"
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
            </div>
            {/* phone number */}
            <div className="space-y-1">
              <Input
                type="number"
                id="phone"
                name="phone"
                inputMode="numeric"
                placeholder="+27 82 123 4567"
                title="Enter a 10-digit phone number"
                className="placeholder:text-xs"
              />
            </div>
            {/* Address */}
            <div className="space-y-1">
              <Input
                type="text"
                id="address"
                name="address"
                placeholder="e.g. 12 Belhar Street, Belhar, Cape Town"
                className="placeholder:text-xs"
              />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-4 pt-6">
            <Button
              type="submit"
              className="w-full cursor-pointer"
              disabled={isPending}
            >
              {isPending ? "Creating account..." : "Sign up"}
            </Button>

            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/signin"
                className="font-medium text-primary hover:underline"
              >
                Sign in
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default SignupPage;
