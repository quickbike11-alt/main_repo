import { Response } from 'express';
import crypto from 'crypto';
import { razorpay } from '../config/razorpay';
import Booking from '../models/Booking';
import Bike from '../models/Bike';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiError } from '../utils/ApiError';
import { AuthRequest } from '../middleware/auth.middleware';

export const createOrder = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { bikeId, startDate, endDate, duration } = req.body;

  const bike = await Bike.findById(bikeId);
  if (!bike) throw new ApiError(404, 'Bike not found');

  const totalAmount =
    duration.unit === 'days'
      ? bike.pricing.perDay * duration.value
      : bike.pricing.perHour * duration.value;

  const order = await razorpay.orders.create({
    amount: (totalAmount + bike.pricing.deposit) * 100, // paise
    currency: 'INR',
    receipt: `qb_${Date.now()}`,
  });

  const booking = await Booking.create({
    user: req.user._id,
    bike: bikeId,
    startDate,
    endDate,
    duration,
    totalAmount,
    deposit: bike.pricing.deposit,
    payment: { razorpayOrderId: order.id, status: 'pending' },
  });

  res.json({
    orderId: order.id,
    amount: order.amount,
    currency: order.currency,
    bookingId: booking._id,
    key: process.env.RAZORPAY_KEY_ID,
  });
});

export const verifyPayment = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId } = req.body;

  const body = razorpay_order_id + '|' + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '')
    .update(body)
    .digest('hex');

  if (expectedSignature !== razorpay_signature) {
    throw new ApiError(400, 'Invalid payment signature');
  }

  const booking = await Booking.findByIdAndUpdate(
    bookingId,
    {
      status: 'confirmed',
      'payment.razorpayPaymentId': razorpay_payment_id,
      'payment.razorpaySignature': razorpay_signature,
      'payment.status': 'paid',
    },
    { new: true }
  ).populate('bike');

  res.json({ success: true, booking });
});

export const getMyBookings = asyncHandler(async (req: AuthRequest, res: Response) => {
  const bookings = await Booking.find({ user: req.user._id })
    .populate('bike', 'name images pricing location')
    .sort({ createdAt: -1 });
  res.json({ bookings });
});
