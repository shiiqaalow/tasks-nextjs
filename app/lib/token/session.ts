"use server";

import { cookies } from "next/headers";
import { generateToken } from "./token";

export const createSession = async (id: string) => {
  const SESSION_COOKIE = "token"; // must match the name in your middleware
  const MAX_AGE = 7 * 24 * 60 * 60; // 7 days, in seconds
  const cookieStore = await cookies(); // Next 15+. On 14, drop the await.
  cookieStore.set(SESSION_COOKIE, generateToken(id), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: MAX_AGE,
    path: "/",
  });
};

export const deleteSession = async () => {
  (await cookies()).delete('token')
}
