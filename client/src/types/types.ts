export const BookingStatusEnum = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
} as const;

export type IBookingStatus = (typeof BookingStatusEnum)[keyof typeof BookingStatusEnum];

export interface IProfile {
  id: string;
  name: string;
  title: string;
  availableSlots: string[];
}

export interface IBooking {
  id: string;
  profileId: string;
  username: string;
  slot: string;
  status: IBookingStatus;
}

export interface ICreateBookingBody {
  profileId: string;
  username: string;
  slot: string;
  status?: IBookingStatus;
}
