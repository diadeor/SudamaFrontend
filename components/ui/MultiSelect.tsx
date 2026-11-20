"use client";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

type Option = { value: string; label: string };

export default function MultiSelect({
  label,
  name,
  options,
  defaultValue = [],
  onChange,
  className = "",
  placeholder = "Select…",
}: {
  label: string;
  name: string;
  options: Option[];
  defaultValue?: string[];
  onChange?: (next: string[]) => void;
  className?: string;
  placeholder?: string;
}) {
  const [selected, setSelected] = useState<string[]>(defaultValue);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const update = (next: string[]) => {
    setSelected(next);
    onChange?.(next);
  };
  const toggle = (v: string) =>
    update(selected.includes(v) ? selected.filter((x) => x !== v) : [...selected, v]);

  const labelOf = (v: string) => options.find((o) => o.value === v)?.label ?? v;
  console.log(selected);

  return (
    <div ref={ref} className="relative">
      <span className="text-sm font-label font-bold text-on-surface-variant">{label}</span>

      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={`${className} flex w-full items-center justify-between text-left`}
      >
        <span className={`truncate ${selected.length ? "" : "text-on-surface-variant"}`}>
          {selected.length ? `${selected.length} selected` : placeholder}
        </span>
        <ChevronDown size={16} className={`shrink-0 transition ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full z-30 mt-1 max-h-60 overflow-y-auto rounded-xl border border-outline-variant bg-white p-1 shadow-lg">
          {options.map((o) => (
            <label
              key={o.value}
              className="flex min-h-11 cursor-pointer items-center gap-3 rounded-lg px-3 hover:bg-surface-container-low"
            >
              <input
                type="checkbox"
                checked={selected.includes(o.value)}
                onChange={() => toggle(o.value)}
                className="size-4 accent-primary"
              />
              <span className="text-sm text-on-surface">{o.label}</span>
            </label>
          ))}
          {options.length === 0 && (
            <p className="px-3 py-3 text-sm text-on-surface-variant">No options</p>
          )}
        </div>
      )}

      {/* what a normal <form> / FormData submit reads */}
      {selected.map((v) => (
        <input key={v} type="hidden" name={name} value={v} />
      ))}
    </div>
  );
}
