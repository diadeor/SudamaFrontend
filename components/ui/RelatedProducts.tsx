import type { Product } from "@/components/functions/types";
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
      <ul className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4">
        {products.map((p) => (
          <li key={p.slug}>
            <ShopCard data={p} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
