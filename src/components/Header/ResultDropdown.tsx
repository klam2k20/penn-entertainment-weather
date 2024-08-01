import { FaLocationArrow } from 'react-icons/fa6'
import { TGeocodingApiResponse } from '../../lib/types'
import Location from './Location'
import { useEffect, useRef } from 'react'

//todo: add hasresults prop updated on api response
type Props = {
    results: TGeocodingApiResponse[]
    setResults: (state: TGeocodingApiResponse[]) => void
    setShowMenu: (state: boolean) => void
}

//todo: handle empty state
export default function ResultDropdown({
    results,
    setResults,
    setShowMenu,
}: Props) {
    const dropdownRef = useRef<HTMLUListElement>(null)

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
            setResults([])
        }
    }

    return (
        <ul
            ref={dropdownRef}
            className="absolute top-10 flex w-full flex-col gap-2 bg-zinc-700 px-6 py-3"
        >
            <li className="flex cursor-pointer items-center gap-2 transition-opacity hover:opacity-50">
                <FaLocationArrow className="h-4 w-4" />
                <p>Use your current location</p>
            </li>
            {results.map((r: TGeocodingApiResponse) => (
                <Location
                    key={`${r.lat},${r.lon}`}
                    city={r}
                    setShowMenu={setShowMenu}
                    setResults={setResults}
                />
            ))}
        </ul>
    )
}
