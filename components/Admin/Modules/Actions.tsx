import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { ActionButton } from "@/components/ui/Button";

const Actions = ({ link }: { link: string }) => {
  return (
    <>
      <Link href={link}>
        <ActionButton bg="bg-surface-container-high">
          <Pencil className="text-primary" size={16} />
        </ActionButton>
      </Link>
      <ActionButton bg="bg-error-container">
        <Trash2 className="text-on-error-container" size={16} />
      </ActionButton>
    </>
  );
};

export default Actions;
