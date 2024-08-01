import DailyGrid from './components/DailyStats/DailyGrid'
import DailyForecast from './components/Forecast/DailyForecast'
import HourlyForecast from './components/Forecast/HourlyForecast'
import Header from './components/Header'
import { Toaster } from 'react-hot-toast'

function App() {
    return (
        <div className="flex flex-col gap-4 md:gap-6 lg:gap-8">
            <Header />
            <DailyForecast />
            <HourlyForecast />
            <DailyGrid />
            <Toaster
                position="bottom-center"
                toastOptions={{ duration: 3000 }}
            />
        </div>
    )
}

export default App
