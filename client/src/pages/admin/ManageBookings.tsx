import { useState, useEffect } from 'react';
import api from '../../services/api';
import { formatPrice, formatDate } from '../../utils/formatters';
import toast from 'react-hot-toast';

interface AdminBooking {
  _id: string;
  bookingId: string;
  user: { name: string; email: string; phone: string };
  bike: { name: string };
  startDate: string;
  endDate: string;
  totalAmount: number;
  deposit: number;
  status: string;
}

export default function ManageBookings() {
  const [bookings, setBookings] = useState<AdminBooking[]>([]);

  const load = () => api.get('/admin/bookings').then((r) => setBookings(r.data.bookings));
  useEffect(() => { load(); }, []);

  const updateStatus = async (id: string, status: string) => {
    await api.patch(`/admin/bookings/${id}`, { status });
    toast.success('Status updated');
    load();
  };

  const statusColor = (s: string) => {
    const map: Record<string, string> = { confirmed: 'bg-green-100 text-green-700', pending: 'bg-yellow-100 text-yellow-700', completed: 'bg-blue-100 text-blue-700', cancelled: 'bg-red-100 text-red-700', active: 'bg-purple-100 text-purple-700' };
    return map[s] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="font-heading text-2xl font-bold mb-6">Manage Bookings</h1>
      <div className="overflow-x-auto">
        <table className="w-full text-sm bg-white rounded-xl shadow-md">
          <thead className="bg-brand-gray">
            <tr>
              <th className="text-left px-4 py-3">ID</th>
              <th className="text-left px-4 py-3">User</th>
              <th className="text-left px-4 py-3">Bike</th>
              <th className="text-left px-4 py-3">Dates</th>
              <th className="text-left px-4 py-3">Amount</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id} className="border-b">
                <td className="px-4 py-3 font-mono text-xs">{b.bookingId}</td>
                <td className="px-4 py-3">{b.user?.name}<br /><span className="text-xs text-gray-400">{b.user?.phone}</span></td>
                <td className="px-4 py-3">{b.bike?.name}</td>
                <td className="px-4 py-3 text-xs">{formatDate(b.startDate)} — {formatDate(b.endDate)}</td>
                <td className="px-4 py-3">{formatPrice(b.totalAmount + b.deposit)}</td>
                <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor(b.status)}`}>{b.status}</span></td>
                <td className="px-4 py-3">
                  <select value={b.status} onChange={(e) => updateStatus(b._id, e.target.value)} className="border rounded px-2 py-1 text-xs">
                    {['pending', 'confirmed', 'active', 'completed', 'cancelled'].map((s) => <option key={s}>{s}</option>)}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
