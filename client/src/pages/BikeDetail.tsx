import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Bike } from '../types';
import { formatPrice } from '../utils/formatters';
import { MapPin, Fuel, Gauge, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

export default function BikeDetail() {
  const { id } = useParams();
  const [bike, setBike] = useState<Bike | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [duration, setDuration] = useState(1);
  const [unit, setUnit] = useState<'days' | 'hours'>('days');

  useEffect(() => {
    api.get(`/bikes/${id}`)
      .then((res) => setBike(res.data.bike))
      .catch(() => toast.error('Bike not found'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-red"></div></div>;
  if (!bike) return <p className="text-center py-20">Bike not found</p>;

  const handleBook = () => {
    if (!user) { navigate('/login', { state: { from: `/bikes/${id}` } }); return; }
    const endDate = new Date(date);
    if (unit === 'days') endDate.setDate(endDate.getDate() + duration);
    else endDate.setHours(endDate.getHours() + duration);
    addToCart(bike, date, endDate.toISOString().split('T')[0], { value: duration, unit });
    toast.success('Added to cart!');
    navigate('/cart');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="rounded-xl overflow-hidden shadow-lg">
          <img src={bike.images[0] || '/logo.png'} alt={bike.name} className="w-full h-80 object-cover" />
        </div>
        <div>
          <h1 className="font-heading text-3xl font-bold">{bike.name}</h1>
          <p className="text-gray-500">{bike.brand}</p>
          <div className="mt-4 space-y-2 text-sm text-gray-600">
            <p className="flex items-center gap-2"><MapPin size={16} className="text-brand-red" />{bike.location.landmark}, {bike.location.area}</p>
            <p className="flex items-center gap-2"><Settings size={16} className="text-brand-red" />{bike.specifications.engine}</p>
            <p className="flex items-center gap-2"><Gauge size={16} className="text-brand-red" />{bike.specifications.mileage}</p>
            <p className="flex items-center gap-2"><Fuel size={16} className="text-brand-red" />{bike.specifications.fuelType}</p>
          </div>
          <div className="mt-6 bg-brand-gray p-5 rounded-xl">
            <div className="flex gap-6 mb-4">
              <div><span className="text-2xl font-bold text-brand-red">{formatPrice(bike.pricing.perDay)}</span><span className="text-gray-500">/day</span></div>
              <div><span className="text-lg font-semibold">{formatPrice(bike.pricing.perHour)}</span><span className="text-gray-500">/hr</span></div>
            </div>
            <p className="text-sm text-gray-500 mb-4">Deposit: {formatPrice(bike.pricing.deposit)}</p>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} min={new Date().toISOString().split('T')[0]} className="border rounded-lg px-3 py-2 text-sm" />
              <input type="number" min={1} value={duration} onChange={(e) => setDuration(+e.target.value)} className="border rounded-lg px-3 py-2 text-sm" />
              <select value={unit} onChange={(e) => setUnit(e.target.value as any)} className="border rounded-lg px-3 py-2 text-sm">
                <option value="days">Days</option><option value="hours">Hours</option>
              </select>
            </div>
            <button onClick={handleBook} className="w-full bg-brand-red text-white py-3 rounded-lg font-heading font-semibold hover:bg-red-700 transition">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
