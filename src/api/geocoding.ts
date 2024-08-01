import axios from 'axios';
import { TGeocodingApiResponse } from '../lib/types';

const API_KEY = import.meta.env.VITE_API_KEY;

async function getLocation(city: string, limit: number = 5): Promise<TGeocodingApiResponse[]> {
  try {
    const response = await axios.get<TGeocodingApiResponse[]>(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${limit}&appid=${API_KEY}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching location data:', error);
    throw error;
  }
}


async function getCity(lat: number, lon: number): Promise<TGeocodingApiResponse[]> {
  try {
    const response = await axios.get<TGeocodingApiResponse[]>(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching location data:', error);
    throw error;
  }
}

export { getLocation, getCity }

