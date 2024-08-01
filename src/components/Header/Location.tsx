import toast from 'react-hot-toast'
import { useCities } from '../../contexts/CityContext'
import { useQuery } from '../../contexts/QueryContext'
import { useWeather } from '../../contexts/WeatherContext'
import { TGeocodingApiResponse } from '../../lib/types'

type Props = {
    city: TGeocodingApiResponse
    setShowMenu: (state: boolean) => void
}

export default function Location({ city, setShowMenu }: Props) {
    const { fetchWeather, updateLocation, setIsLoading } = useWeather()
    const { setQuery } = useQuery()
    const { setCities } = useCities()

    //todo: handle error states
    const handleClick = async (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        event.preventDefault()
        try {
            setIsLoading(true)
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
            setIsLoading(false)
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
