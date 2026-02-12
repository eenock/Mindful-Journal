import { Card } from "@/components/ui/card"
import { Smile } from "lucide-react"

interface MoodTrackerProps {
  latestMood?: string | null
  lastUpdated?: string | null
}

export function MoodTracker({ latestMood, lastUpdated }: MoodTrackerProps) {
  const moodLabel = latestMood ? latestMood.charAt(0).toUpperCase() + latestMood.slice(1) : "No data yet"
  const updatedLabel = lastUpdated ? `Last updated ${lastUpdated}` : "Log a journal entry to track your mood"

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
          <Smile className="w-5 h-5 text-primary" />
        </div>
        <h3 className="font-semibold">Current Mood</h3>
      </div>
      <p className="text-3xl font-bold mb-1">{moodLabel}</p>
      <p className="text-sm text-muted-foreground">{updatedLabel}</p>
    </Card>
  )
}
