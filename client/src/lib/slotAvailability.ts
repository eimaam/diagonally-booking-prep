import { BookingStatusEnum, type IBooking, type IProfile } from '../types/types';

export const isSlotTakenForProfile = (
  profileId: string,
  slot: string,
  bookings: IBooking[],
): boolean =>
  bookings.some(
    (b) =>
      b.profileId === profileId &&
      b.slot === slot &&
      b.status !== BookingStatusEnum.CANCELLED,
  );

export const filterProfileAvailableSlots = (
  profile: IProfile,
  bookings: IBooking[],
): IProfile => ({
  ...profile,
  availableSlots: profile.availableSlots.filter(
    (slot) => !isSlotTakenForProfile(profile.id, slot, bookings),
  ),
});

export const filterProfilesWithAvailability = (
  profiles: IProfile[],
  bookings: IBooking[],
): IProfile[] => profiles.map((p) => filterProfileAvailableSlots(p, bookings));
