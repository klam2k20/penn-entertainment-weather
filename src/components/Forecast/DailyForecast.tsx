import { getForecastIcon } from '../../api/weather'
import { useUnit } from '../../contexts/UnitContext'
import { TDailyForecast } from '../../lib/types'
import { getTemp, getWeekday } from '../../lib/utils'

type Props = {
    forecast: TDailyForecast
}

export default function DailyForecast({ forecast }: Props) {
    const { unit } = useUnit()

    return (
        <div className="items-cen flex flex-col justify-center">
            <span className="text-center">{getWeekday(forecast.dt)}</span>
            <img
                src={getForecastIcon(forecast.weather[0].icon)}
                className="h-16 w-16"
            />
            <span className="text-center">
                {getTemp(forecast.feels_like.day, unit)}
            </span>
        </div>
    )
}
