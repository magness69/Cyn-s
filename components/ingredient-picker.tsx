'use client'

import { useState } from 'react'
import { commonIngredients, findMealsByIngredients, Meal } from '@/lib/meals-data'
import { MealCard } from './meal-card'
import { Search, X, Sparkles } from 'lucide-react'

interface IngredientPickerProps {
  onMealSelect: (meal: Meal) => void
}

export function IngredientPicker({ onMealSelect }: IngredientPickerProps) {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [showResults, setShowResults] = useState(false)

  const filteredIngredients = commonIngredients.filter(ing =>
    ing.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const toggleIngredient = (name: string) => {
    setSelectedIngredients(prev =>
      prev.includes(name)
        ? prev.filter(i => i !== name)
        : [...prev, name]
    )
  }

  const suggestedMeals = findMealsByIngredients(selectedIngredients)

  const handleFindMeals = () => {
    if (selectedIngredients.length > 0) {
      setShowResults(true)
    }
  }

  if (showResults && suggestedMeals.length > 0) {
    return (
      <div className="animate-fade-in">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-foreground">
              Perfect Matches! ✨
            </h2>
            <p className="text-muted-foreground text-sm">
              Based on your {selectedIngredients.length} ingredient{selectedIngredients.length > 1 ? 's' : ''}
            </p>
          </div>
          <button
            onClick={() => setShowResults(false)}
            className="text-primary text-sm font-medium hover:underline"
          >
            Edit ingredients
          </button>
        </div>

        {/* Selected ingredients pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {selectedIngredients.map(ing => {
            const ingredient = commonIngredients.find(i => i.name === ing)
            return (
              <span
                key={ing}
                className="px-3 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full flex items-center gap-1"
              >
                {ingredient?.emoji} {ing}
              </span>
            )
          })}
        </div>

        <div className="space-y-4">
          {suggestedMeals.map((meal, index) => (
            <div key={meal.id} className={`animate-slide-up stagger-${index + 1}`}>
              <MealCard meal={meal} onClick={() => onMealSelect(meal)} />
            </div>
          ))}
        </div>

        {suggestedMeals.length === 0 && (
          <div className="text-center py-12">
            <span className="text-5xl mb-4 block">🤔</span>
            <p className="text-muted-foreground">No recipes match those ingredients yet.</p>
            <p className="text-muted-foreground text-sm">Try selecting different ingredients!</p>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <span>🧊</span> What's in your fridge?
        </h2>
        <p className="text-muted-foreground text-sm mt-1">
          Select ingredients and we'll find the perfect recipe!
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search ingredients..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-muted rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
        />
      </div>

      {/* Selected count */}
      {selectedIngredients.length > 0 && (
        <div className="flex items-center justify-between mb-4 animate-fade-in">
          <span className="text-sm text-muted-foreground">
            {selectedIngredients.length} ingredient{selectedIngredients.length > 1 ? 's' : ''} selected
          </span>
          <button
            onClick={() => setSelectedIngredients([])}
            className="text-sm text-primary font-medium hover:underline"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Ingredients grid */}
      <div className="grid grid-cols-3 gap-2 mb-6">
        {filteredIngredients.map((ingredient, index) => {
          const isSelected = selectedIngredients.includes(ingredient.name)
          return (
            <button
              key={ingredient.name}
              onClick={() => toggleIngredient(ingredient.name)}
              className={`p-3 rounded-xl text-center transition-all duration-200 active:scale-95 ${
                isSelected
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-card text-card-foreground hover:bg-muted'
              } animate-scale-in`}
              style={{ animationDelay: `${index * 20}ms` }}
            >
              <span className="text-2xl block mb-1">{ingredient.emoji}</span>
              <span className="text-xs font-medium">{ingredient.name}</span>
              {isSelected && (
                <X className="w-4 h-4 absolute top-1 right-1" />
              )}
            </button>
          )
        })}
      </div>

      {/* Find meals button */}
      <button
        onClick={handleFindMeals}
        disabled={selectedIngredients.length === 0}
        className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
          selectedIngredients.length > 0
            ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
            : 'bg-muted text-muted-foreground'
        }`}
      >
        <Sparkles className="w-5 h-5" />
        Find Recipes
      </button>
    </div>
  )
}
