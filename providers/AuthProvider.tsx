"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";
import { usePathname } from "next/navigation";
import { IExtendedUser } from "@/types";
import Loader from "@/app/loading";

interface AuthContextType {
  user: User | null; // Supabase auth user
  session: Session | null;
  appUser: IExtendedUser | null; // Row from 'users' table
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const supabase = createClient();

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [appUser, setAppUser] = useState<IExtendedUser | null>(null);
  const [loading, setLoading] = useState(true);

  const pathname = usePathname();

  // Unified session and app user fetcher
  const fetchSessionAndUser = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;
      const sessionUser = data.session?.user ?? null;
      setSession(data.session);
      setUser(sessionUser);
      if (sessionUser?.id) {
        await fetchAppUser(sessionUser.id);
      } else {
        setAppUser(null);
      }
    } catch (err) {
      setSession(null);
      setUser(null);
      setAppUser(null);
      console.error("Error fetching session:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAppUser = async (authId: string) => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("auth_id", authId)
        .single();
      if (!error && data) {
        setAppUser(data as IExtendedUser);
      } else {
        setAppUser(null);
        if (error) console.error("Error fetching app user:", error?.message);
      }
    } catch (err) {
      setAppUser(null);
      console.error("Error fetching app user:", err);
    }
  };

  useEffect(() => {
    // On mount, fetch session and user
    fetchSessionAndUser();

    // Listen for auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const sessionUser = session?.user ?? null;
        setSession(session);
        setUser(sessionUser);
        if (sessionUser?.id) {
          await fetchAppUser(sessionUser.id);
        } else {
          setAppUser(null);
        }
      }
    );

    return () => {
      if (
        listener &&
        listener.subscription &&
        typeof listener.subscription.unsubscribe === "function"
      ) {
        listener.subscription.unsubscribe();
      }
    };
  }, []);

  // Optionally refresh app user on route change if session exists
  useEffect(() => {
    if (user?.id) {
      fetchAppUser(user.id);
    }
  }, [pathname]);

  if (loading) {
    return <Loader/>;
  }

  return (
    <AuthContext.Provider value={{ user, session, appUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useCurrentUser() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useCurrentUser must be used within an AuthProvider");
  }
  return context;
}
