import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { WeatherProvider } from './contexts/WeatherContext.tsx'
import { UnitProvider } from './contexts/UnitContext.tsx'
import { QueryProvider } from './contexts/QueryContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <UnitProvider>
            <QueryProvider>
                <WeatherProvider>
                    <App />
                </WeatherProvider>
            </QueryProvider>
        </UnitProvider>
    </React.StrictMode>
)
