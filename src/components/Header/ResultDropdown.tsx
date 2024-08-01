import { FaLocationArrow } from 'react-icons/fa6'
import { TGeocodingApiResponse } from '../../lib/types'
import Location from './Location'

type Props = {
    results: TGeocodingApiResponse[]
}

//todo: handle empty state
export default function ResultDropdown({ results }: Props) {
    return (
        <ul className="absolute top-10 flex w-full flex-col gap-2 bg-zinc-700 px-6 py-3">
            <li className="flex cursor-pointer items-center gap-2 transition-opacity hover:opacity-50">
                <FaLocationArrow className="h-4 w-4" />
                <p>Use your current location</p>
            </li>
            {results.map((r: TGeocodingApiResponse) => (
                <Location key={`${r.lat},${r.lon}`} city={r} />
            ))}
        </ul>
    )
}
