"use client";
import { useEffect, useRef, useState } from "react";
import { Loader2, Star, TriangleAlert } from "lucide-react";

type Props = {
  open: boolean;
  title: string;
  description?: string;
  toDelete?: boolean;
  onConfirm: () => Promise<void> | void; // throw an Error to show a message in the dialog
  onClose: () => void;
};

export default function ConfirmDialog({
  open,
  title,
  description,
  toDelete = true,
  onConfirm,
  onClose,
}: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) {
      setError("");
      d.showModal();
    }
    if (!open && d.open) d.close();
  }, [open]);

  const handleConfirm = async () => {
    setPending(true);
    setError("");
    try {
      await onConfirm();
      onClose();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Try again.");
    } finally {
      setPending(false);
    }
  };
  const confirmColor: Record<string, string> = {
    delete: "text-on-error-container bg-error-container",
    feature: "bg-yellow-200 text-yellow-900",
  };
  const confirmCSS =
    "flex min-h-11 items-center tracking-wide gap-2 rounded-xl px-4 text-sm font-semibold hover:opacity-90 disabled:opacity-60";

  return (
    <dialog
      ref={ref}
      onClose={onClose} // fires on Esc
      onCancel={(e) => pending && e.preventDefault()} // ignore Esc mid-request
      onClick={(e) => {
        if (e.target === ref.current && !pending) onClose(); // click on the backdrop
      }}
      aria-labelledby="confirm-title"
      className="m-auto w-[min(92vw,26rem)] rounded-2xl bg-white p-0 text-on-surface shadow-xl backdrop:bg-black/40"
    >
      <div className="space-y-4 p-6">
        <div className="flex items-start gap-3">
          {toDelete ? (
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-error-container text-on-error-container">
              <TriangleAlert size={20} />
            </span>
          ) : (
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-yellow-200 text-yellow-700">
              <Star size={20} />
            </span>
          )}
          <div className="space-y-1">
            <h2 id="confirm-title" className="text-lg font-bold">
              {title}
            </h2>
            {description && <p className="text-sm text-on-surface-variant">{description}</p>}
          </div>
        </div>

        {error && (
          <p
            role="alert"
            className="rounded-lg bg-error-container px-3 py-2 text-sm text-on-error-container"
          >
            {error}
          </p>
        )}

        <div className="flex justify-end gap-2">
          <button
            type="button"
            autoFocus
            disabled={pending}
            onClick={onClose}
            className="min-h-11 rounded-xl px-4 text-sm font-semibold hover:bg-surface-container-low disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={pending}
            onClick={handleConfirm}
            className={`${confirmCSS} ${confirmColor[toDelete ? "delete" : "feature"]}`}
          >
            {pending && <Loader2 size={16} className="animate-spin" />}
            {pending
              ? toDelete
                ? "Deleting..."
                : "Confirming..."
              : toDelete
                ? "Delete"
                : "Confirm"}
          </button>
        </div>
      </div>
    </dialog>
  );
}
