import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { HeroText, HeroSubText } from "./Animations";

const Hero = () => {
  return (
    <section className="bg-background max-w-screen-2xl mx-auto py-5 pb-15">
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-12 items-end justify-end">
        <div className="lg:col-span-5 lg:mb-0">
          <h1 className="font-headline flex flex-col gap-2 font-black text-6xl md:text-8xl text-primary leading-[0.9] tracking-tighter mb-8">
            <HeroText />
            <HeroSubText />
          </h1>
          <p className="text-xl md:text-2xl text-on-surface-variant max-w-md leading-relaxed mb-10">
            Turn your home into a sanctuary with our curated collection of rare indoor plants.
          </p>
          <button className="bg-primary text-on-primary px-10 py-4 rounded-full font-headline font-bold text-lg hover:opacity-90 transition-all flex items-center justify-center gap-3">
            Discover the Gallery
            <ArrowRight />
          </button>
        </div>
        <div className="lg:col-span-5 relative">
          <div className="aspect-11/12 overflow-hidden rounded-3xl bg-surface-container-high shadow-lg relative">
            <Image src={`/hero.jpg`} alt="Hero Image" fill className="contain" priority />
            <div className="w-full h-full bg-primary-fixed/20 animate-pulse absolute inset-0"></div>
          </div>
          <div className="absolute -bottom-4 -left-4 lg:-bottom-8 lg:-left-8 bg-surface-container-lowest p-8 rounded-2xl shadow-xl max-w-xs hidden md:block border border-outline-variant/30">
            <p className="font-body italic text-lg text-primary leading-snug">
              "The right plant transforms a room from merely decorated to truly alive."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
