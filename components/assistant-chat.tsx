'use client'

import { useState, useRef, useEffect } from 'react'
import { X, Send, Sparkles, Loader2 } from 'lucide-react'
import { meals, commonIngredients, findMealsByIngredients, Meal } from '@/lib/meals-data'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  suggestions?: Meal[]
}

interface AssistantChatProps {
  onClose: () => void
  onMealSelect: (meal: Meal) => void
}

export function AssistantChat({ onClose, onMealSelect }: AssistantChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hey there! I'm your friendly meal assistant. Tell me what ingredients you have at home, and I'll suggest some delicious healthy recipes. You can also ask me for meal ideas based on your preferences!"
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const generateResponse = (userMessage: string): { content: string; suggestions?: Meal[] } => {
    const lowerMessage = userMessage.toLowerCase()
    
    // Check for ingredient mentions
    const mentionedIngredients = commonIngredients.filter(ing => 
      lowerMessage.includes(ing.name.toLowerCase())
    ).map(ing => ing.name)

    if (mentionedIngredients.length > 0) {
      const suggestions = findMealsByIngredients(mentionedIngredients)
      if (suggestions.length > 0) {
        return {
          content: `Great! With ${mentionedIngredients.join(', ')}, I found ${suggestions.length} recipe${suggestions.length > 1 ? 's' : ''} you can make. Here are my top picks:`,
          suggestions: suggestions.slice(0, 3)
        }
      } else {
        return {
          content: `Hmm, I couldn't find a perfect recipe match for ${mentionedIngredients.join(', ')}. But here are some healthy options you might enjoy!`,
          suggestions: meals.slice(0, 2)
        }
      }
    }

    // Check for meal type requests
    if (lowerMessage.includes('breakfast')) {
      const breakfastMeals = meals.filter(m => m.tags.includes('Breakfast'))
      return {
        content: "Rise and shine! Here are some energizing breakfast ideas to start your day right:",
        suggestions: breakfastMeals
      }
    }

    if (lowerMessage.includes('lunch')) {
      const lunchMeals = meals.filter(m => m.tags.includes('Lunch'))
      return {
        content: "Perfect timing for a midday boost! Check out these satisfying lunch options:",
        suggestions: lunchMeals
      }
    }

    if (lowerMessage.includes('dinner')) {
      const dinnerMeals = meals.filter(m => m.tags.includes('Dinner'))
      return {
        content: "Let's make dinner special! Here are some delicious evening meal ideas:",
        suggestions: dinnerMeals
      }
    }

    // Check for health-focused requests
    if (lowerMessage.includes('protein') || lowerMessage.includes('muscle')) {
      const highProtein = meals.filter(m => m.tags.includes('High Protein'))
      return {
        content: "Looking to fuel those gains? These high-protein meals will help you reach your goals:",
        suggestions: highProtein
      }
    }

    if (lowerMessage.includes('vegan') || lowerMessage.includes('plant')) {
      const veganMeals = meals.filter(m => m.tags.includes('Vegan'))
      return {
        content: "Plant-powered goodness coming right up! These vegan recipes are both nutritious and delicious:",
        suggestions: veganMeals
      }
    }

    if (lowerMessage.includes('quick') || lowerMessage.includes('fast') || lowerMessage.includes('easy')) {
      const easyMeals = meals.filter(m => m.difficulty === 'Easy')
      return {
        content: "Short on time? No problem! These quick and easy recipes are ready in no time:",
        suggestions: easyMeals.slice(0, 3)
      }
    }

    if (lowerMessage.includes('low calorie') || lowerMessage.includes('diet') || lowerMessage.includes('light')) {
      const lowCal = meals.filter(m => m.calories < 350).sort((a, b) => a.calories - b.calories)
      return {
        content: "Eating light doesn't mean sacrificing flavor! Try these lighter options:",
        suggestions: lowCal.slice(0, 3)
      }
    }

    // Check for calorie questions
    if (lowerMessage.includes('calorie') && (lowerMessage.includes('how many') || lowerMessage.includes('track'))) {
      return {
        content: "Great question! To track your calories, tap the flame icon in the assistant menu. You can log your meals and I'll help you stay on track with your daily goals. The average adult needs about 2000 calories per day, but this varies based on your activity level and goals."
      }
    }

    // General greetings
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return {
        content: "Hey there! Ready to cook something amazing? Tell me what ingredients you have, or what kind of meal you're craving, and I'll find the perfect recipe for you!"
      }
    }

    // Default response with suggestions
    return {
      content: "I'd love to help you find the perfect meal! You can:\n\n- Tell me what ingredients you have (e.g., 'I have eggs and avocado')\n- Ask for a meal type (e.g., 'What's good for breakfast?')\n- Request by diet (e.g., 'Show me high protein options')\n\nHere are today's top picks:",
      suggestions: meals.slice(0, 2)
    }
  }

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(() => {
      const response = generateResponse(userMessage.content)
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        ...response
      }
      setMessages(prev => [...prev, assistantMessage])
      setIsTyping(false)
    }, 800 + Math.random() * 500)
  }

  const quickSuggestions = [
    "What's good for breakfast?",
    "I have eggs and avocado",
    "Show me quick recipes",
    "High protein meals",
  ]

  return (
    <div className="fixed inset-0 z-50 bg-background animate-fade-in">
      {/* Header */}
      <div className="sticky top-0 bg-card/95 backdrop-blur-lg border-b border-border px-4 py-4 safe-area-inset-top">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-semibold text-card-foreground">Meal Assistant</h2>
              <p className="text-xs text-muted-foreground">Always here to help</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 max-w-md mx-auto" style={{ height: 'calc(100vh - 180px)' }}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 ${message.role === 'user' ? 'flex justify-end' : ''}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                message.role === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-foreground'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              
              {/* Meal suggestions */}
              {message.suggestions && message.suggestions.length > 0 && (
                <div className="mt-3 space-y-2">
                  {message.suggestions.map((meal) => (
                    <button
                      key={meal.id}
                      onClick={() => {
                        onClose()
                        onMealSelect(meal)
                      }}
                      className="w-full flex items-center gap-3 bg-card rounded-xl p-3 hover:bg-card/80 transition-colors text-left"
                    >
                      <img
                        src={meal.image}
                        alt={meal.name}
                        className="w-14 h-14 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-card-foreground text-sm truncate">
                          {meal.emoji} {meal.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {meal.calories} cal | {meal.prepTime}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="mb-4">
            <div className="bg-muted rounded-2xl px-4 py-3 inline-flex items-center gap-2">
              <Loader2 className="w-4 h-4 text-muted-foreground animate-spin" />
              <span className="text-sm text-muted-foreground">Thinking...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick suggestions */}
      {messages.length <= 2 && (
        <div className="px-4 pb-2 max-w-md mx-auto">
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
            {quickSuggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => setInput(suggestion)}
                className="flex-shrink-0 px-4 py-2 bg-secondary text-secondary-foreground text-sm rounded-full hover:bg-secondary/80 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="sticky bottom-0 bg-card/95 backdrop-blur-lg border-t border-border px-4 py-4 safe-area-inset-bottom">
        <div className="max-w-md mx-auto flex items-center gap-3">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask me anything about food..."
            className="flex-1 bg-muted rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            <Send className="w-5 h-5 text-primary-foreground" />
          </button>
        </div>
      </div>
    </div>
  )
}
