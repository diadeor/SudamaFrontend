import { childClass } from "@/components/ui/css";
import { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, Save, UploadCloud, X } from "lucide-react";

interface AdminActionPageProps {
  title: string;
  children: ReactNode;
  navBack: string;
}

const AdminActionPage = ({ title, children, navBack }: AdminActionPageProps) => {
  return (
    <div className={`${childClass} relative`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 ">
          <Link
            href={navBack}
            className="p-2 hover:bg-surface-container-highest rounded-full transition-colors"
          >
            <ArrowLeft className="text-on-surface-variant" size={24} />
          </Link>
          <h1 className="text-2xl font-headline font-bold text-primary tracking-tight">{title}</h1>
        </div>

        {/* Desktop Save Action (Hidden on mobile, mobile uses bottom bar) */}
        <div className="hidden md:flex gap-3">
          <button className="px-6 py-2.5 rounded-xl font-label font-bold text-on-surface-variant hover:bg-surface-container-highest transition-colors">
            Cancel
          </button>
          <button
            type="submit"
            form="edit-or-create-form"
            className="px-6 py-2.5 rounded-xl font-label font-bold bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container transition-colors flex items-center gap-2"
          >
            <Save size={18} />
            Save
          </button>
        </div>
      </div>
      {children}
    </div>
  );
};

export default AdminActionPage;
