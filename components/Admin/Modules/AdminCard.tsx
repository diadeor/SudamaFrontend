import { TrendingUp, ShoppingCart, LucideIcon, Icon, LucideProps } from "lucide-react";
import { ReactElement, ReactNode } from "react";
interface Card {
  title: string;
  value: string;
  change: string;
  Icon: ReactNode;
}
const AdminCard = ({ title, value, change, Icon }: Card) => {
  return (
    <div className="bg-surface-container-lowest rounded-2xl p-5 text-primary relative overflow-hidden shadow-[0_8px_32px_rgba(22,29,26,0.08)]">
      {Icon}
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-8 opacity-80">
          <TrendingUp />
          <span className="font-primary text-xs tracking-widest uppercase">{title}</span>
        </div>
        <h3 className="font-headline text-3xl font-extrabold tracking-tight mb-2">{value}</h3>
        <p className="text-sm opacity-80 font-medium">{`${change} from last month`}</p>
      </div>
    </div>
  );
};

export default AdminCard;
