import { FaLocationArrow } from 'react-icons/fa6'
import { TGeocodingApiResponse } from '../../lib/types'
import Location from './Location'
import { useEffect, useRef } from 'react'
import { useQuery } from '../../contexts/QueryContext'
import { nanoid } from 'nanoid'
import { useWeather } from '../../contexts/WeatherContext'
import { getCity } from '../../api/geocoding'
import { useCities } from '../../contexts/CityContext'

type Props = {
    setShowMenu: (state: boolean) => void
}

//todo: handle empty state
export default function ResultDropdown({ setShowMenu }: Props) {
    const dropdownRef = useRef<HTMLUListElement>(null)
    const { fetchWeather, updateLocation, setIsLoading } = useWeather()
    const { cities, setCities, loading } = useCities()
    const { setQuery } = useQuery()

    //todo: move this to separate file its also in unitmenu
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target as Node)
        ) {
            setShowMenu(false)
            setCities([])
            setQuery('')
        }
    }

    const handleGeolocation = () => {
        setShowMenu(false)
        setQuery('')

        let lat, lon
        navigator.geolocation.getCurrentPosition(async (position) => {
            setIsLoading(true)
            lat = position.coords.latitude
            lon = position.coords.longitude
            fetchWeather(lat, lon)
            const city = await getCity(lat, lon)
            updateLocation(city[0])
            setIsLoading(false)
        })
    }

    if (loading) {
        return (
            <ul className="absolute top-10 flex w-full flex-col gap-2 bg-zinc-700 px-6 py-3">
                <li className="h-6 w-full animate-pulse rounded-md bg-zinc-500" />
                <li className="h-6 w-full animate-pulse rounded-md bg-zinc-500" />
                <li className="h-6 w-full animate-pulse rounded-md bg-zinc-500" />
                <li className="h-6 w-full animate-pulse rounded-md bg-zinc-500" />
                <li className="h-6 w-full animate-pulse rounded-md bg-zinc-500" />
            </ul>
        )
    }
    return (
        <ul
            ref={dropdownRef}
            className="absolute top-10 flex w-full flex-col gap-2 bg-zinc-700 px-6 py-3"
        >
            <li className="cursor-pointer transition-opacity hover:opacity-50">
                <button
                    className="flex items-center gap-2"
                    onClick={handleGeolocation}
                >
                    <FaLocationArrow className="h-4 w-4" />
                    <p>Use your current location</p>
                </button>
            </li>
            {cities.map((r: TGeocodingApiResponse) => (
                <Location key={nanoid()} city={r} setShowMenu={setShowMenu} />
            ))}
        </ul>
    )
}
