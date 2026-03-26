'use client'

interface AppLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showText?: boolean
  className?: string
  iconOnly?: boolean
}

export function AppLogo({
  size = 'md',
  showText = false,
  className = '',
  iconOnly = false,
}: AppLogoProps) {

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  }

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
  }

  const logo = (
    <img
      src="/icon-192-v2.png"
      alt="Cyn's logo"
      className={`${sizeClasses[size]} object-contain rounded-xl`}
    />
  )

  if (iconOnly) return logo

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {logo}
      {showText && (
        <span className={`${textSizes[size]} font-bold text-foreground tracking-tight`}>
          Cyn's
        </span>
      )}
    </div>
  )
}