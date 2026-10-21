"use client";
import Link from "next/link";
import { AlertCircle, ArrowLeft, KeyRound, Loader2 } from "lucide-react";

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
import { useActionState } from "react";
import { sendResetPasswordCodeAction } from "../../actions/user/send-reset-password";
import SuccessForgotPassword from "@/app/components/SuccessForgotPassword";

const initialState = {
  success: false,
  status: 400,
  message: "",
};

const ForgotPasswordPage = () => {
  const [state, formAction, isPending] = useActionState(
    sendResetPasswordCodeAction,
    initialState,
  );
  return (
    <div className="min-h-screen flex justify-center items-center bg-secondary px-4 py-10">
      <Card className="w-full max-w-md">
        {state.success ? (
          <SuccessForgotPassword message={state.message} />
        ) : (
          <>
            <CardHeader className="space-y-1 text-center">
              <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                <KeyRound className="size-5" />
              </div>
              <CardTitle className="text-2xl font-semibold tracking-tight">
                Forgot password?
              </CardTitle>
              <CardDescription>
                Enter your email and we&apos;ll send you a code to reset your
                password.
              </CardDescription>
            </CardHeader>

            <form action={formAction}>
              <CardContent className="space-y-4">
                {state.message && (
                  <div
                    role="alert"
                    className="flex items-start gap-2 rounded-md border border-destructive/30 bg-destructive/10 p-2 text-sm text-destructive"
                  >
                    <AlertCircle className="mt-0.5 size-4 shrink-0" />
                    <span>{state.message}</span>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full cursor-pointer"
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send reset code"
                  )}
                </Button>
              </CardContent>

              <CardFooter className="justify-center border-t py-4">
                <Link
                  href="/signin"
                  className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <ArrowLeft className="size-4" />
                  Back to sign in
                </Link>
              </CardFooter>
            </form>
          </>
        )}
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;
