import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Phone } from "lucide-react";
import ProductGallery from "@/components/ui/ProductGallery";
import InquireButton from "@/components/ui/InquireButton";
import ShopCard from "@/components/ui/ShopCard";
import { getProduct } from "@/lib/products";
import { Product } from "@/components/functions/types";

type Props = { params: Promise<{ slug: string }> };

const lightLabels: Record<string, string> = {
  low: "Low indirect light",
  "bright-indirect": "Bright indirect light",
  "full-sun": "Full sun",
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return {};
  return {
    title: `${product.name} | Sudama Plant Store`,
    description: product.description?.slice(0, 150),
    openGraph: { images: [product.thumbnail] }, // gives WhatsApp a link preview
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const {
    name,
    primaryCategory,
    thumbnail,
    images = [],
    badge,
    stock,
    regularPrice,
    salePrice,
    description,
  } = product;

  const gallery = [thumbnail, ...images.filter((i) => i !== thumbnail)];
  const inStock = stock > 0;
  const discount = regularPrice > salePrice ? Math.round((1 - salePrice / regularPrice) * 100) : 0;

  // New filter fields are optional; rows with no value are hidden
  // const facts = [
  //   { label: "Light", value: product.light?.map((l) => lightLabels[l] ?? l).join(", ") },
  //   { label: "Placement", value: product.placement?.join(", ") },
  //   { label: "Blooms", value: product.bloomSeason?.join(", ") },
  //   { label: "Flower color", value: product.flowerColor?.join(", ") },
  // ].filter((f) => f.value);

  // const all = (await getProducts()) as Product[];
  // const related = [
  //   ...all.filter((p) => p._id !== product._id && p.category === category),
  //   ...all.filter((p) => p._id !== product._id && p.category !== category),
  // ].slice(0, 4);

  return (
    <>
      <section className="mx-auto max-w-6xl pb-24 lg:pb-0">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <ProductGallery images={gallery} alt={name} />
          </div>

          <div className="space-y-6 lg:col-span-6 lg:self-center">
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-primary-fixed px-3 py-1 text-xs font-bold uppercase tracking-wider text-on-primary-fixed">
                  {primaryCategory}
                </span>
                {badge && (
                  <span className="rounded-full bg-tertiary-fixed px-3 py-1 text-xs font-bold uppercase tracking-wider text-on-tertiary-fixed">
                    {badge}
                  </span>
                )}
              </div>
              <h1 className="font-headline text-4xl font-bold leading-tight tracking-tight text-primary md:text-5xl">
                {name}
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="font-headline text-4xl font-bold text-primary">Rs. {salePrice}</span>
              {discount > 0 && (
                <>
                  <span className="text-base text-outline line-through">Rs. {regularPrice}</span>
                  <span className="rounded-full bg-primary-fixed px-3 py-1 text-xs font-bold text-on-primary-fixed">
                    {discount}% off
                  </span>
                </>
              )}
            </div>

            {description && (
              <p className="leading-relaxed text-on-surface-variant">{description}</p>
            )}

            <div className="flex flex-wrap items-center gap-2">
              {inStock ? (
                <span className="rounded-full bg-primary-fixed px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-on-primary-fixed">
                  In stock
                </span>
              ) : (
                <span className="rounded-full bg-error-container px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-on-error-container">
                  Out of stock
                </span>
              )}
              {inStock && stock <= 5 && (
                <span className="text-sm font-semibold text-on-surface-variant">
                  Only {stock} left
                </span>
              )}
            </div>

            {/* Desktop CTA; mobile uses the sticky bar below */}
            <div className="hidden lg:block">
              <InquireButton name={name} price={salePrice} slug={slug} inStock={inStock} />
            </div>

            {/* {facts.length > 0 && (
              <dl className="grid grid-cols-2 gap-4 rounded-2xl bg-surface-container-low p-5 text-sm">
                {facts.map((f) => (
                  <div key={f.label}>
                    <dt className="text-on-surface-variant">{f.label}</dt>
                    <dd className="font-semibold capitalize text-on-surface">{f.value}</dd>
                  </div>
                ))}
              </dl>
            )} */}

            <div className="space-y-2 rounded-2xl border border-outline-variant p-5 text-sm">
              <p className="font-semibold text-on-surface">Prefer to see it in person?</p>
              <p className="flex items-center gap-2 text-on-surface-variant">
                <MapPin size={16} /> Kalika Chowk, Butwal
              </p>
              <a
                href="tel:+9779847440395"
                className="flex items-center gap-2 text-on-surface-variant hover:text-primary"
              >
                <Phone size={16} /> +977 9847440395
              </a>
            </div>
          </div>
        </div>

        {/* {related.length > 0 && (
          <div className="mt-20">
            <h2 className="mb-6 font-headline text-2xl font-bold text-primary">
              You may also like
            </h2>
            <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
              {related.map((p) => (
                <ShopCard data={p} key={p._id} />
              ))}
            </div>
          </div>
        )} */}
      </section>

      {/* Mobile sticky CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-outline-variant bg-white/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur lg:hidden">
        <InquireButton name={name} price={salePrice} slug={slug} inStock={inStock} />
      </div>
    </>
  );
}
