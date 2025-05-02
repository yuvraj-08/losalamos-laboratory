"use client";

import { useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { Calendar, DollarSign, Eye } from "lucide-react";

import type { Booking } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "../status-badge";

type BookingListProps = {
  bookings: Booking[];
  isAdmin?: boolean;
  patientId?: string;
};

export function BookingList({
  bookings,
  isAdmin = false,
  patientId,
}: BookingListProps) {
  useEffect(() => {
    const timeline = gsap.timeline();

    timeline.fromTo(
      ".booking-row",
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.3 }
    );

    return () => {
      timeline.kill();
    };
  }, [bookings]);

  const baseUrl = isAdmin
    ? `/dashboard?tab=adminViewBooking&patientId=${patientId}&bookingId`
    : `/dashboard?tab=viewBooking&bookingId`;

  return (
    <Card className="border-gray-200 shadow-sm">
      <CardHeader className="bg-gradient-to-r from-teal-600/10 to-teal-600/5 border-b pb-6">
        <CardTitle className="text-xl text-gray-800 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-teal-600" />
          Bookings
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Booking ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Lab</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Total</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-8 text-gray-500"
                  >
                    No bookings found
                  </TableCell>
                </TableRow>
              ) : (
                bookings.map((booking, index) => (
                  <TableRow key={booking.id} className="booking-row">
                    <TableCell className="font-medium">{booking.id}</TableCell>
                    <TableCell>
                      {new Date(booking.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </TableCell>
                    <TableCell>
                      {booking.lab_details?.name || booking.lab}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={booking.status} />
                    </TableCell>
                    <TableCell>
                      <StatusBadge
                        status={booking.payment_status}
                        type="payment"
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-3.5 w-3.5" />
                        {booking.total_price.toFixed(2)}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        className="text-teal-600 hover:text-teal-700 hover:bg-teal-50"
                      >
                        <Link href={`${baseUrl}=${booking.id}`}>
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
