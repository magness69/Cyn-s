'use client'

import { useState } from 'react'
import { Meal } from '@/lib/meals-data'
import { ThemeProvider } from '@/lib/theme-context'
import { AppProvider, useApp } from '@/lib/app-context'
import { BottomNav } from '@/components/bottom-nav'
import { HomeTab } from '@/components/home-tab'
import { IngredientPicker } from '@/components/ingredient-picker'
import { FavoritesTab } from '@/components/favorites-tab'
import { ProfileTab } from '@/components/profile-tab'
import { MealDetail } from '@/components/meal-detail'
import { FloatingAssistantButton } from '@/components/floating-assistant-button'
import { AssistantChat } from '@/components/assistant-chat'
import { CalorieTracker } from '@/components/calorie-tracker'
import { Reminders } from '@/components/reminders'
import { ImageSearch } from '@/components/image-search'

type Tab = 'home' | 'search' | 'favorites' | 'profile'

function NourishAppContent() {
  const [activeTab, setActiveTab] = useState<Tab>('home')
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null)
  const { favorites, toggleFavorite } = useApp()
  
  // Feature modals
  const [showAssistant, setShowAssistant] = useState(false)
  const [showCalories, setShowCalories] = useState(false)
  const [showReminders, setShowReminders] = useState(false)
  const [showImageSearch, setShowImageSearch] = useState(false)

  const handleMealSelect = (meal: Meal) => {
    setSelectedMeal(meal)
  }

  const handleCloseDetail = () => {
    setSelectedMeal(null)
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

      {/* Floating Assistant Button */}
      <FloatingAssistantButton
        onOpenAssistant={() => setShowAssistant(true)}
        onOpenReminders={() => setShowReminders(true)}
        onOpenCalories={() => setShowCalories(true)}
        onOpenImageSearch={() => setShowImageSearch(true)}
      />

      {/* Meal Detail Modal */}
      {selectedMeal && (
        <MealDetail 
          meal={selectedMeal} 
          onClose={handleCloseDetail}
          isFavorite={favorites.includes(selectedMeal.id)}
          onToggleFavorite={() => toggleFavorite(selectedMeal.id)}
        />
      )}

      {/* Feature Modals */}
      {showAssistant && (
        <AssistantChat 
          onClose={() => setShowAssistant(false)} 
          onMealSelect={handleMealSelect}
        />
      )}

      {showCalories && (
        <CalorieTracker onClose={() => setShowCalories(false)} />
      )}

      {showReminders && (
        <Reminders onClose={() => setShowReminders(false)} />
      )}

      {showImageSearch && (
        <ImageSearch 
          onClose={() => setShowImageSearch(false)} 
          onMealSelect={handleMealSelect}
        />
      )}
    </main>
  )
}

export default function NourishApp() {
  return (
    <ThemeProvider>
      <AppProvider>
        <NourishAppContent />
      </AppProvider>
    </ThemeProvider>
  )
}
