import { IFormValues } from "@/types";
import { toast } from "react-toastify";
import { createClient } from "./client";

export const handleSignUpAction = async (data: IFormValues) => {
  const {
    password,
    confirmPassword,
    dob,
    mobile,
    firstName,
    lastName,
    ...rest
  } = data;
  const email = data.email;
  const origin = window.location.origin;
  const supabase = await createClient();

  if (!email || !password) {
    toast.error("Email and password are required");
    return;
  }

  const { error, data: userDataSupa } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error(error.code + " " + error.message);
    toast.error(error.message);
    return;
  }

  const userData = {
    ...rest,
    email: data.email,
    first_name: firstName,
    last_name: lastName || null,
    date_of_birth: new Date(dob).toISOString().split("T")[0], // Converts to 'YYYY-MM-DD'
    gender: data.gender,
    address: data.address,
    phone: mobile,
    role: "user",
    auth_id: userDataSupa.user?.id || null,
  };

  const { data: user, error: userError } = await supabase
    .from("users")
    .insert([{ ...userData }]);

  if (userError) {
    console.error("Supabase insert error:", userError);
    toast.error(userError?.message || "Failed to save user data");
    return;
  }

  console.log(user, "userData");
  toast.success(
    "Please check your email for a verification link."
  );

  console.log(data, "formDatatatatata");
};
