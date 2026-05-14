import { Router } from 'express';
import { createOrder, verifyPayment, getMyBookings } from '../controllers/booking.controller';
import { verifyToken } from '../middleware/auth.middleware';

const router = Router();
router.post('/create-order', verifyToken, createOrder);
router.post('/verify-payment', verifyToken, verifyPayment);
router.get('/my-bookings', verifyToken, getMyBookings);

export default router;
