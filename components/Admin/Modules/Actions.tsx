import { ActionButton } from "@/components/ui/Button";
import { Star, Trash2 } from "lucide-react";

interface Props {
  onOpenChange: Function;
  id: string;
  name: string;
  isFeatured?: boolean;
}

const Actions = ({ onOpenChange, id, name, isFeatured = false }: Props) => {
  return (
    <div className="absolute right-3 top-3 sm:static sm:shrink-0 flex flex-col items-center gap-2">
      <ActionButton
        bg="bg-yellow-200/60 border-1 border-yellow-400"
        onclick={() => onOpenChange(name, id, "feature")}
      >
        <Star
          className={`${isFeatured ? "fill-yellow-600 text-yellow-600" : "text-yellow-800"}`}
          size={16}
        />
      </ActionButton>
      <ActionButton
        bg="bg-error-container border-1 border-rose-300"
        onclick={() => onOpenChange(name, id, "delete")}
      >
        <Trash2 className="text-on-error-container" size={16} />
      </ActionButton>
    </div>
  );
};

export default Actions;
