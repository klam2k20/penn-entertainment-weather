import { useWeather } from '../../contexts/WeatherContext'

type Props = {
    date: string
    icon: string
    temp: number
}

export default function Forecast({ date, icon, temp }: Props) {
    const { isLoading } = useWeather()

    if (isLoading) return <ForecastLoading />

    return (
        <div className="flex min-h-36 min-w-16 flex-col items-center justify-center gap-2 rounded-md bg-zinc-700 p-2 lg:min-h-48 lg:min-w-32 lg:p-4">
            <span className="text-center">{date}</span>
            <img src={icon} className="h-16 w-16 lg:h-24 lg:w-24" />
            <span className="text-center text-xl font-semibold">{temp}°</span>
        </div>
    )
}

function ForecastLoading() {
    return (
        <div className="min-h-36 min-w-16 animate-pulse rounded-md bg-zinc-700 p-2 lg:min-h-48 lg:min-w-32 lg:p-4" />
    )
}
