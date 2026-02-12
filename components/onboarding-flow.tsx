"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Edit3, Heart, TrendingUp, Brain, ArrowRight } from "lucide-react"

type OnboardingStep = "welcome" | "name" | "goals" | "time" | "complete"

const journalingGoals = [
  { id: "gratitude", label: "Practice gratitude", icon: Heart },
  { id: "mental-health", label: "Support mental health", icon: Brain },
  { id: "self-reflection", label: "Self-reflection", icon: TrendingUp },
  { id: "habit-tracking", label: "Track habits & moods", icon: Edit3 },
]

export function OnboardingFlow() {
  const router = useRouter()
  const [step, setStep] = useState<OnboardingStep>("welcome")
  const [displayName, setDisplayName] = useState("")
  const [selectedGoals, setSelectedGoals] = useState<string[]>([])
  const [preferredTime, setPreferredTime] = useState("morning")

  const handleComplete = () => {
    console.log("[v0] Onboarding complete:", { displayName, selectedGoals, preferredTime })
    // TODO: Save onboarding data to database
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {step === "welcome" && (
          <Card className="p-8 md:p-12 text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary mx-auto mb-6 flex items-center justify-center">
              <Edit3 className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold mb-4 text-balance">Welcome to Mindful Journal</h1>
            <p className="text-lg text-muted-foreground mb-8 text-balance">
              Your safe space for daily reflection, personal growth, and mental wellness. Let&apos;s personalize your
              experience.
            </p>
            <Button size="lg" onClick={() => setStep("name")} className="gap-2">
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Card>
        )}

        {step === "name" && (
          <Card className="p-8 md:p-12">
            <div className="mb-8">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <div className="w-8 h-1 bg-primary rounded-full" />
                <div className="w-8 h-1 bg-muted rounded-full" />
                <div className="w-8 h-1 bg-muted rounded-full" />
                <div className="w-8 h-1 bg-muted rounded-full" />
              </div>
              <h2 className="text-2xl font-bold mb-2">What should we call you?</h2>
              <p className="text-muted-foreground">This helps personalize your journal experience</p>
            </div>

            <div className="space-y-4 mb-8">
              <div>
                <Label htmlFor="name">Display Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="mt-2"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={() => setStep("welcome")} className="flex-1">
                Back
              </Button>
              <Button onClick={() => setStep("goals")} disabled={!displayName.trim()} className="flex-1 gap-2">
                Continue
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        )}

        {step === "goals" && (
          <Card className="p-8 md:p-12">
            <div className="mb-8">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <div className="w-8 h-1 bg-primary rounded-full" />
                <div className="w-8 h-1 bg-primary rounded-full" />
                <div className="w-8 h-1 bg-muted rounded-full" />
                <div className="w-8 h-1 bg-muted rounded-full" />
              </div>
              <h2 className="text-2xl font-bold mb-2">What are your journaling goals?</h2>
              <p className="text-muted-foreground">Select all that apply</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {journalingGoals.map((goal) => {
                const Icon = goal.icon
                const isSelected = selectedGoals.includes(goal.id)
                return (
                  <button
                    key={goal.id}
                    onClick={() => {
                      if (isSelected) {
                        setSelectedGoals(selectedGoals.filter((id) => id !== goal.id))
                      } else {
                        setSelectedGoals([...selectedGoals, goal.id])
                      }
                    }}
                    className={`p-6 rounded-xl border-2 text-left transition-all ${
                      isSelected
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50 hover:bg-accent/5"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          isSelected ? "bg-primary/20" : "bg-muted"
                        }`}
                      >
                        <Icon className={`w-5 h-5 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold mb-1">{goal.label}</p>
                        {isSelected && (
                          <div className="flex items-center gap-2">
                            <Checkbox checked={true} />
                            <span className="text-sm text-muted-foreground">Selected</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={() => setStep("name")} className="flex-1">
                Back
              </Button>
              <Button onClick={() => setStep("time")} disabled={selectedGoals.length === 0} className="flex-1 gap-2">
                Continue
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        )}

        {step === "time" && (
          <Card className="p-8 md:p-12">
            <div className="mb-8">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <div className="w-8 h-1 bg-primary rounded-full" />
                <div className="w-8 h-1 bg-primary rounded-full" />
                <div className="w-8 h-1 bg-primary rounded-full" />
                <div className="w-8 h-1 bg-muted rounded-full" />
              </div>
              <h2 className="text-2xl font-bold mb-2">When do you prefer to journal?</h2>
              <p className="text-muted-foreground">We&apos;ll send you gentle reminders</p>
            </div>

            <div className="space-y-3 mb-8">
              {[
                { id: "morning", label: "Morning", time: "Start your day with reflection" },
                { id: "afternoon", label: "Afternoon", time: "Midday check-in" },
                { id: "evening", label: "Evening", time: "Wind down with gratitude" },
                { id: "no-preference", label: "No preference", time: "Journal whenever I feel like it" },
              ].map((option) => (
                <button
                  key={option.id}
                  onClick={() => setPreferredTime(option.id)}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                    preferredTime === option.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50 hover:bg-accent/5"
                  }`}
                >
                  <p className="font-semibold mb-1">{option.label}</p>
                  <p className="text-sm text-muted-foreground">{option.time}</p>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={() => setStep("goals")} className="flex-1">
                Back
              </Button>
              <Button onClick={() => setStep("complete")} className="flex-1 gap-2">
                Continue
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        )}

        {step === "complete" && (
          <Card className="p-8 md:p-12 text-center">
            <div className="mb-8">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6 justify-center">
                <div className="w-8 h-1 bg-primary rounded-full" />
                <div className="w-8 h-1 bg-primary rounded-full" />
                <div className="w-8 h-1 bg-primary rounded-full" />
                <div className="w-8 h-1 bg-primary rounded-full" />
              </div>
              <div className="w-20 h-20 rounded-2xl bg-primary/20 mx-auto mb-6 flex items-center justify-center">
                <Heart className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-3xl font-bold mb-4 text-balance">You&apos;re all set, {displayName}!</h2>
              <p className="text-lg text-muted-foreground mb-2 text-balance">
                Your journal is ready for your first entry
              </p>
              <p className="text-muted-foreground text-balance">
                Remember: There&apos;s no right or wrong way to journal. Just write from your heart.
              </p>
            </div>

            <Button size="lg" onClick={handleComplete} className="gap-2">
              Start Journaling
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Card>
        )}
      </div>
    </div>
  )
}
