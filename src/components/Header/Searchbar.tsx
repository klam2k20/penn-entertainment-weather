import { useCallback, useState } from 'react'
import { toast } from 'react-hot-toast'
import { CiSearch } from 'react-icons/ci'
import { getLocation } from '../../api/geocoding'
import { useCities } from '../../contexts/CityContext'
import { useQuery } from '../../contexts/QueryContext'
import { useWeather } from '../../contexts/WeatherContext'
import { cn } from '../../lib/utils'
import CitiesDropdown from './CitiesDropdown'

/**
 * A search input component that allows users to search for locations and displays a dropdown of matching cities.
 */
export default function Searchbar() {
    const [showMenu, setShowMenu] = useState<boolean>(false)
    const { setCities, setLoading, setHasCities } = useCities()
    const { location } = useWeather()
    const { query, setQuery } = useQuery()

    /**
     * Handles submitting the user's query when ENTER is pressed by:
     * Sets the loading state to true.
     * Calls the `getLocation` function with the current query.
     * Updates the `hasCities` state based on whether any locations were found.
     * Updates the `cities` state with the response from `getLocation`.
     * Handles any errors that occur during the process.
     * Sets the loading state back to false when the operation is complete.
     */
    const handleSubmit = async (
        event: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (event.key === 'Enter' && query.trim() !== '') {
            try {
                setLoading(true)
                const response = await getLocation(query)
                if (response.length > 0) setHasCities(true)
                else setHasCities(false)
                setCities(response)
            } catch (error) {
                console.log('Error fetching location data: ', error)
                toast.error(
                    'We are having trouble completing your search right now. Please try again later.'
                )
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
                    onKeyDown={(e) => handleSubmit(e)}
                    className="w-full border-none bg-transparent p-0 text-sm focus-visible:outline-none focus-visible:ring-0"
                    onFocus={() => setShowMenu(true)}
                />
            </div>
            {showMenu && <CitiesDropdown setShowMenu={memoSetShowMenu} />}
        </div>
    )
}
