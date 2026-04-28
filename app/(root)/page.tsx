import Hero from "@/components/home/Hero";
import Section from "@/components/layout/Section";
import Image from "next/image";
import ProductCard from "@/components/ui/ProductCard";
import CatCard from "@/components/ui/CategoryCard";
import {
  HeartPulse,
  SunDim,
  CalendarCheck,
  SunSnow,
  Activity,
  ShieldCheck,
  Flower2,
} from "lucide-react";
import ShopCard from "@/components/ui/ShopCard";

export default function Home() {
  return (
    <div className="home min-h-[calc(100svh-100px)]">
      <Hero />
      <Section title="Shop By Category" subTitle="Categories" linkText="Go to shop">
        <div className="flex flex-row items-center justify-center">
          <div className="grid grid-cols-2 md:grid-cols-4 justify-center gap-5 w-full">
            <CatCard title="Easy Care" Icon={HeartPulse} />
            <CatCard title="Low Light" Icon={SunDim} />
            <CatCard title="Evergreen" Icon={CalendarCheck} />
            <CatCard title="Seasonal" Icon={SunSnow} />
          </div>
        </div>
      </Section>
      <Section title="Seasonal Highlights" subTitle="Specimens" linkText="View More">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8 ">
          <ShopCard
            name="Giant Fiddle Leaf Fig"
            regularPrice={185.0}
            category="Tropical Ferns"
            goTo="1"
          />
          <ShopCard name="Calathea Orbifolia" regularPrice={42.0} category="ok" goTo="3" />
          <ShopCard name="Sansevieria 'Laurentii'" regularPrice={34.0} category="ok" goTo="4" />
        </div>
      </Section>

      <Section>
        <div className="w-full bg-primary-fixed-dim/60 p-10 md:py-12 rounded-4xl">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
            <div className="flex flex-row justify-center md:flex-col items-center gap-4 md:gap-5 md:text-center">
              <Activity size="2.5em" className="shrink-0" />
              <p className="font-bold text-lg md:text-xl">Grown With Care</p>
            </div>

            <div className="flex flex-row justify-center md:flex-col items-center gap-4 md:gap-5 md:text-center">
              <ShieldCheck size="2.5em" className="shrink-0" />
              <p className="font-bold text-lg md:text-xl">Handpicked Quality</p>
            </div>

            <div className="flex flex-row justify-center md:flex-col items-center gap-4 md:gap-5 md:text-center">
              <Flower2 size="2.5em" className="shrink-0" />
              <p className="font-bold text-lg md:text-xl">Ready To Flourish</p>
            </div>
          </div>
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
