import { Check } from "lucide-react"

interface TimelineItem {
  title: string
  time: string
  status: "success" | "pending" | "error"
}

interface TransactionTimelineProps {
  timeline: TimelineItem[]
}

export function TransactionTimeline({ timeline }: TransactionTimelineProps) {
  return (
    <div className="space-y-4">
      {timeline.map((item, index) => (
        <div key={index} className="flex items-start gap-4">
          <div className="flex-shrink-0 mt-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                item.status === "success"
                  ? "bg-green-500/20 text-green-500"
                  : item.status === "pending"
                    ? "bg-yellow-500/20 text-yellow-500"
                    : "bg-red-500/20 text-red-500"
              }`}
            >
              <Check size={16} />
            </div>
          </div>
          <div>
            <h3 className="font-medium">{item.title}</h3>
            <p className="text-sm text-slate-400">{item.time}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
