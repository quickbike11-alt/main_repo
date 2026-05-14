import { useState, useEffect } from 'react';
import api from '../../services/api';
import { formatDate } from '../../utils/formatters';
import toast from 'react-hot-toast';

interface Inquiry {
  _id: string;
  name: string;
  email: string;
  phone: string;
  bikeModel: string;
  bikeYear: number;
  message: string;
  status: string;
  adminNotes: string;
  createdAt: string;
}

export default function ManageInquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  const load = () => api.get('/admin/inquiries').then((r) => setInquiries(r.data.inquiries));
  useEffect(() => { load(); }, []);

  const update = async (id: string, data: any) => {
    await api.patch(`/admin/inquiries/${id}`, data);
    toast.success('Updated');
    load();
  };

  const statusColor = (s: string) => {
    const map: Record<string, string> = { new: 'bg-yellow-100 text-yellow-700', contacted: 'bg-blue-100 text-blue-700', resolved: 'bg-green-100 text-green-700' };
    return map[s] || 'bg-gray-100';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="font-heading text-2xl font-bold mb-6">P2P Inquiries</h1>
      <div className="space-y-4">
        {inquiries.map((i) => (
          <div key={i._id} className="bg-white rounded-xl shadow-md p-5">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{i.name}</h3>
                <p className="text-sm text-gray-500">{i.email} &middot; {i.phone}</p>
                <p className="text-sm mt-1"><strong>Bike:</strong> {i.bikeModel} {i.bikeYear && `(${i.bikeYear})`}</p>
                {i.message && <p className="text-sm text-gray-600 mt-1">{i.message}</p>}
                <p className="text-xs text-gray-400 mt-2">{formatDate(i.createdAt)}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor(i.status)}`}>{i.status}</span>
                <select value={i.status} onChange={(e) => update(i._id, { status: e.target.value })} className="border rounded px-2 py-1 text-xs">
                  <option value="new">New</option><option value="contacted">Contacted</option><option value="resolved">Resolved</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
