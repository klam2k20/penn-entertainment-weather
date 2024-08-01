import axios from 'axios';
import { TWeatherApiResponse } from '../lib/types';

const API_KEY = import.meta.env.VITE_API_KEY;

/**
 * Fetches weather data based on geographical coordinates.
 * @param lat: The latitude of the location.
 * @param lon: The longitude of the location.
 * @returns: A promise that resolves to a weather API response object.
 */
async function getWeather(lat: number, lon: number): Promise<TWeatherApiResponse> {
  try {
    const response = await axios.get<TWeatherApiResponse>(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=${API_KEY}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching location data:', error);
    throw error;
  }
}

/**
 * Generates the URL for a weather forecast icon based on its code.
 * @param code: The weather icon code.
 * @returns: The URL of the weather icon.
 */
const getForecastIcon = (code: string) => `http://openweathermap.org/img/wn/${code}@2x.png`;

export { getForecastIcon, getWeather };
