"use client"

import { Card } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const moodData = [
  { date: "Mon", score: 7 },
  { date: "Tue", score: 6 },
  { date: "Wed", score: 8 },
  { date: "Thu", score: 7 },
  { date: "Fri", score: 9 },
  { date: "Sat", score: 8 },
  { date: "Sun", score: 7 },
]

export function MoodTrendChart() {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Mood Trends (Last 7 Days)</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={moodData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" domain={[0, 10]} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Line
              type="monotone"
              dataKey="score"
              stroke="hsl(var(--primary))"
              strokeWidth={3}
              dot={{ fill: "hsl(var(--primary))", r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span className="text-muted-foreground">Mood Score (1-10)</span>
        </div>
        <p className="font-medium">Average: 7.4</p>
      </div>
    </Card>
  )
}
