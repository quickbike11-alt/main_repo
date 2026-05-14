import { Request, Response } from 'express';
import Bike from '../models/Bike';
import Booking from '../models/Booking';
import User from '../models/User';
import Inquiry from '../models/Inquiry';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiError } from '../utils/ApiError';

export const getDashboardStats = asyncHandler(async (_req: Request, res: Response) => {
  const [totalBikes, totalBookings, totalUsers, newInquiries, bookings] = await Promise.all([
    Bike.countDocuments(),
    Booking.countDocuments(),
    User.countDocuments({ role: 'user' }),
    Inquiry.countDocuments({ status: 'new' }),
    Booking.find({ 'payment.status': 'paid' }),
  ]);
  const revenue = bookings.reduce((sum, b) => sum + b.totalAmount + b.deposit, 0);
  res.json({ totalBikes, totalBookings, totalUsers, newInquiries, revenue });
});

// Bikes CRUD
export const createBike = asyncHandler(async (req: Request, res: Response) => {
  const bike = await Bike.create(req.body);
  res.status(201).json({ bike });
});

export const updateBike = asyncHandler(async (req: Request, res: Response) => {
  const bike = await Bike.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!bike) throw new ApiError(404, 'Bike not found');
  res.json({ bike });
});

export const deleteBike = asyncHandler(async (req: Request, res: Response) => {
  await Bike.findByIdAndDelete(req.params.id);
  res.json({ message: 'Bike deleted' });
});

// Bookings
export const getAllBookings = asyncHandler(async (_req: Request, res: Response) => {
  const bookings = await Booking.find().populate('user', 'name email phone').populate('bike', 'name').sort({ createdAt: -1 });
  res.json({ bookings });
});

export const updateBookingStatus = asyncHandler(async (req: Request, res: Response) => {
  const booking = await Booking.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
  if (!booking) throw new ApiError(404, 'Booking not found');
  res.json({ booking });
});

// Users
export const getAllUsers = asyncHandler(async (_req: Request, res: Response) => {
  const users = await User.find({ role: 'user' }).select('-password').sort({ createdAt: -1 });
  res.json({ users });
});

// Inquiries
export const getAllInquiries = asyncHandler(async (_req: Request, res: Response) => {
  const inquiries = await Inquiry.find().sort({ createdAt: -1 });
  res.json({ inquiries });
});

export const updateInquiry = asyncHandler(async (req: Request, res: Response) => {
  const inquiry = await Inquiry.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!inquiry) throw new ApiError(404, 'Inquiry not found');
  res.json({ inquiry });
});
