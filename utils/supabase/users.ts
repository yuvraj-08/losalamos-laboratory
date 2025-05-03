import { toast } from "react-toastify";
import { createClient } from "./client";

const supabase = createClient();

export const fetchUsers = async () => {
  try {
    const { data, error } = await supabase.from("users").select("*");

    if (error) {
      console.error("Error fetching data:", error.message);
      return [];
    }

    return data;
  } catch (err) {
    console.error("Unexpected error:", err);
    toast.error(`An error occurred: ${err}`);
    return [];
  }
};
