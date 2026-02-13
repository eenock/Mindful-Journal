"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Crown, User, Bell, Shield, CreditCard, LogOut } from "lucide-react"
import { ProBadge } from "./pro-badge"
import { useEffect, useState } from "react"
import { SubscriptionPaywall } from "./subscription-paywall"
import { createSupabaseBrowserClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export function SettingsPage() {
  const [showPaywall, setShowPaywall] = useState(false)
  const [isPro] = useState(false) // Mock subscription status
  const router = useRouter()
  const { toast } = useToast()
  const [loadingProfile, setLoadingProfile] = useState(true)
  const [saving, setSaving] = useState(false)
  const [displayName, setDisplayName] = useState("")
  const [bio, setBio] = useState("")
  const [avatarUrl, setAvatarUrl] = useState("")
  const [timezone, setTimezone] = useState("")
  const [reminderTime, setReminderTime] = useState("")
  const [theme, setTheme] = useState("system")

  const handleSignOut = async () => {
    const supabase = createSupabaseBrowserClient()
    await supabase.auth.signOut()
    router.push("/login")
  }

  useEffect(() => {
    let active = true
    const loadProfile = async () => {
      try {
        const response = await fetch("/api/profile")
        if (!response.ok) return
        const data = (await response.json()) as {
          profile: {
            display_name: string | null
            bio: string | null
            avatar_url: string | null
            timezone: string | null
            reminder_time: string | null
            theme: string | null
          } | null
        }
        if (!active || !data.profile) return
        setDisplayName(data.profile.display_name ?? "")
        setBio(data.profile.bio ?? "")
        setAvatarUrl(data.profile.avatar_url ?? "")
        setTimezone(data.profile.timezone ?? "")
        setReminderTime(data.profile.reminder_time ?? "")
        setTheme(data.profile.theme ?? "system")
      } finally {
        if (active) {
          setLoadingProfile(false)
        }
      }
    }

    void loadProfile()

    return () => {
      active = false
    }
  }, [])

  const handleSaveProfile = async () => {
    setSaving(true)
    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          display_name: displayName.trim() || null,
          bio: bio.trim() || null,
          avatar_url: avatarUrl.trim() || null,
          timezone: timezone.trim() || null,
          reminder_time: reminderTime.trim() || null,
          theme,
        }),
      })
      if (!response.ok) {
        throw new Error("Failed to save settings")
      }
      toast({
        title: "Settings saved",
        description: "Your profile and preferences are up to date.",
      })
    } catch (error) {
      toast({
        title: "Save failed",
        description: error instanceof Error ? error.message : "Unable to save settings",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

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

      {/* Profile */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <User className="w-5 h-5 text-muted-foreground" />
          <h3 className="font-semibold">Profile</h3>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="display-name">Display Name</Label>
            <Input
              id="display-name"
              value={displayName}
              onChange={(event) => setDisplayName(event.target.value)}
              placeholder="Your name"
              disabled={loadingProfile}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="avatar-url">Avatar URL</Label>
            <Input
              id="avatar-url"
              value={avatarUrl}
              onChange={(event) => setAvatarUrl(event.target.value)}
              placeholder="https://..."
              disabled={loadingProfile}
            />
          </div>
          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={bio}
              onChange={(event) => setBio(event.target.value)}
              placeholder="A short intro about you"
              disabled={loadingProfile}
            />
          </div>
        </div>
      </Card>

      {/* Preferences */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <h3 className="font-semibold">Preferences</h3>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="timezone">Time Zone</Label>
            <Input
              id="timezone"
              value={timezone}
              onChange={(event) => setTimezone(event.target.value)}
              placeholder="e.g. America/New_York"
              disabled={loadingProfile}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="reminder-time">Reminder Time</Label>
            <Input
              id="reminder-time"
              value={reminderTime}
              onChange={(event) => setReminderTime(event.target.value)}
              placeholder="e.g. 20:00"
              disabled={loadingProfile}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="theme">Theme</Label>
            <Input
              id="theme"
              value={theme}
              onChange={(event) => setTheme(event.target.value)}
              placeholder="system | light | dark"
              disabled={loadingProfile}
            />
          </div>
        </div>
        <div className="mt-4 flex items-center justify-end">
          <Button onClick={handleSaveProfile} disabled={saving || loadingProfile}>
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </Card>

      {/* Danger Zone */}
      <Card className="p-6 border-destructive/20">
        <h3 className="font-semibold mb-4">Danger Zone</h3>
        <div className="space-y-3">
          <Button variant="destructive" className="gap-2" onClick={handleSignOut}>
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>
      </Card>

      {showPaywall && <SubscriptionPaywall onClose={() => setShowPaywall(false)} />}
    </div>
  )
}
