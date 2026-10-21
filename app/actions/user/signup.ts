'use server'

import { redirect } from "next/navigation"
import { signup } from "../../lib/user/auth"

type SignupStatus = {
    success: boolean
    status: number
    message: string
} 
const getString = (formData: FormData, key: string) => {
    const value = formData.get(key)
    return typeof value  === 'string' ? value.trim() : ''
}
export const signupAction = async (_prevData: SignupStatus, formData: FormData): Promise<SignupStatus> => {
    const firstName = getString(formData, 'firstName')
    const lastName = getString(formData, 'lastName')
    const email = getString(formData, 'email').toLowerCase()
    const password = getString(formData, 'password')
    const confirmPassword = getString(formData, 'confirmPassword')
    const phone = getString(formData, 'phone')
    const address = getString(formData, 'address')

    if(!firstName) return { success: false, status: 409, message: 'firstname is required' }
    if(!lastName) return { success: false, status: 409, message: 'lastname is required' }
    if(!email) return { success: false, status: 409, message: 'email is required' }
    if(!password) return { success: false, status: 409, message: 'password is required' }
    if(confirmPassword !== password ) return { success: false, status: 409, message: 'passwords do not match' }

    let result = null
    try {
        result = await signup({
            name: `${firstName}  ${lastName}`,
            email,
            password,
            phone: phone || undefined,
            address: address || undefined,
            image: undefined,
        })
    } catch (error) {
        console.log('failed to create an account', error)
        return { success: false, status: 500, message: 'something went wrong...' }
        
    }
    if(!result.success) {
        return { success: result.success, status: result.status, message: result.message }
    }

    redirect(`/verify-email?email=${encodeURIComponent(email)} `)

} 