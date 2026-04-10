import { BookingStatusEnum, IBooking } from "../types";

const BOOKINGS:IBooking[] = [
    {
        id: 'b1',
        profileId: 'p1',
        username: 'rachel404',
        slot: '2026-04-15T10:00:00.000Z',
        status: BookingStatusEnum.PENDING,
    },
    {
        id: 'b2',
        profileId: 'p2',
        username: 'musa_sani',
        slot: '2026-04-15T11:00:00.000Z',
        status: BookingStatusEnum.CONFIRMED,
    },
    {
        id: 'b3',
        profileId: 'p3',
        username: 'chandlerBing',
        slot: '2026-04-15T12:00:00.000Z',
        status: BookingStatusEnum.CANCELLED,
    },
    {
        id: 'b4',
        profileId: 'p4',
        username: 'joeyTribbiani',
        slot: '2026-04-15T13:00:00.000Z',
        status: BookingStatusEnum.PENDING,
    },
]

export { BOOKINGS };