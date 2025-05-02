"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";
import { usePathname } from "next/navigation";
import { IExtendedUser } from "@/types";

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

  const fetchSession = async () => {
    const { data } = await supabase.auth.getSession();
    const sessionUser = data.session?.user ?? null;

    setSession(data.session);
    setUser(sessionUser);
    setLoading(false);

    if (sessionUser?.id) {
      await fetchAppUser(sessionUser.id);
    } else {
      setAppUser(null);
    }
  };

  const fetchAppUser = async (authId: string) => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("auth_id", authId)
      .single();

    if (!error && data) {
      setAppUser(data as IExtendedUser);
    } else {
      setAppUser(null);
      console.error("Error fetching app user:", error?.message);
    }
  };

  useEffect(() => {
    const getInitialSession = async () => {
      const { data } = await supabase.auth.getSession();
      const sessionUser = data.session?.user ?? null;

      setSession(data.session);
      setUser(sessionUser);
      setLoading(false);

      if (sessionUser?.id) {
        await fetchAppUser(sessionUser.id);
      }
    };

    getInitialSession();

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

    return () => listener.subscription.unsubscribe();
  }, []);

  // Refresh on route change
  useEffect(() => {
    fetchSession();
  }, [pathname]);

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
