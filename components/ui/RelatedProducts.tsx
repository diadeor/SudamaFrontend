import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/components/functions/types";
import { formatPrice, humanize } from "@/lib/helpers";
import Section from "../layout/Section";
import ShopCard from "./ShopCard";

type Props = { products: Product[]; category: string };

export default function RelatedProducts({ products, category }: Props) {
  if (products.length === 0) return null;

  return (
    <Section
      title="You might also like"
      subTitle="Related Products"
      className="mt-5"
      linkText="All fruit"
    >
      <ul className="grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-6">
        {products.map((p) => {
          const inStock = p.stock > 0;
          const discount =
            p.regularPrice && p.regularPrice > p.salePrice
              ? Math.round((1 - p.salePrice / p.regularPrice) * 100)
              : 0;

          return (
            <li key={p.slug}>
              <ShopCard data={p} />
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
