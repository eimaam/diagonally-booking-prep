import { BOOKINGS } from "../data/booking";
import { IBooking } from "../types";

export class BookingService {
    static getAllBookings(): IBooking[] {
        return BOOKINGS;
    }



    static getBookingById(id: string): IBooking | undefined {
        return BOOKINGS.find((booking:IBooking) => booking.id === id);
    }

    static createBooking(booking: IBooking): IBooking {
        BOOKINGS.push(booking);
        return booking;
    }

    static deleteBooking(id: string): boolean {
        const index = BOOKINGS.findIndex((booking:IBooking) => booking.id === id);
        if (index !== -1) {
            BOOKINGS.splice(index, 1);
            return true;
        }
        return false;
    }
}