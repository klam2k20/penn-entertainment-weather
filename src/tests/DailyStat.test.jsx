import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import DailyStat from '../components/DailyStats/DailyStat'

describe('DailyStat component', () => {
    it('should render the title and value correctly', () => {
        const title = 'SUNRISE'
        const value = '07:00 AM'
        render(<DailyStat title={title} value={value} />)

        const titleElement = screen.getByText(title)
        const valueElement = screen.getByText(value)

        expect(titleElement).toBeInTheDocument()
        expect(valueElement).toBeInTheDocument()
    })
})
