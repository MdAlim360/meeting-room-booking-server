import { Slot } from "../slots/slot.model";
import { verifyPayment } from "./payment.utils";
import { join } from 'path';
import { readFileSync } from 'fs';
import Booking from "../booking/booking.model";
import { Document, Types } from "mongoose";
import { Room } from "../room/room.model";

export interface TBooking extends Document {
    _id: Types.ObjectId;
    date: Date;
    slots: Types.ObjectId[];
    room: Types.ObjectId;
    user: Types.ObjectId;
    totalAmount: number;
    isConfirmed: string;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

const confirmationService = async (transactionId: string, status: string, id: string): Promise<string> => {
    try {
        // Verify payment
        const verifyResponse = await verifyPayment(transactionId);
        let message = '';
        let isSuccessful = false;

        // Check payment status
        if (verifyResponse && verifyResponse.pay_status === 'Successful') {
            // Update slot booking status
            const bookingDetails = await Booking.findById(id);
            if (!bookingDetails) {
                throw new Error('Booking not found');
            }

            // Update slot booking status
            await Slot.updateMany(
                { _id: { $in: bookingDetails.slots } }, // Update all slots related to this booking
                { isBooked: true }
            );

            // Update booking confirmation status
            bookingDetails.isConfirmed = 'confirmed';
            await bookingDetails.save();

            message = 'Your booking has been confirmed!';
            isSuccessful = true;
        } else {
            message = 'Payment failed. Please try again.';
        }

        // Fetch the updated booking details
        const bookingDetails = await Booking.findById(id);
        if (!bookingDetails) {
            throw new Error('Booking not found');
        }

        const roomId = bookingDetails.room.toString();
        const room = await Room.findById(roomId);

        // Handle the case where room might be null
        const roomName = room ? room.name : 'N/A';

        // Handle the case where totalAmount might be undefined
        const totalAmount = bookingDetails.totalAmount !== undefined ? bookingDetails.totalAmount.toString() : 'N/A';

        // Load and update the template
        const filePath = join(__dirname, '../../../../public/views/confirmation.html');
        let template = readFileSync(filePath, 'utf-8');

        // Replace placeholders with actual data
        template = template.replace('{{message}}', message);
        template = template.replace('{{bookingId}}', bookingDetails._id.toString());
        template = template.replace('{{bookingDate}}', bookingDetails.date.toDateString());
        template = template.replace('{{room}}', roomName);
        template = template.replace('{{totalAmount}}', totalAmount);

        // Add "Go to Home" link and customize styles for failed payments
        if (!isSuccessful) {
            const homeLink = '<a href="https://meeting-room-booking-system-three.vercel.app/" style="color: white; background-color: red; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Go to Home</a>';
            const errorStyles = `
                <div style="color: red; font-weight: bold; padding: 20px; background-color: #ffe6e6; border: 2px solid red; margin: 20px 0;">
                    ${message}
                </div>
                <div style="text-align: center; margin-top: 20px;">
                    ${homeLink}
                </div>
            `;
            template = template.replace('{{errorContent}}', errorStyles);
        } else {
            // Clear the error content placeholder if payment is successful
            template = template.replace('{{errorContent}}', '');
        }

        return template;

    } catch (error) {
        console.error('Error in confirmationService:', error);
        return `
            <div style="color: red; font-weight: bold; padding: 20px; background-color: #ffe6e6; border: 2px solid red; margin: 20px 0;">
                Payment confirmation failed. Please try again later.
            </div>
            <div style="text-align: center; margin-top: 20px;">
                <a href="https://meeting-room-booking-system-three.vercel.app/" style="color: white; background-color: red; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Go to Home</a>
            </div>
        `;
    }
};


export const paymentServices = {
    confirmationService
};
