import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { formatPrice } from '../../utils/formatters';
import { Bike, Users, CalendarCheck, MessageSquare, IndianRupee } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ totalBikes: 0, totalBookings: 0, totalUsers: 0, newInquiries: 0, revenue: 0 });

  useEffect(() => {
    api.get('/admin/dashboard').then((res) => setStats(res.data));
  }, []);

  const cards = [
    { label: 'Total Bikes', value: stats.totalBikes, icon: Bike, color: 'bg-blue-50 text-blue-600' },
    { label: 'Total Bookings', value: stats.totalBookings, icon: CalendarCheck, color: 'bg-green-50 text-green-600' },
    { label: 'Users', value: stats.totalUsers, icon: Users, color: 'bg-purple-50 text-purple-600' },
    { label: 'New Inquiries', value: stats.newInquiries, icon: MessageSquare, color: 'bg-yellow-50 text-yellow-600' },
    { label: 'Revenue', value: formatPrice(stats.revenue), icon: IndianRupee, color: 'bg-red-50 text-red-600' },
  ];

  const navLinks = [
    { to: '/admin/bikes', label: 'Manage Bikes' },
    { to: '/admin/bookings', label: 'Manage Bookings' },
    { to: '/admin/users', label: 'Manage Users' },
    { to: '/admin/inquiries', label: 'Manage Inquiries' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="font-heading text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {cards.map((c) => (
          <div key={c.label} className={`rounded-xl p-5 ${c.color}`}>
            <c.icon size={24} className="mb-2" />
            <p className="text-2xl font-bold">{c.value}</p>
            <p className="text-sm opacity-80">{c.label}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {navLinks.map((l) => (
          <Link key={l.to} to={l.to} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition text-center font-heading font-semibold hover:text-brand-red">
            {l.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
