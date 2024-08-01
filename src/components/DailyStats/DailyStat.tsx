import { useWeather } from '../../contexts/WeatherContext'

type Props = {
    title: string
    value: string
}

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

function DailyStatLoading() {
    return (
        <div className="h-full w-full animate-pulse rounded-md bg-zinc-700"></div>
    )
}
