import Link from "next/link";
import { ArrowLeft, MailCheck } from "lucide-react";

import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const SuccessForgotPassword = ({ message }: { message: string }) => (
  <>
    <CardHeader className="space-y-1 text-center">
      <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-xl bg-green-100 text-green-700 shadow-sm">
        <MailCheck className="size-5" />
      </div>
      <CardTitle className="text-2xl font-semibold tracking-tight">
        Check your email
      </CardTitle>
      <CardDescription>{message}</CardDescription>
    </CardHeader>

    <CardContent>
      <Button className="h-11 w-full">
        <Link href="/reset-password">Enter reset code</Link>
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
  </>
);

export default SuccessForgotPassword;