import express from 'express';
import { USER_ROLE } from './../user/user.constant';
import { AuthControllers } from './auth.controller';
import { AuthValidation } from './auth.validation';
import validationRequest from '../../middleware/validateRequest';
import auth from '../../middleware/auth';


const router = express.Router();

router.post(
    '/login',
    validationRequest(AuthValidation.loginValidationSchema),
    AuthControllers.loginUser,
);

router.post(
    '/change-password',
    validationRequest(AuthValidation.changePasswordValidationSchema),
    AuthControllers.changePassword,
);

router.post(
    '/refresh-token',
    // validationRequest(AuthValidation.refreshTokenValidationSchema),
    AuthControllers.refreshToken,
);

export const AuthRoutes = router;