export interface Meal {
  id: string
  name: string
  emoji: string
  description: string
  image: string
  calories: number
  prepTime: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  tags: string[]
  ingredients: string[]
  instructions: string[]
  nutritionFacts: {
    protein: string
    carbs: string
    fat: string
    fiber: string
  }
}

export const meals: Meal[] = [
  {
    id: '1',
    name: 'Avocado Toast with Poached Egg',
    emoji: '🥑',
    description: 'Creamy avocado on crispy sourdough topped with a perfectly poached egg and everything bagel seasoning.',
    image: '/meals/avocado-toast.jpg',
    calories: 380,
    prepTime: '15 min',
    difficulty: 'Easy',
    tags: ['Breakfast', 'High Protein', 'Vegetarian'],
    ingredients: ['Avocado', 'Eggs', 'Sourdough bread', 'Everything bagel seasoning', 'Lemon juice', 'Salt', 'Pepper', 'Microgreens'],
    instructions: [
      'Toast the sourdough bread until golden and crispy',
      'Mash the avocado with lemon juice, salt, and pepper',
      'Bring water to a gentle simmer and poach the egg for 3 minutes',
      'Spread avocado on toast, top with egg and seasoning',
      'Garnish with microgreens and serve immediately'
    ],
    nutritionFacts: {
      protein: '14g',
      carbs: '28g',
      fat: '24g',
      fiber: '8g'
    }
  },
  {
    id: '2',
    name: 'Rainbow Buddha Bowl',
    emoji: '🥗',
    description: 'A vibrant bowl packed with quinoa, roasted chickpeas, fresh veggies, and creamy tahini dressing.',
    image: '/meals/buddha-bowl.jpg',
    calories: 520,
    prepTime: '25 min',
    difficulty: 'Easy',
    tags: ['Lunch', 'Vegan', 'High Fiber'],
    ingredients: ['Quinoa', 'Chickpeas', 'Purple cabbage', 'Carrots', 'Avocado', 'Edamame', 'Tahini', 'Lemon', 'Garlic'],
    instructions: [
      'Cook quinoa according to package instructions',
      'Roast chickpeas with olive oil and spices at 400°F for 20 min',
      'Prepare all vegetables - shred cabbage, julienne carrots',
      'Make tahini dressing with lemon juice and garlic',
      'Arrange all ingredients in a bowl and drizzle with dressing'
    ],
    nutritionFacts: {
      protein: '18g',
      carbs: '62g',
      fat: '22g',
      fiber: '14g'
    }
  },
  {
    id: '3',
    name: 'Herb-Crusted Salmon',
    emoji: '🐟',
    description: 'Perfectly grilled salmon with a crispy herb crust, served with tender asparagus and lemon.',
    image: '/meals/grilled-salmon.jpg',
    calories: 450,
    prepTime: '20 min',
    difficulty: 'Medium',
    tags: ['Dinner', 'High Protein', 'Omega-3'],
    ingredients: ['Salmon fillet', 'Fresh dill', 'Parsley', 'Garlic', 'Lemon', 'Asparagus', 'Olive oil', 'Dijon mustard'],
    instructions: [
      'Preheat oven to 425°F',
      'Mix herbs, garlic, and mustard for the crust',
      'Pat salmon dry and spread herb mixture on top',
      'Toss asparagus with olive oil and season',
      'Roast salmon and asparagus for 12-15 minutes',
      'Serve with fresh lemon wedges'
    ],
    nutritionFacts: {
      protein: '42g',
      carbs: '8g',
      fat: '28g',
      fiber: '4g'
    }
  },
  {
    id: '4',
    name: 'Berry Açaí Bowl',
    emoji: '🫐',
    description: 'A refreshing blend of açaí, berries, and banana topped with crunchy granola and coconut.',
    image: '/meals/smoothie-bowl.jpg',
    calories: 340,
    prepTime: '10 min',
    difficulty: 'Easy',
    tags: ['Breakfast', 'Vegan', 'Antioxidants'],
    ingredients: ['Açaí puree', 'Banana', 'Mixed berries', 'Almond milk', 'Granola', 'Coconut flakes', 'Chia seeds', 'Honey'],
    instructions: [
      'Blend frozen açaí with banana and almond milk',
      'Pour into a bowl - it should be thick like soft serve',
      'Top with fresh berries and sliced banana',
      'Add granola, coconut flakes, and chia seeds',
      'Drizzle with honey and serve immediately'
    ],
    nutritionFacts: {
      protein: '8g',
      carbs: '52g',
      fat: '12g',
      fiber: '10g'
    }
  },
  {
    id: '5',
    name: 'Mediterranean Salad',
    emoji: '🥒',
    description: 'Fresh and tangy salad with crisp cucumbers, juicy tomatoes, olives, and creamy feta cheese.',
    image: '/meals/greek-salad.jpg',
    calories: 290,
    prepTime: '10 min',
    difficulty: 'Easy',
    tags: ['Lunch', 'Vegetarian', 'Low Carb'],
    ingredients: ['Cucumber', 'Tomatoes', 'Red onion', 'Feta cheese', 'Kalamata olives', 'Olive oil', 'Red wine vinegar', 'Oregano'],
    instructions: [
      'Chop cucumber and tomatoes into large chunks',
      'Slice red onion into thin rings',
      'Combine vegetables in a large bowl',
      'Add olives and crumbled feta cheese',
      'Drizzle with olive oil and vinegar, sprinkle oregano',
      'Toss gently and serve'
    ],
    nutritionFacts: {
      protein: '10g',
      carbs: '14g',
      fat: '22g',
      fiber: '4g'
    }
  },
  {
    id: '6',
    name: 'Overnight Oats',
    emoji: '🥣',
    description: 'Creamy, no-cook oats layered with chia pudding, fresh berries, and a drizzle of honey.',
    image: '/meals/overnight-oats.jpg',
    calories: 320,
    prepTime: '5 min + overnight',
    difficulty: 'Easy',
    tags: ['Breakfast', 'Meal Prep', 'High Fiber'],
    ingredients: ['Rolled oats', 'Chia seeds', 'Almond milk', 'Greek yogurt', 'Honey', 'Fresh berries', 'Almond butter', 'Vanilla'],
    instructions: [
      'Combine oats, chia seeds, milk, and yogurt in a jar',
      'Add vanilla extract and a pinch of salt',
      'Stir well, cover, and refrigerate overnight',
      'In the morning, stir and add more milk if needed',
      'Top with fresh berries, almond butter, and honey'
    ],
    nutritionFacts: {
      protein: '12g',
      carbs: '48g',
      fat: '10g',
      fiber: '8g'
    }
  }
]

