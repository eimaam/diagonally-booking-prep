export enum BookingStatusEnum {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
}

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
  status: BookingStatusEnum;
}

export interface ICreateBookingBody {
  profileId: string;
  username: string;
  slot: string;
  status?: BookingStatusEnum;
}
