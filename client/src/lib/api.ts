import axios from 'axios';
import { BookingStatusEnum, type IBooking, type ICreateBookingBody, type IProfile } from '../types/types';

export interface GenericApiResponse {
  success: boolean;
  message: string;
  data: any;
  total?: number;
}

const LOCAL_KEY = 'devlink-bookings-v1';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1',
  headers: { 'Content-Type': 'application/json' },
});

const readLocal = (): IBooking[] => {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as IBooking[];
  } catch {
    return [];
  }
};

const writeLocal = (list: IBooking[]) => {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(list));
};




export const fetchProfiles = async (): Promise<GenericApiResponse> => {
  try {
    const {data} = await api.get<GenericApiResponse>('/profiles');
    console.log( 'profiles', data )
    return data
  } catch {
    return { success: false, message: 'Failed to fetch profiles', data: [] };
  }
};

export const fetchBookings = async (): Promise<GenericApiResponse> => {
  try {
    const { data } = await api.get<GenericApiResponse>('/bookings');
    return data;
  } catch {
    return { success: false, message: 'Failed to fetch bookings', data: [] };
  }
};

export const createBookingRequest = async (
  body: ICreateBookingBody,
): Promise<GenericApiResponse> => {
  try {
    const { data } = await api.post<GenericApiResponse>('/bookings', body);
    console.log( 'create booking', data )
    return data;
  } catch {
    return { success: false, message: 'Failed to create booking', data: [] };
  }
};
