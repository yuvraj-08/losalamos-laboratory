"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LayoutDashboard, LogOut, User } from "lucide-react"
import { createClient } from "@/utils/supabase/client";
import { getUserInitials } from "@/utils/text";
import { useCurrentUser } from "@/providers/AuthProvider";

const supabase = createClient();

export function UserDropdown() {
  const router = useRouter();
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const {user, appUser} = useCurrentUser();

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Logged out successfully");
      router.push("/sign-in");
    } catch (error: any) {
      toast.error("Error logging out: " + error.message);
    } finally {
      setShowUserMenu(false);
    }
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target as Node)
      ) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div className="relative" ref={userDropdownRef}>
      <button
        onClick={() => setShowUserMenu(!showUserMenu)}
        className="flex items-center justify-center bg-emerald-600 text-white rounded-full h-8 w-8 font-medium hover:bg-emerald-700 transition-colors"
      >
        {getUserInitials(appUser?.first_name || "")}
      </button>

      {showUserMenu && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-30">
          <Link
            href="/dashboard"
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 cursor-pointer"
          >
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Dashboard
          </Link>
          <Link
            href="/dashboard?tab=profile"
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 cursor-pointer"
          >
            <User className="mr-2 h-4 w-4" />
            Profile
          </Link>
          <button
            onClick={handleSignOut}
            className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 cursor-pointer"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
