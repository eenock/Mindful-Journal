"use client"

import { useState } from "react"
import { Calendar, Edit3, TrendingUp, MessageCircle, Menu, BookOpen, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { JournalEntryEditor } from "./journal-entry-editor"
import { DailyPrompt } from "./daily-prompt"
import { MoodTracker } from "./mood-tracker"
import { StreakCounter } from "./streak-counter"
import { StreakCalendar } from "./streak-calendar"
import { EntriesList } from "./entries-list"
import { AIChat } from "./ai-chat"
import { InsightsDashboard } from "./insights-dashboard"
import { SettingsPage } from "./settings-page"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

type View = "dashboard" | "write" | "entries" | "insights" | "chat" | "settings"

export function JournalDashboard() {
  const [currentView, setCurrentView] = useState<View>("dashboard")

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Edit3 className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-semibold text-balance">Mindful Journal</h1>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <Button
              variant={currentView === "dashboard" ? "default" : "ghost"}
              onClick={() => setCurrentView("dashboard")}
              className="gap-2"
            >
              <Calendar className="w-4 h-4" />
              Dashboard
            </Button>
            <Button
              variant={currentView === "write" ? "default" : "ghost"}
              onClick={() => setCurrentView("write")}
              className="gap-2"
            >
              <Edit3 className="w-4 h-4" />
              Write
            </Button>
            <Button
              variant={currentView === "entries" ? "default" : "ghost"}
              onClick={() => setCurrentView("entries")}
              className="gap-2"
            >
              <BookOpen className="w-4 h-4" />
              Entries
            </Button>
            <Button
              variant={currentView === "insights" ? "default" : "ghost"}
              onClick={() => setCurrentView("insights")}
              className="gap-2"
            >
              <TrendingUp className="w-4 h-4" />
              Insights
            </Button>
            <Button
              variant={currentView === "chat" ? "default" : "ghost"}
              onClick={() => setCurrentView("chat")}
              className="gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              AI Chat
            </Button>
            <div className="w-px h-6 bg-border mx-1" />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCurrentView("settings")}
              className={currentView === "settings" ? "bg-accent" : ""}
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-2 mt-8">
                <Button
                  variant={currentView === "dashboard" ? "default" : "ghost"}
                  onClick={() => setCurrentView("dashboard")}
                  className="justify-start gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  Dashboard
                </Button>
                <Button
                  variant={currentView === "write" ? "default" : "ghost"}
                  onClick={() => setCurrentView("write")}
                  className="justify-start gap-2"
                >
                  <Edit3 className="w-4 h-4" />
                  Write
                </Button>
                <Button
                  variant={currentView === "entries" ? "default" : "ghost"}
                  onClick={() => setCurrentView("entries")}
                  className="justify-start gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  Entries
                </Button>
                <Button
                  variant={currentView === "insights" ? "default" : "ghost"}
                  onClick={() => setCurrentView("insights")}
                  className="justify-start gap-2"
                >
                  <TrendingUp className="w-4 h-4" />
                  Insights
                </Button>
                <Button
                  variant={currentView === "chat" ? "default" : "ghost"}
                  onClick={() => setCurrentView("chat")}
                  className="justify-start gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  AI Chat
                </Button>
                <div className="h-px bg-border my-2" />
                <Button
                  variant={currentView === "settings" ? "default" : "ghost"}
                  onClick={() => setCurrentView("settings")}
                  className="justify-start gap-2"
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {currentView === "dashboard" && <DashboardView setView={setCurrentView} />}
        {currentView === "write" && <WriteView />}
        {currentView === "entries" && <EntriesView />}
        {currentView === "insights" && <InsightsDashboard />}
        {currentView === "chat" && <AIChat />}
        {currentView === "settings" && <SettingsPage />}
      </main>
    </div>
  )
}

function DashboardView({ setView }: { setView: (view: View) => void }) {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-semibold text-balance mb-2">Welcome back</h2>
          <p className="text-muted-foreground">
            {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </p>
        </div>
        <Button size="lg" onClick={() => setView("write")} className="gap-2">
          <Edit3 className="w-4 h-4" />
          New Entry
        </Button>
      </div>

      {/* Stats and Calendar Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <StreakCounter />
            <MoodTracker />
          </div>

          {/* Daily Prompt */}
          <DailyPrompt onStartWriting={() => setView("write")} />
        </div>

        {/* Calendar */}
        <div className="lg:col-span-1">
          <StreakCalendar />
        </div>
      </div>

      {/* Recent Entries */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Recent Entries</h3>
          <Button variant="ghost" size="sm" onClick={() => setView("entries")}>
            View all
          </Button>
        </div>
        <div className="space-y-3">
          {[
            { date: "Today", title: "Morning reflections", preview: "Started the day with gratitude practice..." },
            { date: "Yesterday", title: "Evening thoughts", preview: "Reflected on the challenges I faced..." },
            { date: "2 days ago", title: "Midday check-in", preview: "Feeling more grounded after meditation..." },
          ].map((entry, i) => (
            <button
              key={i}
              className="w-full text-left p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-accent/5 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-muted-foreground mb-1">{entry.date}</p>
                  <p className="font-medium mb-1">{entry.title}</p>
                  <p className="text-sm text-muted-foreground truncate">{entry.preview}</p>
                </div>
                <Edit3 className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />
              </div>
            </button>
          ))}
        </div>
      </Card>
    </div>
  )
}

function WriteView() {
  return (
    <div className="max-w-4xl mx-auto">
      <JournalEntryEditor />
    </div>
  )
}

function EntriesView() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Your Entries</h2>
        <p className="text-muted-foreground">Browse and search through your journal history</p>
      </div>
      <EntriesList onEditEntry={(id) => console.log("[v0] Edit entry:", id)} />
    </div>
  )
}
