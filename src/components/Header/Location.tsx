import { TGeocodingApiResponse } from '../../lib/types'

type Props = {
    city: TGeocodingApiResponse
}

export default function Location({ city }: Props) {
    const handleClick = () => {
        console.log('get weather data')
    }

    return (
        <li
            className="cursor-pointer transition-opacity hover:opacity-50"
            onClick={() => handleClick()}
        >{`${city.name}, ${city?.state} ${city.country}`}</li>
    )
}
