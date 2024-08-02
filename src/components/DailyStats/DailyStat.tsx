type Props = {
    title: string
    value: string
}

/**
 * Displays a weather statistic with a title and value.
 */
export default function DailyStat({ title, value }: Props) {
    return (
        <div className="flex flex-col items-center rounded-md bg-zinc-700 p-8">
            <h2 className="font-semibold">{title}</h2>
            <p className="font-xl text-lg">{value}</p>
        </div>
    )
}
