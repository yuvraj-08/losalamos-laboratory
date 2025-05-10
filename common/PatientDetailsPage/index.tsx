"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { createClient } from "@/utils/supabase/client";
import { useCurrentUser } from "@/providers/AuthProvider";

import { BookingList } from "@/components/booking-list";
import { Loader } from "lucide-react";

export default function PatientBookingsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const { appUser } = useCurrentUser();
  const [patient, setPatient] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      if (!appUser?.id) {
        setIsLoading(false);
        return;
      }
      const supabase = createClient();
      // Fetch patient info
      const { data: patientData } = await supabase
        .from("users")
        .select("*")
        .eq("id", appUser.id)
        .single();
      setPatient(patientData);
      // Fetch bookings for patient
      const { data: bookingsData } = await supabase
        .from("bookings")
        .select("*, lab_branches(*)")
        .eq("user_id", appUser.id)
        .order("date", { ascending: false });
      setBookings(bookingsData || []);
      setIsLoading(false);
    }
    fetchData();
  }, [appUser]);

  useEffect(() => {
    if (isLoading || !patient) return;
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
      timeline.kill();
    };
  }, [patient, isLoading]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center py-12">
          <Loader className="animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center mb-6 page-header opacity-0 -translate-y-5">
        <div className="w-1 h-6 bg-teal-600 mr-3"></div>
        <h1 className="text-2xl font-semibold text-gray-800">My Bookings</h1>
      </div>

      <div className="bookings-list  opacity-0 translate-y-5">
        <BookingList bookings={bookings} />
      </div>
    </div>
  );
}
