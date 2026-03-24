'use client'

import { Meal, meals } from '@/lib/meals-data'
import { MealCard } from './meal-card'
import { Heart } from 'lucide-react'

interface FavoritesTabProps {
  favorites: string[]
  onMealSelect: (meal: Meal) => void
  onTabChange: (tab: 'home' | 'search' | 'favorites' | 'profile') => void
}

export function FavoritesTab({ favorites, onMealSelect, onTabChange }: FavoritesTabProps) {
  const favoriteMeals = meals.filter(meal => favorites.includes(meal.id))

  if (favoriteMeals.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
        <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-4">
          <Heart className="w-10 h-10 text-muted-foreground" />
        </div>
        <h2 className="text-xl font-semibold text-foreground mb-2">
          No saved recipes yet
        </h2>
        <p className="text-muted-foreground mb-6 max-w-[250px]">
          Start exploring and save your favorite healthy meals here!
        </p>
        <button 
          onClick={() => onTabChange('home')}
          className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-medium hover:opacity-90 transition-opacity"
        >
          Explore Recipes 🥗
        </button>
      </div>
    )
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <span>❤️</span> Saved Recipes
        </h1>
        <p className="text-muted-foreground mt-1">
          {favoriteMeals.length} recipe{favoriteMeals.length > 1 ? 's' : ''} saved
        </p>
      </div>

      <div className="space-y-4">
        {favoriteMeals.map((meal, index) => (
          <div key={meal.id} className={`animate-slide-up stagger-${index + 1}`}>
            <MealCard meal={meal} onClick={() => onMealSelect(meal)} />
          </div>
        ))}
      </div>
    </div>
  )
}
