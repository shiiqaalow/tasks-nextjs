"use server";

import { signOut } from "@/auth";
import { deleteSession } from "../../lib/token/session";

export const logoutAction = async () => {
  await deleteSession();
  await signOut({ redirectTo: "/signin" });
};