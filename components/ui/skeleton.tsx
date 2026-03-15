import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("relative overflow-hidden rounded-md bg-gray-200",
        "before:absolute before:inset-0",
        "before:-translate-x-full",
        "before:animate-shimmer",
        "before:bg-linear-to-r",
        "before:from-transparent before:via-white before:to-transparent", className)}
      {...props}
    />
  )
}

export { Skeleton }
export default Skeleton
