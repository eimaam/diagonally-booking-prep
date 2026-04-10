import { Request, Response } from "express";
import { BookingService } from "../services/booking.service";
import { ProfileService } from "../services/profile.service";
import { v4 as uuidv4 } from 'uuid';
import { BookingStatusEnum, IBooking } from "../types";

export class BookingController {
    static async createBooking(req: Request, res: Response) {
        try {
            const { profileId, username, slot, status } = req.body;

            if (!profileId || !username || !slot || !status) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid booking data",
                })
            }

            // confirm booking does not exist
            const existingBooking = BookingService.getBookingById(slot);
            if (existingBooking) {
                return res.status(400).json({
                    success: false,
                    message: "Booking already exists",
                })
            }
            
            
            // confirm the booked profile exist
            const existingProfile = ProfileService.getProfileById(profileId);

            if (!existingProfile) {
                return res.status(404).json({
                    success: false,
                    message: "Profile not found",
                })
            }

            const newBookingData: IBooking= {
                id: uuidv4(),
                profileId,
                username,
                slot,
                status: status ?? BookingStatusEnum.PENDING,
            }


            const newBooking = BookingService.createBooking(newBookingData);
            
                return res.status(201).json({
                    success: true,
                    message: "Booking created successfully",
                    data: newBooking,
                })
            
        } catch (error) {
            console.log("error creating booking ==>", error)
            return res.status(500).json({
                success: false,
                message: "Internal server error",
                error: error,
            })
        }
    }

    // get all bookings in the system
    static async getAllBookings(req: Request, res: Response) {
        // quick validation for now
        // for filtering based on the user
        // username will be part injected by a middleware 
        // for now optional ...
const username = req.headers['username'] as string;
// TODDO: handle the validation when user restriction is in place...
// if (!username) {
//     return res.status(401).json({
//         success: false,
//         message: "Unauthorized",
//     })
// }
try {
    let bookings = BookingService.getAllBookings();
    if (username) {
        bookings = bookings.filter((booking) => booking.username === username);
    }

    return res.status(200).json({
        success: true,
        message: "Bookings fetched successfully",
        data: bookings,
        total: bookings.length,
    })
    
} catch (error) {
    console.log("err fetching bookings", error)
    return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error,
    })
}
    }

    static async getBookingById(req: Request, res: Response) {
        try {
            const { id } = req.params;

            if (!id || typeof id !== 'string') {
                return res.status(400).json({
                    success: false,
                    message: "Invalid booking id",
                })
            }
            
            const booking = BookingService.getBookingById(id);

            if (!booking) {
                return res.status(404).json({
                    success: false,
                    message: "Booking not found",
                })
            }

                return res.status(200).json({
                success: true,
                message: "Booking fetched successfully",
                data: booking,
            })
        } catch (error) {
            console.log("error fetching book", error)
            return res.status(500).json({
                success: false,
                message: "Internal server error",
                error: error,
            })
        }
    }
}