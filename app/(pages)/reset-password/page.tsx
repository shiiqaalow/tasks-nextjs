import { Card, CardContent } from "@/components/ui/card"
import ResetPasswordForm from "../../components/ResetPasswordForm"
import { redirect } from "next/navigation"

const ResetPasswordPage = async ({ searchParams }: { searchParams : Promise<{email?: string, code?: string}> }) => {
  const { email, code } = await searchParams
    if (!email || !code) redirect('/signin')
  return (
    <div className="min-h-screen flex justify-center items-center">
      <Card className="max-w-md w-full p-6">
        <CardContent>
          <ResetPasswordForm 
            email={email}
            code={code}
          />
        </CardContent>
      </Card>
    </div>
  )
}

export default ResetPasswordPage