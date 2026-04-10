import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  createBookingRequest,
  fetchBookings,
  fetchProfiles,
  type GenericApiResponse,
} from '../lib/api';
import type { IBooking, ICreateBookingBody, IProfile } from '../types/types';

export interface IDataContextValue {
  profiles: IProfile[];
  bookings: IBooking[];
  profilesLoading: boolean;
  bookingsLoading: boolean;
  refreshProfiles: () => Promise<void>;
  refreshBookings: () => Promise<void>;
  refreshAll: () => Promise<void>;
  createBooking: (
    body: ICreateBookingBody,
  ) => Promise<GenericApiResponse>;
}

const DataContext = createContext<IDataContextValue | null>(null);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [profiles, setProfiles] = useState<IProfile[]>([]);
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [profilesLoading, setProfilesLoading] = useState<boolean>(true);

  const [bookingsLoading, setBookingsLoading] = useState<boolean>(true);

  const refreshProfiles = useCallback(async () => {
    setProfilesLoading(true);
    const data = await fetchProfiles();
    console.log("context profiles", data)
    setProfiles(data.data as IProfile[]);
    setProfilesLoading(false);
  }, []);

  const refreshBookings = useCallback(async () => {
    setBookingsLoading(true);
    const data = await fetchBookings();
    setBookings(data.data as IBooking[]);
    setBookingsLoading(false);
  }, []);

  const refreshAll = useCallback(async () => {
    setProfilesLoading(true);
    setBookingsLoading(true);
    const [p, b] = await Promise.all([fetchProfiles(), fetchBookings()]);
    setProfiles(p.data as IProfile[]);
    setBookings(b.data as IBooking[]);
    setProfilesLoading(false);
    setBookingsLoading(false);
  }, []);

  useEffect(() => {
    void refreshAll();
  }, [refreshAll]);

  const createBooking = useCallback(
    async (body: ICreateBookingBody) => {
      const result = await createBookingRequest(body);
      if (result.success) {
        await refreshBookings();
      }
      return result;
    },
    [refreshBookings],
  );

  const value = useMemo<IDataContextValue>(
    () => ({
      profiles,
      bookings,
      profilesLoading,
      bookingsLoading,
      refreshProfiles,
      refreshBookings,
      refreshAll,
      createBooking,
    }),
    [
      profiles,
      bookings,
      profilesLoading,
      bookingsLoading,
      refreshProfiles,
      refreshBookings,
      refreshAll,
      createBooking,
    ],
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useDataContext = (): IDataContextValue => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useDataContext must be used within DataProvider');
  }
  return context;
};
