"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Crown, User, Bell, Shield, CreditCard, LogOut } from "lucide-react"
import { ProBadge } from "./pro-badge"
import { useState } from "react"
import { SubscriptionPaywall } from "./subscription-paywall"

export function SettingsPage() {
  const [showPaywall, setShowPaywall] = useState(false)
  const [isPro] = useState(false) // Mock subscription status

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Settings</h2>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      {/* Subscription Status */}
      <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4 flex-1">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
              <Crown className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold">{isPro ? "Mindful Journal Pro" : "Free Plan"}</h3>
                {isPro && <ProBadge />}
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                {isPro ? "You have access to all premium features" : "Upgrade to unlock advanced features and insights"}
              </p>
              {!isPro && (
                <Button onClick={() => setShowPaywall(true)} className="gap-2">
                  <Crown className="w-4 h-4" />
                  Upgrade to Pro
                </Button>
              )}
              {isPro && (
                <Button variant="outline" className="gap-2 bg-transparent">
                  <CreditCard className="w-4 h-4" />
                  Manage Subscription
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Account Settings */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Account</h3>
        <div className="space-y-3">
          <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-accent/5 transition-colors text-left">
            <User className="w-5 h-5 text-muted-foreground" />
            <div className="flex-1">
              <p className="font-medium">Profile</p>
              <p className="text-sm text-muted-foreground">Update your name and preferences</p>
            </div>
          </button>
          <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-accent/5 transition-colors text-left">
            <Bell className="w-5 h-5 text-muted-foreground" />
            <div className="flex-1">
              <p className="font-medium">Notifications</p>
              <p className="text-sm text-muted-foreground">Manage reminder preferences</p>
            </div>
          </button>
          <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-accent/5 transition-colors text-left">
            <Shield className="w-5 h-5 text-muted-foreground" />
            <div className="flex-1">
              <p className="font-medium">Privacy & Security</p>
              <p className="text-sm text-muted-foreground">Control your data and privacy</p>
            </div>
          </button>
        </div>
      </Card>

      {/* Danger Zone */}
      <Card className="p-6 border-destructive/20">
        <h3 className="font-semibold mb-4">Danger Zone</h3>
        <div className="space-y-3">
          <Button variant="destructive" className="gap-2">
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>
      </Card>

      {showPaywall && <SubscriptionPaywall onClose={() => setShowPaywall(false)} />}
    </div>
  )
}
