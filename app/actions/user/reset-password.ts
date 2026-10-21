"use server";

import { redirect } from "next/navigation";
import { updatePassword } from "../../lib/user/auth";
import { getString } from "../../lib/utils";
import { ServerResponseStatus } from "../../types/user";

export const resetPasswordAction = async (
  _prevData: ServerResponseStatus,
  formData: FormData,
): Promise<ServerResponseStatus> => {
  const email = getString(formData, "email").trim().toLowerCase();
  const code = getString(formData, "code");
  const password = getString(formData, "password");
  const confirmPassword = getString(formData, "confirmPassword");

  if (!email) {
    return {
      success: false,
      status: 400,
      message: "Email is required",
    };
  }
  if (!password) {
    return {
      success: false,
      status: 400,
      message: "Password is required",
    };
  }
  if (confirmPassword !== password) {
    return {
      success: false,
      status: 400,
      message: "Passwords do not match",
    };
  }
  if (!code) {
    return {
      success: false,
      status: 400,
      message: "Invalid or expired code",
    };
  }

  let result = null;
  try {
    result = await updatePassword(email, code, password);
  } catch (error) {
    console.log("failed to update your password", error);
    return {
      success: false,
      status: 500,
      message: "Something went wrong",
    };
  }
  if (!result.success) {
    return {
      success: result.success,
      status: result.status,
      message: result.message,
    };
  }
  redirect("/signin?reset=success");
};
