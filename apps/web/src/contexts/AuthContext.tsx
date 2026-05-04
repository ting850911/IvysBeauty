"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User, maskPhone } from "@ivysbeauty/shared";

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isInitializing: boolean;
  login: (token: string, userData: User) => void;
  updateUser: (data: Partial<User>) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);



const clearSession = () => {
  localStorage.removeItem("jwt_token");
  localStorage.removeItem("user_data");
  localStorage.removeItem("jwt_expires");
  sessionStorage.removeItem("booking_draft");
  sessionStorage.removeItem("booking_step");
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  // Hydrate state from localStorage when the app boots
  useEffect(() => {
    const storedToken = localStorage.getItem("jwt_token");
    const storedUser = localStorage.getItem("user_data");
    const storedExpires = localStorage.getItem("jwt_expires");

    if (storedToken && storedUser && storedExpires) {
      if (Date.now() > parseInt(storedExpires, 10)) {
        clearSession();
      } else {
        try {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        } catch (err) {
          console.error("Local storage sync error", err);
        }
      }
    }

    setIsInitializing(false);

    // Interval to monitor JWT token expiration
    const interval = setInterval(() => {
      const exp = localStorage.getItem("jwt_expires");
      if (exp && Date.now() > parseInt(exp, 10)) {
        clearSession();
        setToken(null);
        setUser(null);
        window.location.reload();
      }
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const login = (newToken: string, userData: User) => {
    setToken(newToken);
    const maskedUser = { ...userData, phone: maskPhone(userData.phone) };
    setUser(maskedUser);

    const isOwner = userData.role === "OWNER";
    const expiresInMs = isOwner ? 24 * 60 * 60 * 1000 : 30 * 60 * 1000;
    const expiresAt = Date.now() + expiresInMs;

    localStorage.setItem("jwt_token", newToken);
    localStorage.setItem("jwt_expires", expiresAt.toString());
    localStorage.setItem("user_data", JSON.stringify(maskedUser));
  };

  const updateUser = (data: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const maskedData = { ...data };
      if (data.phone) {
        maskedData.phone = maskPhone(data.phone);
      }
      const updatedUser = { ...prev, ...maskedData };
      localStorage.setItem("user_data", JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  const logout = async () => {
    try {
      await fetch("/api/auth", { method: "DELETE" });
    } catch (e) {
      console.error(e);
    }
    setToken(null);
    setUser(null);
    clearSession();
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider
      value={{ user, token, isInitializing, login, updateUser, logout }}
    >
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
