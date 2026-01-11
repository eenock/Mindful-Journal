"use client"

import { Smile, Meh, Frown, Heart, Zap } from "lucide-react"

const moods = [
  { id: "great", label: "Great", icon: Heart, color: "text-green-500" },
  { id: "good", label: "Good", icon: Smile, color: "text-blue-500" },
  { id: "okay", label: "Okay", icon: Meh, color: "text-yellow-500" },
  { id: "down", label: "Down", icon: Frown, color: "text-orange-500" },
  { id: "anxious", label: "Anxious", icon: Zap, color: "text-purple-500" },
]

interface MoodSelectorProps {
  selected: string
  onSelect: (mood: string) => void
}

export function MoodSelector({ selected, onSelect }: MoodSelectorProps) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {moods.map((mood) => {
        const Icon = mood.icon
        const isSelected = selected === mood.id
        return (
          <button
            key={mood.id}
            onClick={() => onSelect(mood.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
              isSelected ? "border-primary bg-primary/10" : "border-border hover:border-primary/50 hover:bg-accent/5"
            }`}
          >
            <Icon className={`w-4 h-4 ${mood.color}`} />
            <span className="text-sm font-medium">{mood.label}</span>
          </button>
        )
      })}
    </div>
  )
}
