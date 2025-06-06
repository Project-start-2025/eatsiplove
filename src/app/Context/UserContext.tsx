"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";

// Sửa interface có thêm id:
interface IUser {
  id: number;                // <-- BẮT BUỘC phải có
  username: string;
  fullname: string;
  role: string;
}

interface IUserContext {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  logout: () => void;
}

const UserContext = createContext<IUserContext | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
};