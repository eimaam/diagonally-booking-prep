import { PROFILES } from "../data/profiles";
import { IBooking, IProfile } from "../types";
import { BOOKINGS } from "../data/booking";

export class ProfileService {

    static getAllProfiles(): IProfile[] {
        return PROFILES;
    }

    static getProfileById(id: string): IProfile | undefined {
        return PROFILES.find((profile:IProfile) => profile.id === id);
    }   

    static createProfile(profile: IProfile): IProfile {
        PROFILES.push(profile);
        return profile;
    }
}