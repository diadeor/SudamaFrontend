import { cache } from "react";
import { fetchReq } from "@/components/functions/request";
import { Category, Product } from "@/components/functions/types";

const REVALIDATE_TIME = 60 * 60 * 24 * 5;

// Getters
export const getProducts = cache(async (): Promise<Product[] | null> => {
  const { data } = await fetchReq(`/api/products`, false, REVALIDATE_TIME, "products");
  return data?.success ? data.products : null;
});

export const getCategories = cache(async (): Promise<Category[] | null> => {
  const { data } = await fetchReq(`/api/categories`, false, REVALIDATE_TIME, "categories");
  return data?.success ? data.categories : null;
});

// Finders
export const findProduct = async ({ prods, slug }: { prods: Product[]; slug: string }) => {
  return prods.find((p) => p.slug === slug) ?? null;
};
export const findCategory = async ({ cats, slug }: { cats: Category[]; slug: string }) => {
  return cats.find((c) => c.slug === slug) ?? null;
};

// Mappers
export const prodForSearch = (p: Product) => {
  const { name, primaryCategory, slug, thumbnail, nickname } = p;
  return { name, primaryCategory, slug, thumbnail, nickname };
};

export const prodForCard = (p: Product) => {
  const { name, primaryCategory, slug, thumbnail, badge, regularPrice, salePrice, stock } = p;
  return { name, primaryCategory, slug, thumbnail, badge, regularPrice, salePrice, stock };
};

export const slugToName = (slug: string, cats: Category[] | undefined | null) => {
  const found = cats?.find((i) => i.slug === slug);
  return found ? found.name : slug;
};

// Related
export async function getRelatedProducts(
  product: Product,
  products: Product[] | null,
  limit = 4,
): Promise<Product[]> {
  if (!products) return [];

  return products
    .filter((p) => p.slug !== product.slug && p.status === "active")
    .map((p) => {
      const samePrimary = p.primaryCategory === product.primaryCategory;
      const shared = (p.categories ?? []).filter((c) => product.categories?.includes(c)).length;
      return {
        p,
        related: samePrimary || shared > 0,
        score: (samePrimary ? 3 : 0) + shared + (p.stock > 0 ? 2 : 0),
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ p }) => p);
}

export const formatPrice = (n: number) => `Rs. ${n.toLocaleString("en-NP")}`;

// "soil-tools" -> "Soil tools", "living_room" -> "Living room"
export const humanize = (s: string) => {
  const t = s.replace(/[-_]+/g, " ").trim();
  return t.charAt(0).toUpperCase() + t.slice(1);
};
