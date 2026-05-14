import { Router } from 'express';
import { getBikes, getBikeById, getLocations } from '../controllers/bike.controller';

const router = Router();
router.get('/', getBikes);
router.get('/locations', getLocations);
router.get('/:id', getBikeById);

export default router;
