import { getForecastIcon } from '../../api/weather'
import { useUnit } from '../../contexts/UnitContext'
import { useWeather } from '../../contexts/WeatherContext'
import { THourlyForcast } from '../../lib/types'
import { getTemp, getTime } from '../../lib/utils'
import Forecast from './Forecast'
import ForecastWrapper from './ForecastWrapper'

export default function HourlyForecast() {
    const { weather } = useWeather()
    const { unit } = useUnit()

    return (
        <div className="flex flex-col items-start gap-5">
            <h3>TODAY</h3>
            <ForecastWrapper className="scrollbar-hide flex w-full flex-nowrap gap-4 overflow-x-auto">
                {weather &&
                    weather.hourly &&
                    weather.hourly.map((f: THourlyForcast) => (
                        <Forecast
                            key={f.dt}
                            date={getTime(f.dt).toUpperCase()}
                            icon={getForecastIcon(f.weather[0].icon)}
                            temp={getTemp(f.feels_like, unit)}
                        />
                    ))}
            </ForecastWrapper>
        </div>
    )
}
