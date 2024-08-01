import { useQuery } from '../../contexts/QueryContext'
import { useWeather } from '../../contexts/WeatherContext'
import { TGeocodingApiResponse } from '../../lib/types'

type Props = {
    city: TGeocodingApiResponse
    setShowMenu: (state: boolean) => void
    setResults: (state: TGeocodingApiResponse[]) => void
}

export default function Location({ city, setShowMenu, setResults }: Props) {
    const { fetchWeather, updateLocation } = useWeather()
    const { setQuery } = useQuery()

    //todo: handle error states
    const handleClick = async (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        event.preventDefault()
        try {
            fetchWeather(city.lat, city.lon)
            updateLocation(city)
        } catch (error) {
            console.log('Error fetching weather data: ', error)
        } finally {
            setShowMenu(false)
            setResults([])
            setQuery('')
        }
    }

    return (
        <li className="cursor-pointer transition-opacity hover:opacity-50">
            <button onClick={(e) => handleClick(e)}>
                {`${city.name}, ${city?.state} ${city.country}`}
            </button>
        </li>
    )
}
