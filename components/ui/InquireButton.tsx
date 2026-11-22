import { MessageCircle } from "lucide-react";

export function InquireButton({
  name,
  price,
  slug,
  inStock,
}: {
  name: string;
  price: number;
  slug: string;
  inStock: boolean;
}) {
  const text = inStock
    ? `Hi! I'm interested in ${name} (Rs. ${price}).\n${process.env.NEXT_PUBLIC_SITE_URL}/shop/${slug}`
    : `Hi! Will ${name} be back in stock soon?\n${process.env.NEXT_PUBLIC_SITE_URL}/shop/${slug}`;

  const href = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 font-semibold text-on-primary transition hover:opacity-90"
    >
      <MessageCircle size={20} />
      {inStock ? "Inquire on WhatsApp" : "Ask about restock"}
    </a>
  );
}

export default InquireButton;
