"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";
import { usePathname } from "next/navigation";
import { IExtendedUser } from "@/types";
import Loader from "@/app/loading";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  appUser: IExtendedUser | null;
  loading: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setSession: React.Dispatch<React.SetStateAction<Session | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const supabase = createClient();

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [appUser, setAppUser] = useState<IExtendedUser | null>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  const fetchAppUser = async (authId: string) => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("auth_id", authId)
        .single();

      if (error) {
        console.error("Error fetching app user:", error.message);
        setAppUser(null);
        return;
      }

      setAppUser(data as IExtendedUser);
    } catch (err) {
      console.error("Unexpected error fetching app user:", err);
      setAppUser(null);
    }
  };

  const fetchSessionAndUser = async () => {
    try {
      setLoading(true);

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
      console.error("Error fetching session:", err);
      setSession(null);
      setUser(null);
      setAppUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessionAndUser();

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
      listener.subscription?.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (user?.id) {
      fetchAppUser(user.id);
    }
  }, [pathname]);

  if (loading) {
    return <Loader />;
  }

  return (
    <AuthContext.Provider
      value={{ user, session, appUser, loading, setUser, setSession }}
    >
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
