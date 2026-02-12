import { z } from "zod"

export const entryInputSchema = z.object({
  title: z.string().trim().max(200).optional().nullable(),
  content: z.string().trim().min(1),
  mood: z.string().trim().max(20).optional().nullable(),
  word_count: z.number().int().nonnegative(),
})

export type EntryInput = z.infer<typeof entryInputSchema>
