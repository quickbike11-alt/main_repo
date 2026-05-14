import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatters';
import { Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { items, removeFromCart, totalAmount, totalDeposit } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="font-heading text-2xl font-bold mb-4">Your Cart is Empty</h1>
        <Link to="/bikes" className="text-brand-red hover:underline">Browse Bikes</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="font-heading text-2xl font-bold mb-6">Your Cart</h1>
      <div className="space-y-4">
        {items.map((item) => {
          const price = item.duration.unit === 'days' ? item.bike.pricing.perDay : item.bike.pricing.perHour;
          return (
            <div key={item.bike._id} className="bg-white rounded-xl shadow-md p-4 flex gap-4 items-center">
              <img src={item.bike.images[0] || '/logo.png'} alt={item.bike.name} className="w-24 h-20 object-cover rounded-lg" />
              <div className="flex-1">
                <h3 className="font-heading font-semibold">{item.bike.name}</h3>
                <p className="text-sm text-gray-500">{item.duration.value} {item.duration.unit} &middot; {item.startDate}</p>
                <p className="text-sm text-gray-500">Deposit: {formatPrice(item.bike.pricing.deposit)}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-brand-red">{formatPrice(price * item.duration.value)}</p>
                <button onClick={() => removeFromCart(item.bike._id)} className="text-gray-400 hover:text-red-500 mt-2">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-8 bg-brand-gray rounded-xl p-6">
        <div className="flex justify-between mb-2"><span>Rental Total</span><span className="font-semibold">{formatPrice(totalAmount)}</span></div>
        <div className="flex justify-between mb-2"><span>Deposit</span><span className="font-semibold">{formatPrice(totalDeposit)}</span></div>
        <div className="flex justify-between border-t pt-3 mt-3 text-lg font-bold"><span>Grand Total</span><span className="text-brand-red">{formatPrice(totalAmount + totalDeposit)}</span></div>
        <Link to="/checkout" className="block mt-6 bg-brand-red text-white text-center py-3 rounded-lg font-heading font-semibold hover:bg-red-700 transition">
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}
