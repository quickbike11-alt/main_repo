import { MapPin } from 'lucide-react';
import { Bike } from '../types';
import { formatPrice } from '../utils/formatters';
import { useNavigate } from 'react-router-dom';

interface Props {
  bike: Bike;
  onAddToCart?: () => void;
}

export default function BikeCard({ bike, onAddToCart }: Props) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden border border-gray-100">
      <div
        className="h-48 bg-brand-gray cursor-pointer"
        onClick={() => navigate(`/bikes/${bike._id}`)}
      >
        <img
          src={bike.images[0] || '/logo.png'}
          alt={bike.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-heading font-semibold text-lg">{bike.name}</h3>
        <p className="text-sm text-gray-500">{bike.brand}</p>
        <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
          <MapPin size={14} className="text-brand-red" />
          <span>{bike.location.landmark || bike.location.area}</span>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <div>
            <span className="text-brand-red font-bold text-lg">{formatPrice(bike.pricing.perDay)}</span>
            <span className="text-gray-400 text-sm">/day</span>
          </div>
          <span className="text-xs text-gray-500">Deposit: {formatPrice(bike.pricing.deposit)}</span>
        </div>
        <button
          onClick={onAddToCart}
          className="mt-3 w-full bg-brand-red text-white py-2 rounded-lg font-medium hover:bg-red-700 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
