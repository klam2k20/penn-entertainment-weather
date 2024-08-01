import { useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import { cn } from '../../lib/utils'
import getLocation from '../../api/geocoding'
import { TGeocodingApiResponse } from '../../lib/types'
import ResultDropdown from './ResultDropdown'

export default function Searchbar() {
    const [query, setQuery] = useState<string>('')
    const [showMenu, setShowMenu] = useState<boolean>(false)
    const [results, setResults] = useState<TGeocodingApiResponse[]>([])

    //todo: handle loading state
    //todo: handle error state
    const handleKeyPress = async (
        event: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (event.key === 'Enter' && query.trim() !== '') {
            try {
                const response = await getLocation(query)
                setResults(response)
            } catch (e) {
                console.log('Error fetching location data: ', e)
            }
        }
    }

    const handleCloseDropdown = () => {
        setShowMenu(false)
        setResults([])
    }

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
                    placeholder="Search city"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => handleKeyPress(e)}
                    className="w-full border-none bg-transparent p-0 text-sm focus-visible:outline-none focus-visible:ring-0"
                    onFocus={() => setShowMenu(true)}
                    onBlur={() => handleCloseDropdown()}
                />
            </div>
            {showMenu && <ResultDropdown results={results} />}
        </div>
    )
}
