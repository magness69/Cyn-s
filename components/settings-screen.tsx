'use client'

import { useState } from 'react'
import { 
  X, ChevronRight, Bell, Shield, Globe, Smartphone, 
  Database, Trash2, Info, Mail, MessageCircle, 
  Star, FileText, Lock, ToggleLeft, ToggleRight
} from 'lucide-react'

interface SettingsScreenProps {
  onClose: () => void
  onSignOut: () => void
  settings: {
    notifications: boolean
    mealReminders: boolean
    weeklyReport: boolean
    privateProfile: boolean
    saveDataLocally: boolean
    language: string
  }
  onUpdateSettings: (settings: SettingsScreenProps['settings']) => void
}

export function SettingsScreen({ onClose, onSignOut, settings, onUpdateSettings }: SettingsScreenProps) {
  const [localSettings, setLocalSettings] = useState(settings)

  const toggleSetting = (key: keyof typeof settings) => {
    if (typeof localSettings[key] === 'boolean') {
      const newSettings = { ...localSettings, [key]: !localSettings[key] }
      setLocalSettings(newSettings)
      onUpdateSettings(newSettings)
    }
  }

  const settingSections = [
    {
      title: 'Notifications',
      items: [
        { 
          icon: Bell, 
          label: 'Push Notifications', 
          description: 'Get notified about meal reminders',
          toggle: 'notifications' as const
        },
        { 
          icon: Bell, 
          label: 'Meal Reminders', 
          description: 'Daily reminders for breakfast, lunch, dinner',
          toggle: 'mealReminders' as const
        },
        { 
          icon: Mail, 
          label: 'Weekly Report', 
          description: 'Receive weekly progress summary',
          toggle: 'weeklyReport' as const
        },
      ]
    },
    {
      title: 'Privacy & Security',
      items: [
        { 
          icon: Lock, 
          label: 'Private Profile', 
          description: 'Only you can see your activity',
          toggle: 'privateProfile' as const
        },
        { 
          icon: Shield, 
          label: 'Data Privacy', 
          description: 'Manage your data preferences',
          action: true
        },
        { 
          icon: Database, 
          label: 'Save Data Locally', 
          description: 'Keep data on device only',
          toggle: 'saveDataLocally' as const
        },
      ]
    },
    {
      title: 'General',
      items: [
        { 
          icon: Globe, 
          label: 'Language', 
          description: 'English',
          action: true
        },
        { 
          icon: Smartphone, 
          label: 'App Icon', 
          description: 'Choose your app icon style',
          action: true
        },
      ]
    },
    {
      title: 'Support',
      items: [
        { 
          icon: MessageCircle, 
          label: 'Help & FAQ', 
          description: 'Get answers to common questions',
          action: true
        },
        { 
          icon: Mail, 
          label: 'Contact Us', 
          description: 'Send feedback or report issues',
          action: true
        },
        { 
          icon: Star, 
          label: 'Rate the App', 
          description: 'Help us improve with your review',
          action: true
        },
      ]
    },
    {
      title: 'About',
      items: [
        { 
          icon: Info, 
          label: 'About Nourish', 
          description: 'Version 1.0.0',
          action: true
        },
        { 
          icon: FileText, 
          label: 'Terms of Service', 
          description: 'Read our terms',
          action: true
        },
        { 
          icon: Shield, 
          label: 'Privacy Policy', 
          description: 'How we handle your data',
          action: true
        },
      ]
    },
  ]

  return (
    <div 
      className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="fixed inset-x-0 bottom-0 h-[95vh] bg-card rounded-t-3xl shadow-2xl overflow-hidden animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle bar */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 bg-muted rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 pb-4 border-b border-border">
          <button onClick={onClose} className="p-2 -ml-2 hover:bg-muted rounded-full transition-colors">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
          <h2 className="text-lg font-semibold text-card-foreground">Settings</h2>
          <div className="w-9" />
        </div>

        <div className="overflow-y-auto h-[calc(95vh-80px)] pb-10">
          {settingSections.map((section, sectionIndex) => (
            <div key={section.title} className={sectionIndex > 0 ? 'mt-6' : 'mt-4'}>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 mb-2">
                {section.title}
              </h3>
              <div className="bg-card mx-4 rounded-2xl overflow-hidden border border-border">
                {section.items.map((item, itemIndex) => {
                  const Icon = item.icon
                  const isToggle = 'toggle' in item
                  const isEnabled = isToggle ? localSettings[item.toggle] : false

                  return (
                    <button
                      key={item.label}
                      onClick={() => isToggle && toggleSetting(item.toggle)}
                      className={`w-full flex items-center gap-4 px-4 py-4 hover:bg-muted/50 transition-colors text-left ${
                        itemIndex !== section.items.length - 1 ? 'border-b border-border' : ''
                      }`}
                    >
                      <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-secondary-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="font-medium text-card-foreground block">{item.label}</span>
                        <span className="text-sm text-muted-foreground">{item.description}</span>
                      </div>
                      {isToggle ? (
                        isEnabled ? (
                          <ToggleRight className="w-8 h-8 text-primary flex-shrink-0" />
                        ) : (
                          <ToggleLeft className="w-8 h-8 text-muted-foreground flex-shrink-0" />
                        )
                      ) : (
                        <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}

          {/* Danger zone */}
          <div className="mt-8 mx-4">
            <button
              onClick={onSignOut}
              className="w-full flex items-center justify-center gap-2 py-4 text-destructive font-medium bg-destructive/10 rounded-xl hover:bg-destructive/20 transition-colors"
            >
              Sign Out
            </button>
          </div>

          <div className="mt-4 mx-4">
            <button className="w-full flex items-center justify-center gap-2 py-4 text-destructive/70 font-medium hover:bg-destructive/10 rounded-xl transition-colors">
              <Trash2 className="w-5 h-5" />
              Delete Account
            </button>
          </div>

          {/* Version info */}
          <p className="text-center text-muted-foreground text-xs mt-8 pb-6">
            Nourish v1.0.0 - Made with care
          </p>
        </div>
      </div>
    </div>
  )
}
