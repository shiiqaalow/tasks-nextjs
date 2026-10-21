import { redirect } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import VerifyEmailForm from '../../components/VerifyEmailForm'

const VerifyEmailPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>
}) => {
  const { email } = await searchParams
  if (!email) redirect('/signup')

  return (
    <div className="min-h-screen flex justify-center items-center">
      <Card className="max-w-md w-full">
        <CardContent className="flex flex-col gap-3">
          <CardHeader className="text-2xl text-center font-semibold">Verify Your Email</CardHeader>
          <CardDescription className="text-sm text-center">
            We have sent a code to <span className='font-bold'>({email})</span> Check your mail box or spam folder.
          </CardDescription>
          <CardDescription className="text-xl text-center">Enter your 6 digit code</CardDescription>
          <VerifyEmailForm email={email} />
        </CardContent>
      </Card>
    </div>
  )
}

export default VerifyEmailPage