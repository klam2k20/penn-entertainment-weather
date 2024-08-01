import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { WeatherProvider } from './contexts/WeatherContext.tsx'
import { UnitProvider } from './contexts/UnitContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <UnitProvider>
            <WeatherProvider>
                <App />
            </WeatherProvider>
        </UnitProvider>
    </React.StrictMode>
)
