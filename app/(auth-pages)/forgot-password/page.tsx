import { forgotPasswordAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

// Server Component
export default async function ForgotPassword(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  return (
    <div className="flex min-h-screen flex-col lg:flex-row w-full">
      {/* Left Column - Image/Branding */}
      <div className="hidden bg-teal-700 relative lg:flex lg:w-1/2 lg:items-center lg:justify-center p-8">
        <div className="max-w-md text-white ">
          <h1 className="text-4xl font-bold mb-6">Forgot your password?</h1>
          <p className="text-lg mb-8">
            Enter your email address and we’ll send you a link to reset your
            password.
          </p>
          <div className="absolute inset-0 bg-teal-500/20 rounded-lg max-w-[90%] mx-auto max-h-[90vh] my-auto"></div>
        </div>
      </div>

      {/* Right Column - Form */}
      <div className="flex-1 p-6 lg:p-8 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-teal-700">Reset Password</h2>
            <p className="text-gray-500 mt-2">
              Already have an account?{" "}
              <Link href="/sign-in" className="text-teal-600 hover:underline">
                Sign in
              </Link>
            </p>
          </div>
          <form className="space-y-6" action={forgotPasswordAction}>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                className="mt-2"
              />
            </div>
            <SubmitButton
              className="w-full bg-teal-600 hover:bg-teal-700"
              pendingText="Sending..."
            >
              Reset Password
            </SubmitButton>
            <FormMessage message={searchParams} />
          </form>
        </div>
      </div>
    </div>
  );
}
