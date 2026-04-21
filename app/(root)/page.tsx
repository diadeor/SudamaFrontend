import Hero from "@/components/home/Hero";
import Section from "@/components/layout/Section";
import Image from "next/image";
import ProductCard from "@/components/ui/ProductCard";

export default function Home() {
  return (
    <div className="home min-h-[calc(100svh-100px)]">
      <Hero />
      <Section title="Seasonal Highlights" subTitle="Specimens" linkText="View More">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          <ProductCard
            isLarge
            name="Giant Fiddle Leaf Fig"
            price={185.0}
            category="Tropical Ferns"
            description="Our signature specimen, reaching heights of 6ft. Perfect for corner focal points."
            imageUrl="/placeholder.jpg"
          />
          <ProductCard
            name="Calathea Orbifolia"
            price={42.0}
            tag="LOW LIGHT"
            imageUrl="/placeholder.jpg"
          />
          <ProductCard
            name="Sansevieria 'Laurentii'"
            price={34.0}
            tag="AIR PURIFYING"
            imageUrl="/placeholder.jpg"
          />
        </div>
      </Section>
      <Section>
        <div className="relative rounded-[3rem] overflow-hidden bg-primary-container py-12 px-8 text-center flex flex-col items-center">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <img
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyU0NiDPIhW9ucxIfhIuaw9aH_KUrwhLtkhtpKYb0rKF6rAanvJ1GQfyDGFLQm9yS5EeJxo1g6nlWzc5Tr-wP0N_dJVnFG7ZrsBaNWJlUQkuyAweAFIw0cRLWGRgqcVRJmAimnO-GoPPSNSVyVqEEX8hIP0pl0m2yzDKyZucnE7ZiqjPxyEnhD3r45ETcmYqQY-aibo7KRDqc-_V-8jQIFf5dtiBtOPDHhP1rZbaThQzpFmlFbVDekGbcEqDzBjsnUi9NfOJ5iSw"
            />
          </div>
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-headline font-bold text-surface mb-6">
              Let's grow together.
            </h2>
            <p className="text-surface/80 text-lg mb-10 font-light">
              Be the first to know about new arrivals, expert care guides, and exclusive releases.
            </p>
            <form className="flex flex-col md:flex-row gap-4 w-full max-w-md mx-auto">
              <input
                className="flex-1 bg-surface-container-lowest/10 border border-surface/20 rounded-lg px-6 py-3 text-surface placeholder:text-surface/50 focus:outline-none focus:bg-surface-container-lowest/20"
                placeholder="Email address"
                type="email"
              />
              <button className="bg-surface text-primary px-8 py-3 rounded-lg font-bold hover:bg-surface-bright transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </Section>
    </div>
  );
}
