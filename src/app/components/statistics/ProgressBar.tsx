import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

interface ProgressBarProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
    indicatorClassName?: string;
}

const ProgressBar = React.forwardRef<
    React.ElementRef<typeof ProgressPrimitive.Root>,
    ProgressBarProps
>(({ className, value, indicatorClassName, children, ...props }, ref) => (
    <ProgressPrimitive.Root
        ref={ref}
        className={cn(
            "relative h-5 w-full overflow-hidden bg-zinc-800 border border-zinc-700",
            className
        )}
        {...props}
    >
        <ProgressPrimitive.Indicator
            className={cn("h-full w-full flex-1 bg-cyan-600 transition-all",
                indicatorClassName
            )}
            style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
        />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-sm font-medium">
            {children}
        </span>
    </ProgressPrimitive.Root>
))
ProgressBar.displayName = ProgressPrimitive.Root.displayName

export { ProgressBar }