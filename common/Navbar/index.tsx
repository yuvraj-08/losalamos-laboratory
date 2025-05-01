"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import React, { use, useEffect, useRef, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { gsap } from "gsap";
import { UserDropdown } from "../UserDropdown";
import { useCurrentUser } from "@/providers/AuthProvider";
import { getUserInitials } from "@/utils/text";
import { createClient } from "@/utils/supabase/client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const testCategories = [
  {
    category: "Blood Tests",
    tests: ["CBC", "Blood Sugar", "Cholesterol", "Liver Function"],
  },
  {
    category: "Imaging Tests",
    tests: ["X-Ray", "MRI", "CT Scan", "Ultrasound"],
  },
];

const Navbar = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const { user } = useCurrentUser();
  // GSAP animations for tests dropdown
  const handleMouseEnter = () => {
    if (dropdownRef.current) {
      gsap.killTweensOf(dropdownRef.current);
      gsap.to(dropdownRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
        display: "block",
      });
    }
  };

  const handleMouseLeave = () => {
    if (dropdownRef.current) {
      gsap.killTweensOf(dropdownRef.current);
      gsap.to(dropdownRef.current, {
        autoAlpha: 0,
        y: -10,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          if (dropdownRef.current) {
            dropdownRef.current.style.display = "none";
          }
        },
      });
    }
  };
  const supabase = createClient();
  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Logged out successfully");
      router.push("/sign-in");
    } catch (error: any) {
      toast.error("Error logging out: " + error.message);
    }
  };

  useEffect(() => {
    if (dropdownRef.current) {
      gsap.set(dropdownRef.current, { autoAlpha: 0, y: -10, display: "none" });
    }
  }, []);

  return (
    <>
      <header className="bg-emerald-50 py-4 px-4 md:px-8">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div>
                <span className="text-emerald-600 font-bold text-xl">
                  Los Alamos
                </span>
                <span className="text-gray-600 block text-xs">LABORATORY</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navbar */}
          <nav className="hidden sm:flex flex-wrap justify-center gap-6 text-sm items-center">
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button className="flex items-center hover:text-emerald-600 font-medium">
                Tests <ChevronDown className="h-4 w-4 ml-1" />
              </button>
              <div
                ref={dropdownRef}
                className="absolute bg-white shadow-md rounded-md mt-2 py-2 w-56 z-20"
              >
                {testCategories.map((category, idx) => (
                  <div key={idx} className="px-4 py-2">
                    <p className="font-semibold text-emerald-700">
                      {category.category}
                    </p>
                    <ul className="mt-1 space-y-1">
                      {category.tests.map((test, index) => (
                        <li key={index}>
                          <Link
                            href="#"
                            className="block text-gray-600 hover:text-emerald-600 text-sm"
                          >
                            - {test}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <Link
              href="/about-us"
              className="hover:text-emerald-600 font-medium"
            >
              About Us
            </Link>

            {/* Conditional rendering based on auth state */}
            {!user ? (
              <>
                <Link
                  href="/sign-in"
                  className="hover:text-emerald-600 font-medium"
                >
                  Login
                </Link>
                <Link
                  href="/sign-up"
                  className="hover:text-emerald-600 font-medium"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <UserDropdown />
            )}
          </nav>

          {/* Mobile Drawer */}
          <div className="flex sm:hidden items-center">
            <Drawer
              direction="right"
              open={openDrawer}
              onOpenChange={setOpenDrawer}
            >
              <DrawerTrigger asChild>
                <button className="text-emerald-600">
                  {openDrawer ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </button>
              </DrawerTrigger>
              <DrawerContent className="h-full w-[80%] ml-auto shadow-lg flex flex-col p-6">
                <DrawerTitle></DrawerTitle>
                {/* Close Button */}
                <button
                  onClick={() => setOpenDrawer(false)}
                  className="self-end text-gray-500 hover:text-emerald-600"
                >
                  <X className="h-6 w-6" />
                </button>

                {/* Mobile User Info */}
                {user && (
                  <div className="flex items-center mb-6 mt-4">
                    <div className="flex items-center justify-center bg-emerald-600 text-white rounded-full h-10 w-10 font-medium">
                      {getUserInitials(user.email ?? "")}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        {user.user_metadata?.full_name || user.email}
                      </p>
                    </div>
                  </div>
                )}

                {/* Menu Links */}
                <div className="mt-6 space-y-4">
                  <Accordion type="multiple">
                    <AccordionItem value="tests">
                      <AccordionTrigger>Tests</AccordionTrigger>
                      <AccordionContent>
                        {testCategories.map((category, idx) => (
                          <div key={idx} className="mb-4">
                            <p className="font-semibold text-emerald-700">
                              {category.category}
                            </p>
                            <ul className="mt-1 space-y-1 ml-4">
                              {category.tests.map((test, index) => (
                                <li key={index}>
                                  <Link
                                    href="#"
                                    onClick={() => setOpenDrawer(false)} // close on click
                                    className="block text-gray-600 hover:text-emerald-600 text-sm"
                                  >
                                    - {test}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </AccordionContent>
                    </AccordionItem>

                    <Link
                      href="/about-us"
                      onClick={() => setOpenDrawer(false)}
                      className="block text-gray-600 hover:text-emerald-600 py-2"
                    >
                      About Us
                    </Link>

                    {/* Conditional rendering for mobile */}
                    {!user ? (
                      <>
                        <AccordionItem value="login">
                          <AccordionTrigger>Login</AccordionTrigger>
                          <AccordionContent>
                            <Link
                              href="/sign-in"
                              onClick={() => setOpenDrawer(false)}
                              className="block text-gray-600 hover:text-emerald-600 py-2"
                            >
                              Login
                            </Link>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="signup">
                          <AccordionTrigger>Sign Up</AccordionTrigger>
                          <AccordionContent>
                            <Link
                              href="/sign-up"
                              onClick={() => setOpenDrawer(false)}
                              className="block text-gray-600 hover:text-emerald-600 py-2"
                            >
                              Sign Up
                            </Link>
                          </AccordionContent>
                        </AccordionItem>
                      </>
                    ) : (
                      <>
                        <Link
                          href="/dashboard"
                          className="block text-gray-600 hover:text-emerald-600 py-2"
                        >
                          Dashboard
                        </Link>

                        <Link
                          href="/profile"
                          onClick={() => setOpenDrawer(false)}
                          className="block text-gray-600 hover:text-emerald-600 py-2"
                        >
                          Profile
                        </Link>

                        <button
                          onClick={async () => {
                            await handleSignOut();
                            setOpenDrawer(false);
                          }}
                          className="block text-gray-600 hover:text-emerald-600 py-2 w-full text-left"
                        >
                          Logout
                        </button>
                      </>
                    )}
                  </Accordion>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
