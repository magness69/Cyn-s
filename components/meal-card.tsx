'use client'

import Image from 'next/image'
import { Meal } from '@/lib/meals-data'

interface MealCardProps {
  meal: Meal
  onClick: () => void
  className?: string
}

export function MealCard({ meal, onClick, className = '' }: MealCardProps) {
  return (
    <button
      onClick={onClick}
      className={`group w-full text-left bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 active:scale-[0.98] ${className}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={meal.image}
          alt={meal.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 bg-card/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
          <span className="text-sm font-medium text-card-foreground">{meal.emoji} {meal.tags[0]}</span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-card-foreground text-lg leading-tight mb-1 text-balance">
          {meal.name}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
          {meal.description}
        </p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <span>🔥</span> {meal.calories} cal
          </span>
          <span className="flex items-center gap-1">
            <span>⏱️</span> {meal.prepTime}
          </span>
        </div>
      </div>
    </button>
  )
}
