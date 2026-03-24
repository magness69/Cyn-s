'use client'

import { useState, useRef, useEffect } from 'react'
import { X, MessageCircle, Bell, Flame, Camera, Sparkles } from 'lucide-react'

interface FloatingAssistantButtonProps {
  onOpenAssistant: () => void
  onOpenReminders: () => void
  onOpenCalories: () => void
  onOpenImageSearch: () => void
  logoUrl?: string
}

export function FloatingAssistantButton({
  onOpenAssistant,
  onOpenReminders,
  onOpenCalories,
  onOpenImageSearch,
  logoUrl
}: FloatingAssistantButtonProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const buttonRef = useRef<HTMLDivElement>(null)
  const hasInitialized = useRef(false)

  // Initialize position
  useEffect(() => {
    if (!hasInitialized.current) {
      const savedPosition = localStorage.getItem('nourish-fab-position')
      if (savedPosition) {
        setPosition(JSON.parse(savedPosition))
      } else {
        // Default to bottom right
        setPosition({
          x: window.innerWidth - 80,
          y: window.innerHeight - 180
        })
      }
      hasInitialized.current = true
    }
  }, [])

  // Save position to localStorage
  useEffect(() => {
    if (hasInitialized.current) {
      localStorage.setItem('nourish-fab-position', JSON.stringify(position))
    }
  }, [position])

  const handleDragStart = (e: React.TouchEvent | React.MouseEvent) => {
    if (!buttonRef.current) return
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
    
    setIsDragging(true)
    setDragOffset({
      x: clientX - position.x,
      y: clientY - position.y
    })
  }

  const handleDragMove = (e: TouchEvent | MouseEvent) => {
    if (!isDragging) return
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
    
    const newX = Math.max(10, Math.min(window.innerWidth - 70, clientX - dragOffset.x))
    const newY = Math.max(100, Math.min(window.innerHeight - 180, clientY - dragOffset.y))
    
    setPosition({ x: newX, y: newY })
  }

  const handleDragEnd = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleDragMove)
      window.addEventListener('mouseup', handleDragEnd)
      window.addEventListener('touchmove', handleDragMove)
      window.addEventListener('touchend', handleDragEnd)
      
      return () => {
        window.removeEventListener('mousemove', handleDragMove)
        window.removeEventListener('mouseup', handleDragEnd)
        window.removeEventListener('touchmove', handleDragMove)
        window.removeEventListener('touchend', handleDragEnd)
      }
    }
  }, [isDragging, dragOffset])

  const menuItems = [
    { icon: MessageCircle, label: 'Chat Assistant', action: onOpenAssistant, color: 'bg-primary' },
    { icon: Camera, label: 'Scan Food', action: onOpenImageSearch, color: 'bg-accent' },
    { icon: Flame, label: 'Track Calories', action: onOpenCalories, color: 'bg-chart-5' },
    { icon: Bell, label: 'Reminders', action: onOpenReminders, color: 'bg-chart-2' },
  ]

  const handleItemClick = (action: () => void) => {
    setIsExpanded(false)
    action()
  }

  return (
    <>
      {/* Backdrop when expanded */}
      {isExpanded && (
        <div 
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 animate-fade-in"
          onClick={() => setIsExpanded(false)}
        />
      )}

      {/* FAB Container */}
      <div
        ref={buttonRef}
        className="fixed z-50 touch-none"
        style={{
          left: position.x,
          top: position.y,
          transition: isDragging ? 'none' : 'all 0.2s ease-out'
        }}
      >
        {/* Menu items */}
        {isExpanded && (
          <div className="absolute bottom-16 right-0 flex flex-col gap-3 animate-scale-in">
            {menuItems.map((item, index) => (
              <button
                key={item.label}
                onClick={() => handleItemClick(item.action)}
                className="flex items-center gap-3 animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="text-sm font-medium text-foreground bg-card px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
                  {item.label}
                </span>
                <div className={`w-12 h-12 ${item.color} rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform`}>
                  <item.icon className="w-5 h-5 text-primary-foreground" />
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Main FAB Button */}
        <button
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
          onClick={() => !isDragging && setIsExpanded(!isExpanded)}
          className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
            isExpanded 
              ? 'bg-card rotate-45' 
              : 'bg-primary hover:scale-105'
          } ${isDragging ? 'scale-110 cursor-grabbing' : 'cursor-pointer'}`}
        >
          {isExpanded ? (
            <X className="w-6 h-6 text-foreground" />
          ) : logoUrl ? (
            <img src={logoUrl} alt="Nourish" className="w-8 h-8 rounded-full object-cover" />
          ) : (
            <Sparkles className="w-6 h-6 text-primary-foreground" />
          )}
        </button>
      </div>
    </>
  )
}
