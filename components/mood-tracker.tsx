import { Card } from "@/components/ui/card"
import { Smile } from "lucide-react"

export function MoodTracker() {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
          <Smile className="w-5 h-5 text-primary" />
        </div>
        <h3 className="font-semibold">Current Mood</h3>
      </div>
      <p className="text-3xl font-bold mb-1">Good</p>
      <p className="text-sm text-muted-foreground">Last updated today</p>
    </Card>
  )
}
