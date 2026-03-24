'use client'

import { useState } from 'react'
import { X, Plus, Bell, Trash2, Clock } from 'lucide-react'
import { useApp, Reminder } from '@/lib/app-context'

interface RemindersProps {
  onClose: () => void
}

export function Reminders({ onClose }: RemindersProps) {
  const { reminders, addReminder, removeReminder, toggleReminder } = useApp()
  const [showAddForm, setShowAddForm] = useState(false)
  const [newReminder, setNewReminder] = useState({
    title: '',
    time: '12:00',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] as string[]
  })

  const allDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  const handleAddReminder = () => {
    if (!newReminder.title || newReminder.days.length === 0) return
    
    addReminder({
      title: newReminder.title,
      time: newReminder.time,
      enabled: true,
      days: newReminder.days
    })
    
    setNewReminder({ title: '', time: '12:00', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] })
    setShowAddForm(false)
  }

  const toggleDay = (day: string) => {
    setNewReminder(prev => ({
      ...prev,
      days: prev.days.includes(day)
        ? prev.days.filter(d => d !== day)
        : [...prev.days, day]
    }))
  }

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':')
    const h = parseInt(hours)
    const ampm = h >= 12 ? 'PM' : 'AM'
    const hour12 = h % 12 || 12
    return `${hour12}:${minutes} ${ampm}`
  }

  return (
    <div className="fixed inset-0 z-50 bg-background animate-fade-in overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-card/95 backdrop-blur-lg border-b border-border px-4 py-4 z-10">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-chart-2 rounded-full flex items-center justify-center">
              <Bell className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-semibold text-card-foreground">Meal Reminders</h2>
              <p className="text-xs text-muted-foreground">Never miss a healthy meal</p>
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

      <div className="max-w-md mx-auto px-4 py-6">
        {/* Info card */}
        <div className="bg-primary/10 rounded-2xl p-4 mb-6 flex items-start gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <p className="text-sm text-foreground font-medium">Stay consistent!</p>
            <p className="text-sm text-muted-foreground">
              Regular meal times help maintain healthy eating habits and stable energy levels.
            </p>
          </div>
        </div>

        {/* Add reminder button */}
        <button
          onClick={() => setShowAddForm(true)}
          className="w-full bg-card rounded-2xl p-4 flex items-center justify-center gap-2 text-primary font-medium border-2 border-dashed border-primary/30 hover:border-primary/50 transition-colors mb-6"
        >
          <Plus className="w-5 h-5" />
          Add New Reminder
        </button>

        {/* Reminders list */}
        <div className="space-y-3">
          {reminders.length === 0 ? (
            <div className="bg-card rounded-2xl p-8 text-center">
              <span className="text-4xl mb-3 block">🔔</span>
              <p className="text-muted-foreground mb-2">No reminders yet</p>
              <p className="text-sm text-muted-foreground">
                Create reminders to stay on track with your healthy eating schedule.
              </p>
            </div>
          ) : (
            reminders.map((reminder) => (
              <div
                key={reminder.id}
                className={`bg-card rounded-2xl p-4 transition-opacity ${!reminder.enabled ? 'opacity-50' : ''}`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-secondary-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-card-foreground">{reminder.title}</h3>
                      <button
                        onClick={() => toggleReminder(reminder.id)}
                        className={`relative w-12 h-7 rounded-full transition-colors ${
                          reminder.enabled ? 'bg-primary' : 'bg-muted'
                        }`}
                      >
                        <div
                          className={`absolute top-1 w-5 h-5 bg-card rounded-full shadow-sm transition-all ${
                            reminder.enabled ? 'left-6' : 'left-1'
                          }`}
                        />
                      </button>
                    </div>
                    <p className="text-lg font-medium text-primary mb-2">
                      {formatTime(reminder.time)}
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        {allDays.map((day) => (
                          <span
                            key={day}
                            className={`text-xs px-1.5 py-0.5 rounded ${
                              reminder.days.includes(day)
                                ? 'bg-primary/20 text-primary font-medium'
                                : 'text-muted-foreground'
                            }`}
                          >
                            {day.charAt(0)}
                          </span>
                        ))}
                      </div>
                      <button
                        onClick={() => removeReminder(reminder.id)}
                        className="ml-auto p-1.5 hover:bg-destructive/10 rounded-full transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Add reminder modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50 flex items-end">
          <div className="w-full bg-card rounded-t-3xl p-6 animate-slide-up safe-area-inset-bottom">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-card-foreground">New Reminder</h3>
              <button onClick={() => setShowAddForm(false)}>
                <X className="w-6 h-6 text-muted-foreground" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Reminder Title
                </label>
                <input
                  type="text"
                  value={newReminder.title}
                  onChange={(e) => setNewReminder(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g., Breakfast time"
                  className="w-full bg-muted rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Time
                </label>
                <input
                  type="time"
                  value={newReminder.time}
                  onChange={(e) => setNewReminder(prev => ({ ...prev, time: e.target.value }))}
                  className="w-full bg-muted rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Repeat on
                </label>
                <div className="flex gap-2">
                  {allDays.map((day) => (
                    <button
                      key={day}
                      onClick={() => toggleDay(day)}
                      className={`flex-1 py-3 rounded-xl text-sm font-medium transition-colors ${
                        newReminder.days.includes(day)
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-foreground'
                      }`}
                    >
                      {day.charAt(0)}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleAddReminder}
                disabled={!newReminder.title || newReminder.days.length === 0}
                className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-semibold disabled:opacity-50"
              >
                Create Reminder
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
