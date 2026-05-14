import { Router } from 'express';
import { submitInquiry } from '../controllers/inquiry.controller';

const router = Router();
router.post('/', submitInquiry);

export default router;
