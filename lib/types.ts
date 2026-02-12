export interface JournalEntry {
  id: string
  user_id: string
  title: string | null
  content: string
  mood: string | null
  word_count: number
  created_at: string
  updated_at: string
}
