'use client'

interface AppLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showText?: boolean
  className?: string
  iconOnly?: boolean
}

// Stylish Saturn-C Logo - A flowing "C" with elegant Saturn ring
function SaturnCLogo({ size, className = '' }: { size: string; className?: string }) {
  const sizeMap: Record<string, number> = {
    sm: 28,
    md: 40,
    lg: 52,
    xl: 80,
  }
  const s = sizeMap[size] || 40

  return (
    <svg 
      width={s} 
      height={s} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Gradient definitions */}
      <defs>
        <linearGradient id="cGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id="ringGradient" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
          <stop offset="50%" stopColor="currentColor" stopOpacity="1" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      
      {/* Main stylish C shape - more curved and elegant */}
      <path
        d="M70 22C50 18 32 28 26 45C20 62 28 80 48 86C58 89 68 86 75 80"
        stroke="url(#cGradient)"
        strokeWidth="10"
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Inner glow/highlight on C */}
      <path
        d="M68 28C52 24 38 32 33 46C28 60 34 74 50 79"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        opacity="0.4"
      />
      
      {/* Saturn ring - elegant tilted ellipse passing through */}
      <ellipse
        cx="50"
        cy="50"
        rx="44"
        ry="10"
        stroke="url(#ringGradient)"
        strokeWidth="5"
        fill="none"
        transform="rotate(-25 50 50)"
      />
      
      {/* Ring highlight */}
      <ellipse
        cx="50"
        cy="50"
        rx="44"
        ry="10"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        transform="rotate(-25 50 50)"
        opacity="0.3"
      />
      
      {/* Small decorative stars/dots */}
      <circle cx="82" cy="28" r="4" fill="currentColor" opacity="0.8" />
      <circle cx="88" cy="38" r="2" fill="currentColor" opacity="0.5" />
      <circle cx="18" cy="72" r="3" fill="currentColor" opacity="0.6" />
    </svg>
  )
}

export function AppLogo({ size = 'md', showText = false, className = '', iconOnly = false }: AppLogoProps) {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-18 h-18',
    xl: 'w-28 h-28',
  }

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
  }

  if (iconOnly) {
    return <SaturnCLogo size={size} className={className} />
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`${sizeClasses[size]} rounded-2xl bg-gradient-to-br from-primary via-primary to-accent flex items-center justify-center shadow-lg overflow-hidden text-primary-foreground`}>
        <SaturnCLogo size={size} />
      </div>
      {showText && (
        <span className={`${textSizes[size]} font-bold text-foreground tracking-tight`}>
          Cyn's
        </span>
      )}
    </div>
  )
}
