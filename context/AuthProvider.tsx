"use client";

import { createContext, useContext, useState, useEffect } from "react";

interface Session {
  isAuthenticated: boolean;
}

interface AuthContextType {
  session: Session | null;
  isLoading: boolean;
  getSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getSession = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/auth/check");
      if (!response.ok) throw new Error("Failed to fetch session");
      const data = await response.json();
      setSession(data);
    } catch (error) {
      console.error("Failed to get session:", error);
      setSession({ isAuthenticated: false });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSession();
  }, []);

  return (
    <AuthContext.Provider value={{ session, isLoading, getSession }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
