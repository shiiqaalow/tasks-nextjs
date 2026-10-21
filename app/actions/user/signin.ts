'use server'
import { redirect } from "next/navigation"
import {signin } from "../../lib/user/auth"
import { createSession } from "../../lib/token/session"
import { getString, ServerResponseStatus } from "../../lib/utils"

export const signinAction = async (_prevData: ServerResponseStatus, formData: FormData): Promise<ServerResponseStatus> => {

    const email = getString(formData,'email')
    const password = getString(formData,'password')

    if(!email) {
        return {
            success: false,
            status: 400,
            message: 'Email is required'
        }
    }
    if(!password) {
        return {
            success: false,
            status: 400,
            message: 'Password is required'
        }
    }

    const result = await signin(email,password)
    if(!result.success || !result.userId) {
        return {
            success: result.success,
            status: result.status,
            message: result.message
        }
    }

    await createSession(result.userId)
    redirect('/')
}