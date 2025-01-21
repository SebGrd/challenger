
type ProgressTicksProps = {
    ticks: {
        percentage: number,
        element: JSX.Element
    }[]
}

export default function ProgressTicks({ ticks = [] }: ProgressTicksProps) {
    return (
        <div className="w-full px-0.5">
            <div className="relative w-full">
                {ticks.map(({ percentage, element }, index) => (
                    <div key={index} className="absolute top-0 h-2 w-[2px] bg-white" style={{ left: `${percentage}%` }}>
                        {element}
                    </div>
                ))}
            </div>
        </div>
    )
}