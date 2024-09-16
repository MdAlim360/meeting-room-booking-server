import httpStatus from "http-status";
import Booking from "./booking.model";
import AppError from "../../errors/appError";
import { TBooking } from "./booking.interface";
import { Slot } from "../slots/slot.model";
import { Room } from "../room/room.model";
import { User } from "../user/user.model";
import uniqid from 'uniqid';
import { initialPayment } from "../payment/payment.utils";



const createBookingIntoDb = async (payload: TBooking) => {
    const { date, slots, room, user } = payload;
    const existUser = await User.findById(user)

    if (!existUser) {
        throw new AppError(httpStatus.BAD_REQUEST, 'invalid user')
    }

    for (let i = 0; i < slots.length; i++) {
        const existSlotId = await Slot.findById(slots[i])
        if (!existSlotId) {
            throw new AppError(httpStatus.BAD_REQUEST, 'invalid slots')
        }

        const roomId = existSlotId.room.toString();

        if (room as unknown as string !== roomId) {
            throw new AppError(httpStatus.BAD_REQUEST, 'This Slots are not available for this room!')
        }

        if (new Date(existSlotId.date).toString() !== new Date(date).toString()) {
            throw new AppError(httpStatus.BAD_REQUEST, 'This Slots are not available for this date!')
        }

        if (existSlotId.isBooked == true) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Slots are already booked!')
        }

        if (slots[i] === slots[i + 1]) {
            throw new AppError(httpStatus.BAD_REQUEST, 'at a time, Same slots are not booked for many times!')
        }
        // console.log(existSlotId.date);
        // console.log(new Date(date));
        // if (new Date(existSlotId.date).toString() === new Date(date).toString()) {
        //     console.log('yes');
        // }
        // else { console.log('no'); }

    }

    const roomData = await Room.findById(room);
    if (!roomData) {
        throw new AppError(httpStatus.NOT_FOUND, "Room not found");
    }

    if (roomData.isDeleted === true) {
        throw new AppError(httpStatus.BAD_REQUEST, 'This room is not available at this moment!')
    }

    const pricePerSlot = roomData.pricePerSlot;



    // Calculate total amount
    const totalAmount = slots.length * pricePerSlot;

    // Create new booking

    const transactionId = uniqid();
    const newBooking = await Booking.create({

        date: new Date(date),
        slots: slots,
        room: room,
        user: user,
        totalAmount: totalAmount,
        transactionId: transactionId,

    })
    // console.log('bb', newBooking);
    // console.log('ii', transactionId);
    console.log(newBooking._id.toString());

    //payment
    const paymentData = {
        slots: slots,
        id: newBooking._id.toString(),
        totalAmount: totalAmount,
        transactionId: transactionId,
        customerName: existUser.name,
        customerEmail: existUser.email,
        customerPhone: existUser.phone
    }
    // console.log(paymentData);



    const paymentSession = await initialPayment(paymentData);
    console.log(paymentSession);
    // if (paymentSession.result == "true") {
    //     // Mark slots as booked
    //     await Slot.updateMany(
    //         { _id: { $in: slots } },
    //         { isBooked: true }
    //     );
    // }
    return paymentSession;
};

const getAllBookingsFromDb = async () => {
    const result = await Booking.find()
        .populate('slots')
        .populate('room')
        .populate('user')
    if (result.length === 0) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Data is not found!')
    }
    return result;
}
const getMyBookingsFromDb = async (email: string) => {
    const user = await User.find({ email: email })
    const { _id } = user[0]


    const result = await Booking.find({ user: _id })
        .populate('slots')
        .populate('room')

    if (result.length === 0) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Data is not found!')
    }
    return result;
}

const updateBookingsIntoDb = async (id: string, payload: any) => {
    try {
        const result = await Booking.findByIdAndUpdate(
            id,
            payload,
            {
                new: true,
                runValidators: true
            }
        )
        return result;

    } catch (error: any) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update room!');
    }
}

const deleteBookingFromDb = async (id: string) => {
    const result = await Booking.findByIdAndUpdate(
        id,
        { isDeleted: true },
        {
            new: true,
        },
    );
    return result;
};

export const bookingService = {
    createBookingIntoDb,
    getAllBookingsFromDb,
    getMyBookingsFromDb,
    updateBookingsIntoDb,
    deleteBookingFromDb
};
