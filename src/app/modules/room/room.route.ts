import express from 'express'
import { roomController } from './room.controller';
import validationRequest from '../../middleware/validateRequest';
import { roomValidation } from './room.validation';
import auth from '../../middleware/auth';
const router = express.Router();

router.post('/', auth('admin'), validationRequest(roomValidation.roomValidationSchema),
    roomController.createRoom);
router.get('/', roomController.getAllRooms);
router.get('/:id', roomController.getSingleRoom);
router.put('/:id', auth('admin'), validationRequest
    (roomValidation.updateRoomValidationSchema),
    roomController.updateRoom);
router.delete('/:id', auth('admin'), roomController.deleteRoom)

export const roomRoutes = router;