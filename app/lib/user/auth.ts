import { createHash, randomBytes, randomInt } from "crypto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { CreateUserInput, GoogleUserInput } from "@/app/types/user";
import { getUserCollection } from "../db";
import {
  sendPasswordResetEmail,
  sendVerificationEmail,
} from "../mailtrap/emails";
import { ObjectId } from "mongodb";
import { ServerResponseStatus } from "../utils";

// sign up user and send verification token
export const signup = async (
  data: CreateUserInput,
): Promise<ServerResponseStatus> => {
  try {
    // first remove the spaces and make it small letters
    const name = data.name.trim();
    const email = data.email.trim().toLowerCase();
    const collection = await getUserCollection();

    if (data.password.length < 6) {
      return {
        success: false,
        status: 400,
        message: "Password must be at least 6 characters",
      };
    }

    const user = await collection.findOne({ email });

    if (user) {
      return {
        success: false,
        status: 409,
        message: `${email} is already registered, Go and login`,
      };
    }
    // Hash the password (for security purpose)
    const passwordHash = await bcrypt.hash(data.password, 10);

    // generate verification token
    const verificationToken = randomInt(100000, 1000000).toString();

    // Hash verification token
    const verificationTokenHash = await bcrypt.hash(verificationToken, 10);

    // Set 15 minutes verificationTokenExpiry
    const verificationTokenExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15min

    const now = new Date();

    const result = await collection.insertOne({
      name: name,
      email: email,
      password: passwordHash ?? undefined,
      phone: data.phone ?? undefined,
      address: data.address ?? undefined,
      image: data.image,
      isVerified: false,
      isActive: false,
      verificationToken: verificationTokenHash,
      verificationTokenExpiresAt: verificationTokenExpiry,
      createdAt: data.createdAt ?? now,
      updatedAt: data.updatedAt ?? now,
    });
    // Send the verification code right after user is registere
    await sendVerificationEmail(email, verificationToken);

    return {
      success: true,
      status: 201,
      message: "Account successfully created",
      userId: result.insertedId.toString()
    };
  } catch (error) {
    console.log("failed to register an account", error);
    return {
      success: false,
      status: 500,
      message: "Something went wrong...",
    };
  }
};

// sign in user
export const signin = async (
  email: string,
  password: string,
): Promise<ServerResponseStatus> => {
  try {
    const collection = await getUserCollection();
    const user = await collection.findOne({ email });
    if (!user) {
      return {
        success: false,
        status: 400,
        message: "User not found.",
      };
    }

    if (!user || !user.password) {
      return {
        success: false,
        status: 400,
        message: "Invalid credentials.",
      };
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      return {
        success: false,
        status: 400,
        message: "Invalid credentials.",
      };
    }
    if (!user.isVerified) {
      return {
        success: false,
        status: 400,
        message: "Please verify your email before signing in.",
      };
    }

    await collection.updateOne(
      { _id: user._id },
      {
        $set: {
          isActive: true,
          lastLoginAt: new Date(),
          updatedAt: new Date(),
        },
      },
    );

    return {
      success: true,
      status: 200,
      message: "User successfully logged in",
      userId: user._id.toString(),
    };
  } catch (error) {
    console.log("failed to to login this account", error);
    return {
      success: false,
      status: 500,
      message: "Something went wrong...",
    };
  }
};

// sign in or create user via google
export const createOrSigninGoogleUser = async (
  user: GoogleUserInput,
): Promise<ServerResponseStatus> => {
  try {
    // first check wether the email is verified by google or not
    if (!user.emailVerified) {
      return {
        success: false,
        status: 403,
        message: "Your google email is not verified",
      };
    }
    const collection = await getUserCollection();
    const existingUser = await collection.findOne({
      email: user.email.trim().toLowerCase(),
    });
    const now = new Date();

    // if the user exists already just update these fields
    if (existingUser) {
      await collection.updateOne(
        { _id: existingUser._id },
        {
          $set: {
            googleId: user.googleId,
            image: user.image,
            isVerified: true,
            isActive: true,
            lastLoginAt: now,
            updatedAt: now,
          },
          $unset: {
            verificationToken: "",
            verificationTokenExpiresAt: "",
          },
        },
      );

      return {
        success: true,
        status: 200,
        message: "Signed in with your existing account."
      };
    }

    // if the user does not exist create it now
    const result = await collection.insertOne({
      googleId: user.googleId,
      name: user.name,
      email: user.email,
      image: user.image,
      isVerified: true,
      isActive: true,
      lastLoginAt: now,
      createdAt: now,
      updatedAt: now,
    });

    return {
      success: true,
      status: 200,
      message: "User created successfully with google",
      userId: result.insertedId.toString(),
    };
  } catch (error) {
    console.log("Failed to signin or create google user", error);
    return {
      success: false,
      status: 500,
      message: "Something went wrong...",
    };
  }
};

