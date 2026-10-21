export type User = {
    id: string
    name: string | null
    email: string | null
    password?: string
    phone?: number
    address?: string 
    image: string | null
    isActive?: boolean | null
    isVerified?: boolean | null
    verificationToken?: string
    verificationTokenExpiresAt?: Date
    passwordResetToken?: string
    passwordResetTokenExpiresAt?: Date
    lastLoggingAt?: Date 
    createdAt?: string
    updatedAt?: string
}

export type GoogleUserInput = {
  googleId: string;
  email: string;
  name?: string | null;
  image?: string | null;
  emailVerified: boolean;
};

export type SafeUser = Omit<User,'_id' | 'password'> & {_id: string}

export type CreateUserInput = {
    name: string
    email: string
    password: string
    phone?: string
    address?: string
    image?: string
    isActive?: boolean
    isVerified?: boolean
    verificationToken?: string
    verificationTokenExpiresAt?: Date
    passwordResetToken?: string
    passwordResetTokenExpiresAt?: Date
    lastLoggingAt?: Date 
    createdAt?: string
    updatedAt?: string
}

export type UpdateUserInput = {
    name?: string
    phone?: number
    address?: string
    image?: string
}