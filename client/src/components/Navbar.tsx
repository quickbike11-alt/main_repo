import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-brand-dark sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src="https://res.cloudinary.com/dxf94btjl/image/upload/v1778141837/logo-without-bg_uxbw6h.png" alt="QuickBike" className="h-16" />
          <span className="text-white font-heading font-bold text-xl hidden sm:block">
            QUICK<span className="text-brand-red">BIKE</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/bikes" className="text-white hover:text-brand-red transition font-medium">Bikes</Link>
          <Link to="/rent-your-bike" className="border border-brand-red text-brand-red px-4 py-1.5 rounded hover:bg-brand-red hover:text-white transition font-medium">
            Rent Your Bike
          </Link>
          {user ? (
            <>
              <Link to="/cart" className="relative text-white hover:text-brand-red transition">
                <ShoppingCart size={22} />
                {items.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-brand-red text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {items.length}
                  </span>
                )}
              </Link>
              <div className="relative group">
                <button className="text-white hover:text-brand-red transition flex items-center gap-1">
                  <User size={20} /> <span className="text-sm">{user.name.split(' ')[0]}</span>
                </button>
                <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-xl py-2 w-40 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <Link to="/profile" className="block px-4 py-2 text-brand-black hover:bg-brand-gray">Profile</Link>
                  {user.role === 'admin' && (
                    <Link to="/admin" className="block px-4 py-2 text-brand-black hover:bg-brand-gray">Admin</Link>
                  )}
                  <button onClick={() => { logout(); navigate('/'); }} className="block w-full text-left px-4 py-2 text-brand-black hover:bg-brand-gray">
                    Logout
                  </button>
                </div>
              </div>
            </>
          ) : (
            <Link to="/login" className="bg-brand-red text-white px-5 py-2 rounded font-medium hover:bg-red-700 transition">
              Login
            </Link>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-brand-dark border-t border-gray-800 px-4 py-4 space-y-3">
          <Link to="/bikes" onClick={() => setOpen(false)} className="block text-white">Bikes</Link>
          <Link to="/rent-your-bike" onClick={() => setOpen(false)} className="block text-brand-red">Rent Your Bike</Link>
          {user ? (
            <>
              <Link to="/cart" onClick={() => setOpen(false)} className="block text-white">Cart ({items.length})</Link>
              <Link to="/profile" onClick={() => setOpen(false)} className="block text-white">Profile</Link>
              {user.role === 'admin' && <Link to="/admin" onClick={() => setOpen(false)} className="block text-white">Admin</Link>}
              <button onClick={() => { logout(); navigate('/'); setOpen(false); }} className="block text-white">Logout</button>
            </>
          ) : (
            <Link to="/login" onClick={() => setOpen(false)} className="block text-brand-red font-medium">Login</Link>
          )}
        </div>
      )}
    </nav>
  );
}
