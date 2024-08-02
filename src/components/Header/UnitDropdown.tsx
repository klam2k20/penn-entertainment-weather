import { useUnit } from '../../contexts/UnitContext'
import { cn } from '../../lib/utils'

type Props = {
    setShowMenu: (state: boolean) => void
}

/**
 * A dropdown component that allows users to switch between imperial and metric units.
 */
export default function UnitDropdown({ setShowMenu }: Props) {
    const { unit, setUnit } = useUnit()

    /**
     * Handles updating the unit selected and closing
     * the unit dropdown
     */
    const handlePress = (unit: string) => {
        setUnit(unit)
        setShowMenu(false)
    }

    return (
        <div className="absolute right-2 top-10 flex w-fit flex-col items-end justify-center gap-1 rounded-md border border-zinc-500 bg-zinc-700">
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
