'use client'

import { useState } from 'react'
import { X, Plus, Trash2, Flame, Target, TrendingUp } from 'lucide-react'
import { useApp } from '@/lib/app-context'

interface CalorieTrackerProps {
  onClose: () => void
}

export function CalorieTracker({ onClose }: CalorieTrackerProps) {
  const { 
    dailyCalorieGoal, 
    setDailyCalorieGoal, 
    calorieEntries, 
    addCalorieEntry, 
    removeCalorieEntry, 
    getTodayCalories 
  } = useApp()
  
  const [showAddForm, setShowAddForm] = useState(false)
  const [newMeal, setNewMeal] = useState({ name: '', calories: '', mealType: 'lunch' as const })
  const [editingGoal, setEditingGoal] = useState(false)
  const [tempGoal, setTempGoal] = useState(dailyCalorieGoal.toString())

  const todayCalories = getTodayCalories()
  const progress = Math.min((todayCalories / dailyCalorieGoal) * 100, 100)
  const remaining = dailyCalorieGoal - todayCalories

  const todayEntries = calorieEntries.filter(
    e => new Date(e.date).toDateString() === new Date().toDateString()
  )

  const handleAddEntry = () => {
    if (!newMeal.name || !newMeal.calories) return
    
    addCalorieEntry({
      mealName: newMeal.name,
      calories: parseInt(newMeal.calories),
      date: new Date().toISOString(),
      mealType: newMeal.mealType
    })
    
    setNewMeal({ name: '', calories: '', mealType: 'lunch' })
    setShowAddForm(false)
  }

  const handleSaveGoal = () => {
    const goal = parseInt(tempGoal)
    if (goal > 0) {
      setDailyCalorieGoal(goal)
    }
    setEditingGoal(false)
  }

  const mealTypeEmoji = {
    breakfast: '🌅',
    lunch: '☀️',
    dinner: '🌙',
    snack: '🍎'
  }

  return (
    <div className="fixed inset-0 z-50 bg-background animate-fade-in overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-card/95 backdrop-blur-lg border-b border-border px-4 py-4 z-10">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-chart-5 rounded-full flex items-center justify-center">
              <Flame className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-semibold text-card-foreground">Calorie Tracker</h2>
              <p className="text-xs text-muted-foreground">Stay on track today</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-muted-foreground" />
          </button>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 pb-24">
        {/* Progress Card */}
        <div className="bg-card rounded-2xl p-6 shadow-sm mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-card-foreground">Today's Progress</h3>
            <button
              onClick={() => setEditingGoal(true)}
              className="text-sm text-primary font-medium"
            >
              Edit goal
            </button>
          </div>

          {/* Circular progress */}
          <div className="relative w-40 h-40 mx-auto mb-4">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="80"
                cy="80"
                r="70"
                fill="none"
                stroke="currentColor"
                strokeWidth="12"
                className="text-muted"
              />
              <circle
                cx="80"
                cy="80"
                r="70"
                fill="none"
                stroke="currentColor"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={`${progress * 4.4} 440`}
                className={progress >= 100 ? 'text-chart-5' : 'text-primary'}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-foreground">{todayCalories}</span>
              <span className="text-sm text-muted-foreground">of {dailyCalorieGoal} cal</span>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="flex items-center justify-center gap-1 text-primary mb-1">
                <Target className="w-4 h-4" />
              </div>
              <p className="text-lg font-semibold text-foreground">{dailyCalorieGoal}</p>
              <p className="text-xs text-muted-foreground">Goal</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1 text-chart-5 mb-1">
                <Flame className="w-4 h-4" />
              </div>
              <p className="text-lg font-semibold text-foreground">{todayCalories}</p>
              <p className="text-xs text-muted-foreground">Consumed</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1 text-chart-2 mb-1">
                <TrendingUp className="w-4 h-4" />
              </div>
              <p className={`text-lg font-semibold ${remaining < 0 ? 'text-destructive' : 'text-foreground'}`}>
                {Math.abs(remaining)}
              </p>
              <p className="text-xs text-muted-foreground">{remaining >= 0 ? 'Remaining' : 'Over'}</p>
            </div>
          </div>
        </div>

        {/* Today's meals */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Today's Meals</h3>
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-1 text-sm text-primary font-medium"
            >
              <Plus className="w-4 h-4" /> Add meal
            </button>
          </div>

          {todayEntries.length === 0 ? (
            <div className="bg-card rounded-2xl p-8 text-center">
              <span className="text-4xl mb-3 block">🍽️</span>
              <p className="text-muted-foreground mb-2">No meals logged today</p>
              <button
                onClick={() => setShowAddForm(true)}
                className="text-primary font-medium text-sm"
              >
                Log your first meal
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {todayEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="bg-card rounded-xl p-4 flex items-center gap-4"
                >
                  <span className="text-2xl">{mealTypeEmoji[entry.mealType]}</span>
                  <div className="flex-1">
                    <p className="font-medium text-card-foreground">{entry.mealName}</p>
                    <p className="text-sm text-muted-foreground capitalize">{entry.mealType}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">{entry.calories}</p>
                    <p className="text-xs text-muted-foreground">cal</p>
                  </div>
                  <button
                    onClick={() => removeCalorieEntry(entry.id)}
                    className="p-2 hover:bg-destructive/10 rounded-full transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick add suggestions */}
        <div>
          <h3 className="font-semibold text-foreground mb-3">Quick Add</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { name: 'Apple', calories: 95, emoji: '🍎' },
              { name: 'Banana', calories: 105, emoji: '🍌' },
              { name: 'Greek Yogurt', calories: 130, emoji: '🥛' },
              { name: 'Almonds (1oz)', calories: 160, emoji: '🥜' },
            ].map((item) => (
              <button
                key={item.name}
                onClick={() => addCalorieEntry({
                  mealName: item.name,
                  calories: item.calories,
                  date: new Date().toISOString(),
                  mealType: 'snack'
                })}
                className="bg-card rounded-xl p-4 text-left hover:bg-muted transition-colors"
              >
                <span className="text-2xl mb-2 block">{item.emoji}</span>
                <p className="font-medium text-card-foreground text-sm">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.calories} cal</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Add meal modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50 flex items-end">
          <div className="w-full bg-card rounded-t-3xl p-6 animate-slide-up safe-area-inset-bottom">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-card-foreground">Add Meal</h3>
              <button onClick={() => setShowAddForm(false)}>
                <X className="w-6 h-6 text-muted-foreground" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Meal Name</label>
                <input
                  type="text"
                  value={newMeal.name}
                  onChange={(e) => setNewMeal(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., Chicken Salad"
                  className="w-full bg-muted rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Calories</label>
                <input
                  type="number"
                  value={newMeal.calories}
                  onChange={(e) => setNewMeal(prev => ({ ...prev, calories: e.target.value }))}
                  placeholder="e.g., 450"
                  className="w-full bg-muted rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Meal Type</label>
                <div className="grid grid-cols-4 gap-2">
                  {(['breakfast', 'lunch', 'dinner', 'snack'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setNewMeal(prev => ({ ...prev, mealType: type }))}
                      className={`p-3 rounded-xl text-center transition-colors ${
                        newMeal.mealType === type
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-foreground'
                      }`}
                    >
                      <span className="text-lg block mb-1">{mealTypeEmoji[type]}</span>
                      <span className="text-xs capitalize">{type}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleAddEntry}
                disabled={!newMeal.name || !newMeal.calories}
                className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-semibold mt-4 disabled:opacity-50"
              >
                Add Meal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit goal modal */}
      {editingGoal && (
        <div className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-card rounded-2xl p-6 animate-scale-in">
            <h3 className="text-lg font-semibold text-card-foreground mb-4">Set Daily Goal</h3>
            <input
              type="number"
              value={tempGoal}
              onChange={(e) => setTempGoal(e.target.value)}
              className="w-full bg-muted rounded-xl px-4 py-3 text-foreground text-center text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-primary/50 mb-4"
            />
            <p className="text-sm text-muted-foreground text-center mb-6">calories per day</p>
            <div className="flex gap-3">
              <button
                onClick={() => setEditingGoal(false)}
                className="flex-1 py-3 rounded-xl bg-muted text-foreground font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveGoal}
                className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground font-medium"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
