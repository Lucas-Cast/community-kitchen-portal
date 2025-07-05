import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Food } from '@/shared/types/food'
import { useCreateFood } from '@/shared/hooks/foods/useCreateFood'

interface Props {
  onClose: () => void
  onCreate?: (food: Food) => void
}

export default function CreateFoodForm({ onClose, onCreate }: Props) {
  const [name, setName] = useState('')
  const [nutritionFacts, setNutritionFacts] = useState({
    calories: '',
    proteins: '',
    carbohydrates: '',
    fats: '',
    fiber: '',
    sugar: '',
    sodium: '',
  })

  const { create } = useCreateFood(food => {
    onCreate?.(food)
    onClose()
  })

  function handleChange(field: keyof typeof nutritionFacts, value: string) {
    setNutritionFacts(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    create({
      name,
      nutritionFacts: {
        calories: Number(nutritionFacts.calories),
        proteins: Number(nutritionFacts.proteins),
        carbohydrates: Number(nutritionFacts.carbohydrates),
        fats: Number(nutritionFacts.fats),
        fiber: Number(nutritionFacts.fiber),
        sugar: Number(nutritionFacts.sugar),
        sodium: Number(nutritionFacts.sodium),
      },
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" id="form-create-food">
      <div>
        <Label>Nome</Label>
        <Input value={name} onChange={e => setName(e.target.value)} required />
      </div>

      {/* Campos de Nutrition Facts */}
      {[
        { label: 'Proteínas (g)', key: 'proteins' },
        { label: 'Carboidratos (g)', key: 'carbohydrates' },
        { label: 'Gorduras (g)', key: 'fats' },
        { label: 'Fibras (g)', key: 'fiber' },
        { label: 'Açúcares (g)', key: 'sugar' },
        { label: 'Sódio (mg)', key: 'sodium' },
      ].map(({ label, key }) => (
        <div key={key}>
          <Label>{label}</Label>
          <Input
            type="number"
            value={nutritionFacts[key as keyof typeof nutritionFacts]}
            onChange={e => handleChange(key as keyof typeof nutritionFacts, e.target.value)}
            required
          />
        </div>
      ))}
    </form>
  )
}
