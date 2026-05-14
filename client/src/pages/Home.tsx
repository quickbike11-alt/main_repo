import { Bike as BikeIcon, Shield, Clock, Users, Zap, HeartHandshake } from 'lucide-react';
import SearchForm from '../components/SearchForm';
import { LOCATIONS } from '../utils/constants';

const features = [
  { icon: BikeIcon, title: 'Diverse Fleet', desc: 'From scooters to sports bikes — pick your ride' },
  { icon: Clock, title: 'Flexible Rentals', desc: 'Hourly, daily, or monthly — your schedule, your rules' },
  { icon: Shield, title: 'Safety First', desc: 'All bikes inspected before every ride' },
  { icon: Zap, title: 'Instant Booking', desc: 'Book in seconds with secure online payment' },
  { icon: Users, title: 'Community', desc: 'Join rides, meet-ups, and biking events' },
  { icon: HeartHandshake, title: 'Peer-to-Peer', desc: 'Earn by listing your own bike with us' },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section 
        className="relative min-h-[85vh] flex items-center justify-center overflow-hidden"
        style={{ 
          backgroundImage: `url('https://res.cloudinary.com/dxf94btjl/image/upload/v1778148166/ChatGPT_Image_May_7_2026_03_27_29_PM_zahzx4.png')`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center' 
        }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-red/20 to-transparent"></div>
        </div>
        <div className="relative z-10 text-center px-4 py-20">
          {/* <img src="https://res.cloudinary.com/dxf94btjl/image/upload/v1778141837/logo-without-bg_uxbw6h.png" alt="QuickBike" className="h-20 mx-auto mb-6" /> */}
          <h1 className="font-heading text-4xl md:text-6xl font-extrabold text-white mb-3">
            QUICK<span className="text-brand-red">BIKE</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl tracking-widest mb-10 font-heading">
            RENT. RIDE. RELAX.
          </p>
          <SearchForm />
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <h2 className="font-heading text-3xl font-bold text-center mb-12">
          Why <span className="text-brand-red">QuickBike</span>?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f) => (
            <div key={f.title} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition border border-gray-50">
              <f.icon className="text-brand-red mb-4" size={36} />
              <h3 className="font-heading font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-gray-500 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Locations */}
      <section className="py-16 bg-brand-gray px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="font-heading text-3xl font-bold mb-8">
            We Serve In
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {LOCATIONS.map((loc) => (
              <span key={loc} className="bg-white px-6 py-3 rounded-full shadow text-brand-black font-medium">
                {loc}
              </span>
            ))}
            <span className="bg-brand-red text-white px-6 py-3 rounded-full shadow font-medium">
              + More Coming Soon
            </span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 text-center bg-brand-dark">
        <h2 className="font-heading text-3xl font-bold text-white mb-4">
          Ready to Hit the Road?
        </h2>
        <p className="text-gray-400 mb-8">Join thousands of riders who trust QuickBike</p>
        <a href="/bikes" className="inline-block bg-brand-red text-white px-8 py-3 rounded-lg font-heading font-semibold hover:bg-red-700 transition text-lg">
          Browse Bikes Now
        </a>
      </section>
    </div>
  );
}
