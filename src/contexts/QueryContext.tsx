import { createContext, useContext, useState } from 'react'

type Props = {
    children: React.ReactNode
}

interface QueryContextValue {
    query: string
    setQuery: React.Dispatch<React.SetStateAction<string>>
}

const QueryContext = createContext<QueryContextValue | null>(null)

const QueryProvider = ({ children }: Props) => {
    const [query, setQuery] = useState<string>('')

    return (
        <QueryContext.Provider
            value={{
                query,
                setQuery,
            }}
        >
            {children}
        </QueryContext.Provider>
    )
}

const useQuery = () => {
    const context = useContext(QueryContext)
    if (!context)
        throw new Error('useQuery must be used within a QueryProvider')
    return context
}

export { useQuery, QueryProvider }
