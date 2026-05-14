import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import Bike from '../models/Bike';

const bikes = [
  {
    name: 'Honda Activa 6G',
    brand: 'Honda',
    images: ['https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600'],
    pricing: { perDay: 400, deposit: 1000 },
    location: { area: 'Wakad', landmark: 'Near Wakad Bridge' },
    specifications: { engine: '109.51cc', mileage: '50 kmpl', fuelType: 'Petrol' },
  },
  {
    name: 'Royal Enfield Classic 350',
    brand: 'Royal Enfield',
    images: ['https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600'],
    pricing: { perDay: 1200, deposit: 3000 },
    location: { area: 'Hinjewadi', landmark: 'Near Hinjewadi Phase 1 Gate' },
    specifications: { engine: '349cc', mileage: '35 kmpl', fuelType: 'Petrol' },
  },
  {
    name: 'TVS Jupiter',
    brand: 'TVS',
    images: ['https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=600'],
    pricing: { perDay: 350, deposit: 800 },
    location: { area: 'Sinhgad Campus', landmark: 'Near Sinhgad College Gate' },
    specifications: { engine: '109.7cc', mileage: '55 kmpl', fuelType: 'Petrol' },
  },
  {
    name: 'Bajaj Pulsar 150',
    brand: 'Bajaj',
    images: ['https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=600'],
    pricing: { perHour: 80, perDay: 600, deposit: 1500 },
    location: { area: 'Vadgaon Bk', landmark: 'Near Vadgaon Bus Stop' },
    specifications: { engine: '149.5cc', mileage: '40 kmpl', fuelType: 'Petrol' },
  },
  {
    name: 'Honda SP 125',
    brand: 'Honda',
    images: ['https://images.unsplash.com/photo-1558981285-6f0c94958bb6?w=600'],
    pricing: { perHour: 70, perDay: 550, deposit: 1200 },
    location: { area: 'Ambegaon Bk', landmark: 'Near Ambegaon Pathar Chowk' },
    specifications: { engine: '124cc', mileage: '55 kmpl', fuelType: 'Petrol' },
  },
  {
    name: 'Yamaha FZ-S V3',
    brand: 'Yamaha',
    images: ['https://images.unsplash.com/photo-1558980664-769d59546b3d?w=600'],
    pricing: { perHour: 100, perDay: 800, deposit: 2000 },
    location: { area: 'Wakad', landmark: 'Near Datta Mandir Chowk' },
    specifications: { engine: '149cc', mileage: '38 kmpl', fuelType: 'Petrol' },
  },
  {
    name: 'Hero Splendor Plus',
    brand: 'Hero',
    images: ['https://images.unsplash.com/photo-1622185135505-2d795003994a?w=600'],
    pricing: { perHour: 40, perDay: 300, deposit: 700 },
    location: { area: 'Hinjewadi', landmark: 'Near Wipro Circle' },
    specifications: { engine: '97.2cc', mileage: '60 kmpl', fuelType: 'Petrol' },
  },
  {
    name: 'KTM Duke 200',
    brand: 'KTM',
    images: ['https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600'],
    pricing: { perHour: 180, perDay: 1500, deposit: 4000 },
    location: { area: 'Wakad', landmark: 'Near Wakad Bridge' },
    specifications: { engine: '199.5cc', mileage: '30 kmpl', fuelType: 'Petrol' },
  },
  {
    name: 'Suzuki Access 125',
    brand: 'Suzuki',
    images: ['https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=600'],
    pricing: { perHour: 55, perDay: 420, deposit: 1000 },
    location: { area: 'Sinhgad Campus', landmark: 'Near MITCON College' },
    specifications: { engine: '124cc', mileage: '50 kmpl', fuelType: 'Petrol' },
  },
  {
    name: 'Bajaj Dominar 250',
    brand: 'Bajaj',
    images: ['https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=600'],
    pricing: { perHour: 140, perDay: 1100, deposit: 3000 },
    location: { area: 'Vadgaon Bk', landmark: 'Near Bharati Vidyapeeth' },
    specifications: { engine: '248.77cc', mileage: '32 kmpl', fuelType: 'Petrol' },
  },
  {
    name: 'Honda Dio',
    brand: 'Honda',
    images: ['https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600'],
    pricing: { perHour: 45, perDay: 350, deposit: 800 },
    location: { area: 'Ambegaon Bk', landmark: 'Near Katraj Dairy' },
    specifications: { engine: '109.51cc', mileage: '48 kmpl', fuelType: 'Petrol' },
  },
  {
    name: 'RE Himalayan 411',
    brand: 'Royal Enfield',
    images: ['https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600'],
    pricing: { perDay: 1800, deposit: 5000 },
    location: { area: 'Hinjewadi', landmark: 'Near Xion Mall' },
    specifications: { engine: '411cc', mileage: '30 kmpl', fuelType: 'Petrol' },
  },
];

const seed = async () => {
  await mongoose.connect(process.env.MONGODB_URI || '');
  await Bike.deleteMany({});
  await Bike.insertMany(bikes);
  console.log(`Seeded ${bikes.length} bikes`);
  process.exit(0);
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
