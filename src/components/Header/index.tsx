import Searchbar from './Searchbar'
import UnitMenu from './UnitMenu'
import UnitToggle from './UnitToggle'

export default function Header() {
    return (
        <div className="flex items-center justify-between">
            <Searchbar />
            <UnitToggle />
            <UnitMenu />
        </div>
    )
}
