import DailyGrid from './components/DailyStats/DailyGrid'
import DailyForecast from './components/Forecast/DailyForecast'
import HourlyForecast from './components/Forecast/HourlyForecast'
import Header from './components/Header'

function App() {
    return (
        <div className="flex flex-col gap-8">
            <Header />
            <DailyForecast />
            <HourlyForecast />
            <DailyGrid />
        </div>
    )
}

export default App
