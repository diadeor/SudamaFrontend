"use client";
import { useContext, useState, useEffect, createContext } from "react";
import { ReactNode } from "react";
import { User } from "../functions/types";

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}
export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside the AuthProvider");
  }
  return context;
};

const AuthProvider = ({ children, userData }: { children: ReactNode; userData: User | null }) => {
  const [user, setUser] = useState<User | null>(userData);
  useEffect(() => {
    setUser(userData);
  }, [userData]);

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
