'use client'

import { useState } from 'react'
import { ChevronRight, ChevronLeft, Sparkles, Utensils, Camera, Heart, X } from 'lucide-react'
import { AppLogo } from './app-logo'

interface OnboardingProps {
  onComplete: () => void
  onSkip: () => void
}

const slides = [
  {
    icon: Sparkles,
    title: 'Welcome to Nourish',
    subtitle: 'Your cozy companion for healthy eating',
    description: 'Discover delicious, nutritious meals tailored just for you. Let us help you build healthier habits, one meal at a time.',
    color: 'from-primary/20 to-accent/20',
  },
  {
    icon: Utensils,
    title: 'Smart Meal Suggestions',
    subtitle: 'Tell us what you have',
    description: 'Simply add the ingredients from your fridge, and we\'ll suggest healthy recipes you can make right now. No more food waste!',
    color: 'from-accent/20 to-primary/20',
  },
  {
    icon: Camera,
    title: 'Scan Your Ingredients',
    subtitle: 'AI-powered food recognition',
    description: 'Take a photo of your ingredients or groceries, and our smart assistant will identify them and suggest perfect recipes.',
    color: 'from-primary/20 to-accent/20',
  },
  {
    icon: Heart,
    title: 'Track Your Progress',
    subtitle: 'Build healthy habits',
    description: 'Set calorie goals, save favorite recipes, and get meal reminders. We\'ll celebrate every milestone with you!',
    color: 'from-accent/20 to-primary/20',
  },
]

export function Onboarding({ onComplete, onSkip }: OnboardingProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const isLastSlide = currentSlide === slides.length - 1

  const nextSlide = () => {
    if (isLastSlide) {
      onComplete()
    } else {
      setCurrentSlide(prev => prev + 1)
    }
  }

  const prevSlide = () => {
    setCurrentSlide(prev => Math.max(0, prev - 1))
  }

  const slide = slides[currentSlide]
  const Icon = slide.icon

  return (
    <div className="fixed inset-0 z-[100] bg-background flex flex-col">
      {/* Skip button */}
      <div className="absolute top-12 right-4 z-10">
        <button
          onClick={onSkip}
          className="flex items-center gap-1 px-4 py-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
        >
          Skip
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 pt-20">
        {/* Icon */}
        <div className={`w-32 h-32 rounded-3xl bg-gradient-to-br ${slide.color} flex items-center justify-center mb-8 animate-fade-in`}>
          <Icon className="w-16 h-16 text-primary" />
        </div>

        {/* Text */}
        <div className="text-center max-w-sm animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground mb-2 text-balance">
            {slide.title}
          </h1>
          <p className="text-lg font-medium text-primary mb-4">
            {slide.subtitle}
          </p>
          <p className="text-muted-foreground leading-relaxed text-pretty">
            {slide.description}
          </p>
        </div>
      </div>

      {/* Pagination dots */}
      <div className="flex justify-center gap-2 mb-8">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? 'w-8 h-2 bg-primary'
                : 'w-2 h-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
            }`}
          />
        ))}
      </div>

      {/* Navigation buttons */}
      <div className="px-6 pb-10 flex gap-3">
        {currentSlide > 0 && (
          <button
            onClick={prevSlide}
            className="w-14 h-14 bg-muted rounded-xl flex items-center justify-center hover:bg-muted/80 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </button>
        )}
        <button
          onClick={nextSlide}
          className="flex-1 bg-primary text-primary-foreground font-semibold py-4 rounded-xl hover:opacity-90 transition-opacity active:scale-[0.98] flex items-center justify-center gap-2"
        >
          {isLastSlide ? "Let's Get Started" : 'Continue'}
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
