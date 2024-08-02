import { createContext, useContext, useEffect, useState } from 'react'
import { TGeocodingApiResponse, TWeatherApiResponse } from '../lib/types'
import { getWeather } from '../api/weather'
import { getLocation } from '../api/geocoding'
import { toast } from 'react-hot-toast'

type Props = {
    children: React.ReactNode
}

interface WeatherContextValue {
    weather: TWeatherApiResponse | null
    fetchWeather: (lat: number, lon: number) => void
    location: string
    updateLocation: (city: TGeocodingApiResponse) => void
    isLoading: boolean
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const WeatherContext = createContext<WeatherContextValue | null>(null)

/**
 * A React Context for managing weather-related state across components
 */
const WeatherProvider = ({ children }: Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [weather, setWeather] = useState<TWeatherApiResponse | null>(null)
    const [location, setLocation] = useState<string>('New York')

    /**
     * Initialize weather data to display New York weather
     */
    useEffect(() => {
        const initWeather = async () => {
            try {
                const city = await getLocation('New York', 1)
                fetchWeather(city[0].lat, city[0].lon)
                updateLocation(city[0])
            } catch (error) {
                console.log('Error initializing weather data: ', error)
                toast.error(
                    'We are having trouble fetching the weather data right now. Please try again later.'
                )
            }
        }

        initWeather()
    }, [])

    /**
     * Fetches weather data based on geographical coordinates.
     * @param lat: The latitude of the location.
     * @param lon: The longitude of the location.
     */
    const fetchWeather = async (lat: number, lon: number) => {
        try {
            setIsLoading(true)
            const response = await getWeather(lat, lon)
            setWeather(response)
        } catch (error) {
            console.log('Error fetching weather data: ', error)
            toast.error(
                'We are having trouble fetching the weather data right now. Please try again later.'
            )
        } finally {
            setIsLoading(false)
        }
    }

    const updateLocation = (city: TGeocodingApiResponse) => {
        setLocation(`${city.name}, ${city?.state || ''} ${city.country}`)
    }

    return (
        <WeatherContext.Provider
            value={{
                weather,
                fetchWeather,
                isLoading,
                location,
                updateLocation,
                setIsLoading,
            }}
        >
            {children}
        </WeatherContext.Provider>
    )
}

const useWeather = () => {
    const context = useContext(WeatherContext)
    if (!context)
        throw new Error(
            'useWeatherContext must be used within a WeatherProvider'
        )
    return context
}

export { useWeather, WeatherProvider }
