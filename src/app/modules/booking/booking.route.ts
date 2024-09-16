import express from 'express'
import { bookingController } from './booking.controller'
import validationRequest from '../../middleware/validateRequest'
import { bookingValidation } from './booking.validation'
import auth from '../../middleware/auth'
const router = express.Router()
router.post('/bookings',
    validationRequest(bookingValidation.bookingValidationSchema),
    bookingController.createBooking
);

router.get('/bookings', auth('admin'), bookingController.getAllBookings)
router.get('/my-bookings', auth('user'), bookingController.getMyBookings)
router.put('/bookings/:id', auth('admin'), bookingController.updateBookings)
router.delete('/bookings/:id', bookingController.deleteBooking)

export const bookingRoutes = router;