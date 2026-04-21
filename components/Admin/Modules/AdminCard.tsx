import { TrendingUp, ShoppingCart } from "lucide-react";
const AdminCard = () => {
  return (
    <div className="bg-surface-container-lowest rounded-2xl p-6 text-primary relative overflow-hidden shadow-[0_8px_32px_rgba(22,29,26,0.08)]">
      <ShoppingCart size={`10em`} className="absolute -right-15 top-0 opacity-15" />
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-8 opacity-80">
          <TrendingUp />
          <span className="font-primary text-xs tracking-widest uppercase">Total Revenue</span>
        </div>
        <h3 className="font-headline text-3xl font-extrabold tracking-tight mb-2">$0</h3>
        <p className="text-sm opacity-80 font-medium">+14.2% from last month</p>
      </div>
    </div>
  );
};

export default AdminCard;
