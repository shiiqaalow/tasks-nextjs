"use client";
import {
  ChangeEvent,
  ClipboardEvent,
  KeyboardEvent,
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { verifyEmailAction } from "../actions/user/verify-email";

const initialMessage = {
  success: false,
  status: 400,
  message: "",
};

const VerifyEmailForm = ({ email }: { email: string }) => {
  const [state, formAction, isPending] = useActionState(
    verifyEmailAction,
    initialMessage,
  );

  const codeLength = 6;

  const [digits, setDigits] = useState<string[]>(Array(codeLength).fill(""));
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const code = digits.join("");
  const isComplete = digits.every(Boolean);

  useEffect(() => {
    refs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    const next = [...digits];
    if (value === "") {
      next[index] = "";
      setDigits(next);
      return;
    }
    next[index] = value.slice(-1);
    setDigits(next);
    if (index < digits.length - 1) refs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      refs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && index > 0) refs.current[index - 1]?.focus();
    if (e.key === "ArrowRight" && index < codeLength - 1)
      refs.current[index + 1]?.focus();
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, codeLength);
    if (!pasted) return;
    const next = Array(codeLength).fill("");
    pasted.split("").forEach((ch, i) => (next[i] = ch));
    setDigits(next);
    refs.current[Math.min(pasted.length, codeLength - 1)]?.focus();
  };

  return (
    <div>
      <form action={formAction} className="space-y-5">
        <input type="hidden" id="email" name="email" value={email} />
        <input type="hidden" id="code" name="code" value={code} />
        <div className="max-w-md mx-auto flex justify-center items-center gap-5 ">
          {digits.map((digit, index) => (
            <Input
              key={index}
              ref={(e) => {
                refs.current[index] = e;
              }}
              value={digit}
              onChange={(e) => handleChange(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              inputMode="numeric"
              autoComplete={index === 0 ? "one-time-code" : "off"}
              autoFocus={index === 0}
              className="w-10 h-10 text-center text-lg font-bold"
            />
          ))}
        </div>
        <Button
          type="submit"
          disabled={!isComplete || isPending}
          className="w-full"
        >
          {isPending ? "Verifying..." : "Verify"}
        </Button>
        {state?.message && !state.success && (
          <p className="text-sm text-center text-red-500">{state.message}</p>
        )}
        <p className="flex justify-center items-center gap-2 text-xs text-gray-500">
          Didn&apos;t receive a code?
          <span className="text-primary underline cursor-pointer t">
            Resend
          </span>
        </p>
      </form>
    </div>
  );
};

export default VerifyEmailForm;
