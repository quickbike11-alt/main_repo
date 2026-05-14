import { Router } from 'express';
import { verifyToken } from '../middleware/auth.middleware';
import { isAdmin } from '../middleware/admin.middleware';
import {
  getDashboardStats,
  createBike,
  updateBike,
  deleteBike,
  getAllBookings,
  updateBookingStatus,
  getAllUsers,
  getAllInquiries,
  updateInquiry,
} from '../controllers/admin.controller';

const router = Router();
router.use(verifyToken, isAdmin);

router.get('/dashboard', getDashboardStats);
router.post('/bikes', createBike);
router.put('/bikes/:id', updateBike);
router.delete('/bikes/:id', deleteBike);
router.get('/bookings', getAllBookings);
router.patch('/bookings/:id', updateBookingStatus);
router.get('/users', getAllUsers);
router.get('/inquiries', getAllInquiries);
router.patch('/inquiries/:id', updateInquiry);

export default router;
