"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { gsap } from "gsap";
import {
  ArrowLeft,
  Calendar,
  DollarSign,
  FileText,
  MapPin,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/status-badge";
import { TestResultCard } from "@/components/test-result-card";
import { Separator } from "@/components/ui/separator";
import type { TestResult } from "@/types";
import { createClient } from "@/utils/supabase/client";
import { useCurrentUser } from "@/providers/AuthProvider";

export default function PatientBookingDetailsPage() {
  const router = useRouter();
  const { appUser } = useCurrentUser();
  const [isLoading, setIsLoading] = useState(true);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const bookingId = useSearchParams().get("bookingId") || "";
  const [booking, setBooking] = useState<any>(null);
  const [lab, setLab] = useState<any>(null);
  const [patient, setPatient] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const supabase = createClient();
      // Fetch booking details
      const { data: bookingData } = await supabase
        .from("bookings")
        .select("*, lab_branches(*), user_id:users(*)")
        .eq("id", bookingId)
        .single();
      console.log("bookingData", bookingData);
      setBooking(bookingData);
      setLab(bookingData?.lab_branches || null);
      setPatient(bookingData?.user || appUser || null);
      // Fetch test results
      const { data: testResultsData } = await supabase
        .from("tests_bookings")
        .select("*, test_id:tests(*)")
        .eq("booking_id", bookingId);

      console.log("testResultsData", testResultsData);
      setTestResults(testResultsData || []);
      setIsLoading(false);
    }
    if (bookingId) fetchData();
    // GSAP animations
    const timer = setTimeout(() => {
      const timeline = gsap.timeline({ delay: 0.5 });
      timeline.fromTo(
        ".page-header",
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5 }
      );
      timeline.fromTo(
        ".booking-info",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 },
        "-=0.3"
      );
      timeline.fromTo(
        ".test-result-card",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.3 },
        "-=0.2"
      );
      return () => timeline.kill();
    }, 500);
    return () => clearTimeout(timer);
  }, [bookingId, appUser]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <span className="text-gray-500">Loading booking details...</span>
      </div>
    );
  }
  if (!booking) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-800">
            Booking not found
          </h2>
          <p className="mt-2 text-gray-500">
            The booking you're looking for doesn't exist or you don't have
            permission to view it.
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => router.push("/dashboard?tab=bookings")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to My Bookings
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center mb-6 page-header max-sm:flex-col">
        <Button
          variant="ghost"
          size="sm"
          className="mr-4"
          onClick={() => router.push("/dashboard?tab=bookings")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to My Bookings
        </Button>
        <div className="flex">
          <div className="w-1 h-6 bg-teal-600 mr-3"></div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Booking Details
          </h1>
        </div>
      </div>

      <div className="grid gap-6">
        <Card className="booking-info border-gray-200 shadow-sm">
          <CardHeader className="bg-gradient-to-r from-teal-600/10 to-teal-600/5 border-b pb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <CardTitle className="text-xl text-gray-800 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-teal-600" />
                Booking Information
              </CardTitle>
              <div className="flex items-center gap-3">
                <StatusBadge status={booking.status} />
                <StatusBadge status={booking.payment_status} type="payment" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Booking ID
                  </h3>
                  <p className="mt-1 text-base font-medium">{booking.id}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Date</h3>
                  <p className="mt-1 text-base">
                    {new Date(booking.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Lab</h3>
                  <p className="mt-1 text-base">{lab?.name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Lab Address
                  </h3>
                  <p className="mt-1 text-base flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-gray-400 mt-1 flex-shrink-0" />
                    <span>{lab?.address}</span>
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Total Price
                  </h3>
                  <p className="mt-1 text-base font-medium flex items-center gap-1">
                    <DollarSign className="h-4 w-4" />
                    {booking.total_price.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-teal-600" />
            <h2 className="text-xl font-semibold text-gray-800">
              Test Results
            </h2>
          </div>

          <Separator />

          <div className="grid grid-cols-1 gap-4">
            {testResults?.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <FileText className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <p>No tests found for this booking</p>
              </div>
            ) : (
              testResults?.map((result) => (
                <div key={result.id} className="test-result-card">
                  <TestResultCard
                    test={result.test_id}
                    result={result}
                    isAdmin={false}
                    onResultUpdate={() => {}}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
