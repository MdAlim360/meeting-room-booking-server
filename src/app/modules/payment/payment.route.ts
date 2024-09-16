import { Router } from 'express';
import { paymentController } from './paymentController';
const router = Router();
router.post('/confirmation', paymentController.confirmationController)

export const paymentRoutes = router