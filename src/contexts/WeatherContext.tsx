import { createContext, useContext, useEffect, useState } from 'react'
import { TGeocodingApiResponse, TWeatherApiResponse } from '../lib/types'
import { getWeather } from '../api/weather'
import { getLocation } from '../api/geocoding'
import toast from 'react-hot-toast'

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

const WeatherProvider = ({ children }: Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [weather, setWeather] = useState<TWeatherApiResponse | null>(null)
    const [location, setLocation] = useState<string>('New York')

    useEffect(() => {
        const initWeather = async () => {
            try {
                setIsLoading(true)
                const city = await getLocation('New York', 1)
                fetchWeather(city[0].lat, city[0].lon)
                updateLocation(city[0])
                setIsLoading(false)
            } catch (error) {
                console.log('Error initializing weather data: ', error)
                toast.error(
                    'We are having trouble fetching the weather data right now. Please try again later.'
                )
            }
        }

        initWeather()
    }, [])

    const fetchWeather = async (lat: number, lon: number) => {
        try {
            const response = await getWeather(lat, lon)
            setWeather(response)
        } catch (error) {
            console.log('Error fetching weather data: ', error)
            toast.error(
                'We are having trouble fetching the weather data right now. Please try again later.'
            )
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
