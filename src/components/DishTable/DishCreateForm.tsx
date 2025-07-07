import { useState } from 'react'
import { Dish } from '@/shared/types/dish'
import { useCreateDish } from '@/shared/hooks/dishes/useCreateDish'
import { Ingredient } from './Ingredient'
import { useFoods } from '@/shared/hooks/foods/useFoods'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

type DishCreateFormProps = {
  onClose: () => void
  onCreate?: (dish: Dish) => void
}

export default function DishCreateForm({ onClose, onCreate }: DishCreateFormProps) {
  const MAX_INGREDIENTS = 50

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const [foods, setFoods] = useState<{ name: string; quantity: string }[]>([])

  const { data: allFoods = [] } = useFoods()

  const { create } = useCreateDish(dish => {
    onCreate?.(dish)
    onClose()
  })

  function handleAddFood() {
    if (foods.length >= MAX_INGREDIENTS) return
    setFoods([...foods, { name: '', quantity: '' }])
  }

  function handleFoodChange(index: number, selectedName: string) {
    const updatedFoods = [...foods]
    updatedFoods[index].name = selectedName
    setFoods(updatedFoods)
  }
  function handleQuantityChange(index: number, value: string) {
    const updatedFoods = [...foods]
    updatedFoods[index].quantity = value
    setFoods(updatedFoods)
  }
  function handleRemoveFood(index: number) {
    const updatedFoods = [...foods]
    updatedFoods.splice(index, 1)
    setFoods(updatedFoods)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const validFoods = foods
      .filter(f => f.name && f.quantity)
      .map(f => {
        const ingredient = allFoods.find(ing => ing.name === f.name)
        if (!ingredient) throw new Error(`Ingrediente inválido: ${f.name}`)
        return {
          foodId: ingredient.id,
          quantity: parseFloat(f.quantity),
        }
      })

    const payload = {
      name,
      description,
      foods: validFoods.map(f => ({ foodId: f.foodId, quantity: f.quantity })),
    }

    await create(payload)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" id="form-create-dish">
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

      <div>
        <label className="block text-sm font-medium">Descrição</label>
        <textarea
          className="w-full px-3 py-2 border rounded bg-white text-black"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        />
      </div>

      {foods.map((food, index) => (
        <Ingredient
          key={`new-food-${index}`}
          food={food}
          onQuantityChange={value => handleQuantityChange(index, value)}
          onFoodChange={value => handleFoodChange(index, value)}
          onRemove={() => handleRemoveFood(index)}
        />
      ))}

      {foods.length < MAX_INGREDIENTS && (
        <Button type="button" onClick={handleAddFood} variant="default">
          Adicionar ingrediente
        </Button>
      )}
    </form>
  )
}
