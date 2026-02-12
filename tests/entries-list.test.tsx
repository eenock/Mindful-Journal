import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { EntriesList } from "@/components/entries-list"
import { vi } from "vitest"

const mockFetch = vi.fn()

const entries = [
  {
    id: "1",
    user_id: "user-1",
    title: "Morning reflections",
    content: "Grateful for a calm start.",
    mood: "good",
    word_count: 5,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    user_id: "user-1",
    title: "Evening thoughts",
    content: "A tough day but learned a lot.",
    mood: "okay",
    word_count: 9,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

beforeEach(() => {
  mockFetch.mockReset()
  vi.stubGlobal("fetch", mockFetch)
})

afterEach(() => {
  vi.unstubAllGlobals()
})

it("filters entries by search query", async () => {
  mockFetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ entries }),
  })

  const user = userEvent.setup()
  render(<EntriesList />)

  await waitFor(() => {
    expect(screen.getByText("Morning reflections")).toBeInTheDocument()
  })

  const search = screen.getByPlaceholderText(/search entries/i)
  await user.type(search, "evening")

  expect(screen.queryByText("Morning reflections")).not.toBeInTheDocument()
  expect(screen.getByText("Evening thoughts")).toBeInTheDocument()
})
