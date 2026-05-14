import { Request, Response } from 'express';
import Inquiry from '../models/Inquiry';
import { asyncHandler } from '../utils/asyncHandler';

export const submitInquiry = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, phone, bikeModel, bikeYear, message } = req.body;
  const inquiry = await Inquiry.create({ name, email, phone, bikeModel, bikeYear, message });
  res.status(201).json({ message: 'Inquiry submitted successfully', inquiry });
});