export const commonIngredients = [
  { name: 'Eggs', emoji: '🥚' },
  { name: 'Chicken', emoji: '🍗' },
  { name: 'Rice', emoji: '🍚' },
  { name: 'Pasta', emoji: '🍝' },
  { name: 'Tomatoes', emoji: '🍅' },
  { name: 'Onions', emoji: '🧅' },
  { name: 'Garlic', emoji: '🧄' },
  { name: 'Avocado', emoji: '🥑' },
  { name: 'Spinach', emoji: '🥬' },
  { name: 'Carrots', emoji: '🥕' },
  { name: 'Broccoli', emoji: '🥦' },
  { name: 'Salmon', emoji: '🐟' },
  { name: 'Cheese', emoji: '🧀' },
  { name: 'Milk', emoji: '🥛' },
  { name: 'Bread', emoji: '🍞' },
  { name: 'Beans', emoji: '🫘' },
  { name: 'Lemon', emoji: '🍋' },
  { name: 'Potato', emoji: '🥔' },
  { name: 'Bell Pepper', emoji: '🫑' },
  { name: 'Mushrooms', emoji: '🍄' },
  { name: 'Cucumber', emoji: '🥒' },
  { name: 'Banana', emoji: '🍌' },
  { name: 'Berries', emoji: '🫐' },
  { name: 'Oats', emoji: '🥣' },
]

export function findMealsByIngredients(selectedIngredients: string[]): Meal[] {
  if (selectedIngredients.length === 0) return []
  
  const normalizedSelected = selectedIngredients.map(i => i.toLowerCase())
  
  return meals
    .map(meal => {
      const normalizedMealIngredients = meal.ingredients.map(i => i.toLowerCase())
      const matchCount = normalizedSelected.filter(selected => 
        normalizedMealIngredients.some(mealIng => 
          mealIng.includes(selected) || selected.includes(mealIng)
        )
      ).length
      return { meal, matchCount, matchPercent: matchCount / normalizedSelected.length }
    })
    .filter(({ matchCount }) => matchCount > 0)
    .sort((a, b) => b.matchPercent - a.matchPercent)
    .map(({ meal }) => meal)
}
