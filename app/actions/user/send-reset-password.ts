'use server'
import { sendRestPasswordCode } from "../../lib/user/auth";
import { getString, ServerResponseStatus } from "../../lib/utils";

export const sendResetPasswordCodeAction = async (
  _prev: ServerResponseStatus,
  formData: FormData,
): Promise<ServerResponseStatus> => {
  const email = getString(formData, "email").trim().toLowerCase();
  if (!email) return { success: false, status: 400, message: "Please enter your email" };

  return await sendRestPasswordCode(email); // just show "Check your email"
};