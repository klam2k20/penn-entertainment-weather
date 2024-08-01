import axios from 'axios';
import { TGeocodingApiResponse } from '../lib/types';

const API_KEY = import.meta.env.VITE_API_KEY;

/**
 * Fetches geographical location data based on the city name.
 * @param city: The name of the city to search for.
 * @param limit: The maximum number of results to return. Default is 5.
 * @returns: A promise that resolves to an array of geocoding API response objects.
 */
async function getLocation(city: string, limit: number = 5): Promise<TGeocodingApiResponse[]> {
  try {
    const response = await axios.get<TGeocodingApiResponse[]>(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${limit}&appid=${API_KEY}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching location data:', error);
    throw error;
  }
}

/**
 * Fetches city data based on geographical coordinates.
 * @param lat: The latitude of the location.
 * @param lon: The longitude of the location.
 * @return: A promise that resolves to an array of geocoding API response objects.
 */
async function getCity(lat: number, lon: number): Promise<TGeocodingApiResponse[]> {
  try {
    const response = await axios.get<TGeocodingApiResponse[]>(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching location data:', error);
    throw error;
  }
}

export { getCity, getLocation };

