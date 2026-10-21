import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates"
import { mailtrapClient, sender } from "./mailtrap.config"

export const sendVerificationEmail = async (email: string, verificationToken: string) => {
    const recipient = [{email}]
    try {
        
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: 'Verify your email',
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}",verificationToken),
            category: 'Email verification'
        })
        console.log('Email sent successfully',response)
        return {
            success: response.success,
            message: response.message_ids
        }
    } catch (error) {
        console.log('Error sending verification email',error)
        return false
    }
}


export const sendPasswordResetEmail = async (email: string, resetURL: string) => {
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: [{ email }],
      subject: "Reset your password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
      category: "Password Reset",
    });
    console.log("Reset password email sent successfully", response);
    return response.success;
  } catch (error) {
    console.error("Error sending password reset email", error);
    return false;
  }
};


export const sendResetSuccessEmail = async (email: string) => {
    const recipient = [{email}]
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: 'Password Reset Successfull',
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: 'Password Reset'
        })
        console.log('Password reset email sent successfully',response)

    } catch (error) {
        console.log('Error sending password reset success email',error)
        throw new Error(`Error sending password reset success email: ${error}`)
    }
}