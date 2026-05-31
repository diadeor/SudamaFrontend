import Image from "next/image";
import { Plus, Minus, ArrowRight } from "lucide-react";
import CartItem from "@/components/ui/CartItem";

const ShoppingCart = () => {
  return (
    <>
      <section className="max-w-7xl mx-auto">
        <header className="h-50 mb-8 overflow-hidden  relative flex flex-col justify-center">
          <div className="absolute -top-2 -right-3 opacity-50 pointer-events-none">
            <Image src={"/top-right.png"} width={150} height={500} alt="okay" />
          </div>
          <h1 className="text-3xl z-15 font-extrabold leading-tight tracking-[-0.02em] text-primary">
            Shopping <br /> Cart
          </h1>
          <p className="text-md text-secondary max-w-2xl mt-4 leading-relaxed">
            Review your selected plants before proceeding to final checkout.
          </p>
        </header>
        <div className="flex flex-col gap-5">
          <section className="flex flex-col gap-4">
            {/* Cart Item 1 */}
            <CartItem name="Monstera Deliciosa" price={1500} qty={2} />
            <CartItem name="Monstera Deliciosa" price={1500} qty={2} />
            <CartItem name="Monstera Deliciosa" price={1500} qty={2} />
          </section>
          <section className="bg-surface-container-low rounded-3xl p-2 mb-4">
            <hr className="mb-6 w-full border rounded-full border-outline-variant/75" />
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="body-lg text-on-surface">Subtotal</span>
                <span className="body-lg font-semibold text-primary">Rs. 213.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="body-lg text-on-surface">Care & Handling</span>
                <span className="body-lg font-semibold text-primary">Rs. 15.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="body-lg text-on-surface">Botanical Tax</span>
                <span className="body-lg font-semibold text-primary">Rs. 18.24</span>
              </div>
            </div>
          </section>
        </div>
        {/* Sticky Total */}
        <div className="fixed bottom-5 md:bottom-6 w-full z-40 px-4 md:px-4 max-w-2xl left-1/2 -translate-x-1/2 pointer-events-none">
          <div className="bg-surface-container-lowest/95 backdrop-blur-md rounded-3xl p-4 flex justify-between items-center shadow-[0_-12px_48px_rgba(22,29,26,0.08)] pointer-events-auto border border-outline-variant/15">
            <div className="flex flex-col">
              <span className="label-md text-on-surface-variant">Total Value</span>
              <span className="headline-xl font-display font-bold text-primary text-xl">
                Rs. 246.24
              </span>
            </div>
            <button className="bg-primary text-on-primary px-6 py-3 rounded-xl font-bold tracking-wide flex items-center gap-2 hover:bg-primary-container transition-colors shadow-lg shadow-primary/10">
              Checkout
              <ArrowRight />
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShoppingCart;
