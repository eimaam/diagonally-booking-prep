import axios, { isAxiosError } from 'axios';
import type { ICreateBookingBody } from '../types/types';

export interface GenericApiResponse {
  success: boolean;
  message: string;
  data: any;
  total?: number;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1',
  headers: { 'Content-Type': 'application/json' },
});

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
    return data;
  } catch (err) {
    if (isAxiosError(err) && err.response?.data && typeof err.response.data === 'object') {
      const payload = err.response.data as { message?: string };
      if (typeof payload.message === 'string') {
        return { success: false, message: payload.message, data: [] };
      }
    }
    return { success: false, message: 'Failed to create booking', data: [] };
  }
};
