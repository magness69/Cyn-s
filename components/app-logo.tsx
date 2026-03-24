'use client'

import Image from 'next/image'
import { Sparkles } from 'lucide-react'

interface AppLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showText?: boolean
  className?: string
}

// UPDATE THIS PATH TO USE YOUR OWN LOGO
// Place your logo image in public/logo.png and it will be used automatically
const CUSTOM_LOGO_PATH = '/logo.png'

export function AppLogo({ size = 'md', showText = false, className = '' }: AppLogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  }

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  }

  const textSizes = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-xl',
    xl: 'text-2xl',
  }

  // Try to use custom logo, fallback to default icon
  const hasCustomLogo = false // Set to true when you add your logo

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`${sizeClasses[size]} rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg overflow-hidden`}>
        {hasCustomLogo ? (
          <Image 
            src={CUSTOM_LOGO_PATH}
            alt="Nourish"
            width={96}
            height={96}
            className="w-full h-full object-cover"
          />
        ) : (
          <Sparkles className={`${iconSizes[size]} text-primary-foreground`} />
        )}
      </div>
      {showText && (
        <span className={`${textSizes[size]} font-bold text-foreground`}>
          Nourish
        </span>
      )}
    </div>
  )
}
