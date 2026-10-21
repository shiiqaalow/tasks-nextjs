"use server";

import { redirect } from "next/navigation";
import { getString, ServerResponseStatus } from "../../lib/utils";
import { verifyEmail } from "../../lib/user/auth";

export const verifyEmailAction = async (
  _prev: ServerResponseStatus,
  formData: FormData,
): Promise<ServerResponseStatus> => {
  const email = getString(formData, "email").toLowerCase()
  const code = getString(formData, "code").trim()

  if (!code) {
    return {
      success: false,
      status: 400,
      message: "Invalid or expired code. Please resend again",
    };
  }
  // verify the email
  const result = await verifyEmail(email, code);
  if (!result.success) {
    return {
      success: false,
      status: result.status,
      message: result.message,
    };
  }
  redirect('/signin')
};
