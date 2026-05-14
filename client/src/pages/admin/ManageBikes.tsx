import { useState, useEffect } from 'react';
import api from '../../services/api';
import { Bike } from '../../types';
import { formatPrice } from '../../utils/formatters';
import toast from 'react-hot-toast';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { LOCATIONS } from '../../utils/constants';

export default function ManageBikes() {
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Bike | null>(null);
  const [form, setForm] = useState({
    name: '', brand: '', images: '', perHour: '', perDay: '', deposit: '', area: 'Wakad', landmark: '', engine: '', mileage: '', fuelType: 'Petrol', isHourlyAvailable: 'false'
  });

  const load = () => api.get('/bikes?available=all').then((r) => setBikes(r.data.bikes));
  useEffect(() => { load(); }, []);

  const resetForm = () => {
    setForm({ name: '', brand: '', images: '', perHour: '', perDay: '', deposit: '', area: 'Wakad', landmark: '', engine: '', mileage: '', fuelType: 'Petrol', isHourlyAvailable: 'false' });
    setEditing(null);
    setShowForm(false);
  };

  const handleEdit = (bike: Bike) => {
    setEditing(bike);
    setForm({
      name: bike.name, brand: bike.brand, images: bike.images.join(','),
      perHour: String(bike.pricing.perHour), perDay: String(bike.pricing.perDay), deposit: String(bike.pricing.deposit),
      area: bike.location.area, landmark: bike.location.landmark,
      engine: bike.specifications.engine, mileage: bike.specifications.mileage, fuelType: bike.specifications.fuelType, isHourlyAvailable: String(bike.isHourlyAvailable)
    });
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name: form.name, brand: form.brand, images: form.images.split(',').map((s) => s.trim()).filter(Boolean),
      pricing: { perHour: +form.perHour, perDay: +form.perDay, deposit: +form.deposit },
      location: { area: form.area, landmark: form.landmark },
      specifications: { engine: form.engine, mileage: form.mileage, fuelType: form.fuelType },
      isHourlyAvailable: form.isHourlyAvailable === 'true'
    };
    try {
      if (editing) await api.put(`/admin/bikes/${editing._id}`, payload);
      else await api.post('/admin/bikes', payload);
      toast.success(editing ? 'Bike updated' : 'Bike added');
      resetForm();
      load();
    } catch { toast.error('Failed'); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this bike?')) return;
    await api.delete(`/admin/bikes/${id}`);
    toast.success('Deleted');
    load();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-heading text-2xl font-bold">Manage Bikes</h1>
        <button onClick={() => setShowForm(!showForm)} className="bg-brand-red text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium">
          <Plus size={18} /> Add Bike
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="border rounded-lg px-3 py-2" />
          <input placeholder="Brand" value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} required className="border rounded-lg px-3 py-2" />
          <input placeholder="Image URLs (comma-separated)" value={form.images} onChange={(e) => setForm({ ...form, images: e.target.value })} className="border rounded-lg px-3 py-2" />
          <input placeholder="Price/Hour" type="number" value={form.perHour} onChange={(e) => setForm({ ...form, perHour: e.target.value })} required className="border rounded-lg px-3 py-2" />
          <input placeholder="Price/Day" type="number" value={form.perDay} onChange={(e) => setForm({ ...form, perDay: e.target.value })} required className="border rounded-lg px-3 py-2" />
          <input placeholder="Deposit" type="number" value={form.deposit} onChange={(e) => setForm({ ...form, deposit: e.target.value })} required className="border rounded-lg px-3 py-2" />
          <select value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })} className="border rounded-lg px-3 py-2">
            {LOCATIONS.map((l) => <option key={l}>{l}</option>)}
          </select>
          <input placeholder="Landmark" value={form.landmark} onChange={(e) => setForm({ ...form, landmark: e.target.value })} className="border rounded-lg px-3 py-2" />
          <input placeholder="Engine" value={form.engine} onChange={(e) => setForm({ ...form, engine: e.target.value })} className="border rounded-lg px-3 py-2" />
          <input placeholder="Mileage" value={form.mileage} onChange={(e) => setForm({ ...form, mileage: e.target.value })} className="border rounded-lg px-3 py-2" />
          <select value={form.isHourlyAvailable} onChange={(e) => setForm({ ...form, isHourlyAvailable: e.target.value })} className="border rounded-lg px-3 py-2">
            <option value="false">Not Hourly</option><option value="true">Hourly Available</option>
          </select>
          <select value={form.fuelType} onChange={(e) => setForm({ ...form, fuelType: e.target.value })} className="border rounded-lg px-3 py-2">
            <option>Petrol</option><option>Electric</option>
          </select>
          <div className="flex gap-2">
            <button type="submit" className="bg-brand-red text-white px-4 py-2 rounded-lg font-medium">{editing ? 'Update' : 'Add'}</button>
            <button type="button" onClick={resetForm} className="border px-4 py-2 rounded-lg">Cancel</button>
          </div>
        </form>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm bg-white rounded-xl shadow-md">
          <thead className="bg-brand-gray">
            <tr>
              <th className="text-left px-4 py-3">Name</th>
              <th className="text-left px-4 py-3">Location</th>
              <th className="text-left px-4 py-3">Price/Day</th>
              <th className="text-left px-4 py-3">Deposit</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bikes.map((b) => (
              <tr key={b._id} className="border-b">
                <td className="px-4 py-3">{b.name}</td>
                <td className="px-4 py-3">{b.location.area}</td>
                <td className="px-4 py-3">{formatPrice(b.pricing.perDay)}</td>
                <td className="px-4 py-3">{formatPrice(b.pricing.deposit)}</td>
                <td className="px-4 py-3 flex gap-2 justify-center">
                  <button onClick={() => handleEdit(b)} className="text-blue-500 hover:text-blue-700"><Pencil size={16} /></button>
                  <button onClick={() => handleDelete(b._id)} className="text-red-500 hover:text-red-700"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
