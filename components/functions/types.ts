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
  nickname?: string;
  primaryCategory: string;
  categories: string[];
  thumbnail: string;
  images?: string[];
  status: "active" | "draft";
  description?: string;
  badge: "sale" | "featured" | "new" | "none";
  regularPrice?: number;
  salePrice: number;
  bargainPrice?: number;
  stock: number;
  slug: string;
  pet_safe?: boolean;
  pot_included?: boolean;
  care_level?: "beginner" | "moderate" | "expert";
  traits?: (
    | "air_purifying"
    | "low_maintenance"
    | "fragrant"
    | "fast_growing"
    | "rare"
    | "medicinal"
    | "none"
  )[];
  placement?: (
    | "living_room"
    | "bedroom"
    | "bathroom"
    | "balcony"
    | "office"
    | "garden"
    | "entrance"
  )[];
  light?: ("low" | "indirect" | "partial_sun" | "full_sun")[];
  season?: "summer" | "winter" | "monsoon" | "all";
}

export interface SearchItem {
  name: string;
  nickname?: string;
  primaryCategory: string;
  slug: string;
  thumbnail: string;
}
export interface ProductCard {
  name: string;
  primaryCategory: string;
  slug: string;
  thumbnail: string;
  badge: string;
  regularPrice?: number;
  salePrice: number;
  stock: number;
}

export interface Category {
  _id: string;
  name: string;
  thumbnail: string;
  group: "Plants" | "Supplies";
  order: number;
  slug: string;
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
