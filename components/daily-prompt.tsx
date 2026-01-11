"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lightbulb, RefreshCw, Sparkles } from "lucide-react"

const prompts = [
  {
    text: "What brought you joy today, no matter how small?",
    category: "gratitude",
    difficulty: "easy",
  },
  {
    text: "Describe a challenge you faced today and how you handled it.",
    category: "reflection",
    difficulty: "medium",
  },
  {
    text: "What are you grateful for right now?",
    category: "gratitude",
    difficulty: "easy",
  },
  {
    text: "If you could tell your past self something, what would it be?",
    category: "reflection",
    difficulty: "deep",
  },
  {
    text: "What does self-care mean to you today?",
    category: "wellness",
    difficulty: "medium",
  },
  {
    text: "Write about a person who made a positive impact on your life.",
    category: "relationships",
    difficulty: "medium",
  },
  {
    text: "What are you learning about yourself lately?",
    category: "self-discovery",
    difficulty: "deep",
  },
  {
    text: "Describe your ideal day from start to finish.",
    category: "vision",
    difficulty: "medium",
  },
  {
    text: "What emotions did you experience today and why?",
    category: "emotional-awareness",
    difficulty: "medium",
  },
  {
    text: "What would you do if you knew you could not fail?",
    category: "dreams",
    difficulty: "deep",
  },
]

interface DailyPromptProps {
  onStartWriting: () => void
}

export function DailyPrompt({ onStartWriting }: DailyPromptProps) {
  const [currentPrompt, setCurrentPrompt] = useState(prompts[0])
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    // Get daily prompt based on date
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000)
    const promptIndex = dayOfYear % prompts.length
    setCurrentPrompt(prompts[promptIndex])
  }, [])

  const refreshPrompt = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * prompts.length)
      setCurrentPrompt(prompts[randomIndex])
      setIsRefreshing(false)
    }, 300)
  }

  const getDifficultyColor = (difficulty: string) => {
    const colors: Record<string, string> = {
      easy: "bg-green-500/20 text-green-600",
      medium: "bg-blue-500/20 text-blue-600",
      deep: "bg-purple-500/20 text-purple-600",
    }
    return colors[difficulty] || "bg-muted text-muted-foreground"
  }

  return (
    <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
          <Lightbulb className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold">Today's Prompt</h3>
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(currentPrompt.difficulty)}`}
            >
              {currentPrompt.difficulty}
            </span>
          </div>
          <p className="text-lg text-balance mb-4">{currentPrompt.text}</p>
          <div className="flex items-center gap-2">
            <Button onClick={onStartWriting} variant="default" size="sm" className="gap-2">
              <Sparkles className="w-3 h-3" />
              Start Writing
            </Button>
            <Button
              onClick={refreshPrompt}
              variant="outline"
              size="sm"
              className="gap-2 bg-transparent"
              disabled={isRefreshing}
            >
              <RefreshCw className={`w-3 h-3 ${isRefreshing ? "animate-spin" : ""}`} />
              New Prompt
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
