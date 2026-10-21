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
import { signinAction } from "../../actions/user/signin";
import { SigninWithGoogleButton } from "../../components/SigninWithGoogleButton";

const initialStatus = {
  success: false,
  status: 400,
  message: "",
};

const SigninPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [state, formAction, isPending] = useActionState(
    signinAction,
    initialStatus,
  );

  return (
    <div className="min-h-screen flex justify-center items-center bg-seconf px-4 py-10">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription>
            Enter your email and password to sign in
          </CardDescription>
        </CardHeader>

        {/* outside the sign-in form */}
        <CardContent className="space-y-4">
          <SigninWithGoogleButton />
          <div className="flex w-full items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">
              OR CONTINUE WITH EMAIL
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>
        </CardContent>

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

            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="At least 8 characters"
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
              <Link
                href="/forgot-password"
                className="flex justify-end mt-2  font-medium text-xs text-primary hover:underline"
              >
                Forgot password
              </Link>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-4 pt-6">
            <Button
              type="submit"
              className="w-full cursor-pointer"
              disabled={isPending}
            >
              {isPending ? "Signing in..." : "Sign in"}
            </Button>

            <p className="text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="font-medium text-primary hover:underline"
              >
                Create one
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default SigninPage;
