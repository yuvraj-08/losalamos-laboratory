import { LabBranchFormValues } from "@/components/lab-branches/create-lab-branch-form";
import { createClient } from "./client";
import { toast } from "react-toastify";

const supabase = createClient();

export async function insertLabBranch(data: LabBranchFormValues) {
  try {
    const { data: insertedData, error } = await supabase
      .from("lab_branches")
      .insert(data);

    if (error) {
      toast.error("Error inserting data into lab-branches: " + error.message);
    }
    toast.success("Lab branch created successfully!");
    return insertedData;
  } catch (err) {
    console.error("Error inserting data into lab-branches:", err);
    toast.error("Failed to create lab branch. Please try again.");
  }
}

export const fetchLabBranches = async () => {
  try {
    const { data, error } = await supabase.from("lab_branches").select("*");

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

export const updateLabBranch = async (
  id: string,
  data: LabBranchFormValues
) => {
  try {
    const { data: updatedData, error } = await supabase
      .from("lab_branches")
      .update(data)
      .eq("id", id);

    if (error) {
      console.error("Error updating data:", error.message);
      return null;
    }

    toast.success("Lab branch updated successfully!");
    return updatedData;
  } catch (err) {
    console.error("Unexpected error:", err);
    toast.error(`An error occurred: ${err}`);
    return null;
  }
};

export const deleteLabBranch = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from("lab_branches")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting data:", error.message);
      return null;
    }

    toast.success("Lab branch deleted successfully!");
    return data;
  } catch (err) {
    console.error("Unexpected error:", err);
    toast.error(`An error occurred: ${err}`);
    return null;
  }
};
