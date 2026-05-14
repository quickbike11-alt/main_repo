import { useState, useEffect } from 'react';
import api from '../services/api';
import { Booking } from '../types';
import { formatPrice, formatDate } from '../utils/formatters';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/bookings/my-bookings')
      .then((res) => setBookings(res.data.bookings))
      .finally(() => setLoading(false));
  }, []);

  const statusColor = (s: string) => {
    const map: Record<string, string> = { confirmed: 'bg-green-100 text-green-700', pending: 'bg-yellow-100 text-yellow-700', completed: 'bg-blue-100 text-blue-700', cancelled: 'bg-red-100 text-red-700', active: 'bg-purple-100 text-purple-700' };
    return map[s] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h1 className="font-heading text-2xl font-bold mb-2">My Profile</h1>
        <p className="text-gray-600">{user?.name} &middot; {user?.email}</p>
      </div>

      <h2 className="font-heading text-xl font-bold mb-4">Booking History</h2>
      {loading ? (
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-red mx-auto"></div>
      ) : bookings.length === 0 ? (
        <p className="text-gray-500">No bookings yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-brand-gray">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Booking ID</th>
                <th className="text-left px-4 py-3 font-medium">Bike</th>
                <th className="text-left px-4 py-3 font-medium">Dates</th>
                <th className="text-left px-4 py-3 font-medium">Amount</th>
                <th className="text-left px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b._id} className="border-b">
                  <td className="px-4 py-3 font-mono text-xs">{b.bookingId}</td>
                  <td className="px-4 py-3">{b.bike?.name || 'N/A'}</td>
                  <td className="px-4 py-3">{formatDate(b.startDate)} — {formatDate(b.endDate)}</td>
                  <td className="px-4 py-3">{formatPrice(b.totalAmount + b.deposit)}</td>
                  <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor(b.status)}`}>{b.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
