"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Edit3, Search, CalendarIcon, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock data - will be replaced with real database queries
const mockEntries = [
  {
    id: "1",
    date: new Date(),
    title: "Morning reflections",
    preview: "Started the day with gratitude practice. Feeling centered and ready to face the challenges ahead...",
    mood: "good",
    wordCount: 324,
  },
  {
    id: "2",
    date: new Date(Date.now() - 86400000),
    title: "Evening thoughts",
    preview: "Reflected on the challenges I faced today. Learning to be more patient with myself...",
    mood: "okay",
    wordCount: 456,
  },
  {
    id: "3",
    date: new Date(Date.now() - 172800000),
    title: "Midday check-in",
    preview: "Feeling more grounded after meditation. The breathing exercises really help...",
    mood: "great",
    wordCount: 198,
  },
]

interface EntriesListProps {
  onEditEntry?: (entryId: string) => void
}

export function EntriesList({ onEditEntry }: EntriesListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [entries] = useState(mockEntries)

  const filteredEntries = entries.filter(
    (entry) =>
      entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.preview.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const formatDate = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const days = Math.floor(diff / 86400000)

    if (days === 0) return "Today"
    if (days === 1) return "Yesterday"
    if (days < 7) return `${days} days ago`

    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  const getMoodColor = (mood: string) => {
    const colors: Record<string, string> = {
      great: "bg-green-500/20 text-green-600",
      good: "bg-blue-500/20 text-blue-600",
      okay: "bg-yellow-500/20 text-yellow-600",
      down: "bg-orange-500/20 text-orange-600",
      anxious: "bg-purple-500/20 text-purple-600",
    }
    return colors[mood] || "bg-muted text-muted-foreground"
  }

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search entries..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Entries */}
      <div className="space-y-3">
        {filteredEntries.length === 0 ? (
          <Card className="p-12 text-center">
            <CalendarIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No entries found</h3>
            <p className="text-muted-foreground">
              {searchQuery ? "Try a different search term" : "Start writing your first journal entry"}
            </p>
          </Card>
        ) : (
          filteredEntries.map((entry) => (
            <Card key={entry.id} className="p-4 hover:border-primary/50 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <button
                  onClick={() => onEditEntry?.(entry.id)}
                  className="flex-1 min-w-0 text-left hover:opacity-80 transition-opacity"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <p className="text-sm text-muted-foreground">{formatDate(entry.date)}</p>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getMoodColor(entry.mood)}`}>
                      {entry.mood}
                    </span>
                  </div>
                  <p className="font-medium mb-1">{entry.title || "Untitled"}</p>
                  <p className="text-sm text-muted-foreground line-clamp-2">{entry.preview}</p>
                  <p className="text-xs text-muted-foreground mt-2">{entry.wordCount} words</p>
                </button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="flex-shrink-0">
                      <Edit3 className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEditEntry?.(entry.id)}>
                      <Edit3 className="w-4 h-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
