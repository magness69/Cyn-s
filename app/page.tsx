'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase' // ✅ AJOUT
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

function CynsAppContent() {
  const [activeTab, setActiveTab] = useState<Tab>('home')
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null)
  const { favorites, toggleFavorite, hasCompletedOnboarding, setHasCompletedOnboarding, setUser } = useApp()
  
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [showAuth, setShowAuth] = useState(false)
  
  const [showAssistant, setShowAssistant] = useState(false)
  const [showCalories, setShowCalories] = useState(false)
  const [showReminders, setShowReminders] = useState(false)
  const [showImageSearch, setShowImageSearch] = useState(false)

  // ✅ NEW: CHECK USER AUTO
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      console.log('USER METADATA:', user?.user_metadata)

      if (user) {
        setUser({
          name: user.user_metadata?.name || 'User',
          email: user.email || '',
          bio: '',
          avatar: user.user_metadata?.avatar_url || null,
          height: '',
          weight: '',
          heightUnit: 'cm',
          weightUnit: 'kg',
          provider: user.app_metadata?.provider || 'email',
        })

        setHasCompletedOnboarding(true)
        setShowAuth(false)
      } else {
        if (!hasCompletedOnboarding) {
          setShowOnboarding(true)
        } else {
          setShowAuth(true)
        }
      }
    }

    checkUser()
  }, [])

  const handleOnboardingComplete = () => {
    setShowOnboarding(false)
    setShowAuth(true)
  }

  const handleOnboardingSkip = () => {
    setShowOnboarding(false)
    setShowAuth(true)
  }

  // ✅ FIXED
  const handleAuthComplete = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    setUser({
      name: user.user_metadata?.full_name || user.user_metadata?.name || 'User',
      email: user.email || '',
      bio: '',
      avatar: user.user_metadata?.avatar_url || null,  // ← Google photo
      height: '',
      weight: '',
      heightUnit: 'cm',
      weightUnit: 'kg',
      provider: user.app_metadata?.provider || 'email',
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
      <div className="h-safe-area-inset-top" />
      
      <div className="max-w-md mx-auto px-5 pt-6 pb-24">
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

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      <FloatingAssistantButton
        onOpenAssistant={() => setShowAssistant(true)}
        onOpenReminders={() => setShowReminders(true)}
        onOpenCalories={() => setShowCalories(true)}
        onOpenImageSearch={() => setShowImageSearch(true)}
      />

      {selectedMeal && (
        <MealDetail 
          meal={selectedMeal} 
          onClose={handleCloseDetail}
          isFavorite={favorites.includes(selectedMeal.id)}
          onToggleFavorite={() => toggleFavorite(selectedMeal.id)}
        />
      )}

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

      {showOnboarding && (
        <Onboarding 
          onComplete={handleOnboardingComplete}
          onSkip={handleOnboardingSkip}
        />
      )}

      {showAuth && (
        <AuthScreen 
          onComplete={handleAuthComplete}
          onSkip={handleAuthSkip}
        />
      )}
    </main>
  )
}

export default function CynsApp() {
  return (
    <ThemeProvider>
      <AppProvider>
        <CynsAppContent />
      </AppProvider>
    </ThemeProvider>
  )
}