// Verify email after the user is registered
export const verifyEmail = async (
  email: string,
  code: string,
): Promise<ServerResponseStatus> => {
  try {
    const collection = await getUserCollection();
    const user = await collection.findOne({
      email: email.trim().toLowerCase(),
    });
    if (!user) {
      return {
        success: false,
        status: 404,
        message: "Account not found. Please register.",
      };
    }

    if (user.isVerified) {
      return {
        success: false,
        status: 400,
        message: "Email is already verified.",
      };
    }
    if (!user.verificationToken || !user.verificationTokenExpiresAt) {
      return {
        success: false,
        status: 400,
        message: "No active code. Please request new code",
      };
    }

    if (new Date() > new Date(user.verificationTokenExpiresAt)) {
      return {
        success: false,
        status: 400,
        message: "Code has expired. Please request new code",
      };
    }

    const isTokenMatched = await bcrypt.compare(code, user.verificationToken);

    if (!isTokenMatched) {
      return {
        success: false,
        status: 400,
        message: "Invalid code, Please confirm the code from your email inbox",
      };
    }

    await collection.updateOne(
      { _id: user._id },
      {
        $set: {
          isVerified: true,
          isActive: true,
          updatedAt: new Date(),
        },
        $unset: {
          verificationToken: "",
          verificationTokenExpiresAt: "",
        },
      },
    );

    return {
      success: true,
      status: 200,
      message: "Email Verified Successfully",
    };
  } catch (error) {
    console.log("Failed to login your account", error);
    return {
      success: false,
      status: 500,
      message: "Something went wrong...",
    };
  }
};

// send reset password token

export const sendRestPasswordCode = async (
  email: string,
): Promise<ServerResponseStatus> => {
  try {
    const collection = await getUserCollection();
    const normalized = email.trim().toLowerCase();
    const user = await collection.findOne({ email: normalized });

    if (!user || !user.password) {
      return {
        success: false,
        status: 400,
        message: "User does not exist, We only send code to a registered user",
      };
    }

    const token = randomBytes(32).toString("hex"); // goes in the link
    const tokenHash = createHash("sha256").update(token).digest("hex"); // goes in the DB

    await collection.updateOne(
      { _id: user._id },
      {
        $set: {
          resetPasswordToken: tokenHash,
          resetPasswordTokenExpiresAt: new Date(Date.now() + 15 * 60 * 1000),
          updatedAt: new Date(),
        },
      },
    );

    const resetURL = `${process.env.APP_URL}/reset-password?email=${encodeURIComponent(normalized)}&code=${token}`;
    const sent = await sendPasswordResetEmail(normalized, resetURL);
    if (!sent) {
      return {
        success: false,
        status: 502,
        message: "Could not send the email. Please try again.",
      };
    }

    return {
      success: true,
      status: 200,
      message: "Check your email for the reset link",
    };
  } catch (error) {
    console.log("Failed sending reset link", error);
    return { success: false, status: 500, message: "Something went wrong..." };
  }
};

// update the passwoard
export const updatePassword = async (
  email: string,
  resetPasswordToken: string,
  newPassword: string,
): Promise<ServerResponseStatus> => {
  try {
    if (!email || !resetPasswordToken || !newPassword) {
      return {
        success: false,
        status: 400,
        message: "Invalid request",
      };
    }
    const tokenHash = createHash("sha256")
      .update(resetPasswordToken)
      .digest("hex");
    const passwordHash = await bcrypt.hash(newPassword, 10);
    const collection = await getUserCollection();
    const user = await collection.findOneAndUpdate(
      {
        email: email.trim().toLowerCase(),
        resetPasswordToken: tokenHash,
        resetPasswordTokenExpiresAt: { $gt: new Date() },
      },
      {
        $set: {
          password: passwordHash,
          updatedAt: new Date(),
        },
        $unset: {
          resetPasswordToken: "",
          resetPasswordTokenExpiresAt: "",
        },
      },
    );

    if (!user) {
      return {
        success: false,
        status: 400,
        message: "Invalid or expired code",
      };
    }

    return {
      success: true,
      status: 200,
      message: "You have successfully changed your password",
      userId: user?._id.toString(),
    };
  } catch (error) {
    console.log("failed to update your password", error);
    return {
      success: false,
      status: 500,
      message: "Something went wrong...",
    };
  }
};

// get current User Online
export const getCurrentUser = async (
  token: string,
): Promise<ServerResponseStatus> => {
  if (!token) {
    return {
      success: false,
      status: 400,
      message: "Access denied, no token is provided",
    };
  }
  const decoded = (await jwt.verify(token, process.env.JWT_SECRET!)) as {
    id: string;
  };
  if (!decoded) {
    return {
      success: false,
      status: 400,
      message: "Failed to verify token",
    };
  }
  const collection = await getUserCollection();
  const user = await collection.findOne({ _id: new ObjectId(decoded.id) });
  if (!user) {
    return {
      success: false,
      status: 400,
      message: "Failed to get current user from database",
    };
  }
  const currentUser = {
    id: user._id.toString(),
    name: user.name ?? undefined,
    email: user.email ?? undefined,
    image: user.image ?? undefined,
  };

  return {
    success: true,
    status: 200,
    message: "Current user successfully found",
    userId: currentUser.id
  };
};
