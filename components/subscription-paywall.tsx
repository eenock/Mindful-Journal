"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Sparkles, Crown } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

interface SubscriptionPaywallProps {
  feature?: string
  onClose?: () => void
}

export function SubscriptionPaywall({ feature = "this feature", onClose }: SubscriptionPaywallProps) {
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "yearly">("yearly")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const plans = {
    monthly: {
      price: "$4.99",
      period: "month",
      savings: null,
    },
    yearly: {
      price: "$39.99",
      period: "year",
      savings: "Save 33%",
    },
  }

  const proFeatures = [
    "Unlimited AI chat conversations",
    "Advanced insights & analytics",
    "Custom daily prompts",
    "Export journal entries (PDF, CSV)",
    "Voice journaling",
    "Priority support",
    "Ad-free experience",
  ]

  const handleSubscribe = async () => {
    setIsLoading(true)
    console.log("[v0] Subscribing to plan:", selectedPlan)

    // Simulate subscription process
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Subscription activated!",
      description: "Welcome to Mindful Journal Pro",
    })

    setIsLoading(false)
    onClose?.()
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent mx-auto mb-4 flex items-center justify-center">
              <Crown className="w-8 h-8 text-primary-foreground" />
            </div>
            <h2 className="text-3xl font-bold mb-2 text-balance">Unlock {feature}</h2>
            <p className="text-muted-foreground text-balance">Upgrade to Pro to access all premium features</p>
          </div>

          {/* Plan Toggle */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <button
              onClick={() => setSelectedPlan("monthly")}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                selectedPlan === "monthly"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80 text-muted-foreground"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setSelectedPlan("yearly")}
              className={`px-6 py-3 rounded-lg font-medium transition-all relative ${
                selectedPlan === "yearly"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80 text-muted-foreground"
              }`}
            >
              Yearly
              {plans.yearly.savings && (
                <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs font-bold px-2 py-1 rounded-full">
                  {plans.yearly.savings}
                </span>
              )}
            </button>
          </div>

          {/* Pricing */}
          <div className="text-center mb-8">
            <div className="flex items-baseline justify-center gap-2 mb-2">
              <span className="text-5xl font-bold">{plans[selectedPlan].price}</span>
              <span className="text-muted-foreground">/ {plans[selectedPlan].period}</span>
            </div>
            {selectedPlan === "yearly" && (
              <p className="text-sm text-muted-foreground">That&apos;s just $3.33/month, billed annually</p>
            )}
          </div>

          {/* Features */}
          <div className="mb-8">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              What&apos;s included:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {proFeatures.map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="space-y-3">
            <Button size="lg" className="w-full gap-2" onClick={handleSubscribe} disabled={isLoading}>
              <Crown className="w-5 h-5" />
              {isLoading ? "Processing..." : "Start Free 7-Day Trial"}
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              Cancel anytime. No commitment. Your card won&apos;t be charged until after the trial.
            </p>
            {onClose && (
              <Button variant="ghost" size="sm" className="w-full" onClick={onClose}>
                Maybe later
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}
