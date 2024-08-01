import { useCallback, useEffect, useRef, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import UnitDropdown from './UnitDropdown'

/**
 * Displays a three-dot menu icon and manages the visibility of the UnitDropdown on smaller screens.
 */
export default function UnitMenu() {
    const [showMenu, setShowMenu] = useState<boolean>(true)
    const menuRef = useRef<HTMLUListElement>(null)

    /**
     * Listen for mouse down events to handle when a user
     * clicks outside the unit dropdown
     */
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    /**
     * Handle closing the unit dropdown when user clicks outside it
     */
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
        if (
            menuRef.current &&
            !menuRef.current.contains(event.target as Node)
        ) {
            setShowMenu(false)
        }
    }

    const memoSetShowMenu = useCallback(
        (state: boolean) => setShowMenu(state),
        []
    )

    return (
        <ul className="relative p-2 md:hidden" ref={menuRef}>
            <BsThreeDotsVertical
                className="h-4 w-4 cursor-pointer"
                onClick={() => setShowMenu((prev) => !prev)}
            />
            {showMenu && <UnitDropdown setShowMenu={memoSetShowMenu} />}
        </ul>
    )
}
