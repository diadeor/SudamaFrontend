"use client";

import Image from "next/image";
import {
  PlusCircle,
  Leaf,
  Truck,
  ShieldCheck,
  Download,
  Droplets,
  Sun,
  Sprout,
  Wind,
  BadgePlus,
} from "lucide-react";
import { LargeBtn } from "@/components/ui/Button";

export default function ProductPage() {
  return (
    <div className="">
      <HeroSection />
      <NurturingGuide />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-12 gap-8 justify-center">
      {/* Left: Imagery & Asymmetric Grid */}
      <div className="col-span-full sm:col-span-12 lg:col-span-7 grid grid-cols-6 gap-4 relative">
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCpfkLejiFwbNrw7VhAb0NuTDbwskzcXtHXsrB8Pt3f119Z3FwXZh6kW4EiwGjZhKUIneG_ZbsM3LPdc9F8pYfIZkOxjdJtrNC1v84R805wW0DhmvJuNxHpPRKTn9GV740S7VKQZEDhrmgDlTlOHqOTMZSjvkDl5bpkZGB4sibIs5E9yO9oWpc3s_NbZojmLj9dEU10N13NuUuBqB_ec_DE2prnnZG3NAEZ4laZOGLO_G752jbuCB_k6LAMgyb_DW4KKJsz-y1vHw"
          alt="Stunning close-up of a vibrant Swiss Cheese Plant"
          height={600}
          width={600}
          className="col-span-full sm:col-span-4 lg:col-span-full rounded-2xl overflow-hidden aspect-square"
        />

        <div className="col-span-full max-w-150 small-ones lg:col-span-full sm:col-span-2 grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 gap-4">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHrcoFM61mLyiLzAC7Vtw8PX_0F_UFa0iTjtd_kfkCM8sJ9oxbfbeQhvxAK8eKHUOcV-INzG9iexVVMemV_HkcSE3aG0wpQ_F26cejaBKNTLWOjcBQXpW2DGAseZMal_L5Cz1odnCuP9cNYxZpd7-neHNgmH0kQ-ZEmPDLkZgpS_IdnINYmdijhxfuYCDHQISjOW1Xc5ZzcO8ijXhW1-aeGF3cEbQfwevK5GUdsh2SP0auSWx7iueq9J85V5vuyE_gvGF4sHeDbA"
            alt="Detailed macro shot of a Monstera Deliciosa leaf"
            width={300}
            height={500}
            className="rounded-2xl col-span-1"
          />
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBRlmwryO_eoWPRzA7ap5msEiCtArDhL5Z9IX0lxNWjUig0aBNg3n8MKN21Awh22tvqh4bx_X-qDHGMVYwtxNe8vKIBGBxtG5qBgVWljA5uZx9SHGGFKXHWrS3zk8-8VhzPjkE8jR5PusaS6Z6sCbshP2hc7RHVIr5g9EP5D0tu_HxJSk0Ek3OHGtVDe80-kA1gowTPaYnm3ppDU_ptqA-Q5cuOZmnGUJ_fg5s0xna-2nnGYkfwmjIiwKf4FatZ5L48gkUU3Qz_Q"
            alt="A Monstera plant styled in a minimalist matte ceramic pot"
            width={300}
            height={500}
            className="rounded-2xl col-span-1"
          />
        </div>
      </div>

      {/* Right: Product Information */}
      <div className="col-span-full lg:col-span-5 lg:sticky lg:top-32 space-y-5">
        <div className="space-y-0">
          <span className="font-label text-xs text-on-surface-variant tracking-[0.05em] uppercase font-medium">
            Araceae Family
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold text-primary tracking-tighter leading-tight">
            Swiss Cheese Plant
          </h1>
          <p className="text-xl text-secondary italic font-light">Monstera Deliciosa</p>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-headline font-bold text-primary">Rs.84</span>
          <span className="text-sm text-outline font-medium line-through">110</span>
        </div>

        <div className="space-y-6">
          <p className="text-base text-on-surface-variant leading-relaxed">
            An iconic specimen celebrated for its dramatic, heart-shaped leaves that develop unique
            natural perforations as they mature. This botanical masterpiece thrives in bright,
            indirect light, bringing a sculptural elegance to any interior sanctuary.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="px-4 py-1.5 rounded-full bg-primary-fixed text-on-primary-fixed text-xs font-bold uppercase tracking-wider">
              In Stock
            </span>
            <span className="px-4 py-1.5 rounded-full bg-surface-container-high text-on-secondary-fixed-variant text-xs font-bold uppercase tracking-wider">
              Large Specimen
            </span>
          </div>
        </div>

        <LargeBtn extraClass="rounded-lg mt-6">
          <BadgePlus />
          Add to basket
        </LargeBtn>
      </div>
    </section>
  );
}

