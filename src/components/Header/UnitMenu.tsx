import { useEffect, useRef, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { cn } from '../../lib/utils'

export default function UnitMenu() {
    const [showMenu, setShowMenu] = useState<boolean>(true)
    const [unit, setUnit] = useState<string>('imperial')
    const menuRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
        if (
            menuRef.current &&
            !menuRef.current.contains(event.target as Node)
        ) {
            setShowMenu(false)
        }
    }

    const handlePress = (unit: string) => {
        setUnit(unit)
        setShowMenu(false)
    }

    const Dropdown = () => {
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

    return (
        <div className="relative p-2 md:hidden" ref={menuRef}>
            <BsThreeDotsVertical
                className="h-4 w-4 cursor-pointer"
                onClick={() => setShowMenu((prev) => !prev)}
            />
            {showMenu && <Dropdown />}
        </div>
    )
}
