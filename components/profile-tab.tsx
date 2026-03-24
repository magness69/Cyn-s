'use client'

import { useState } from 'react'
import { Settings, ChevronRight, Bell, Moon, Sun, HelpCircle, Star, Monitor, Edit3, Share2, User } from 'lucide-react'
import Image from 'next/image'
import { useTheme } from '@/lib/theme-context'
import { useApp, UserProfile } from '@/lib/app-context'
import { EditProfile } from './edit-profile'
import { SettingsScreen } from './settings-screen'
import { ShareModal } from './share-modal'

export function ProfileTab() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const { user, setUser, favorites, weeklyMealsCooked, dayStreak, settings, updateSettings, setHasCompletedOnboarding } = useApp()
  const [showEditProfile, setShowEditProfile] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showShareGoal, setShowShareGoal] = useState(false)

  const themeOptions = [
    { value: 'light' as const, icon: Sun, label: 'Light' },
    { value: 'dark' as const, icon: Moon, label: 'Dark' },
    { value: 'system' as const, icon: Monitor, label: 'Auto' },
  ]

  const menuItems = [
    { icon: Bell, label: 'Notifications', value: settings.notifications ? 'On' : 'Off', action: () => setShowSettings(true) },
    { icon: Star, label: 'Rate the App', value: '', action: () => {} },
    { icon: HelpCircle, label: 'Help & Support', value: '', action: () => {} },
    { icon: Settings, label: 'Settings', value: '', action: () => setShowSettings(true) },
  ]

  const handleSaveProfile = (profile: UserProfile) => {
    setUser(profile)
  }

  const handleSignOut = () => {
    setUser(null)
    setHasCompletedOnboarding(false)
  }

  const currentProfile: UserProfile = user || {
    name: 'Healthy Foodie',
    bio: 'Eating clean since 2024',
    email: '',
    avatar: null,
    height: '',
    weight: '',
    heightUnit: 'cm',
    weightUnit: 'kg',
  }

  return (
    <div className="animate-fade-in">
      {/* Profile Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative">
          <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center overflow-hidden">
            {currentProfile.avatar ? (
              <Image 
                src={currentProfile.avatar} 
                alt={currentProfile.name} 
                width={80} 
                height={80} 
                className="object-cover w-full h-full"
              />
            ) : (
              <User className="w-10 h-10 text-primary" />
            )}
          </div>
        </div>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-foreground">{currentProfile.name}</h1>
          <p className="text-muted-foreground text-sm">{currentProfile.bio || 'Add a bio...'}</p>
          {currentProfile.height && currentProfile.weight && (
            <p className="text-xs text-muted-foreground mt-1">
              {currentProfile.height}{currentProfile.heightUnit} - {currentProfile.weight}{currentProfile.weightUnit}
            </p>
          )}
        </div>
        <button
          onClick={() => setShowEditProfile(true)}
          className="p-3 bg-muted rounded-full hover:bg-muted/80 transition-colors"
        >
          <Edit3 className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-card rounded-xl p-4 text-center shadow-sm">
          <span className="text-2xl font-bold text-primary">{weeklyMealsCooked}</span>
          <p className="text-xs text-muted-foreground mt-1">Recipes Made</p>
        </div>
        <div className="bg-card rounded-xl p-4 text-center shadow-sm">
          <span className="text-2xl font-bold text-primary">{favorites.length}</span>
          <p className="text-xs text-muted-foreground mt-1">Saved</p>
        </div>
        <div className="bg-card rounded-xl p-4 text-center shadow-sm">
          <span className="text-2xl font-bold text-primary">{dayStreak}</span>
          <p className="text-xs text-muted-foreground mt-1">Day Streak</p>
        </div>
      </div>

      {/* Goals Card */}
      <div className="bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl p-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            Weekly Goal
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-primary font-medium">{Math.min(weeklyMealsCooked, 7)}/7 days</span>
            <button
              onClick={() => setShowShareGoal(true)}
              className="p-2 bg-card/50 rounded-full hover:bg-card/80 transition-colors"
            >
              <Share2 className="w-4 h-4 text-primary" />
            </button>
          </div>
        </div>
        <div className="w-full bg-background/50 rounded-full h-3 mb-2">
          <div 
            className="bg-primary h-3 rounded-full transition-all duration-500"
            style={{ width: `${Math.min((weeklyMealsCooked / 7) * 100, 100)}%` }}
          />
        </div>
        <p className="text-sm text-muted-foreground">
          {weeklyMealsCooked >= 7 
            ? "Amazing! You've reached your weekly goal!"
            : `${7 - Math.min(weeklyMealsCooked, 7)} more healthy meals to reach your goal`
          }
        </p>
      </div>

      {/* Dark Mode Toggle */}
      <div className="bg-card rounded-2xl p-4 mb-4 shadow-sm">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center">
            {resolvedTheme === 'dark' ? (
              <Moon className="w-5 h-5 text-secondary-foreground" />
            ) : (
              <Sun className="w-5 h-5 text-secondary-foreground" />
            )}
          </div>
          <div className="flex-1">
            <span className="font-medium text-card-foreground">Appearance</span>
            <p className="text-xs text-muted-foreground">Choose your preferred theme</p>
          </div>
        </div>
        <div className="flex bg-muted rounded-xl p-1">
          {themeOptions.map((option) => {
            const Icon = option.icon
            const isActive = theme === option.value
            return (
              <button
                key={option.value}
                onClick={() => setTheme(option.value)}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg transition-all ${
                  isActive 
                    ? 'bg-card text-foreground shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{option.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Menu Items */}
      <div className="bg-card rounded-2xl overflow-hidden shadow-sm">
        {menuItems.map((item, index) => (
          <button
            key={item.label}
            onClick={item.action}
            className={`w-full flex items-center gap-4 px-4 py-4 hover:bg-muted/50 transition-colors text-left ${
              index !== menuItems.length - 1 ? 'border-b border-border' : ''
            }`}
          >
            <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center">
              <item.icon className="w-5 h-5 text-secondary-foreground" />
            </div>
            <span className="flex-1 font-medium text-card-foreground">{item.label}</span>
            {item.value && (
              <span className="text-muted-foreground text-sm">{item.value}</span>
            )}
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        ))}
      </div>

      {/* Sign Out */}
      <button 
        onClick={handleSignOut}
        className="w-full mt-4 flex items-center justify-center gap-2 py-4 text-destructive font-medium hover:bg-destructive/10 rounded-xl transition-colors"
      >
        Sign Out
      </button>

      {/* Version */}
      <p className="text-center text-muted-foreground text-xs mt-6">
        Cyn's v1.0.0
      </p>

      {/* Modals */}
      {showEditProfile && (
        <EditProfile
          profile={currentProfile}
          onSave={handleSaveProfile}
          onClose={() => setShowEditProfile(false)}
        />
      )}

      {showSettings && (
        <SettingsScreen
          settings={settings}
          onUpdateSettings={updateSettings}
          onClose={() => setShowSettings(false)}
          onSignOut={handleSignOut}
        />
      )}

      {showShareGoal && (
        <ShareModal
          content={{
            type: 'achievement',
            title: 'Weekly Goal Progress',
            description: `I've cooked ${weeklyMealsCooked} healthy meals this week on Cyn's!`,
            stats: [
              { label: 'Meals', value: weeklyMealsCooked.toString() },
              { label: 'Streak', value: `${dayStreak} days` },
              { label: 'Saved', value: favorites.length.toString() },
            ]
          }}
          onClose={() => setShowShareGoal(false)}
        />
      )}
    </div>
  )
}
