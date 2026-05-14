import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(name, email, password, phone);
      toast.success('Account created!');
      navigate('/');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl">
        <h1 className="font-heading text-2xl font-bold text-center mb-6">
          Join <span className="text-brand-red">QuickBike</span>
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-600 block mb-1">Full Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-red" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600 block mb-1">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-red" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600 block mb-1">Phone</label>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-red" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600 block mb-1">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-red" />
          </div>
          <button type="submit" disabled={loading} className="w-full bg-brand-red text-white py-3 rounded-lg font-heading font-semibold hover:bg-red-700 transition disabled:opacity-50">
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account? <Link to="/login" className="text-brand-red hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}
