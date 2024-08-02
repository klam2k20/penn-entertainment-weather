import { nanoid } from 'nanoid'
import { useEffect, useRef } from 'react'
import { toast } from 'react-hot-toast'
import { FaLocationArrow } from 'react-icons/fa6'
import { getCity } from '../../api/geocoding'
import { useCities } from '../../contexts/CityContext'
import { useQuery } from '../../contexts/QueryContext'
import { useWeather } from '../../contexts/WeatherContext'
import { TGeocodingApiResponse } from '../../lib/types'
import Location from './Location'

type Props = {
    setShowMenu: (state: boolean) => void
}

/**
 * A dropdown component that displays a list of cities based on a search query and allows the user to select their current location.
 */
export default function CitiesDropdown({ setShowMenu }: Props) {
    const dropdownRef = useRef<HTMLUListElement>(null)
    const { fetchWeather, updateLocation, setIsLoading } = useWeather()
    const { cities, setCities, loading, hasCities } = useCities()
    const { query, setQuery } = useQuery()

    /**
     * Listen for mouse down events to handle when a user
     * clicks outside the cities dropdown
     */
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    /**
     * Handle closing the cities dropdown when user clicks outside it
     */
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
        setIsLoading(true)

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const lat = position.coords.latitude
                    const lon = position.coords.longitude
                    fetchWeather(lat, lon)
                    const city = await getCity(lat, lon)
                    updateLocation(city[0])
                } catch (error) {
                    console.log('Error fetching weather data: ', error)
                    toast.error(
                        "We are having trouble fetching your current location's weather right now. Please try again later."
                    )
                } finally {
                    setIsLoading(false)
                }
            },
            (error) => {
                console.log('Error getting geolocation: ', error)
                toast.error(
                    "We couldn't access your location. Please make sure you've granted permission and try again."
                )
                setIsLoading(false)
            }
        )
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
            className="absolute top-10 flex w-full flex-col gap-2 rounded-b-md border border-zinc-500 bg-zinc-700 px-6 py-3"
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
            {!hasCities && <div>{`No cities found for: ${query}`}</div>}
        </ul>
    )
}
