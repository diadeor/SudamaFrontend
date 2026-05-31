import { ReactNode } from "react";

// DB
export interface User {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  role: string;
  googleId: string;
}
export interface Product {
  _id: string;
  name: string;
  category: string;
  thumbnail: string;
  images: string[];
  description: string;
  badge: string;
  regularPrice: number;
  salePrice: number;
  stock: number;
}

export interface Category {
  _id: string;
  name: string;
  thumbnail: string;
  description: string;
}

export interface Orders {
  _id: string;
  tx: string;
  user: string;
  email: string;
  total: number;
  discount: number;
  amount: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
}

export interface Stats {
  userCount: number;
  productCount: number;
  orderCount: number;
  blogCount: number;
  catCount: number;
}

// Error
export interface DefinedError {
  error: Error & { digest?: string };
  reset: () => void;
}

// Admin
export interface Tabs {
  title: string;
  icon: ReactNode;
  isActive: boolean;
}

// Message
export interface Info {
  type: "loading" | "warn" | "error" | "success";
  message: string;
}
