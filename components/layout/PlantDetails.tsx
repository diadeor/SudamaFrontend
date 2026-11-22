import { Sun, PawPrint, CalendarDays, type LucideIcon, PlantPot, HandHelping } from "lucide-react";
import type { Product } from "@/components/functions/types";
import { humanize } from "@/lib/helpers";

const CARE: Record<string, string> = {
  beginner: "Beginner friendly",
  moderate: "Moderate care",
  expert: "Expert level",
};

const LIGHT: Record<string, string> = {
  low: "Low light",
  indirect: "Bright indirect light",
  partial_sun: "Partial sun",
  full_sun: "Full sun",
};

const SEASON: Record<string, string> = {
  all: "All year",
  summer: "Summer",
  winter: "Winter",
  monsoon: "Monsoon",
};

type Fact = { icon: LucideIcon; label: string; value: string; warn?: boolean };

export default function PlantDetails({ product }: { product: Product }) {
  const { care_level, light, season, pot_included, pet_safe, placement, traits } = product;
  const facts: Fact[] = [];

  if (care_level) {
    facts.push({
      icon: HandHelping,
      label: "Care",
      value: CARE[care_level] ?? humanize(care_level),
    });
  }
  if (season) {
    facts.push({ icon: CalendarDays, label: "Season", value: SEASON[season] ?? humanize(season) });
  }
  if (typeof pot_included === "boolean") {
    facts.push({
      icon: PlantPot,
      label: "Pot",
      value: pot_included ? "Included" : "Not included",
    });
  }
  if (typeof pet_safe === "boolean") {
    facts.push({
      icon: PawPrint,
      label: "Pets",
      value: pet_safe ? "Safe" : "Not safe",
      warn: !pet_safe,
    });
  }

  const places = placement ?? [];
  const goodToKnow = (traits ?? []).filter((t) => t && t !== "none");
  const lightSens = light ?? [];
  const check = (arr: Array<any>) => arr.length === 0;

  if (check(facts) && check(places) && check(goodToKnow) && check(lightSens)) return null;

  return (
    <section
      aria-labelledby="plant-details-heading"
      className="space-y-5 rounded-2xl bg-surface-container-lowest/70 p-5"
    >
      <h2 id="plant-details-heading" className="font-headline text-lg font-bold text-primary">
        About this plant
      </h2>

      {facts.length > 0 && (
        <dl className="grid grid-cols-2 gap-3">
          {facts.map(({ icon: Icon, label, value, warn }) => (
            <div key={label} className="flex items-center gap-3 rounded-xl bg-surface p-3">
              <span
                className={`flex size-9 shrink-0 items-center justify-center rounded-full ${
                  warn
                    ? "bg-error-container text-on-error-container"
                    : "bg-primary-fixed text-on-primary-fixed"
                }`}
              >
                <Icon size={18} aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <dt className="text-xs text-on-surface-variant">{label}</dt>
                <dd className="text-sm font-semibold text-on-surface">{value}</dd>
              </div>
            </div>
          ))}
        </dl>
      )}

      {places.length > 0 && <ChipRow title="Best placed in" items={places} />}
      {lightSens.length > 0 && <ChipRow title="Light Sensitivity" items={lightSens} />}
      {goodToKnow.length > 0 && <ChipRow title="Good to know (Traits)" items={goodToKnow} />}
    </section>
  );
}

function ChipRow({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold text-on-surface-variant">{title}</p>
      <ul className="flex flex-wrap gap-2">
        {items.map((item) => (
          <li
            key={item}
            className="rounded-full border border-outline-variant px-3 py-1 text-sm text-on-surface"
          >
            {humanize(item)}
          </li>
        ))}
      </ul>
    </div>
  );
}
