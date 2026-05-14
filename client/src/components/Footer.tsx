import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-heading font-bold text-xl mb-3">
            QUICK<span className="text-brand-red">BIKE</span>
          </h3>
          <p className="text-gray-400 text-sm">Rent. Ride. Relax. Your trusted bike rental partner in Pune.</p>
        </div>
        <div>
          <h4 className="font-heading font-semibold mb-3">Quick Links</h4>
          <div className="space-y-2 text-sm text-gray-400">
            <Link to="/bikes" className="block hover:text-brand-red">Browse Bikes</Link>
            <Link to="/rent-your-bike" className="block hover:text-brand-red">Rent Your Bike</Link>
            <Link to="/profile" className="block hover:text-brand-red">My Bookings</Link>
          </div>
        </div>
        <div>
          <h4 className="font-heading font-semibold mb-3">Contact</h4>
          <div className="space-y-2 text-sm text-gray-400">
            <p className="flex items-center gap-2"><Mail size={14} /> quickbike11@gmail.com</p>
            <p className="flex items-center gap-2"><Phone size={14} /> 24/7 Support</p>
            <p className="flex items-center gap-2"><MapPin size={14} /> Pune, Maharashtra</p>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-8 pt-6 border-t border-gray-800 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} QuickBike. All rights reserved.
      </div>
    </footer>
  );
}
