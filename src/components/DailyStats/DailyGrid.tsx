import { useUnit } from '../../contexts/UnitContext'
import { useWeather } from '../../contexts/WeatherContext'
import {
    formatTimeHourMin,
    formatVisibility,
    formatWind,
    getTemp,
} from '../../lib/utils'
import DailyStat from './DailyStat'

/**
 * Displays a grid of daily weather statistics.
 */
export default function DailyGrid() {
    const { weather, isLoading } = useWeather()
    const { unit } = useUnit()

    if (isLoading) {
        return (
            <div className="h-64 w-full animate-pulse rounded-md bg-zinc-700" />
        )
    }

    return (
        weather &&
        weather.current &&
        weather.daily && (
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                <DailyStat
                    title="SUNRISE"
                    value={`${formatTimeHourMin(weather.current.sunrise)}`}
                />
                <DailyStat
                    title="SUNSET"
                    value={`${formatTimeHourMin(weather.current.sunset)}`}
                />
                <DailyStat
                    title="LOW"
                    value={`${getTemp(weather.daily[0].temp.min, unit)}°`}
                />
                <DailyStat
                    title="HIGH"
                    value={`${getTemp(weather.daily[0].temp.max, unit)}°`}
                />
                <DailyStat
                    title="FEELS LIKE"
                    value={`${getTemp(weather.current.feels_like, unit)}°`}
                />
                <DailyStat
                    title="HUMIDITY"
                    value={`${weather.current.humidity}%`}
                />
                <DailyStat
                    title="VISIBILITY"
                    value={formatVisibility(weather.current.visibility, unit)}
                />
                <DailyStat
                    title="WIND"
                    value={formatWind(weather.current.wind_speed, unit)}
                />
            </div>
        )
    )
}
