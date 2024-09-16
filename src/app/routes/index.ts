import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";
import { roomRoutes } from "../modules/room/room.route";
import { slotRoutes } from "../modules/slots/slot.route";
import { bookingRoutes } from "../modules/booking/booking.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { paymentRoutes } from "../modules/payment/payment.route";

const router = Router();
const moduleRoutes = [
    {
        path: '/auth',
        route: userRoutes
    },
    {
        path: '/rooms',
        route: roomRoutes
    },
    {
        path: '/slots',
        route: slotRoutes
    },
    {
        path: '/',
        route: bookingRoutes
    },
    {
        path: '/auth',
        route: AuthRoutes
    },
    {
        path: '/payment',
        route: paymentRoutes
    }
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;