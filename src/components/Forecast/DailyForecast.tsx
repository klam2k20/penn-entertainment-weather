import { getForecastIcon } from '../../api/weather'
import { useUnit } from '../../contexts/UnitContext'
import { useWeather } from '../../contexts/WeatherContext'
import { TDailyForecast } from '../../lib/types'
import { getTemp, getWeekday } from '../../lib/utils'
import Forecast from './Forecast'

export default function DailyForecast() {
    const { weather } = useWeather()
    const { unit } = useUnit()

    return (
        <div className="flex flex-col items-start gap-2 md:gap-4">
            <h1 className="font-semibold md:text-xl">7 DAY FORECAST</h1>
            <ul className="scrollbar-hide flex w-full flex-nowrap gap-4 overflow-x-auto">
                {weather &&
                    weather.daily &&
                    weather.daily.map((f: TDailyForecast) => (
                        <Forecast
                            key={f.dt}
                            date={getWeekday(f.dt).toUpperCase()}
                            icon={getForecastIcon(f.weather[0].icon)}
                            temp={getTemp(f.feels_like.day, unit)}
                        />
                    ))}
            </ul>
        </div>
    )
}
