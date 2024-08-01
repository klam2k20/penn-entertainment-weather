type Props = {
    date: string
    icon: string
    temp: number
}

export default function Forecast({ date, icon, temp }: Props) {
    return (
        <div className="items-cen flex min-w-16 flex-col justify-center gap-2 rounded-md bg-zinc-700 p-2 lg:min-w-32 lg:p-4">
            <span className="text-center">{date}</span>
            <img src={icon} className="h-16 w-16 lg:h-24 lg:w-24" />
            <span className="text-center text-xl font-semibold">{temp}°</span>
        </div>
    )
}
