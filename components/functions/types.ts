import { ReactNode } from "react";

export interface User {
  _id: string;
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
}

export interface Stats {
  userCount: number;
  productCount: number;
  orderCount: number;
  blogCount: number;
  catCount: number;
}
export interface DefinedError {
  error: Error & { digest?: string };
  reset: () => void;
}

export interface Tabs {
  title: string;
  icon: ReactNode;
  isActive: boolean;
}
