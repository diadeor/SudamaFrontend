import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, MapPin, Phone } from "lucide-react";
import ProductGallery from "@/components/ui/ProductGallery";
import InquireButton from "@/components/ui/InquireButton";
import PlantDetails from "@/components/layout/PlantDetails";
import RelatedProducts from "@/components/ui/RelatedProducts";
import { getCategories, getProducts, slugToName } from "@/lib/helpers";
import { getRelatedProducts, formatPrice, humanize } from "@/lib/helpers";
import { Product } from "@/components/functions/types";
import { badgeStyles } from "@/components/ui/css";
import InPerson from "@/components/ui/InPerson";

type Props = { params: Promise<{ slug: string }> };

const BADGE_LABELS: Record<string, string> = {
  new: "New",
  featured: "Featured",
  sale: "On sale",
};

const MAPS_URL = "https://maps.app.goo.gl/KjV8yzkFYK2vLeoP6";

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const products: Product[] | null = await getProducts();
  if (!products) return {};
  const product = products.find((p) => p.slug === slug);
  if (!product) return {};

  return {
    title: `${product.name} | Sudama Plant Store`,
    description: product.description?.slice(0, 150),
    openGraph: { images: [product.thumbnail] }, // gives WhatsApp a link preview
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const products = await getProducts();
  const cats = await getCategories();
  const product: Product | undefined = products?.find((p) => p.slug === slug);
  if (!product) notFound();

  const {
    name,
    nickname,
    primaryCategory,
    thumbnail,
    badge,
    stock,
    regularPrice,
    salePrice,
    description,
  } = product;

  const related = await getRelatedProducts(product, products, 4);

  const gallery = [thumbnail];
  const inStock = stock > 0;
  const discount =
    regularPrice && regularPrice > salePrice ? Math.round((1 - salePrice / regularPrice) * 100) : 0;
  const showBadge = badge && badge !== "none";

  return (
    <div className="mx-auto max-w-6xl">
      <nav
        aria-label="Breadcrumb"
        className="mb-6 flex flex-wrap items-center gap-1 text-sm text-on-surface-variant"
      >
        <Link href="/shop" className="hover:text-primary">
          Shop
        </Link>
        <ChevronRight size={14} aria-hidden="true" />
        <Link
          href={`/shop?category=${encodeURIComponent(primaryCategory)}`}
          className="hover:text-primary"
        >
          {humanize(primaryCategory)}
        </Link>
        <ChevronRight size={14} aria-hidden="true" />
        <span aria-current="page" className="font-semibold text-on-surface">
          {name}
        </span>
      </nav>

      <section className="grid grid-cols-1 gap-10 md:grid-cols-12">
        <div className="md:col-span-6 lg:col-span-5 lg:sticky lg:top-24 lg:self-start flex flex-col gap-5">
          <ProductGallery images={gallery} alt={name} />
          <InPerson
            maps={MAPS_URL}
            address="Kalika Chowk, Butwal"
            phone="9847440395"
            extraClass="hidden md:block"
          />
        </div>
        <div className="hidden lg:block lg:col-span-1"></div>
        <div className="space-y-4 md:col-span-6">
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-primary-fixed px-3 py-1 text-xs font-bold uppercase tracking-wider text-on-primary-fixed">
                {cats ? slugToName(primaryCategory, cats) : humanize(primaryCategory)}
              </span>
              {showBadge && (
                <span
                  className={`${badgeStyles[badge]} rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider`}
                >
                  {BADGE_LABELS[badge] ?? badge}
                </span>
              )}
            </div>

            <h1 className="font-body text-3xl font-bold leading-tight tracking-tight text-primary md:text-4xl">
              {name}
            </h1>
            {nickname && (
              <p className="text-on-surface-variant -mt-2">
                Also known as <span className="font-semibold">{nickname}</span>
              </p>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2 mt-8">
            <span className="font-headline text-3xl font-bold text-primary">
              {formatPrice(salePrice)}
            </span>
            {regularPrice && discount > 0 && (
              <>
                <span className="text-base text-outline line-through">
                  {formatPrice(regularPrice)}
                </span>
                <span className="rounded-full bg-primary-fixed px-3 py-1 text-xs font-bold text-on-primary-fixed">
                  {discount}% off
                </span>
              </>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {inStock ? (
              <span className="inline-flex items-center gap-2 rounded-full bg-primary-fixed px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-on-primary-fixed">
                <span className="size-2 rounded-full bg-primary" aria-hidden="true" />
                In stock
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 rounded-full bg-error-container px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-on-error-container">
                <span className="size-2 rounded-full bg-error" aria-hidden="true" />
                Out of stock
              </span>
            )}
            {inStock && stock <= 10 && (
              <span className="text-sm font-semibold text-on-surface-variant">
                Only {stock} left
              </span>
            )}
          </div>
          {description && (
            <div className="flex flex-col gap-1 mt-5 mb-5">
              <p className="font-bold text-primary/80">Description</p>
              <hr className=" border-on-surface-variant/20" />
              <p className="whitespace-pre-line leading-relaxed text-on-surface-variant">
                {description}
              </p>
            </div>
          )}

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <InquireButton name={name} price={salePrice} slug={slug} inStock={inStock} />
          </div>

          <PlantDetails product={product} />
          <InPerson
            maps={MAPS_URL}
            address="Kalika Chowk, Butwal"
            phone="9847440395"
            extraClass="block md:hidden"
          />
        </div>
      </section>

      <RelatedProducts products={related} category={primaryCategory} />

      {/* Mobile sticky bar */}
      <div className="sticky bottom-3 z-30 mt-8 lg:hidden">
        <div className="flex items-center gap-4 rounded-2xl border border-outline-variant bg-surface/95 p-3 shadow-lg backdrop-blur">
          <div className="shrink-0 pl-1">
            <p className="text-xs text-on-surface-variant">Price</p>
            <p className="font-headline text-xl font-bold leading-none text-primary">
              {formatPrice(salePrice)}
            </p>
          </div>
          <div className="min-w-0 flex-1">
            <InquireButton name={name} price={salePrice} slug={slug} inStock={inStock} />
          </div>
        </div>
      </div>
    </div>
  );
}
