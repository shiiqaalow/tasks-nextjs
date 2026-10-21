import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { auth } from "@/auth";
import { getUserCollection } from "../db";

export const getCurrentUser = cache(async () => {
  // 1. Email/password session (your own JWT cookie)
  const token = (await cookies()).get("token")?.value;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id?: string };

      if (decoded.id && ObjectId.isValid(decoded.id)) {
        const collection = await getUserCollection();
        const user = await collection.findOne(
          { _id: new ObjectId(decoded.id) },
          { projection: { name: 1, email: 1, image: 1, isVerified: 1, isActive: 1,} },
        );

        if (user) {
          return {
            id: user._id.toString(),
            name: (user.name as string | undefined) ?? null,
            email: user.email as string,
            image: (user.image as string | undefined) ?? null,
            isVerified: (user.isVerified as boolean | undefined) ?? null,
            isActive: (user.isActive as boolean | undefined) ?? null,
          };
        }
      }
    } catch {
      // invalid or expired token: fall through to Auth.js
    }
  }

  // 2. Google session (Auth.js)
  const session = await auth();
  if (session?.user?.email) {
    return {
      id: session.user.id ?? session.user.email,
      name: session.user.name ?? null,
      email: session.user.email,
      image: session.user.image ?? null,
    };
  }

  return null;
});