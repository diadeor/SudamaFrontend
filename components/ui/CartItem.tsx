import { Minus, Plus } from "lucide-react";

interface Cart {
  name: string;
  qty: number;
  price: number;
}

const CartItem = ({ name, qty, price }: Cart) => {
  return (
    <article className="bg-surface-container-lowest rounded-3xl p-4 flex gap-5 items-center shadow-[0_8px_32px_rgba(22,29,26,0.02)] transition-transform duration-300 hover:scale-[1.01]">
      <div className="w-24 h-28 rounded-xl overflow-hidden shrink-0 bg-surface-container-low">
        <img
          alt="Monstera Deliciosa"
          className="w-full h-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHQgRP3hOqyJ4Rcmp2z8qDl-N8JeCo5xDZo6vG18AnMkQijKlPPlorMmetS301LBFOTXVgudZE3wUa0PCW7npwkcRHOAY5gL-QzQoxktYMTgs7-lk05BBePNbExVA1TqpaSMl_JC_Y5qZrFhy0_dIlhc9DwUb06NHip7JIrtxlHELcd6eMQ_RwT16dmmvzG88isbujtXfQGrQXH9qUqzUk4Fyvvcl0fpx5Zy3mNoBE15u--eb4s8eCMx_C9mdiUvJRk1o8vzuEaw"
        />
      </div>
      <div className="flex-1 flex flex-col h-full justify-between py-1">
        <div>
          <h3 className="title-lg font-headline font-bold text-primary leading-tight">{name}</h3>
          <p className="label-md text-on-surface-variant mt-1">Mature Specimen • 10" Pot</p>
        </div>
        <div className="flex justify-between items-end mt-4">
          <span className="body-lg font-bold text-primary">Rs. {price}</span>
          {/* Quantity Control */}
          <div className="flex items-center gap-3 bg-surface-container-high rounded-full px-3 py-1.5">
            <button className="text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center">
              <Minus />
            </button>
            <span className="font-bold text-primary text-sm w-4 text-center">{qty}</span>
            <button className="text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center">
              <Plus />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default CartItem;
