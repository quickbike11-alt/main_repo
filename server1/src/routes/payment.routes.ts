import { Router } from 'express';
import { razorpayWebhook } from '../controllers/payment.controller';

const router = Router();
router.post('/webhook', razorpayWebhook);

export default router;
