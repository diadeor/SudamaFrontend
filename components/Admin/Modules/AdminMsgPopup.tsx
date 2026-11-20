"use client";
import { useEffect } from "react";
import { Info } from "@/components/functions/types";
import { X, XCircle, CircleCheck, Loader, Info as InfoIcon } from "lucide-react";

const styles = {
  success: { Icon: CircleCheck, accent: "border-l-primary", color: "text-primary" },
  error: { Icon: XCircle, accent: "border-l-red-600", color: "text-red-600" },
  loading: { Icon: Loader, accent: "border-l-outline", color: "text-on-surface-variant" },
  info: { Icon: InfoIcon, accent: "border-l-primary", color: "text-primary" },
} as const;

const AdminPopup = ({ info, setInfo }: { info: Info; setInfo: (i: Info) => void }) => {
  useEffect(() => {
    if (!info.message || info.type === "loading") return;
    const t = setTimeout(
      () => setInfo({ type: "error", message: "" }),
      info.type === "error" ? 8000 : 4000,
    );
    return () => clearTimeout(t);
  }, [info.message, info.type, setInfo]);

  if (!info.message) return null;

  const { Icon, accent, color } = styles[info.type] ?? styles.info;

  return (
    <div
      role={info.type === "error" ? "alert" : "status"}
      className={`fixed bottom-4 right-4 z-50 flex w-80 max-w-[calc(100vw-2rem)] items-start gap-3 rounded-xl border border-l-4 border-outline-variant ${accent} bg-white p-5 shadow-lg`}
    >
      <Icon
        size={22}
        className={`mt-0.5 shrink-0 ${color} ${info.type === "loading" ? "animate-spin" : ""}`}
      />
      <p className="flex-1 text-on-surface">{info.message}</p>
      <button
        onClick={() => setInfo({ type: "error", message: "" })}
        aria-label="Dismiss"
        className="-m-1 flex size-8 items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container-low"
      >
        <X size={18} />
      </button>
    </div>
  );
};

export default AdminPopup;
