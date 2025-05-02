import { toast } from "react-toastify";
import { createClient } from "./client";

const supabase = createClient();

export const insertTestCategory = async (name: string, description: string) => {
  try {
    const { error } = await supabase
      .from("test_category")
      .insert([{ name, description }]);

    if (error) {
      console.error("Error inserting data:", error.message);
      return;
    }

   toast.success("Test category created successfully!");
  } catch (err) {
    console.error("Unexpected error:", err);
    toast.error(`An error occurred : ${err}`);
  }
};

export const fetchTestCategories = async () => {
    try {
        const { data, error } = await supabase
            .from("test_category")
            .select("*");

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
