'use client'

import { useState, useRef } from 'react'
import { X, Camera, Check, User } from 'lucide-react'
import Image from 'next/image'

interface UserProfile {
  name: string
  bio: string
  email: string
  avatar: string | null
  height: string
  weight: string
  heightUnit: 'cm' | 'ft'
  weightUnit: 'kg' | 'lbs'
}

interface EditProfileProps {
  profile: UserProfile
  onSave: (profile: UserProfile) => void
  onClose: () => void
}

export function EditProfile({ profile, onSave, onClose }: EditProfileProps) {
  const [formData, setFormData] = useState<UserProfile>(profile)
  const [previewImage, setPreviewImage] = useState<string | null>(profile.avatar)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setPreviewImage(result)
        setFormData(prev => ({ ...prev, avatar: result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
    onClose()
  }

  return (
    <div 
      className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="fixed inset-x-0 bottom-0 max-h-[95vh] bg-card rounded-t-3xl shadow-2xl overflow-hidden animate-slide-up"
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
          <h2 className="text-lg font-semibold text-card-foreground">Edit Profile</h2>
          <button 
            onClick={handleSubmit}
            className="p-2 -mr-2 hover:bg-muted rounded-full transition-colors text-primary"
          >
            <Check className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(95vh-80px)] px-6 py-6">
          {/* Avatar */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              <div className="w-28 h-28 rounded-full overflow-hidden bg-muted flex items-center justify-center">
                {previewImage ? (
                  <Image 
                    src={previewImage} 
                    alt="Profile" 
                    width={112} 
                    height={112} 
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <User className="w-12 h-12 text-muted-foreground" />
                )}
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg hover:opacity-90 transition-opacity"
              >
                <Camera className="w-5 h-5 text-primary-foreground" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
            <p className="text-sm text-muted-foreground mt-3">Tap to change photo</p>
          </div>

          {/* Form fields */}
          <div className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Display Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Your name"
                className="w-full bg-muted border-0 py-4 px-4 rounded-xl text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary outline-none"
              />
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Bio
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                placeholder="Tell us about yourself and your health goals..."
                rows={3}
                className="w-full bg-muted border-0 py-4 px-4 rounded-xl text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary outline-none resize-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="you@example.com"
                className="w-full bg-muted border-0 py-4 px-4 rounded-xl text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary outline-none"
              />
            </div>

            {/* Height */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Height
              </label>
              <div className="flex gap-3">
                <input
                  type="number"
                  value={formData.height}
                  onChange={(e) => setFormData(prev => ({ ...prev, height: e.target.value }))}
                  placeholder={formData.heightUnit === 'cm' ? '170' : "5'10\""}
                  className="flex-1 bg-muted border-0 py-4 px-4 rounded-xl text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary outline-none"
                />
                <div className="flex bg-muted rounded-xl p-1">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, heightUnit: 'cm' }))}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      formData.heightUnit === 'cm' 
                        ? 'bg-card text-foreground shadow-sm' 
                        : 'text-muted-foreground'
                    }`}
                  >
                    cm
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, heightUnit: 'ft' }))}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      formData.heightUnit === 'ft' 
                        ? 'bg-card text-foreground shadow-sm' 
                        : 'text-muted-foreground'
                    }`}
                  >
                    ft
                  </button>
                </div>
              </div>
            </div>

            {/* Weight */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Weight
              </label>
              <div className="flex gap-3">
                <input
                  type="number"
                  value={formData.weight}
                  onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))}
                  placeholder={formData.weightUnit === 'kg' ? '70' : '154'}
                  className="flex-1 bg-muted border-0 py-4 px-4 rounded-xl text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary outline-none"
                />
                <div className="flex bg-muted rounded-xl p-1">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, weightUnit: 'kg' }))}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      formData.weightUnit === 'kg' 
                        ? 'bg-card text-foreground shadow-sm' 
                        : 'text-muted-foreground'
                    }`}
                  >
                    kg
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, weightUnit: 'lbs' }))}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      formData.weightUnit === 'lbs' 
                        ? 'bg-card text-foreground shadow-sm' 
                        : 'text-muted-foreground'
                    }`}
                  >
                    lbs
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Save button */}
          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground font-semibold py-4 rounded-xl hover:opacity-90 transition-opacity active:scale-[0.98] mt-8"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  )
}
