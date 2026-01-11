"use client"

import { Card } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const writingData = [
  { time: "Morning", entries: 45 },
  { time: "Afternoon", entries: 28 },
  { time: "Evening", entries: 38 },
  { time: "Night", entries: 13 },
]

export function WritingPatternsChart() {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Writing Patterns</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={writingData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Bar dataKey="entries" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-4 text-sm text-muted-foreground">Most active time: Morning (45 entries)</p>
    </Card>
  )
}
