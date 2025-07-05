'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { NutritionFacts } from '@/shared/types/nutrition-facts'
import { Food } from '@/shared/types/food'

type FoodEditFormProps = {
  data: Food
  onSuccess: () => void
}

export function FoodEditForm({ data, onSuccess }: FoodEditFormProps) {
  const [name, setName] = useState(data.name)
  const [nutritionFacts, setNutritionFacts] = useState<NutritionFacts>(data.nutritionFacts)
  const [loading, setLoading] = useState(false)

  function handleChange(field: keyof NutritionFacts, value: string) {
    setNutritionFacts(prev => ({
      ...prev,
      [field]: parseFloat(value),
    }))
  }
  function handleSubmit() {
    console.log('submit')
  }

  return (
    <form className="space-y-4" id="edit-form" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium">Nome</label>
        <input
          type="text"
          className="w-full px-3 py-2 border rounded bg-white text-black"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </div>

      {Object.entries(nutritionFacts).map(([key, value]) => (
        <div key={key}>
          <label className="block text-sm font-medium capitalize">{key}</label>
          <input
            type="number"
            className="w-full px-3 py-2 border rounded bg-white text-black"
            value={value}
            onChange={e => handleChange(key as keyof NutritionFacts, e.target.value)}
            step="any"
            required
          />
        </div>
      ))}

      <div className="pt-2 flex justify-end"></div>
    </form>
  )
}
