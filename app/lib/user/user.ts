import {
  SafeUser,
  UpdateUserInput,
  User,
} from "@/app/types/user";
import { getUserCollection } from "../db";
import { ObjectId } from "mongodb";
import { ServerResponseData, ServerResponseStatus } from "../utils";


const SafeProjection = {
  password: 0,
  verificationToken: 0,
  verificationTokenExpiresAt: 0,
  passwordResetToken: 0,
  passwordResetTokenExpiresAt: 0,
} as const;

// Get all user
export const getAllUsers = async (): Promise<ServerResponseData> => {
  try {
    const collection = await getUserCollection();
    const users = await collection
      .find({}, { projection: SafeProjection })
      .toArray();

    if (!users) {
      return {
        success: false,
        status: 404,
        message: "No users found.",
        data: [],
      };
    }
    const result = users.map(({ _id, ...rest }) => ({
      _id: _id.toString(),
      ...rest,
    })) as SafeUser[];
    return {
      success: true,
      status: 200,
      message: users.length
        ? "Users fetched Successfully"
        : "No users fetched.",
      data: result,
    };
  } catch (error) {
    console.error("getAllUsers failed:", error);
    return {
      success: false,
      status: 500,
      message: "Failed to fetch users.",
    };
  }
};

// get a single user
export const getUserById = async (
  id: string,
): Promise<ServerResponseData> => {
  try {
    const collection = await getUserCollection();
    const existingUser = await collection.findOne(
      { _id: new ObjectId(id) },
      { projection: SafeProjection },
    );
    if (!existingUser) {
      return {
        success: false,
        status: 404,
        message: "User not found.",
      };
    }

    const formattedUser: User = {
        id: existingUser._id.toString(),
        name: existingUser.name,
        email: existingUser.email,
        phone: existingUser.phone,
        address: existingUser.address,
        image: existingUser.image,
        lastLoggingAt: existingUser.lastLoggingAt,
        isActive: existingUser.isActive, 
        isVerified: existingUser.isVerified, 
        createdAt: existingUser.createdAt, 
        updatedAt: existingUser.updatedAt
    }

    return {
      success: true,
      status: 200,
      message: "User successfully found.",
      data: formattedUser,
    };
  } catch (error) {
    console.log("Failed to fetch userById", error);
    return {
      success: false,
      status: 400,
      message: "User not found.",
    };
  }
};

// update a user
export const updateUserById = async (
  id: string,
  input: UpdateUserInput,
): Promise<ServerResponseStatus> => {
  try {
    const collection = await getUserCollection();

    const user = await collection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          name: input.name,
          phone: input.phone,
          address: input.address,
          image: input.image,
          updatedAt: new Date().toISOString(),
        },
      },
    );
    if (user.matchedCount === 0) {
      return {
        success: false,
        status: 404,
        message: "No user found, so nothing to update",
      };
    }

    return {
      success: true,
      status: 200,
      message: "User successfully updated",
    };
  } catch (error) {
    console.log("Failed to update userById", error);
    return {
      success: false,
      status: 500,
      message: "Failed to update user",
    };
  }
};

// delete a user
export const deleteUserById = async (
  id: string,
): Promise<ServerResponseStatus> => {
  try {
    const collection = await getUserCollection();

    const user = await collection.deleteOne({ _id: new ObjectId(id) });

    if (user.deletedCount === 0) {
      return {
        success: false,
        status: 404,
        message: "User delete not found",
      };
    }

    return {
      success: true,
      status: 200,
      message: "User successfully deleted",
    };
  } catch (error) {
    console.log("Failed to delete userById", error);
    return {
      success: false,
      status: 500,
      message: "Failed to delete user",
    };
  }
};
