import { getForecastIcon } from '../../api/weather'
import { useUnit } from '../../contexts/UnitContext'
import { useWeather } from '../../contexts/WeatherContext'
import { TDailyForecast } from '../../lib/types'
import { getTemp, getWeekday } from '../../lib/utils'
import Forecast from './Forecast'
import ForecastWrapper from './ForecastWrapper'

/**
 * Displays a 7-day weather forecast.
 */
export default function DailyForecast() {
    const { weather } = useWeather()
    const { unit } = useUnit()

    return (
        <div className="flex flex-col items-start gap-2 md:gap-4">
            <h1 className="font-semibold md:text-xl">7 DAY FORECAST</h1>
            <ForecastWrapper className="flex w-full flex-nowrap gap-4 overflow-x-auto scrollbar-hide">
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
            </ForecastWrapper>
        </div>
    )
}
