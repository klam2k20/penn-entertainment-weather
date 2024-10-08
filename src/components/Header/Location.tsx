import { toast } from 'react-hot-toast'
import { useCities } from '../../contexts/CityContext'
import { useQuery } from '../../contexts/QueryContext'
import { useWeather } from '../../contexts/WeatherContext'
import { TGeocodingApiResponse } from '../../lib/types'

type Props = {
    city: TGeocodingApiResponse
    setShowMenu: (state: boolean) => void
}

/**
 * Represents a single location item in the CitiesDropdown.
 */
export default function Location({ city, setShowMenu }: Props) {
    const { fetchWeather, updateLocation } = useWeather()
    const { setQuery } = useQuery()
    const { setCities } = useCities()

    /**
     * Handles when a user selects a location from the CitiesDropdown by:
     * Sets the loading state to true.
     * Calls the `fetchWeather` function with the current selected city.
     * Calls the `updateLocation` function to update the location
     */
    const handleClick = (event: React.MouseEvent) => {
        event.preventDefault()
        try {
            fetchWeather(city.lat, city.lon)
            updateLocation(city)
        } catch (error) {
            console.log('Error fetching weather data: ', error)
            toast.error(
                'We are having trouble fetching the weather data right now. Please try again later.'
            )
        } finally {
            setShowMenu(false)
            setCities([])
            setQuery('')
        }
    }

    return (
        <li className="cursor-pointer transition-opacity hover:opacity-50">
            <button
                className="w-full text-start"
                onClick={(e) => handleClick(e)}
            >
                {`${city.name}, ${city?.state || ''} ${city.country}`}
            </button>
        </li>
    )
}
