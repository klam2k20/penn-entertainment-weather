import Searchbar from './Searchbar'
import UnitMenu from './UnitMenu'
import UnitToggle from './UnitToggle'

/**
 * Represents the header section of the application, containing a search bar and unit toggle controls.
 */
export default function Header() {
    return (
        <div className="flex items-center justify-between">
            <Searchbar />
            <UnitToggle />
            <UnitMenu />
        </div>
    )
}
