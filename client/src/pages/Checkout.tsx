import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatPrice } from '../utils/formatters';
import api from '../services/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

declare global {
  interface Window { Razorpay: any; }
}

export default function Checkout() {
  const { items, totalAmount, totalDeposit, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);

  const handlePayment = async () => {
    if (items.length === 0) return;
    setProcessing(true);

    try {
      // Create orders for each item
      for (const item of items) {
        const { data } = await api.post('/bookings/create-order', {
          bikeId: item.bike._id,
          startDate: item.startDate,
          endDate: item.endDate,
          duration: item.duration,
        });

        const options = {
          key: data.key,
          amount: data.amount,
          currency: data.currency,
          name: 'QuickBike',
          description: `Rental: ${item.bike.name}`,
          order_id: data.orderId,
          handler: async (response: any) => {
            await api.post('/bookings/verify-payment', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              bookingId: data.bookingId,
            });
          },
          prefill: { name: user?.name, email: user?.email },
          theme: { color: '#E31E24' },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      }

      clearCart();
      toast.success('Booking confirmed!');
      navigate('/booking-confirmation');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Payment failed');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="font-heading text-2xl font-bold mb-6">Checkout</h1>
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 className="font-semibold mb-4">Order Summary</h2>
        {items.map((item) => (
          <div key={item.bike._id} className="flex justify-between py-2 border-b last:border-0">
            <span>{item.bike.name} ({item.duration.value} {item.duration.unit})</span>
            <span className="font-medium">
              {formatPrice((item.duration.unit === 'days' ? item.bike.pricing.perDay : item.bike.pricing.perHour) * item.duration.value)}
            </span>
          </div>
        ))}
        <div className="flex justify-between mt-4 pt-3 border-t"><span>Deposit</span><span>{formatPrice(totalDeposit)}</span></div>
        <div className="flex justify-between mt-2 text-lg font-bold"><span>Total</span><span className="text-brand-red">{formatPrice(totalAmount + totalDeposit)}</span></div>
      </div>
      <button
        onClick={handlePayment}
        disabled={processing || items.length === 0}
        className="w-full bg-brand-red text-white py-3 rounded-lg font-heading font-semibold hover:bg-red-700 transition disabled:opacity-50"
      >
        {processing ? 'Processing...' : `Pay ${formatPrice(totalAmount + totalDeposit)}`}
      </button>
    </div>
  );
}
