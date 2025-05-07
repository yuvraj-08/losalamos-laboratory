// Fetch the most recent booking for a user (by created_at desc)
export async function fetchLatestBookingIdForUser(user_id: string) {
  try {
    const { data, error } = await supabase
      .from("bookings")
      .select("id, created_at")
      .eq("user_id", user_id)
      .order("created_at", { ascending: false })
      .limit(1);
    if (error) {
      toast.error("Error fetching latest booking: " + error.message);
      return null;
    }
    return data && data.length > 0 ? data[0].id : null;
  } catch (err) {
    console.error("Error fetching latest booking:", err);
    toast.error("Failed to fetch latest booking. Please try again.");
    return null;
  }
}
import { toast } from "react-toastify";
import { createClient } from "./client";

const supabase = createClient();

export async function createBooking(addBookingsPayload: any) {
  try {
    const { data, error } = await supabase
      .from("bookings")
      .insert(addBookingsPayload);

    if (error) {
      toast.error("Error inserting data into bookings: " + error.message);
    }
    // toast.success("Your booking has been submitted successfully.");
    return data;
  } catch (err) {
    console.error("Error inserting data into bookings:", err);
    toast.error("Failed to create booking. Please try again.");
  }
}

export async function insertTestsBooking(addBookingsPayload: any) {
  try {
    const { data, error } = await supabase
      .from("tests_bookings")
      .insert(addBookingsPayload);

    if (error) {
      toast.error("Error inserting data into tests_bookings: " + error.message);
    }
    toast.success("Your booking has been submitted successfully.");
    return data;
  } catch (err) {
    console.error("Error inserting data into bookings:", err);
    toast.error("Failed to create booking. Please try again.");
  }
}

