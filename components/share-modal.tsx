'use client'

import { useState } from 'react'
import { X, Link2, Check, MessageCircle, Send, Twitter, Facebook, Copy } from 'lucide-react'
import Image from 'next/image'

interface ShareContent {
  type: 'meal' | 'achievement'
  title: string
  description: string
  image?: string
  stats?: { label: string; value: string }[]
}

interface ShareModalProps {
  content: ShareContent
  onClose: () => void
}

export function ShareModal({ content, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false)
  const [shared, setShared] = useState(false)

  const shareUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/share/${content.type}/${encodeURIComponent(content.title)}`
    : ''

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for older browsers
    }
  }

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: content.title,
          text: content.description,
          url: shareUrl,
        })
        setShared(true)
        setTimeout(() => onClose(), 1000)
      } catch {
        // User cancelled or error
      }
    }
  }

  const shareOptions = [
    { 
      name: 'Messages', 
      icon: MessageCircle, 
      color: 'bg-green-500',
      action: () => window.open(`sms:?body=${encodeURIComponent(content.title + ' - ' + shareUrl)}`, '_blank')
    },
    { 
      name: 'WhatsApp', 
      icon: Send, 
      color: 'bg-emerald-500',
      action: () => window.open(`https://wa.me/?text=${encodeURIComponent(content.title + ' - ' + shareUrl)}`, '_blank')
    },
    { 
      name: 'Twitter', 
      icon: Twitter, 
      color: 'bg-sky-500',
      action: () => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(content.title)}&url=${encodeURIComponent(shareUrl)}`, '_blank')
    },
    { 
      name: 'Facebook', 
      icon: Facebook, 
      color: 'bg-blue-600',
      action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank')
    },
  ]

  return (
    <div 
      className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="fixed inset-x-0 bottom-0 bg-card rounded-t-3xl shadow-2xl overflow-hidden animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle bar */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 bg-muted rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 pb-4">
          <h2 className="text-lg font-semibold text-card-foreground">Share</h2>
          <button onClick={onClose} className="p-2 -mr-2 hover:bg-muted rounded-full transition-colors">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Preview card */}
        <div className="mx-6 mb-6 bg-muted rounded-2xl overflow-hidden">
          <div className="flex gap-4 p-4">
            {content.image && (
              <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 relative">
                <Image 
                  src={content.image} 
                  alt={content.title} 
                  fill 
                  className="object-cover"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground text-balance">{content.title}</h3>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{content.description}</p>
            </div>
          </div>
          
          {/* Stats for achievements */}
          {content.stats && (
            <div className="flex border-t border-border">
              {content.stats.map((stat, index) => (
                <div 
                  key={stat.label} 
                  className={`flex-1 py-3 text-center ${index > 0 ? 'border-l border-border' : ''}`}
                >
                  <span className="block text-lg font-bold text-primary">{stat.value}</span>
                  <span className="text-xs text-muted-foreground">{stat.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Share options */}
        <div className="px-6 mb-6">
          <div className="flex justify-around">
            {shareOptions.map((option) => {
              const Icon = option.icon
              return (
                <button
                  key={option.name}
                  onClick={option.action}
                  className="flex flex-col items-center gap-2"
                >
                  <div className={`w-14 h-14 ${option.color} rounded-2xl flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs text-muted-foreground">{option.name}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Copy link */}
        <div className="px-6 mb-4">
          <button
            onClick={handleCopyLink}
            className="w-full flex items-center justify-center gap-2 bg-muted py-4 rounded-xl font-medium text-foreground hover:bg-muted/80 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-5 h-5 text-primary" />
                Link Copied!
              </>
            ) : (
              <>
                <Copy className="w-5 h-5" />
                Copy Link
              </>
            )}
          </button>
        </div>

        {/* Native share button */}
        {'share' in navigator && (
          <div className="px-6 pb-10">
            <button
              onClick={handleNativeShare}
              className="w-full bg-primary text-primary-foreground font-semibold py-4 rounded-xl hover:opacity-90 transition-opacity active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {shared ? (
                <>
                  <Check className="w-5 h-5" />
                  Shared!
                </>
              ) : (
                <>
                  <Link2 className="w-5 h-5" />
                  More Options
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
