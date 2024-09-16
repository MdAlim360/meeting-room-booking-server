import express, { Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import globalErrorHandler from './app/middleware/global_error_handler';
import notFoundRoute from './app/middleware/not_found_route';
import cookieParser from 'cookie-parser';
const app = express();


//parser//

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5175', 'https://meeting-room-booking-system-three.vercel.app/'], // Allow both origins
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

//*application routes//
app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

//*global error handle//
app.use(globalErrorHandler);
app.use(notFoundRoute);

export default app;
