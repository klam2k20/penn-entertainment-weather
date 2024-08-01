import { createContext, useContext, useState } from 'react'
import { TWeatherApiResponse } from '../lib/types'
import getWeather from '../api/weather'

type Props = {
    children: React.ReactNode
}

interface WeatherContextValue {
    weather: TWeatherApiResponse | null
    fetchWeather: (lat: number, lon: number) => void
    isLoading: boolean
}

const WeatherContext = createContext<WeatherContextValue | null>(null)

//todo set it to new york on loading
const WeatherProvider = ({ children }: Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [weather, setWeather] = useState<TWeatherApiResponse | null>(null)

    const fetchWeather = async (lat: number, lon: number) => {
        try {
            setIsLoading(true)
            const response = await getWeather(lat, lon)
            setWeather(response)
        } catch (error) {
            console.log('Error fetching weather data: ', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <WeatherContext.Provider
            value={{
                weather,
                fetchWeather,
                isLoading,
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