function NurturingGuide() {
  return (
    <section className="mt-20 p-5 lg:py-10 rounded-2xl bg-primary-fixed/40 md:px-12 max-w-7xl mx-auto mb-20">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div className="max-w-xl">
          <h2 className="text-4xl font-headline font-bold text-primary mb-4">Nurturing Guide</h2>
          <p className="text-lg text-on-surface-variant">
            The Botanical Archivist's curated recommendations for ensuring your specimen flourishes
            for decades.
          </p>
        </div>
        <button className="text-primary font-bold flex items-center gap-2 hover:underline">
          Download Full Manual <Download size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Water */}
        <div className="md:col-span-2 bg-surface-container-low p-10 rounded-xl flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 bg-primary-fixed rounded-lg flex items-center justify-center mb-6">
              <Droplets className="text-on-primary-fixed" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-primary mb-3">Hydration Ritual</h3>
            <p className="text-on-surface-variant leading-relaxed">
              Water every 1-2 weeks, allowing the top two inches of soil to dry completely between
              sessions. Increase frequency during brighter months.
            </p>
          </div>
          <div className="mt-8 text-primary font-bold text-sm tracking-widest uppercase flex items-center gap-2">
            Low Maintenance <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          </div>
        </div>

        {/* Light */}
        <div className="bg-surface-container-high p-8 rounded-xl flex flex-col">
          <div className="w-10 h-10 bg-primary-fixed rounded-lg flex items-center justify-center mb-6">
            <Sun className="text-on-primary-fixed" size={20} />
          </div>
          <h3 className="text-xl font-bold text-primary mb-2">Luminosity</h3>
          <p className="text-on-surface-variant text-sm leading-relaxed">
            Thrives in bright to medium indirect light. Avoid direct harsh sunlight as it may scorch
            the delicate leaves.
          </p>
        </div>

        {/* Soil */}
        <div className="bg-surface-container-low p-8 rounded-xl flex flex-col">
          <div className="w-10 h-10 bg-primary-fixed rounded-lg flex items-center justify-center mb-6">
            <Sprout className="text-on-primary-fixed" size={20} />
          </div>
          <h3 className="text-xl font-bold text-primary mb-2">Foundation</h3>
          <p className="text-on-surface-variant text-sm leading-relaxed">
            Use a well-draining, nutrient-rich potting mix with plenty of organic matter and
            aeration components.
          </p>
        </div>

        {/* Humidity */}
        <div className="md:col-span-1 bg-primary-container p-8 rounded-xl flex flex-col text-on-primary-container">
          <div className="w-10 h-10 bg-surface/20 rounded-lg flex items-center justify-center mb-6">
            <Wind className="text-surface" size={20} />
          </div>
          <h3 className="text-xl font-bold text-surface mb-2">Atmosphere</h3>
          <p className="text-surface/80 text-sm leading-relaxed">
            Prefers high humidity (over 60%). Mist regularly or use a pebble tray during drier
            winter months.
          </p>
        </div>

        {/* Temperature */}
        <div className="md:col-span-3 bg-surface-container-lowest p-8 rounded-xl flex flex-col md:flex-row items-center gap-8 border border-outline-variant/10">
          <div className="w-full md:w-1/3 aspect-video rounded-lg overflow-hidden relative">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWFgC1FVEGFKyh7uq3oOoSzY_ajrQr7sbr53rtNU4_AhjAy6-es2WDxCqMnbfMNaWHBVg-Bpmf3znnv7OLGXFT2GOSNDtEvHySNwDFouGX_o5ygR8PIIkMpkQjDxfgVwjKuM6o1-QbVHAHxE99cirZ_87xvT1lw_-f3E98iRGVYUAIBJ0_m6AH2lyGeUkadvqHwp0gwdE7zQ1u_VJP8cPPGUjThsDHw_i55s2lp1ggyxADbKFNtHVGC_Odo5TETwN-PFwnvY2u4w"
              alt="A cozy interior living room with warm soft lighting"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-primary mb-2">Thermal Environment</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              Maintain a consistent temperature between 65°F–85°F (18°C–30°C). Keep away from cold
              drafts and heating vents to prevent stress.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
