import { toast } from "react-toastify";
import { createClient } from "./client";

const supabase = createClient();

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
    return data;
  } catch (err) {
    console.error("Error inserting data into bookings:", err);
    toast.error("Failed to create booking. Please try again.");
  }
}

export async function fetchUserBookings(bookingId: string) {
  try {
    const { data, error } = await supabase
      .from("bookings")
      .select("*, users(*), lab_branches(*)")
      .eq("id", bookingId)
      .order("created_at", { ascending: false })
      .single();

    if (error) {
      toast.error("Error fetching bookings: " + error.message);
    }
    return data;
  } catch (err) {
    console.error("Error fetching bookings:", err);
    toast.error("Failed to fetch bookings. Please try again.");
  }
}

export async function fetchBookingTests(bookingId: string) {
  try {
    const { data, error } = await supabase
      .from("tests_bookings")
      .select("*, test_id:tests(*)")
      .eq("booking_id", bookingId)
      .order("created_at", { ascending: false });

    console.log("fetchBookingTests", data, error);
    if (error) {
      toast.error("Error fetching booking tests: " + error.message);
    }
    return data;
  } catch (err) {
    console.error("Error fetching booking tests:", err);
    toast.error("Failed to fetch booking tests. Please try again.");
  }
}

export async function updateResult(testId: string, data: any) {
  try {
    const { data: updatedData, error } = await supabase
      .from("tests_bookings")
      .update(data)
      .eq("test_id", testId);

    if (error) {
      toast.error("Error updating test result: " + error.message);
    }
    return updatedData;
  } catch (err) {
    console.error("Error updating test result:", err);
    toast.error("Failed to update test result. Please try again.");
  }
}

export async function updateDocLink(testId: string, data: any) {
  try {
    const { data: updatedData, error } = await supabase
      .from("tests_bookings")
      .update(data)
      .eq("test_id", testId);

    if (error) {
      toast.error("Error updating document link: " + error.message);
    }
    return updatedData;
  } catch (err) {
    console.error("Error updating document link:", err);
    toast.error("Failed to update document link. Please try again.");
  }
}
