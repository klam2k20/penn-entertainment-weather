import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Forecast from '../components/Forecast/Forecast'

describe('Forecast component', () => {
    it('should render the day and temperature correctly', () => {
        const date = 'Fri'
        const temp = '97'
        render(<Forecast date={date} icon="test" temp={temp} />)

        const dateElement = screen.getByText(date)
        const tempElement = screen.getByText('97°')

        expect(dateElement).toBeInTheDocument()
        expect(tempElement).toBeInTheDocument()
    }),
        it('should render the time and temperature correctly', () => {
            const time = '11 AM'
            const temp = '97'
            render(<Forecast date={time} icon="test" temp={temp} />)

            const timeElement = screen.getByText(time)
            const tempElement = screen.getByText('97°')

            expect(timeElement).toBeInTheDocument()
            expect(tempElement).toBeInTheDocument()
        })
})
