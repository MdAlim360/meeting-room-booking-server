import express from 'express';
import { userController } from './user.controller';
import validationRequest from '../../middleware/validateRequest';
import { userValidation } from './user.validation';


const router = express.Router()

router.post('/signup',
    validationRequest(userValidation.userValidationSchema),
    userController.createUser)

export const userRoutes = router;