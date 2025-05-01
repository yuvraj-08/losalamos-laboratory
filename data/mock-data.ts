import type { Booking, Lab, Patient, Test, TestResult } from "../types";

// Mock data for development and testing

export const mockLabs: Lab[] = [
  {
    id: "lab-001",
    name: "Los Alamos Laboratory",
    address: "123 Science Way, Los Alamos, NM 87544",
  },
  {
    id: "lab-002",
    name: "Central Diagnostics",
    address: "456 Health Blvd, Santa Fe, NM 87501",
  },
];

export const mockTests: Test[] = [
  {
    id: "test-001",
    name: "Complete Blood Count (CBC)",
    description:
      "Measures red and white blood cells, platelets, hemoglobin, and hematocrit",
    price: 45.99,
    category: "Hematology",
  },
  {
    id: "test-002",
    name: "Lipid Panel",
    description:
      "Measures cholesterol levels including HDL, LDL, and triglycerides",
    price: 65.5,
    category: "Biochemistry",
  },
  {
    id: "test-003",
    name: "Thyroid Function Test",
    description: "Measures thyroid hormones T3, T4, and TSH",
    price: 85.75,
    category: "Endocrinology",
  },
  {
    id: "test-004",
    name: "Liver Function Test",
    description: "Measures enzymes and proteins that indicate liver function",
    price: 55.25,
    category: "Biochemistry",
  },
  {
    id: "test-005",
    name: "COVID-19 PCR Test",
    description: "Detects genetic material of the SARS-CoV-2 virus",
    price: 120.0,
    category: "Microbiology",
  },
];

export const mockPatients: Patient[] = [
  {
    id: "user-001",
    first_name: "Alice",
    last_name: "Johnson",
    email: "alice.johnson@example.com",
    gender: "female",
    dob: "1985-04-12",
    mobile: "+1 (555) 111-2233",
    address: "789 Pine St, Los Alamos, NM 87544",
  },
  {
    id: "user-002",
    first_name: "Bob",
    last_name: "Smith",
    email: "bob.smith@example.com",
    gender: "male",
    dob: "1978-09-23",
    mobile: "+1 (555) 444-5566",
    address: "101 Oak Ave, Santa Fe, NM 87501",
  },
  {
    id: "user-003",
    first_name: "Carla",
    last_name: "Martinez",
    email: "carla.martinez@example.com",
    gender: "female",
    dob: "1990-12-02",
    mobile: "+1 (555) 777-8899",
    address: "202 Maple Dr, Albuquerque, NM 87102",
  },
];

export const mockBookings: Booking[] = [
  {
    id: "booking-001",
    payment_status: "paid",
    user_id: "user-001",
    status: "completed",
    date: "2023-11-15",
    lab: "lab-001",
    total_price: 197.24,
  },
  {
    id: "booking-002",
    payment_status: "pending",
    user_id: "user-001",
    status: "in-progress",
    date: "2023-12-05",
    lab: "lab-002",
    total_price: 120.0,
  },
  {
    id: "booking-003",
    payment_status: "paid",
    user_id: "user-002",
    status: "completed",
    date: "2023-10-20",
    lab: "lab-001",
    total_price: 151.25,
  },
  {
    id: "booking-004",
    payment_status: "failed",
    user_id: "user-003",
    status: "cancelled",
    date: "2023-11-30",
    lab: "lab-002",
    total_price: 85.75,
  },
  {
    id: "booking-005",
    payment_status: "paid",
    user_id: "user-003",
    status: "pending",
    date: "2023-12-10",
    lab: "lab-001",
    total_price: 166.74,
  },
];

export const mockTestResults: TestResult[] = [
  {
    id: "result-001",
    booking_id: "booking-001",
    test_id: "test-001",
    result_value:
      "Normal range. RBC: 4.8 million/μL, WBC: 7,500/μL, Platelets: 250,000/μL",
    remarks: "All values within normal range",
    linkToReport: "/reports/cbc-report-001.pdf",
    performed_at: "2023-11-16T14:30:00",
    status: "completed",
  },
  {
    id: "result-002",
    booking_id: "booking-001",
    test_id: "test-002",
    result_value:
      "Total Cholesterol: 185 mg/dL, HDL: 55 mg/dL, LDL: 110 mg/dL, Triglycerides: 100 mg/dL",
    remarks: "Cholesterol levels are within acceptable range",
    linkToReport: "/reports/lipid-report-001.pdf",
    performed_at: "2023-11-16T15:00:00",
    status: "completed",
  },
  {
    id: "result-003",
    booking_id: "booking-002",
    test_id: "test-005",
    result_value: null,
    remarks: null,
    linkToReport: null,
    performed_at: null,
    status: "pending",
  },
  {
    id: "result-004",
    booking_id: "booking-003",
    test_id: "test-003",
    result_value: "TSH: 2.5 mIU/L, T3: 120 ng/dL, T4: 8.5 μg/dL",
    remarks: "Thyroid function normal",
    linkToReport: "/reports/thyroid-report-001.pdf",
    performed_at: "2023-10-21T10:15:00",
    status: "completed",
  },
  {
    id: "result-005",
    booking_id: "booking-003",
    test_id: "test-004",
    result_value: "ALT: 25 U/L, AST: 28 U/L, ALP: 70 U/L, Bilirubin: 0.8 mg/dL",
    remarks: "Liver function normal",
    linkToReport: "/reports/liver-report-001.pdf",
    performed_at: "2023-10-21T10:45:00",
    status: "completed",
  },
  {
    id: "result-006",
    booking_id: "booking-005",
    test_id: "test-001",
    result_value: null,
    remarks: null,
    linkToReport: null,
    performed_at: null,
    status: "in-progress",
  },
  {
    id: "result-007",
    booking_id: "booking-005",
    test_id: "test-004",
    result_value: null,
    remarks: null,
    linkToReport: null,
    performed_at: null,
    status: "pending",
  },
];

// Helper function to get a patient's bookings
export const getPatientBookings = (patientId: string): Booking[] => {
  return mockBookings.filter((booking) => booking.user_id === patientId);
};

// Helper function to get booking details with lab info
export const getBookingWithDetails = (
  bookingId: string
): Booking | undefined => {
  const booking = mockBookings.find((b) => b.id === bookingId);
  if (!booking) return undefined;

  const lab = mockLabs.find((l) => l.id === booking.lab);
  return {
    ...booking,
    lab_details: lab,
  };
};

// Helper function to get test results for a booking
export const getTestResultsForBooking = (bookingId: string): TestResult[] => {
  return mockTestResults
    .filter((result) => result.booking_id === bookingId)
    .map((result) => {
      const test = mockTests.find((t) => t.id === result.test_id);
      return {
        ...result,
        test,
      };
    });
};

// Helper function to get a patient by ID
export const getPatientById = (patientId: string): Patient | undefined => {
  return mockPatients.find((patient) => patient.id === patientId);
};

// Helper function to get all tests for a booking
export const getTestsForBooking = (bookingId: string): Test[] => {
  const results = getTestResultsForBooking(bookingId);
  return results.map((result) => result.test!).filter(Boolean);
};
