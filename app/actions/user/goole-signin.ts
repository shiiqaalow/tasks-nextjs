"use server";
import { signIn } from "@/auth";

export const googleSignInAction = async () => {
  await signIn("google", { redirectTo: "/" });
};