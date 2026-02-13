import { NextResponse } from "next/server"
import { createSupabaseServerClient } from "@/lib/supabase/server"

const toDayKey = (date: Date) => {
  const year = date.getUTCFullYear()
  const month = String(date.getUTCMonth() + 1).padStart(2, "0")
  const day = String(date.getUTCDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

export async function GET() {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { data, error } = await supabase
    .from("journal_entries")
    .select("created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const dates = (data ?? []).map((row) => new Date(row.created_at))
  const uniqueDays = Array.from(new Set(dates.map(toDayKey))).sort().reverse()

  let currentStreak = 0
  let longestStreak = 0
  let previousDay: Date | null = null

  for (const dayKey of uniqueDays) {
    const [year, month, day] = dayKey.split("-").map((value) => Number(value))
    const currentDay = new Date(Date.UTC(year, month - 1, day))

    if (!previousDay) {
      currentStreak = 1
    } else {
      const diffDays = Math.floor((previousDay.getTime() - currentDay.getTime()) / 86400000)
      if (diffDays === 1) {
        currentStreak += 1
      } else {
        currentStreak = 1
      }
    }

    longestStreak = Math.max(longestStreak, currentStreak)
    previousDay = currentDay
  }

  const todayKey = toDayKey(new Date())
  const todayCompleted = uniqueDays.includes(todayKey)

  return NextResponse.json({
    currentStreak: uniqueDays.length === 0 ? 0 : currentStreak,
    longestStreak,
    todayCompleted,
  })
}
