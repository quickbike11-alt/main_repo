import mongoose, { Schema, Document } from 'mongoose';

export interface IInquiry extends Document {
  name: string;
  email: string;
  phone: string;
  bikeModel: string;
  bikeYear: number;
  message: string;
  status: 'new' | 'contacted' | 'resolved';
  adminNotes: string;
}

const inquirySchema = new Schema<IInquiry>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    bikeModel: { type: String, required: true },
    bikeYear: { type: Number },
    message: { type: String, default: '' },
    status: { type: String, enum: ['new', 'contacted', 'resolved'], default: 'new' },
    adminNotes: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.model<IInquiry>('Inquiry', inquirySchema);
