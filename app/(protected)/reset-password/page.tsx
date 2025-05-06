import { resetPasswordAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default async function ResetPassword(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  return (
    <div className="flex min-h-screen flex-col items-center justify-center w-full bg-white">
      <div className="w-full max-w-md p-6 lg:p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-teal-700">Reset Password</h2>
          <p className="text-gray-500 mt-2">
            Please enter your new password below.
          </p>
        </div>
        <form className="space-y-6" action={resetPasswordAction}>
          <div>
            <Label htmlFor="password">New password</Label>
            <Input
              type="password"
              name="password"
              placeholder="New password"
              required
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="confirmPassword">Confirm password</Label>
            <Input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              required
              className="mt-2"
            />
          </div>
          <SubmitButton className="w-full bg-teal-600 hover:bg-teal-700">
            Reset password
          </SubmitButton>
          <FormMessage message={searchParams} />
        </form>
      </div>
    </div>
  );
}
