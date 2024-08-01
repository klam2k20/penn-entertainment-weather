import { useWeather } from '../../contexts/WeatherContext'

type Props = {
    title: string
    value: string
}

/**
 * Displays a weather statistic with a title and value.
 */
export default function DailyStat({ title, value }: Props) {
    const { isLoading } = useWeather()

    if (isLoading) return <DailyStatLoading />

    return (
        <div className="flex flex-col items-center rounded-md bg-zinc-700 p-8">
            <h2 className="font-semibold">{title}</h2>
            <p className="font-xl text-lg">{value}</p>
        </div>
    )
}

/**
 * Displays a loading state for the DailyStat component.
 */
function DailyStatLoading() {
    return (
        <div className="h-full w-full animate-pulse rounded-md bg-zinc-700"></div>
    )
}
