import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { JournalEntryEditor } from "@/components/journal-entry-editor"
import { vi } from "vitest"

const mockFetch = vi.fn()

beforeEach(() => {
  mockFetch.mockReset()
  vi.stubGlobal("fetch", mockFetch)
})

afterEach(() => {
  vi.unstubAllGlobals()
})

it("disables save when content is empty and updates word count", async () => {
  const user = userEvent.setup()
  render(<JournalEntryEditor />)

  const saveButton = screen.getByRole("button", { name: /save entry/i })
  expect(saveButton).toBeDisabled()

  const textarea = screen.getByPlaceholderText(/start writing/i)
  await user.type(textarea, "Hello world")

  expect(screen.getByText("2 words")).toBeInTheDocument()
  expect(saveButton).toBeEnabled()
})
