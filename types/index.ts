// Define all the types we'll use across the application

export type User = {
  id: string;
  first_name: string;
  last_name?: string;
  email: string;
  gender: string;
  date_of_birth: string;
  phone: string;
  address: string;
};

export interface IExtendedUser extends User {
  role?: string;
  auth_id?: string;
  created_at?: string;
  updated_at?: string;
}

export type Lab = {
  id: string;
  name: string;
  address: string;
  city?: string;
  state?: string;
  zip?: string;
  phone: string;
  email: string;
  image?: string;
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
  cost: string;
  category: string;
  preparation?: string;
  duration?: string;
  report_time?: string;
  image?: string;
  popular?: boolean;
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

export interface IFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: "male" | "female" | "other";
  date_of_birth: Date;
  phone: string;
  address: string;
}

export type TestCategory = {
  id: string;
  name: string;
  description?: string;
  image?: string;
  tests?: Test[];
};

export type CartItem = {
  test: Test;
  quantity: number;
};

export type BookingFormData = {
  date: Date;
  lab: string;
  collection_location: "lab" | "home";
  patient_details?: {
    first_name: string;
    last_name?: string;
    email: string;
    phone: string;
  };
};
