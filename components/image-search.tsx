'use client'

import { useState, useRef } from 'react'
import { X, Camera, Upload, Sparkles, Loader2 } from 'lucide-react'
import { meals, Meal } from '@/lib/meals-data'

interface ImageSearchProps {
  onClose: () => void
  onMealSelect: (meal: Meal) => void
}

export function ImageSearch({ onClose, onMealSelect }: ImageSearchProps) {
  const [preview, setPreview] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState<{ detectedFoods: string[]; suggestions: Meal[] } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreview(e.target?.result as string)
        analyzeImage()
      }
      reader.readAsDataURL(file)
    }
  }

  const analyzeImage = () => {
    setIsAnalyzing(true)
    setResults(null)

    // Simulate AI analysis
    setTimeout(() => {
      // Random detected foods for demo
      const possibleFoods = [
        ['Avocado', 'Eggs', 'Toast'],
        ['Salmon', 'Asparagus', 'Lemon'],
        ['Berries', 'Banana', 'Yogurt'],
        ['Quinoa', 'Chickpeas', 'Vegetables'],
        ['Cucumber', 'Tomatoes', 'Feta'],
      ]
      
      const randomFoods = possibleFoods[Math.floor(Math.random() * possibleFoods.length)]
      
      // Find matching meals
      const matchingMeals = meals.filter(meal => 
        randomFoods.some(food => 
          meal.ingredients.some(ing => ing.toLowerCase().includes(food.toLowerCase()))
        )
      )

      setResults({
        detectedFoods: randomFoods,
        suggestions: matchingMeals.length > 0 ? matchingMeals : meals.slice(0, 2)
      })
      setIsAnalyzing(false)
    }, 2000)
  }

  const handleRetry = () => {
    setPreview(null)
    setResults(null)
  }

  return (
    <div className="fixed inset-0 z-50 bg-background animate-fade-in">
      {/* Header */}
      <div className="sticky top-0 bg-card/95 backdrop-blur-lg border-b border-border px-4 py-4">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
              <Camera className="w-5 h-5 text-accent-foreground" />
            </div>
            <div>
              <h2 className="font-semibold text-card-foreground">Scan Food</h2>
              <p className="text-xs text-muted-foreground">Identify ingredients instantly</p>
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
        {!preview ? (
          <>
            {/* Info */}
            <div className="bg-primary/10 rounded-2xl p-4 mb-6 flex items-start gap-3">
              <span className="text-2xl">📸</span>
              <div>
                <p className="text-sm text-foreground font-medium">Take a photo of your ingredients</p>
                <p className="text-sm text-muted-foreground">
                  We'll identify what you have and suggest healthy recipes you can make!
                </p>
              </div>
            </div>

            {/* Upload options */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <button
                onClick={() => cameraInputRef.current?.click()}
                className="bg-card rounded-2xl p-8 flex flex-col items-center gap-3 hover:bg-muted transition-colors"
              >
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                  <Camera className="w-8 h-8 text-primary-foreground" />
                </div>
                <span className="font-medium text-card-foreground">Take Photo</span>
                <span className="text-xs text-muted-foreground">Use camera</span>
              </button>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-card rounded-2xl p-8 flex flex-col items-center gap-3 hover:bg-muted transition-colors"
              >
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center">
                  <Upload className="w-8 h-8 text-secondary-foreground" />
                </div>
                <span className="font-medium text-card-foreground">Upload</span>
                <span className="text-xs text-muted-foreground">From gallery</span>
              </button>
            </div>

            {/* Hidden inputs */}
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFileSelect}
              className="hidden"
            />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />

            {/* Example photos */}
            <div>
              <h3 className="font-semibold text-foreground mb-3">Or try with an example</h3>
              <div className="grid grid-cols-3 gap-3">
                {meals.slice(0, 3).map((meal) => (
                  <button
                    key={meal.id}
                    onClick={() => {
                      setPreview(meal.image)
                      analyzeImage()
                    }}
                    className="aspect-square rounded-xl overflow-hidden hover:opacity-80 transition-opacity"
                  >
                    <img
                      src={meal.image}
                      alt={meal.name}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Preview */}
            <div className="relative mb-6">
              <img
                src={preview}
                alt="Food preview"
                className="w-full aspect-square object-cover rounded-2xl"
              />
              {isAnalyzing && (
                <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center">
                  <Loader2 className="w-12 h-12 text-primary-foreground animate-spin mb-3" />
                  <p className="text-primary-foreground font-medium">Analyzing image...</p>
                  <p className="text-primary-foreground/80 text-sm">Identifying ingredients</p>
                </div>
              )}
            </div>

            {/* Results */}
            {results && (
              <div className="animate-fade-in">
                {/* Detected foods */}
                <div className="bg-card rounded-2xl p-4 mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold text-card-foreground">Detected Ingredients</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {results.detectedFoods.map((food) => (
                      <span
                        key={food}
                        className="px-3 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full"
                      >
                        {food}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Suggested recipes */}
                <div className="mb-6">
                  <h3 className="font-semibold text-foreground mb-3">Suggested Recipes</h3>
                  <div className="space-y-3">
                    {results.suggestions.map((meal) => (
                      <button
                        key={meal.id}
                        onClick={() => {
                          onClose()
                          onMealSelect(meal)
                        }}
                        className="w-full flex items-center gap-4 bg-card rounded-xl p-4 hover:bg-muted transition-colors text-left"
                      >
                        <img
                          src={meal.image}
                          alt={meal.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-card-foreground">
                            {meal.emoji} {meal.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {meal.calories} cal | {meal.prepTime}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Retry button */}
                <button
                  onClick={handleRetry}
                  className="w-full py-4 rounded-xl font-semibold bg-secondary text-secondary-foreground"
                >
                  Scan Another Photo
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
