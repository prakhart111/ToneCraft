import { cn } from "@/lib/utils"

export default function ProgressBar({ progress }: { progress: number }) {
    return (
        <div className="w-full h-2 bg-gray-200 rounded-full">
        <div
            className={cn(
            "h-full rounded-full transition-all duration-500 ease-in-out",
            progress === 100 ? "bg-green-500" : "bg-blue-500"
            )}
            style={{ width: `${progress}%` }}
        ></div>
        </div>
    )
}

