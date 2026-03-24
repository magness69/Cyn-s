'use client'

import { meals, Meal } from '@/lib/meals-data'
import { MealCard } from './meal-card'
import { AppLogo } from './app-logo'

interface HomeTabProps {
  onMealSelect: (meal: Meal) => void
}

export function HomeTab({ onMealSelect }: HomeTabProps) {
  const greeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return { text: 'Good morning', emoji: '🌅' }
    if (hour < 17) return { text: 'Good afternoon', emoji: '☀️' }
    return { text: 'Good evening', emoji: '🌙' }
  }

  const { text, emoji } = greeting()

  // Featured meals for hero section
  const featuredMeal = meals[0]
  const todaysPicks = meals.slice(1, 4)
  const quickEasy = meals.filter(m => m.difficulty === 'Easy').slice(0, 3)

  return (
    <div className="pb-4">
      {/* Header with Logo */}
      <div className="flex items-start justify-between mb-6 animate-slide-up">
        <div>
          <span className="text-3xl mb-2 block">{emoji}</span>
          <h1 className="text-2xl font-bold text-foreground">
            {text}!
          </h1>
          <p className="text-muted-foreground mt-1">
            What delicious & healthy meal shall we make today?
          </p>
        </div>
        <AppLogo size="md" />
      </div>

      {/* Featured Recipe */}
      <div className="mb-8 animate-slide-up stagger-1">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <span>⭐</span> Featured Recipe
          </h2>
        </div>
        <MealCard 
          meal={featuredMeal} 
          onClick={() => onMealSelect(featuredMeal)}
          className="shadow-lg"
        />
      </div>

      {/* Today's Picks */}
      <div className="mb-8 animate-slide-up stagger-2">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <span>🍽️</span> Today's Picks
          </h2>
          <button className="text-primary text-sm font-medium hover:underline">
            See all
          </button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 -mx-5 px-5 scrollbar-hide">
          {todaysPicks.map((meal) => (
            <div key={meal.id} className="flex-shrink-0 w-64">
              <MealCard meal={meal} onClick={() => onMealSelect(meal)} />
            </div>
          ))}
        </div>
      </div>

      {/* Quick & Easy */}
      <div className="animate-slide-up stagger-3">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <span>⚡</span> Quick & Easy
          </h2>
          <button className="text-primary text-sm font-medium hover:underline">
            See all
          </button>
        </div>
        <div className="space-y-4">
          {quickEasy.map((meal) => (
            <div key={meal.id} className="flex gap-4 bg-card rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow active:scale-[0.99]"
              onClick={() => onMealSelect(meal)}
            >
              <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={meal.image}
                  alt={meal.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-card-foreground truncate">
                  {meal.emoji} {meal.name}
                </h3>
                <p className="text-muted-foreground text-sm mt-1 line-clamp-1">
                  {meal.description}
                </p>
                <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                  <span>🔥 {meal.calories} cal</span>
                  <span>⏱️ {meal.prepTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
