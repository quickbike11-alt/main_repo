import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, Search } from 'lucide-react';

export default function SearchForm() {
  const navigate = useNavigate();
  const [date, setDate] = useState('');
  const [duration, setDuration] = useState('1');
  const [unit, setUnit] = useState<'days' | 'hours'>('days');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (date) params.set('date', date);
    params.set('duration', duration);
    params.set('unit', unit);
    navigate(`/bikes?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 max-w-2xl w-full mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-600 mb-1 block flex items-center gap-1">
            <Calendar size={14} /> Pickup Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-red"
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600 mb-1 block flex items-center gap-1">
            <Clock size={14} /> Duration
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              min="1"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-20 border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-red"
            />
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value as 'days' | 'hours')}
              className="flex-1 border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-red"
            >
              <option value="days">Days</option>
              <option value="hours">Hours</option>
            </select>
          </div>
        </div>
        <div className="flex items-end">
          <button
            type="submit"
            className="w-full bg-brand-red text-white py-3 rounded-lg font-heading font-semibold hover:bg-red-700 transition flex items-center justify-center gap-2"
          >
            <Search size={18} /> View Bikes
          </button>
        </div>
      </div>
    </form>
  );
}
