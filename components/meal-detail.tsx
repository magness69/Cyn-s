'use client'

import Image from 'next/image'
import { Meal } from '@/lib/meals-data'
import { X, Clock, Flame, ChefHat } from 'lucide-react'

interface MealDetailProps {
  meal: Meal
  onClose: () => void
}

export function MealDetail({ meal, onClose }: MealDetailProps) {
  return (
    <div 
      className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="fixed inset-x-0 bottom-0 max-h-[92vh] bg-card rounded-t-3xl shadow-2xl overflow-hidden animate-slide-up safe-area-inset-bottom"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle bar */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 bg-muted rounded-full" />
        </div>
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-card/90 backdrop-blur-sm rounded-full hover:bg-muted transition-colors"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>

        <div className="overflow-y-auto max-h-[calc(92vh-24px)]">
          {/* Hero Image */}
          <div className="relative aspect-video">
            <Image
              src={meal.image}
              alt={meal.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
          </div>

          {/* Content */}
          <div className="px-6 pb-8 -mt-12 relative">
            {/* Title and emoji */}
            <div className="flex items-start gap-3 mb-4">
              <span className="text-4xl">{meal.emoji}</span>
              <div>
                <h2 className="text-2xl font-bold text-card-foreground text-balance">
                  {meal.name}
                </h2>
                <p className="text-muted-foreground mt-1">
                  {meal.description}
                </p>
              </div>
            </div>

            {/* Quick stats */}
            <div className="flex gap-3 mb-6">
              <div className="flex-1 bg-secondary rounded-xl p-3 text-center">
                <Flame className="w-5 h-5 mx-auto mb-1 text-primary" />
                <span className="text-sm font-medium text-secondary-foreground">{meal.calories} cal</span>
              </div>
              <div className="flex-1 bg-secondary rounded-xl p-3 text-center">
                <Clock className="w-5 h-5 mx-auto mb-1 text-primary" />
                <span className="text-sm font-medium text-secondary-foreground">{meal.prepTime}</span>
              </div>
              <div className="flex-1 bg-secondary rounded-xl p-3 text-center">
                <ChefHat className="w-5 h-5 mx-auto mb-1 text-primary" />
                <span className="text-sm font-medium text-secondary-foreground">{meal.difficulty}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {meal.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Nutrition facts */}
            <div className="mb-6">
              <h3 className="font-semibold text-card-foreground mb-3 flex items-center gap-2">
                <span>📊</span> Nutrition Facts
              </h3>
              <div className="grid grid-cols-4 gap-2">
                <div className="bg-muted rounded-xl p-3 text-center">
                  <span className="block text-lg font-bold text-primary">{meal.nutritionFacts.protein}</span>
                  <span className="text-xs text-muted-foreground">Protein</span>
                </div>
                <div className="bg-muted rounded-xl p-3 text-center">
                  <span className="block text-lg font-bold text-primary">{meal.nutritionFacts.carbs}</span>
                  <span className="text-xs text-muted-foreground">Carbs</span>
                </div>
                <div className="bg-muted rounded-xl p-3 text-center">
                  <span className="block text-lg font-bold text-primary">{meal.nutritionFacts.fat}</span>
                  <span className="text-xs text-muted-foreground">Fat</span>
                </div>
                <div className="bg-muted rounded-xl p-3 text-center">
                  <span className="block text-lg font-bold text-primary">{meal.nutritionFacts.fiber}</span>
                  <span className="text-xs text-muted-foreground">Fiber</span>
                </div>
              </div>
            </div>

            {/* Ingredients */}
            <div className="mb-6">
              <h3 className="font-semibold text-card-foreground mb-3 flex items-center gap-2">
                <span>🛒</span> Ingredients
              </h3>
              <div className="bg-muted rounded-xl p-4">
                <ul className="space-y-2">
                  {meal.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-center gap-3 text-muted-foreground">
                      <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Instructions */}
            <div className="mb-6">
              <h3 className="font-semibold text-card-foreground mb-3 flex items-center gap-2">
                <span>👨‍🍳</span> Instructions
              </h3>
              <div className="space-y-3">
                {meal.instructions.map((step, index) => (
                  <div key={index} className="flex gap-3">
                    <span className="flex-shrink-0 w-7 h-7 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </span>
                    <p className="text-muted-foreground pt-0.5">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <button className="w-full bg-primary text-primary-foreground font-semibold py-4 rounded-xl hover:opacity-90 transition-opacity active:scale-[0.98]">
              Start Cooking! 👨‍🍳
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
