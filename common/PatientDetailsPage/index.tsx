"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";

import {
  getBookingWithDetails,
  getPatientBookings,
  getPatientById,
} from "@/data/mock-data";
import { PatientInfoCard } from "@/components/patient-info-card";
import { BookingList } from "@/components/booking-list";

// In a real app, you would get the current user ID from authentication
const CURRENT_USER_ID = "user-001";

export default function PatientBookingsPage() {
  const [isLoading, setIsLoading] = useState(true);

  const patient = getPatientById(CURRENT_USER_ID);
  const bookings = getPatientBookings(CURRENT_USER_ID).map((booking) => {
    const bookingWithDetails = getBookingWithDetails(booking.id);
    return bookingWithDetails || booking;
  });

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    // GSAP animations
    const timeline = gsap.timeline({ delay: 0.5 });

    timeline.fromTo(
      ".page-header",
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.5 }
    );

    timeline.fromTo(
      ".patient-card",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 },
      "-=0.3"
    );

    timeline.fromTo(
      ".bookings-list",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 },
      "-=0.3"
    );

    return () => {
      clearTimeout(timer);
      timeline.kill();
    };
  }, []);

  if (!patient) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-800">
            User not found
          </h2>
          <p className="mt-2 text-gray-500">
            Please log in to view your bookings.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center mb-6 page-header">
        <div className="w-1 h-6 bg-teal-600 mr-3"></div>
        <h1 className="text-2xl font-semibold text-gray-800">My Bookings</h1>
      </div>

      <div className="bookings-list">
        <BookingList bookings={bookings} />
      </div>
    </div>
  );
}
