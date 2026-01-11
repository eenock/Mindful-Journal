"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Flame, Award, Target } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export function StreakCounter() {
  const [currentStreak, setCurrentStreak] = useState(7)
  const [longestStreak, setLongestStreak] = useState(15)
  const [todayCompleted, setTodayCompleted] = useState(false)

  // Simulate streak data - will be from database in production
  useEffect(() => {
    const lastEntryDate = new Date()
    lastEntryDate.setHours(0, 0, 0, 0)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    setTodayCompleted(lastEntryDate.getTime() === today.getTime())
  }, [])

  const nextMilestone = currentStreak < 7 ? 7 : currentStreak < 30 ? 30 : currentStreak < 100 ? 100 : 365
  const progressToMilestone = (currentStreak / nextMilestone) * 100

  return (
    <Card className="p-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-accent/10 rounded-full -mr-12 -mt-12" />

      <div className="relative">
        <div className="flex items-center gap-3 mb-3">
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              todayCompleted ? "bg-accent/20" : "bg-muted"
            }`}
          >
            <Flame className={`w-5 h-5 ${todayCompleted ? "text-accent-foreground" : "text-muted-foreground"}`} />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">Current Streak</h3>
            {todayCompleted && <p className="text-xs text-accent-foreground">Today completed!</p>}
          </div>
        </div>

        <div className="flex items-baseline gap-2 mb-3">
          <p className="text-4xl font-bold">{currentStreak}</p>
          <p className="text-muted-foreground">days</p>
        </div>

        {/* Progress to next milestone */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Next milestone</span>
            <span className="flex items-center gap-1">
              <Target className="w-3 h-3" />
              {nextMilestone} days
            </span>
          </div>
          <Progress value={progressToMilestone} className="h-2" />
        </div>

        {/* Longest streak badge */}
        {longestStreak > currentStreak && (
          <div className="mt-3 pt-3 border-t border-border flex items-center gap-2 text-sm text-muted-foreground">
            <Award className="w-4 h-4" />
            <span>Best: {longestStreak} days</span>
          </div>
        )}
      </div>
    </Card>
  )
}
