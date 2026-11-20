import { Product } from "@/components/functions/types";
import { adminFormInputClass } from "@/components/ui/css";
import { ChevronDown } from "lucide-react";
import MultiSelect from "@/components/ui/MultiSelect";

const care_level = ["beginner", "moderate", "expert"];
const trait_opts = [
  "air_purifying",
  "low_maintenance",
  "fragrant",
  "fast_growing",
  "rare",
  "medicinal",
  "none",
];
const placement = ["living_room", "bedroom", "bathroom", "balcony", "office", "garden", "entrance"];
const light = ["low", "indirect", "partial_sun", "full_sun"];
const season = ["summer", "winter", "monsoon", "all"];

const AdditionalPD = ({ initial }: { initial?: Product }) => {
  return (
    <div className="flex flex-col col-span-full bg-surface-container-lowest p-5 rounded-3xl shadow-[0_4px_16px_rgba(22,29,26,0.02)] border border-outline-variant/20 space-y-5">
      <h2 className="text-lg font-headline font-bold text-primary">Plant Details (Optional)</h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))] gap-5">
        {/* Season */}
        <div className="space-y-2 relative">
          <label className="text-sm font-label font-bold text-on-surface-variant">Season</label>
          <select
            name="season"
            defaultValue={initial?.season}
            // onChange={(e) => setRelatedStatus({ ...relatedStatus, category: e.target.value })}
            className={`${adminFormInputClass} appearance-none`}
          >
            <option value="">Choose</option>
            {season.map((item, idx) => {
              return (
                <option
                  key={idx}
                  value={item}
                >{`${item.charAt(0).toUpperCase()}${item.slice(1)}`}</option>
              );
            })}
          </select>
          <div className="absolute top-10.5 right-2">
            <ChevronDown size={"1em"} />
          </div>
        </div>
        {/* Exposure */}
        <MultiSelect
          label="Exposure"
          name="light"
          className={adminFormInputClass}
          options={light.map((item) => ({ value: item, label: item }))}
          defaultValue={initial?.light ?? []}
        />
        {/* Placement */}
        <MultiSelect
          label="Placement"
          name="placement"
          className={adminFormInputClass}
          options={placement.map((item) => ({ value: item, label: item }))}
          defaultValue={initial?.placement ?? []}
        />
        {/* Traits - Multi Select  */}
        <MultiSelect
          label="Traits"
          name="traits"
          className={adminFormInputClass}
          options={trait_opts.map((item) => ({ value: item, label: item }))}
          defaultValue={initial?.traits ?? []}
        />
        {/* Care Level */}
        <div className="space-y-2 relative">
          <label className="text-sm font-label font-bold text-on-surface-variant">Care Level</label>
          <select
            name="care_level"
            defaultValue={initial?.care_level}
            // onChange={(e) => setRelatedStatus({ ...relatedStatus, category: e.target.value })}
            className={`${adminFormInputClass} appearance-none`}
          >
            <option value="">Choose</option>
            {care_level.map((item, idx) => {
              return (
                <option
                  key={idx}
                  value={item}
                >{`${item.charAt(0).toUpperCase()}${item.slice(1)}`}</option>
              );
            })}
          </select>
          <div className="absolute top-10.5 right-2">
            <ChevronDown size={"1em"} />
          </div>
        </div>
        {/* Pet Safe */}
        <div className="space-y-2 relative">
          <label className="text-sm font-label font-bold text-on-surface-variant">Pet Safe</label>
          <select
            name="pet_safe"
            defaultValue={String(initial?.pet_safe)}
            // onChange={(e) => setRelatedStatus({ ...relatedStatus, category: e.target.value })}
            className={`${adminFormInputClass} appearance-none`}
          >
            <option value="">Choose</option>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
          <div className="absolute top-10.5 right-2">
            <ChevronDown size={"1em"} />
          </div>
        </div>
        {/* pot included */}
        <div className="space-y-2 relative">
          <label className="text-sm font-label font-bold text-on-surface-variant">
            Pot Included
          </label>
          <select
            name="pot_included"
            defaultValue={String(initial?.pot_included)}
            // onChange={(e) => setRelatedStatus({ ...relatedStatus, category: e.target.value })}
            className={`${adminFormInputClass} appearance-none`}
          >
            <option value="">Choose</option>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
          <div className="absolute top-10.5 right-2">
            <ChevronDown size={"1em"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdditionalPD;
