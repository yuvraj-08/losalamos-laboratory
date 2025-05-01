// Define all the types we'll use across the application

export type Patient = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  dob: string;
  mobile: string;
  address: string;
};

export type Lab = {
  id: string;
  name: string;
  address: string;
};

export type Booking = {
  id: string;
  payment_status: "paid" | "pending" | "failed" | null;
  user_id: string;
  status: "completed" | "pending" | "cancelled" | "in-progress" | null;
  date: string;
  lab: string;
  lab_details?: Lab;
  total_price: number;
  tests?: Test[];
};

export type Test = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
};

export type TestResult = {
  id: string;
  booking_id: string;
  test_id: string;
  test?: Test;
  result_value: string | null;
  remarks: string | null;
  linkToReport: string | null;
  performed_at: string | null;
  status: "pending" | "completed" | "in-progress";
};
