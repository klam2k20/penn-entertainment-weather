import DailyForecastList from './components/Forecast/DailyForecastList'
import Header from './components/Header'

function App() {
    return (
        <div className="flex flex-col">
            <Header />
            <DailyForecastList />
        </div>
    )
}

export default App
