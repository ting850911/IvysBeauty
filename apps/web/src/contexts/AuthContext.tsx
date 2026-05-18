"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User, maskPhone } from "@ivysbeauty/shared";
import { useRouter, usePathname } from "next/navigation";

export interface AuthContextType {
  user: User | null;
  isInitializing: boolean;
  updateUser: (data: Partial<User>) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const clearSession = () => {
  sessionStorage.removeItem("booking_draft");
  sessionStorage.removeItem("booking_step");
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/me");
        if (res.ok) {
          const { data } = await res.json();
          if (data.user) {
            setUser({
              ...data.user,
              phone: data.user.phone ? maskPhone(data.user.phone) : null
            });
          } else {
            setUser(null);
          }
        }
      } catch (err) {
        console.error("Failed to fetch user session", err);
      } finally {
        setIsInitializing(false);
      }
    };

    fetchUser();
  }, []);

  // Profile completion gating
  useEffect(() => {
    if (!isInitializing && user) {
      const isMissingProfile = !user.name || !user.phone || !user.birthday;
      // Skip API routes and the complete-profile page itself
      if (isMissingProfile && pathname !== "/complete-profile" && !pathname.startsWith("/api/")) {
        router.push(`/complete-profile?redirect=${encodeURIComponent(pathname)}`);
      }
    }
  }, [user, isInitializing, pathname, router]);

  const updateUser = (data: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const maskedData = { ...data };
      if (data.phone) {
        maskedData.phone = maskPhone(data.phone);
      }
      return { ...prev, ...maskedData };
    });
  };

  const logout = async () => {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      const data = await res.json();
      
      setUser(null);
      clearSession();

      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      } else {
        router.push("/login");
      }
    } catch (e) {
      console.error(e);
      setUser(null);
      clearSession();
      router.push("/login");
    }
  };

  return (
    <AuthContext.Provider value={{ user, isInitializing, updateUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
