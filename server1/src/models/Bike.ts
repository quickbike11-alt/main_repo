import mongoose, { Schema, Document } from 'mongoose';

export const LOCATIONS = ['Wakad', 'Hinjewadi', 'Sinhgad Campus', 'Vadgaon Bk', 'Ambegaon Bk'] as const;

export interface IBike extends Document {
  name: string;
  brand: string;
  images: string[];
  pricing: { perHour: number; perDay: number; deposit: number };
  location: { area: string; landmark: string };
  specifications: { engine: string; mileage: string; fuelType: string };
  isAvailable: boolean;
  isHourlyAvailable: boolean;
  unavailableDates: { from: Date; to: Date }[];
}

const bikeSchema = new Schema<IBike>(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    images: [{ type: String }],
    pricing: {
      perHour: { type: Number },
      perDay: { type: Number, required: true },
      deposit: { type: Number, required: true },
    },
    location: {
      area: { type: String, enum: LOCATIONS, required: true },
      landmark: { type: String, default: '' },
    },
    specifications: {
      engine: { type: String, default: '' },
      mileage: { type: String, default: '' },
      fuelType: { type: String, default: 'Petrol' },
    },
    isAvailable: { type: Boolean, default: true },
    isHourlyAvailable: { type: Boolean, default: false },
    unavailableDates: [{ from: Date, to: Date }],
  },
  { timestamps: true }
);

export default mongoose.model<IBike>('Bike', bikeSchema);
