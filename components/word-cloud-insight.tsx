"use client"

import { Card } from "@/components/ui/card"

const topWords = [
  { word: "grateful", size: 32, color: "text-primary" },
  { word: "growth", size: 28, color: "text-accent-foreground" },
  { word: "peace", size: 24, color: "text-primary" },
  { word: "challenge", size: 20, color: "text-accent-foreground" },
  { word: "happy", size: 26, color: "text-primary" },
  { word: "learning", size: 22, color: "text-accent-foreground" },
  { word: "mindful", size: 18, color: "text-primary" },
  { word: "journey", size: 16, color: "text-accent-foreground" },
]

export function WordCloudInsight() {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Most Used Words</h3>
      <div className="h-[300px] flex flex-wrap items-center justify-center gap-4 p-4">
        {topWords.map((item, i) => (
          <span key={i} className={`font-semibold ${item.color}`} style={{ fontSize: `${item.size}px` }}>
            {item.word}
          </span>
        ))}
      </div>
      <p className="mt-4 text-sm text-muted-foreground">
        Your most frequently used words reflect a focus on gratitude and personal growth
      </p>
    </Card>
  )
}
