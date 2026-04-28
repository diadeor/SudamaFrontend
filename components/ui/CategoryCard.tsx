import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, ReactElement, ReactNode } from "react";

interface Category {
  Icon: ForwardRefExoticComponent<Omit<LucideProps, "ref">>;
  title: string;
}

const CatCard = ({ Icon, title }: Category) => {
  return (
    <div className="group min-w-40 px-5 py-8 justify-center bg-primary-fixed-dim/60 text-on-primary-fixed-variant rounded-3xl shadow-lg flex flex-col items-center gap-3">
      <Icon size={`2.5em`} />
      <p className="font-bold text-xl">{title}</p>
    </div>
  );
};

export default CatCard;
