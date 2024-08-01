import getWeather from '../../api/weather'
import { TGeocodingApiResponse } from '../../lib/types'

type Props = {
    city: TGeocodingApiResponse
}

export default function Location({ city }: Props) {
    const handleClick = async (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        event.preventDefault()
        try {
            console.log('grab weather ')
            const response = await getWeather(city.lat, city.lon)
            console.log(response)
        } catch (error) {
            console.log('Error fetching weather data: ', error)
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
