import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      <h1 className="font-heading text-6xl font-bold text-brand-red mb-4">404</h1>
      <p className="text-gray-500 mb-6">Page not found</p>
      <Link to="/" className="bg-brand-red text-white px-6 py-2.5 rounded-lg font-medium hover:bg-red-700 transition">
        Go Home
      </Link>
    </div>
  );
}
