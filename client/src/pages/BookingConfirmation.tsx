import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function BookingConfirmation() {
  return (
    <div className="max-w-lg mx-auto px-4 py-20 text-center">
      <CheckCircle size={64} className="text-green-500 mx-auto mb-6" />
      <h1 className="font-heading text-3xl font-bold mb-3">Booking Confirmed!</h1>
      <p className="text-gray-500 mb-8">Your ride is booked. Check your profile for booking details.</p>
      <div className="flex gap-4 justify-center">
        <Link to="/profile" className="bg-brand-red text-white px-6 py-2.5 rounded-lg font-medium hover:bg-red-700 transition">
          View My Bookings
        </Link>
        <Link to="/bikes" className="border border-brand-red text-brand-red px-6 py-2.5 rounded-lg font-medium hover:bg-brand-red hover:text-white transition">
          Browse More Bikes
        </Link>
      </div>
    </div>
  );
}
