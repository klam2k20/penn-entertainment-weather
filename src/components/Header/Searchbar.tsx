import { useState } from 'react'
import { CiSearch } from 'react-icons/ci'

export default function Searchbar() {
    const [city, setCity] = useState<string>('')

    return (
        <div className="flex h-10 w-full items-center gap-2 rounded-md bg-zinc-700 px-6 py-3 shadow-sm md:w-2/3 lg:w-1/2">
            <CiSearch className="h-4 w-4 cursor-pointer" />
            <input
                type="text"
                placeholder="Search city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full border-none bg-transparent p-0 text-sm focus-visible:outline-none focus-visible:ring-0"
            />
        </div>
    )
}
