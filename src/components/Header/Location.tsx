import { useWeather } from '../../contexts/WeatherContext'
import { TGeocodingApiResponse } from '../../lib/types'

type Props = {
    city: TGeocodingApiResponse
    setShowMenu: (state: boolean) => void
}

export default function Location({ city, setShowMenu }: Props) {
    const { fetchWeather } = useWeather()

    //todo: handle error states
    const handleClick = async (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        event.preventDefault()
        try {
            fetchWeather(city.lat, city.lon)
        } catch (error) {
            console.log('Error fetching weather data: ', error)
        } finally {
            setShowMenu(false)
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
