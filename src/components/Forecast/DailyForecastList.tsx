import { useWeather } from '../../contexts/WeatherContext'
import { TDailyForecast } from '../../lib/types'
import DailyForecast from './DailyForecast'

export default function DailyForecastList() {
    const { weather } = useWeather()

    return (
        <ul className="flex w-full gap-4 overflow-hidden">
            {weather &&
                weather.daily &&
                weather.daily.map((f: TDailyForecast) => (
                    <DailyForecast key={f.dt} forecast={f} />
                ))}
        </ul>
    )
}
