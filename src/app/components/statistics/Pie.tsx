type PieProps = {
    backgroundColor: string;
    activeColor: string;
    size: number;
    percentage: number;
}

export default function Pie({
    backgroundColor = 'theme(colors.zinc.700)',
    activeColor = 'theme(colors.zinc.200)',
    percentage = 0,
    size = 5,
}: PieProps) {
    const className = `rounded-full size-${size.toString()} bg-[conic-gradient(${activeColor}_${Math.round(percentage*360/100).toString()}deg,_${backgroundColor}_${Math.round(percentage*360/100).toString()}deg)]`;
    return (
        <div className={className}></div>
    )
}