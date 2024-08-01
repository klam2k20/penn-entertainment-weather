import { cn } from '../../lib/utils'

type Props = {
    unit: string
    setUnit: (state: string) => void
    setShowMenu: (state: boolean) => void
}

export default function UnitDropdown({ unit, setUnit, setShowMenu }: Props) {
    const handlePress = (unit: string) => {
        setUnit(unit)
        setShowMenu(false)
    }

    return (
        <div className="absolute right-2 top-10 flex w-fit flex-col items-end justify-center gap-1 rounded-md bg-zinc-700">
            <button
                className={cn(
                    'w-full rounded-md bg-transparent px-4 py-2 text-sm text-white transition-all',
                    unit === 'imperial' && 'bg-white text-black'
                )}
                onClick={() => handlePress('imperial')}
            >
                Imperial
            </button>
            <button
                className={cn(
                    'w-full rounded-md bg-transparent px-4 py-2 text-sm text-white transition-all',
                    unit === 'metric' && 'bg-white text-black'
                )}
                onClick={() => handlePress('metric')}
            >
                Metric
            </button>
        </div>
    )
}
