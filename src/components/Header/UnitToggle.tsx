import { useState } from 'react'
import { cn } from '../../lib/utils'

export default function UnitToggle() {
    const [unit, setUnit] = useState<string>('imperial')

    return (
        <div className="hidden h-10 w-fit items-center justify-between gap-1 rounded-md bg-zinc-700 md:flex">
            <button
                className={cn(
                    'rounded-md bg-transparent px-4 py-2 text-sm text-white transition-all',
                    unit === 'imperial' && 'bg-white text-black'
                )}
                onClick={() => setUnit('imperial')}
            >
                Imperial
            </button>
            <button
                className={cn(
                    'rounded-md bg-transparent px-4 py-2 text-sm text-white transition-all',
                    unit === 'metric' && 'bg-white text-black'
                )}
                onClick={() => setUnit('metric')}
            >
                Metric
            </button>
        </div>
    )
}

/**
 * container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 1,
    borderColor: '#F5F6F9',
    backgroundColor: '#F5F6F9',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
    border: 1,
    borderRadius: 8,
    padding: 2,
    width: 300,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EFF0F6',
    borderRadius: 6,
    height: 32,
  },
  activeTab: {
    shadowColor: '#E4E5E7',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.24,
    shadowRadius: 2,
    backgroundColor: '#FFF',
  },
 */
