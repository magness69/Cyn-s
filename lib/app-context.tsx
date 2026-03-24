'use client'

import { createContext, useContext, useState, useEffect } from 'react'

export interface Reminder {
  id: string
  title: string
  time: string
  enabled: boolean
  days: string[]
}

export interface CalorieEntry {
  id: string
  mealName: string
  calories: number
  date: string
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack'
}

interface AppContextType {
  // Calorie tracking
  dailyCalorieGoal: number
  setDailyCalorieGoal: (goal: number) => void
  calorieEntries: CalorieEntry[]
  addCalorieEntry: (entry: Omit<CalorieEntry, 'id'>) => void
  removeCalorieEntry: (id: string) => void
  getTodayCalories: () => number
  
  // Reminders
  reminders: Reminder[]
  addReminder: (reminder: Omit<Reminder, 'id'>) => void
  removeReminder: (id: string) => void
  toggleReminder: (id: string) => void
  
  // Favorites
  favorites: string[]
  toggleFavorite: (mealId: string) => void
  
  // Weekly stats
  weeklyMealsCooked: number
  incrementMealsCooked: () => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [dailyCalorieGoal, setDailyCalorieGoal] = useState(2000)
  const [calorieEntries, setCalorieEntries] = useState<CalorieEntry[]>([])
  const [reminders, setReminders] = useState<Reminder[]>([
    { id: '1', title: 'Breakfast time', time: '08:00', enabled: true, days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] },
    { id: '2', title: 'Lunch reminder', time: '12:30', enabled: true, days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] },
    { id: '3', title: 'Dinner prep', time: '18:00', enabled: false, days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
  ])
  const [favorites, setFavorites] = useState<string[]>([])
  const [weeklyMealsCooked, setWeeklyMealsCooked] = useState(5)

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('nourish-app-state')
    if (stored) {
      try {
        const data = JSON.parse(stored)
        if (data.dailyCalorieGoal) setDailyCalorieGoal(data.dailyCalorieGoal)
        if (data.calorieEntries) setCalorieEntries(data.calorieEntries)
        if (data.reminders) setReminders(data.reminders)
        if (data.favorites) setFavorites(data.favorites)
        if (data.weeklyMealsCooked) setWeeklyMealsCooked(data.weeklyMealsCooked)
      } catch (e) {
        console.error('Failed to parse stored state')
      }
    }
  }, [])

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('nourish-app-state', JSON.stringify({
      dailyCalorieGoal,
      calorieEntries,
      reminders,
      favorites,
      weeklyMealsCooked,
    }))
  }, [dailyCalorieGoal, calorieEntries, reminders, favorites, weeklyMealsCooked])

  const addCalorieEntry = (entry: Omit<CalorieEntry, 'id'>) => {
    setCalorieEntries(prev => [...prev, { ...entry, id: Date.now().toString() }])
  }

  const removeCalorieEntry = (id: string) => {
    setCalorieEntries(prev => prev.filter(e => e.id !== id))
  }

  const getTodayCalories = () => {
    const today = new Date().toDateString()
    return calorieEntries
      .filter(e => new Date(e.date).toDateString() === today)
      .reduce((sum, e) => sum + e.calories, 0)
  }

  const addReminder = (reminder: Omit<Reminder, 'id'>) => {
    setReminders(prev => [...prev, { ...reminder, id: Date.now().toString() }])
  }

  const removeReminder = (id: string) => {
    setReminders(prev => prev.filter(r => r.id !== id))
  }

  const toggleReminder = (id: string) => {
    setReminders(prev => prev.map(r => 
      r.id === id ? { ...r, enabled: !r.enabled } : r
    ))
  }

  const toggleFavorite = (mealId: string) => {
    setFavorites(prev =>
      prev.includes(mealId)
        ? prev.filter(id => id !== mealId)
        : [...prev, mealId]
    )
  }

  const incrementMealsCooked = () => {
    setWeeklyMealsCooked(prev => prev + 1)
  }

  return (
    <AppContext.Provider value={{
      dailyCalorieGoal,
      setDailyCalorieGoal,
      calorieEntries,
      addCalorieEntry,
      removeCalorieEntry,
      getTodayCalories,
      reminders,
      addReminder,
      removeReminder,
      toggleReminder,
      favorites,
      toggleFavorite,
      weeklyMealsCooked,
      incrementMealsCooked,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}
