import { useEffect, useRef } from 'react'

interface Props extends React.HTMLAttributes<HTMLUListElement> {
    children: React.ReactNode
}

export default function ForecastWrapper({ children, className }: Props) {
    const containerRef = useRef<HTMLUListElement | null>(null)

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.addEventListener('wheel', handleScroll)
        }

        return () => {
            if (containerRef.current) {
                containerRef.current.removeEventListener('wheel', handleScroll)
            }
        }
    }, [containerRef])

    const handleScroll = (event: WheelEvent) => {
        if (
            containerRef.current &&
            containerRef.current.scrollWidth > containerRef.current.clientWidth
        ) {
            event.preventDefault()
            containerRef.current.scrollLeft += event.deltaY
        }
    }

    return (
        <ul ref={containerRef} className={className}>
            {children}
        </ul>
    )
}
