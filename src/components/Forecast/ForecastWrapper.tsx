import { useRef } from 'react'
import { useWeather } from '../../contexts/WeatherContext'

interface Props extends React.HTMLAttributes<HTMLUListElement> {
    children: React.ReactNode
}

/**
 * Wraps the forecast items in a scrollable container.
 */
export default function ForecastWrapper({ children, className }: Props) {
    const containerRef = useRef<HTMLUListElement | null>(null)
    const { isLoading } = useWeather()

    /**
     * Handles horizontal scrolling on the daily and hourly forecasts
     */
    const handleScroll = (event: React.WheelEvent) => {
        if (
            containerRef.current &&
            containerRef.current.scrollWidth > containerRef.current.clientWidth
        ) {
            event.preventDefault()
            containerRef.current.scrollLeft += event.deltaY
        }
    }

    if (isLoading) {
        return (
            <div className="h-48 w-full animate-pulse rounded-md bg-zinc-700" />
        )
    }

    return (
        <ul ref={containerRef} className={className} onWheel={handleScroll}>
            {children}
        </ul>
    )
}
