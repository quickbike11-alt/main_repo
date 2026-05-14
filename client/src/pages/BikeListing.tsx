import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../services/api';
import { Bike } from '../types';
import BikeCard from '../components/BikeCard';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { LOCATIONS } from '../utils/constants';
import toast from 'react-hot-toast';
import { Filter } from 'lucide-react';

export default function BikeListing() {
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [locationFilter, setLocationFilter] = useState('');
  const { user } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const date = searchParams.get('date') || '';
  const duration = searchParams.get('duration') || '1';
  const unit = (searchParams.get('unit') || 'days') as 'days' | 'hours';
  const isHourlyAvailable = unit === 'hours';

  useEffect(() => {
    const params: any = {};
    if (date) params.date = date;
    if (locationFilter) params.location = locationFilter;
    if (isHourlyAvailable) params.isHourlyAvailable = isHourlyAvailable;
    api.get('/bikes', { params })
      .then((res) => {
        let fetched: Bike[] = res.data.bikes || [];
        // When unit is hours, only show bikes that support hourly rentals.
        if (unit === 'hours') {
          fetched = fetched.filter((b) => (b as any).isHourlyAvailable || (b as any).hourlyAvailable);
        }
        setBikes(fetched);
      })
      .catch(() => toast.error('Failed to load bikes'))
      .finally(() => setLoading(false));
  }, [date, locationFilter, unit]);
  
  const handleAddToCart = (bike: Bike) => {
    if (!user) {
      navigate('/login', { state: { from: '/bikes' } });
      return;
    }
    const startDate = date || new Date().toISOString().split('T')[0];
    const durationVal = parseInt(duration);
    const endDate = new Date(startDate);
    if (unit === 'days') endDate.setDate(endDate.getDate() + durationVal);
    else endDate.setHours(endDate.getHours() + durationVal);

    addToCart(bike, startDate, endDate.toISOString().split('T')[0], { value: durationVal, unit });
    toast.success(`${bike.name} added to cart!`);
  };

  if (loading) return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-red"></div></div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filter sidebar */}
        <aside className="md:w-64 shrink-0">
          <div className="bg-white p-5 rounded-xl shadow-md sticky top-20">
            <h3 className="font-heading font-semibold mb-4 flex items-center gap-2"><Filter size={18} /> Filters</h3>
            <label className="text-sm font-medium text-gray-600 block mb-2">Location</label>
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-red focus:outline-none"
            >
              <option value="">All Locations</option>
              {LOCATIONS.map((loc) => <option key={loc} value={loc}>{loc}</option>)}
            </select>
          </div>
        </aside>

        {/* Bike grid */}
        <div className="flex-1">
          <h1 className="font-heading text-2xl font-bold mb-6">
            Available Bikes {date && <span className="text-base font-normal text-gray-500">for {date}</span>}
          </h1>
          {bikes.length === 0 ? (
            <p className="text-gray-500 text-center py-12">No bikes available for your selection. Try a different location or date.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {bikes.map((bike) => (
                <BikeCard key={bike._id} bike={bike} onAddToCart={() => handleAddToCart(bike)} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
