import { BookingController } from "../controllers/booking.controller";
import { Router } from "express";
const router = Router();

router.post('/', BookingController.createBooking);
router.get('/:id', BookingController.getBookingById);
router.get('/', BookingController.getAllBookings);

export default router;  