import express from 'express';
import { slotController } from './slot.controller';
import validationRequest from '../../middleware/validateRequest';
import { slotValidation } from './slot.validation';
import auth from '../../middleware/auth';
const router = express.Router();

router.post('/', auth("admin"), validationRequest(slotValidation.slotValidationSchema),
    slotController.createSlot);
router.get('/availability', slotController.getSlots)
router.get('/:roomId', slotController.getSingleSlotByRoomId);
router.put('/:id', validationRequest
    (slotValidation.updateSlotValidationSchema),
    slotController.updateSlot);
router.delete('/:id', slotController.deleteSlot)


export const slotRoutes = router;