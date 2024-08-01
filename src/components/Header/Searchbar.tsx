import { useCallback, useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import { cn } from '../../lib/utils'
import { getLocation } from '../../api/geocoding'
import CitiesDropdown from './CitiesDropdown'
import { useWeather } from '../../contexts/WeatherContext'
import { useQuery } from '../../contexts/QueryContext'
import { useCities } from '../../contexts/CityContext'

export default function Searchbar() {
    const [showMenu, setShowMenu] = useState<boolean>(false)
    const { setCities, setLoading, setHasCities } = useCities()
    const { location } = useWeather()
    const { query, setQuery } = useQuery()

    const handleKeyPress = async (
        event: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (event.key === 'Enter' && query.trim() !== '') {
            try {
                setLoading(true)
                const response = await getLocation(query)
                console.log(response, 'response===')
                if (response.length > 0) setHasCities(true)
                else setHasCities(false)
                setCities(response)
            } catch (error) {
                console.log('Error fetching location data: ', error)
            } finally {
                setLoading(false)
            }
        }
    }

    const memoSetShowMenu = useCallback(
        (state: boolean) => setShowMenu(state),
        []
    )

    return (
        <div className="relative flex w-full flex-col md:w-2/3 lg:w-1/2">
            <div
                className={cn(
                    'flex h-10 w-full items-center gap-2 rounded-t-md bg-zinc-700 px-6 py-3 shadow-sm transition-all',
                    !showMenu && 'rounded-b-md'
                )}
            >
                <CiSearch className="h-4 w-4 cursor-pointer" />
                <input
                    type="text"
                    placeholder={`${location} Weather`}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => handleKeyPress(e)}
                    className="w-full border-none bg-transparent p-0 text-sm focus-visible:outline-none focus-visible:ring-0"
                    onFocus={() => setShowMenu(true)}
                />
            </div>
            {showMenu && <CitiesDropdown setShowMenu={memoSetShowMenu} />}
        </div>
    )
}
