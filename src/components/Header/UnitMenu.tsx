import { useCallback, useEffect, useRef, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import UnitDropdown from './UnitDropdown'

export default function UnitMenu() {
    const [showMenu, setShowMenu] = useState<boolean>(true)
    const menuRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const memoSetShowMenu = useCallback(
        (state: boolean) => setShowMenu(state),
        []
    )

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
        if (
            menuRef.current &&
            !menuRef.current.contains(event.target as Node)
        ) {
            setShowMenu(false)
        }
    }

    return (
        <div className="relative p-2 md:hidden" ref={menuRef}>
            <BsThreeDotsVertical
                className="h-4 w-4 cursor-pointer"
                onClick={() => setShowMenu((prev) => !prev)}
            />
            {showMenu && <UnitDropdown setShowMenu={memoSetShowMenu} />}
        </div>
    )
}
