import { createContext, useContext, useState } from 'react'

type Props = {
    children: React.ReactNode
}

interface UnitContextValue {
    unit: string
    setUnit: React.Dispatch<React.SetStateAction<string>>
}

const UnitContext = createContext<UnitContextValue | null>(null)

const UnitProvider = ({ children }: Props) => {
    const [unit, setUnit] = useState<string>('imperial')

    return (
        <UnitContext.Provider
            value={{
                unit,
                setUnit,
            }}
        >
            {children}
        </UnitContext.Provider>
    )
}

const useUnit = () => {
    const context = useContext(UnitContext)
    if (!context) throw new Error('useUnit must be used within a UnitProvider')
    return context
}

export { useUnit, UnitProvider }
