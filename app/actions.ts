"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { error, data } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }

  return data;
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return { success: false, message: "Email is required" };
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return { success: false, message: "Could not reset password" };
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return {
    success: true,
    message: "Check your email for a link to reset your password.",
  };
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    return {
      success: false,
      message: "Password and confirm password are required",
    };
  }

  if (password !== confirmPassword) {
    return { success: false, message: "Passwords do not match" };
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    return { success: false, message: "Password update failed" };
  }

  return { success: true, message: "Password updated" };
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return { message: "Signed out successfully" };
};
