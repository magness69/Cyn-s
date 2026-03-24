'use client'

import { useState } from 'react'
import { Meal } from '@/lib/meals-data'
import { BottomNav } from '@/components/bottom-nav'
import { HomeTab } from '@/components/home-tab'
import { IngredientPicker } from '@/components/ingredient-picker'
import { FavoritesTab } from '@/components/favorites-tab'
import { ProfileTab } from '@/components/profile-tab'
import { MealDetail } from '@/components/meal-detail'

type Tab = 'home' | 'search' | 'favorites' | 'profile'

export default function NourishApp() {
  const [activeTab, setActiveTab] = useState<Tab>('home')
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null)
  const [favorites, setFavorites] = useState<string[]>([])

  const handleMealSelect = (meal: Meal) => {
    setSelectedMeal(meal)
  }

  const handleCloseDetail = () => {
    setSelectedMeal(null)
  }

  const toggleFavorite = (mealId: string) => {
    setFavorites(prev =>
      prev.includes(mealId)
        ? prev.filter(id => id !== mealId)
        : [...prev, mealId]
    )
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Status bar spacer for iOS */}
      <div className="h-safe-area-inset-top" />
      
      {/* Main content area */}
      <div className="max-w-md mx-auto px-5 pt-6 pb-24">
        {/* Tab content */}
        {activeTab === 'home' && (
          <HomeTab onMealSelect={handleMealSelect} />
        )}
        
        {activeTab === 'search' && (
          <IngredientPicker onMealSelect={handleMealSelect} />
        )}
        
        {activeTab === 'favorites' && (
          <FavoritesTab 
            favorites={favorites} 
            onMealSelect={handleMealSelect}
            onTabChange={setActiveTab}
          />
        )}
        
        {activeTab === 'profile' && (
          <ProfileTab />
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Meal Detail Modal */}
      {selectedMeal && (
        <MealDetail 
          meal={selectedMeal} 
          onClose={handleCloseDetail}
        />
      )}
    </main>
  )
}
