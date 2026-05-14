import mongoose, { Schema, Document } from 'mongoose';

export interface IBooking extends Document {
  bookingId: string;
  user: mongoose.Types.ObjectId;
  bike: mongoose.Types.ObjectId;
  startDate: Date;
  endDate: Date;
  duration: { value: number; unit: 'hours' | 'days' };
  totalAmount: number;
  deposit: number;
  status: 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled';
  payment: {
    razorpayOrderId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;
    status: 'pending' | 'paid' | 'refunded';
  };
}

const bookingSchema = new Schema<IBooking>(
  {
    bookingId: { type: String, unique: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    bike: { type: Schema.Types.ObjectId, ref: 'Bike', required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    duration: {
      value: { type: Number, required: true },
      unit: { type: String, enum: ['hours', 'days'], required: true },
    },
    totalAmount: { type: Number, required: true },
    deposit: { type: Number, required: true },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'active', 'completed', 'cancelled'],
      default: 'pending',
    },
    payment: {
      razorpayOrderId: { type: String, default: '' },
      razorpayPaymentId: { type: String, default: '' },
      razorpaySignature: { type: String, default: '' },
      status: { type: String, enum: ['pending', 'paid', 'refunded'], default: 'pending' },
    },
  },
  { timestamps: true }
);

bookingSchema.pre('save', async function (next) {
  if (!this.bookingId) {
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const count = await mongoose.model('Booking').countDocuments();
    this.bookingId = `QB-${date}-${String(count + 1).padStart(3, '0')}`;
  }
  next();
});

export default mongoose.model<IBooking>('Booking', bookingSchema);
