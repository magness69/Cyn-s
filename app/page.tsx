'use client'

import { useState, useEffect } from 'react'
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
import { Onboarding } from '@/components/onboarding'
import { AuthScreen } from '@/components/auth-screen'

type Tab = 'home' | 'search' | 'favorites' | 'profile'

function NourishAppContent() {
  const [activeTab, setActiveTab] = useState<Tab>('home')
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null)
  const { favorites, toggleFavorite, hasCompletedOnboarding, setHasCompletedOnboarding, setUser } = useApp()
  
  // Onboarding states
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [showAuth, setShowAuth] = useState(false)
  
  // Feature modals
  const [showAssistant, setShowAssistant] = useState(false)
  const [showCalories, setShowCalories] = useState(false)
  const [showReminders, setShowReminders] = useState(false)
  const [showImageSearch, setShowImageSearch] = useState(false)

  // Check if first time user
  useEffect(() => {
    // Small delay to let hydration complete
    const timer = setTimeout(() => {
      if (!hasCompletedOnboarding) {
        setShowOnboarding(true)
      }
    }, 100)
    return () => clearTimeout(timer)
  }, [hasCompletedOnboarding])

  const handleOnboardingComplete = () => {
    setShowOnboarding(false)
    setShowAuth(true)
  }

  const handleOnboardingSkip = () => {
    setShowOnboarding(false)
    setShowAuth(true)
  }

  const handleAuthComplete = (userData: { name: string; email: string; provider: string }) => {
    setUser({
      name: userData.name,
      email: userData.email,
      bio: '',
      avatar: null,
      height: '',
      weight: '',
      heightUnit: 'cm',
      weightUnit: 'kg',
      provider: userData.provider,
    })
    setHasCompletedOnboarding(true)
    setShowAuth(false)
  }

  const handleAuthSkip = () => {
    setHasCompletedOnboarding(true)
    setShowAuth(false)
  }

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

      {/* Onboarding Flow */}
      {showOnboarding && (
        <Onboarding 
          onComplete={handleOnboardingComplete}
          onSkip={handleOnboardingSkip}
        />
      )}

      {/* Auth Screen */}
      {showAuth && (
        <AuthScreen 
          onComplete={handleAuthComplete}
          onSkip={handleAuthSkip}
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
