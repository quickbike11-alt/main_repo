import { useState } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';

export default function RentYourBike() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', bikeModel: '', bikeYear: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/inquiries', { ...form, bikeYear: form.bikeYear ? Number(form.bikeYear) : undefined });
      toast.success('Inquiry submitted! We\'ll contact you soon.');
      setSubmitted(true);
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to submit');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <h1 className="font-heading text-2xl font-bold mb-3">Thank You!</h1>
        <p className="text-gray-500">We've received your inquiry. Our team will contact you within 24 hours.</p>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-10">
      <h1 className="font-heading text-2xl font-bold mb-2">Rent Your Bike</h1>
      <p className="text-gray-500 mb-6">Own a bike? Earn passive income by listing it with QuickBike.</p>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white rounded-xl shadow-md p-6">
        <input type="text" placeholder="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-red" />
        <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-red" />
        <input type="tel" placeholder="Phone Number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-red" />
        <input type="text" placeholder="Bike Model (e.g., Honda Activa 6G)" value={form.bikeModel} onChange={(e) => setForm({ ...form, bikeModel: e.target.value })} required className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-red" />
        <input type="number" placeholder="Year of Purchase" value={form.bikeYear} onChange={(e) => setForm({ ...form, bikeYear: e.target.value })} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-red" />
        <textarea placeholder="Any additional details..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={3} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-red" />
        <button type="submit" disabled={loading} className="w-full bg-brand-red text-white py-3 rounded-lg font-heading font-semibold hover:bg-red-700 transition disabled:opacity-50">
          {loading ? 'Submitting...' : 'Submit Inquiry'}
        </button>
      </form>
    </div>
  );
}
