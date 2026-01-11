"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Save, Sparkles, Bold, Italic, List, CheckSquare } from "lucide-react"
import { MoodSelector } from "./mood-selector"
import { useToast } from "@/hooks/use-toast"
import { SubscriptionPaywall } from "./subscription-paywall"
import { ProBadge } from "./pro-badge"

export function JournalEntryEditor() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [selectedMood, setSelectedMood] = useState<string>("")
  const [isSaving, setIsSaving] = useState(false)
  const [wordCount, setWordCount] = useState(0)
  const [showPaywall, setShowPaywall] = useState(false)
  const { toast } = useToast()

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value
    setContent(text)
    // Calculate word count
    const words = text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0)
    setWordCount(words.length)
  }

  const handleSave = async () => {
    if (!content.trim()) {
      toast({
        title: "Entry is empty",
        description: "Please write something before saving",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)
    console.log("[v0] Saving entry:", { title, content, mood: selectedMood })

    // Simulate save delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    toast({
      title: "Entry saved",
      description: "Your journal entry has been saved successfully",
    })

    setIsSaving(false)
    // Clear form after save
    setTitle("")
    setContent("")
    setSelectedMood("")
    setWordCount(0)
  }

  const getAISuggestions = () => {
    setShowPaywall(true)
  }

  return (
    <>
      <Card className="p-6 md:p-8">
        <div className="space-y-6">
          {/* Date and Time */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
            <p className="text-sm text-muted-foreground">
              {new Date().toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
              })}
            </p>
          </div>

          {/* Title */}
          <div>
            <Input
              placeholder="Entry title (optional)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-lg font-medium border-0 px-0 focus-visible:ring-0 placeholder:text-muted-foreground/50"
            />
          </div>

          {/* Mood Selector */}
          <div>
            <label className="text-sm font-medium mb-2 block">How are you feeling?</label>
            <MoodSelector selected={selectedMood} onSelect={setSelectedMood} />
          </div>

          <div className="border-t border-b border-border py-2">
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" disabled>
                <Bold className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" disabled>
                <Italic className="w-4 h-4" />
              </Button>
              <div className="w-px h-5 bg-border mx-1" />
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" disabled>
                <List className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" disabled>
                <CheckSquare className="w-4 h-4" />
              </Button>
              <div className="ml-auto text-xs text-muted-foreground">{wordCount} words</div>
            </div>
          </div>

          {/* Content Editor */}
          <div>
            <Textarea
              placeholder="Start writing... Let your thoughts flow freely."
              value={content}
              onChange={handleContentChange}
              className="min-h-[400px] border-0 px-0 text-base leading-relaxed resize-none focus-visible:ring-0 placeholder:text-muted-foreground/50"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <Button variant="outline" className="gap-2 bg-transparent" onClick={getAISuggestions}>
              <Sparkles className="w-4 h-4" />
              AI Suggestions
              <ProBadge />
            </Button>
            <Button onClick={handleSave} disabled={isSaving || !content.trim()} className="gap-2">
              <Save className="w-4 h-4" />
              {isSaving ? "Saving..." : "Save Entry"}
            </Button>
          </div>
        </div>
      </Card>

      {showPaywall && <SubscriptionPaywall feature="AI Suggestions" onClose={() => setShowPaywall(false)} />}
    </>
  )
}
