import { PROFILES } from "../data/profiles";
import { IProfile } from "../types";
import { BookingService } from "./booking.service";

export class ProfileService {

    static getAllProfiles(): IProfile[] {
        return PROFILES;
    }

    static withFilteredSlots(profile: IProfile): IProfile {
        return {
            ...profile,
            availableSlots: profile.availableSlots.filter(
                (slot) => !BookingService.isSlotTaken(profile.id, slot),
            ),
        };
    }

    static getAllProfilesWithFilteredSlots(): IProfile[] {
        return PROFILES.map((p) => ProfileService.withFilteredSlots(p));
    }

    static getProfileById(id: string): IProfile | undefined {
        return PROFILES.find((profile:IProfile) => profile.id === id);
    }

    static getProfileByIdWithFilteredSlots(id: string): IProfile | undefined {
        const p = ProfileService.getProfileById(id);
        return p ? ProfileService.withFilteredSlots(p) : undefined;
    }

    static createProfile(profile: IProfile): IProfile {
        PROFILES.push(profile);
        return profile;
    }
}