"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send, Sparkles, BookOpen, Brain, Clock } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { SubscriptionPaywall } from "./subscription-paywall"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  contextEntries?: string[]
}

const welcomeMessage: Message = {
  id: "welcome",
  role: "assistant",
  content:
    "Hello! I'm your AI companion for reflection and emotional support. I've read your journal entries and I'm here to help you process your thoughts, explore your feelings, and gain insights. What's on your mind today?",
  timestamp: new Date(),
}

const suggestedPrompts = [
  "Help me understand my recent mood patterns",
  "I'm feeling anxious about something",
  "What themes do you notice in my writing?",
  "I need help processing my emotions",
]

let messageIdCounter = 0

const nextMessageId = () => {
  messageIdCounter += 1
  return messageIdCounter.toString()
}

const hashString = (value: string) => {
  let hash = 0
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

export function AIChat() {
  const [messages, setMessages] = useState<Message[]>([welcomeMessage])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [messageCount, setMessageCount] = useState(0)
  const [showPaywall, setShowPaywall] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const FREE_MESSAGE_LIMIT = 5

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return

    if (messageCount >= FREE_MESSAGE_LIMIT) {
      setShowPaywall(true)
      return
    }

    const userMessage: Message = {
      id: nextMessageId(),
      role: "user",
      content: content.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)
    setMessageCount((prev) => prev + 1)

    // Simulate AI response - in production, this would call an API
    setTimeout(() => {
      const aiResponse: Message = {
        id: nextMessageId(),
        role: "assistant",
        content: generateContextualResponse(content),
        timestamp: new Date(),
        contextEntries: ["entry-1", "entry-2"], // Mock context references
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsLoading(false)
    }, 1500)
  }

  const generateContextualResponse = (userInput: string): string => {
    // Mock responses - in production, this would use actual AI with journal context
    const responses = [
      "I've noticed from your recent entries that you've been working on self-compassion. That's a beautiful journey. Can you tell me more about what's bringing this up for you today?",
      "Based on your writing patterns, I can see you're someone who values deep reflection. Your question touches on something you've explored before. What feels different about it now?",
      "I remember you wrote about similar feelings last week. It sounds like this is an ongoing theme for you. How do you think your perspective has evolved since then?",
      "Your journal entries show real growth in emotional awareness. Let's explore this together. What specific aspect would you like to focus on?",
    ]
    const index = hashString(userInput) % responses.length
    return responses[index]
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  return (
    <>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <Brain className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">AI Therapist</h2>
              <p className="text-muted-foreground">Context-aware emotional support</p>
            </div>
            {messageCount < FREE_MESSAGE_LIMIT && (
              <div className="text-right">
                <p className="text-sm font-medium">{FREE_MESSAGE_LIMIT - messageCount} messages left</p>
                <p className="text-xs text-muted-foreground">on free plan</p>
              </div>
            )}
          </div>
        </div>

        {/* Context Info Card */}
        <Card className="p-4 bg-primary/5 border-primary/20">
          <div className="flex items-start gap-3">
            <BookOpen className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium mb-1">Your journal provides context</p>
              <p className="text-sm text-muted-foreground">
                I have access to your recent entries to provide personalized support. Your privacy is protected and
                conversations are confidential.
              </p>
            </div>
          </div>
        </Card>

        {/* Chat Messages */}
        <Card className="relative">
          <ScrollArea className="h-[500px] p-6" viewportRef={scrollRef}>
            <div className="space-y-6">
              {messages.map((message) => (
                <div key={message.id} className={`flex gap-4 ${message.role === "user" ? "justify-end" : ""}`}>
                  {message.role === "assistant" && (
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-4 h-4 text-primary" />
                    </div>
                  )}

                  <div
                    className={`flex-1 max-w-[85%] space-y-2 ${
                      message.role === "user" ? "flex flex-col items-end" : ""
                    }`}
                  >
                    <div
                      className={`rounded-2xl p-4 ${
                        message.role === "user" ? "bg-primary text-primary-foreground ml-auto" : "bg-muted"
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground px-2">
                      <Clock className="w-3 h-3" />
                      {message.timestamp.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
                      {message.contextEntries && message.contextEntries.length > 0 && (
                        <>
                          <span>•</span>
                          <BookOpen className="w-3 h-3" />
                          <span>Referenced {message.contextEntries.length} entries</span>
                        </>
                      )}
                    </div>
                  </div>

                  {message.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-medium text-accent-foreground">You</span>
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 max-w-[85%]">
                    <div className="rounded-2xl p-4 bg-muted">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" />
                        <div className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:0.2s]" />
                        <div className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:0.4s]" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Suggested Prompts (only show when conversation is new) */}
          {messages.length === 1 && (
            <div className="p-4 border-t border-border">
              <p className="text-sm font-medium mb-3">Suggested topics:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedPrompts.map((prompt, i) => (
                  <Button
                    key={i}
                    variant="outline"
                    size="sm"
                    onClick={() => sendMessage(prompt)}
                    className="text-xs bg-transparent"
                  >
                    {prompt}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-3">
              <Textarea
                placeholder="Share what's on your mind..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="min-h-[60px] max-h-[120px] resize-none"
                disabled={isLoading}
              />
              <Button
                size="icon"
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || isLoading}
                className="h-[60px] w-[60px] flex-shrink-0"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Press Enter to send, Shift+Enter for new line</p>
          </div>
        </Card>

        {/* Disclaimer */}
        <Card className="p-4 bg-muted/50">
          <p className="text-xs text-muted-foreground leading-relaxed">
            <strong>Note:</strong> This AI companion provides supportive reflection and is not a substitute for
            professional mental health care. If you&apos;re experiencing a crisis, please contact a mental health
            professional or crisis helpline immediately.
          </p>
        </Card>
      </div>

      {showPaywall && <SubscriptionPaywall feature="unlimited AI chat" onClose={() => setShowPaywall(false)} />}
    </>
  )
}
