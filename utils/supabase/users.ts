import { toast } from "react-toastify";
import { createClient } from "./client";
import { User } from "@/types";
import { supabaseAdmin } from "./supaAdmin";

const supabase = createClient();

/**
 *
 * USER Related Queries
 */
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

export const fetchUserById = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching user by ID:", error.message);
      return null;
    }

    return data;
  } catch (err) {
    console.error("Unexpected error:", err);
    toast.error(`An error occurred: ${err}`);
    return null;
  }
};

export const updateUser = async (userData: User) => {
  try {
    const {
      id,
      first_name,
      last_name,
      email,
      gender,
      date_of_birth,
      phone,
      address,
    } = userData;

    const { data, error } = await supabase
      .from("users")
      .update({
        first_name,
        last_name,
        email,
        gender,
        date_of_birth,
        phone,
        address,
      })
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error updating user:", error.message);
      toast.error(`Failed to update user: ${error.message}`);
      return null;
    }

    toast.success("User updated successfully!");
    return data;
  } catch (err) {
    console.error("Unexpected error:", err);
    toast.error(`An error occurred: ${err}`);
    return null;
  }
};

export const deleteUser = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .delete()
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error deleting user:", error.message);
      toast.error(`Failed to delete user: ${error.message}`);
      return null;
    }

    return data;
  } catch (err) {
    console.error("Unexpected error:", err);
    toast.error(`An error occurred: ${err}`);
    return null;
  }
};

export const deleteUserFromAuth = async (id: string) => {
  try {
    const { error } = await supabaseAdmin.auth.admin.deleteUser(id);

    if (error) {
      console.error("Error deleting user from auth:", error.message);
      toast.error(`Failed to delete user from auth: ${error.message}`);
      return false;
    }

    toast.success("User deleted successfully!");
    return true;
  } catch (err) {
    console.error("Unexpected error:", err);
    toast.error(`An error occurred: ${err}`);
    return false;
  }
};

export const updateCurrentUserProfile = async (userData: Partial<User>) => {
  try {
    if (!userData.id) {
      toast.error("User ID is required to update profile.");
      return null;
    }

    const { id, ...fieldsToUpdate } = userData;

    const { data, error } = await supabase
      .from("users")
      .update(fieldsToUpdate)
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error updating profile:", error.message);
      toast.error(`Failed to update profile: ${error.message}`);
      return null;
    }

    toast.success("Profile updated successfully!");
    return data;
  } catch (err) {
    console.error("Unexpected error:", err);
    toast.error(`An error occurred: ${err}`);
    return null;
  }
};

/**
 *
 * BOOKING Related Queries
 */
export const fetchAllBookings = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from("bookings")
      .select("*, users(*), lab_branches(*)")
      .eq("user_id", id);

    if (error) {
      console.error("Error fetching user by ID:", error.message);
      return null;
    }

    return data;
  } catch (err) {
    console.error("Unexpected error:", err);
    toast.error(`An error occurred: ${err}`);
    return null;
  }
};
