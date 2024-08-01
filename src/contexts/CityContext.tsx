import { createContext, useContext, useState } from 'react'
import { TGeocodingApiResponse } from '../lib/types'

type Props = {
    children: React.ReactNode
}

interface CityContextValue {
    cities: TGeocodingApiResponse[]
    setCities: React.Dispatch<React.SetStateAction<TGeocodingApiResponse[]>>
    loading: boolean
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    hasCities: boolean
    setHasCities: React.Dispatch<React.SetStateAction<boolean>>
}

const CityContext = createContext<CityContextValue | null>(null)

const CityProvider = ({ children }: Props) => {
    const [cities, setCities] = useState<TGeocodingApiResponse[]>([])
    const [hasCities, setHasCities] = useState<boolean>(true)
    const [loading, setLoading] = useState<boolean>(false)

    return (
        <CityContext.Provider
            value={{
                cities,
                setCities,
                loading,
                setLoading,
                hasCities,
                setHasCities,
            }}
        >
            {children}
        </CityContext.Provider>
    )
}

const useCities = () => {
    const context = useContext(CityContext)
    if (!context) throw new Error('useCity must be used within a LoProvider')
    return context
}

export { useCities, CityProvider }
