import { toast } from "react-toastify";
import { createClient } from "./client";
import { TestFormValues } from "@/components/tests/create-test-form";

const supabase = createClient();

// This function inserts a new test into the "tests" table in Supabase
export const insertTest = async (data: TestFormValues) => {
  try {
    const { error } = await supabase.from("tests").insert([{ ...data }]);

    if (error) {
      console.error("Error inserting data:", error.message);
      return;
    }

    toast.success("Test created successfully!");
  } catch (err) {
    console.error("Unexpected error:", err);
    toast.error(`An error occurred : ${err}`);
  }
};

// Function to fetch all test from the "tests" table in Supabase
export const fetchTests = async () => {
  try {
    const { data, error } = await supabase.from("tests").select(`
        *,
        test_category (
          id,
          name,
          description
        )
      `);

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

//Function to delete a test in the "tests" table in Supabase
export const deleteTest = async (id: string) => {
  try {
    const { error } = await supabase.from("tests").delete().eq("id", id);

    if (error) {
      console.error("Error deleting data:", error.message);
      return;
    }

    toast.success("Test deleted successfully!");
  } catch (err) {
    console.error("Unexpected error:", err);
    toast.error(`An error occurred : ${err}`);
  }
};
export const updateTest = async (id: string, data: TestFormValues) => {
  try {
    const { error } = await supabase
      .from("tests")
      .update({ ...data })
      .eq("id", id);

    if (error) {
      console.error("Error updating data:", error.message);
      return;
    }

    toast.success("Test updated successfully!");
  } catch (err) {
    console.error("Unexpected error:", err);
    toast.error(`An error occurred : ${err}`);
  }
};

// Function to insert a new test category into the "test_category" table in Supabase
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

// Function to fetch all test categories from the "test_category" table in Supabase
export const fetchTestCategories = async () => {
  try {
    const { data, error } = await supabase.from("test_category").select("*");

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
