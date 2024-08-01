import axios from 'axios';
import { TWeatherApiResponse } from '../lib/types';

const API_KEY = import.meta.env.VITE_API_KEY;

export default async function getWeather(lat: number, lon: number): Promise<TWeatherApiResponse> {
  try {
    const response = await axios.get<TWeatherApiResponse>(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=${API_KEY}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching location data:', error);
    throw error;
  }
}
