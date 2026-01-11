import { Crown } from "lucide-react"

export function ProBadge() {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground text-xs font-bold">
      <Crown className="w-3 h-3" />
      PRO
    </span>
  )
}
