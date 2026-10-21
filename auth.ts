import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createOrSigninGoogleUser } from "./app/lib/user/auth";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider !== "google" || !user.email) return false;

      const result = await createOrSigninGoogleUser({
        googleId: account.providerAccountId,
        email: user.email,
        name: user.name,
        image: user.image,
        emailVerified: profile?.email_verified === true,
      });

      return result.success;
    },
  },
});
