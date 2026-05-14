import { Request, Response } from 'express';
import crypto from 'crypto';
import Booking from '../models/Booking';
import { asyncHandler } from '../utils/asyncHandler';

export const razorpayWebhook = asyncHandler(async (req: Request, res: Response) => {
  const secret = process.env.RAZORPAY_KEY_SECRET || '';
  const signature = req.headers['x-razorpay-signature'] as string;

  const body = JSON.stringify(req.body);
  const expectedSignature = crypto.createHmac('sha256', secret).update(body).digest('hex');

  if (expectedSignature !== signature) {
    return res.status(400).json({ message: 'Invalid signature' });
  }

  const event = req.body.event;
  const payment = req.body.payload?.payment?.entity;

  if (event === 'payment.captured' && payment) {
    await Booking.findOneAndUpdate(
      { 'payment.razorpayOrderId': payment.order_id },
      { status: 'confirmed', 'payment.status': 'paid', 'payment.razorpayPaymentId': payment.id }
    );
  }

  res.json({ status: 'ok' });
});
