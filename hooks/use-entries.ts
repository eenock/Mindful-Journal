import { useCallback, useEffect, useState } from "react"
import type { JournalEntry } from "@/lib/types"
import type { EntryInput } from "@/lib/validators/entry"

interface UseEntriesOptions {
  limit?: number
}

export function useEntries(options: UseEntriesOptions = {}) {
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchEntries = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const params = options.limit ? `?limit=${options.limit}` : ""
      const response = await fetch(`/api/entries${params}`)
      if (!response.ok) {
        throw new Error("Failed to load entries")
      }
      const data = (await response.json()) as { entries: JournalEntry[] }
      setEntries(data.entries)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load entries")
    } finally {
      setLoading(false)
    }
  }, [options.limit])

  const createEntry = useCallback(async (input: EntryInput) => {
    const response = await fetch("/api/entries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    })
    if (!response.ok) {
      throw new Error("Failed to create entry")
    }
    const data = (await response.json()) as { entry: JournalEntry }
    return data.entry
  }, [])

  const deleteEntry = useCallback(async (entryId: string) => {
    const response = await fetch(`/api/entries/${entryId}`, {
      method: "DELETE",
    })
    if (!response.ok) {
      throw new Error("Failed to delete entry")
    }
  }, [])

  useEffect(() => {
    fetchEntries()
  }, [fetchEntries])

  return {
    entries,
    loading,
    error,
    refresh: fetchEntries,
    createEntry,
    deleteEntry,
  }
}
