"use client"

import { Card } from "@/components/ui/card"
import { Brain, TrendingUp, Clock, CalendarIcon, Sparkles, Heart } from "lucide-react"
import { MoodTrendChart } from "./mood-trend-chart"
import { WordCloudInsight } from "./word-cloud-insight"
import { WritingPatternsChart } from "./writing-patterns-chart"
import { Button } from "@/components/ui/button"

export function InsightsDashboard() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Insights & Analytics</h2>
            <p className="text-muted-foreground">Discover patterns in your journaling journey</p>
          </div>
        </div>
      </div>

      {/* AI-Generated Insights */}
      <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
            <Brain className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold mb-2">AI-Powered Insight</h3>
            <p className="text-balance leading-relaxed mb-4">
              Over the past week, I&apos;ve noticed a positive shift in your emotional state. Your entries show increased
              gratitude practice and self-compassion. You&apos;re writing more about personal growth and setting healthy
              boundaries - signs of meaningful progress.
            </p>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Sparkles className="w-3 h-3" />
              Generate New Insight
            </Button>
          </div>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <CalendarIcon className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold">Total Entries</h3>
          </div>
          <div className="space-y-2">
            <p className="text-3xl font-bold">124</p>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-green-600 font-medium">+12%</span>
              <span className="text-muted-foreground">from last month</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
              <Clock className="w-5 h-5 text-accent-foreground" />
            </div>
            <h3 className="font-semibold">Avg. Words</h3>
          </div>
          <div className="space-y-2">
            <p className="text-3xl font-bold">342</p>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-green-600 font-medium">+8%</span>
              <span className="text-muted-foreground">from last month</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <Heart className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold">Most Common Mood</h3>
          </div>
          <div className="space-y-2">
            <p className="text-3xl font-bold">Good</p>
            <p className="text-sm text-muted-foreground">Appeared in 45% of entries</p>
          </div>
        </Card>
      </div>

      {/* Mood Trend */}
      <MoodTrendChart />

      {/* Writing Patterns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <WritingPatternsChart />
        <WordCloudInsight />
      </div>

      {/* Journaling Streaks History */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Journaling Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
            <div>
              <p className="font-medium">Current Streak</p>
              <p className="text-sm text-muted-foreground">Keep it going!</p>
            </div>
            <p className="text-2xl font-bold">7 days</p>
          </div>
          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
            <div>
              <p className="font-medium">Longest Streak</p>
              <p className="text-sm text-muted-foreground">Your personal best</p>
            </div>
            <p className="text-2xl font-bold">15 days</p>
          </div>
          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
            <div>
              <p className="font-medium">This Month</p>
              <p className="text-sm text-muted-foreground">Days with entries</p>
            </div>
            <p className="text-2xl font-bold">18/30</p>
          </div>
        </div>
      </Card>

      {/* Themes & Topics */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Common Themes</h3>
        <div className="flex flex-wrap gap-2">
          {[
            { label: "Gratitude", count: 45 },
            { label: "Self-reflection", count: 38 },
            { label: "Personal growth", count: 32 },
            { label: "Relationships", count: 28 },
            { label: "Work-life balance", count: 24 },
            { label: "Mindfulness", count: 22 },
            { label: "Goals", count: 19 },
            { label: "Mental health", count: 17 },
          ].map((theme) => (
            <button
              key={theme.label}
              className="px-4 py-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
            >
              <span className="font-medium">{theme.label}</span>
              <span className="ml-2 text-sm text-muted-foreground">({theme.count})</span>
            </button>
          ))}
        </div>
      </Card>
    </div>
  )
}
