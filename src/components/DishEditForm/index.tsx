'use client'

import { useState } from 'react'
import { Dish } from '@/shared/types/dish'
import { useUpdateDishes} from '@/shared/hooks/dishes/useUpdateDishes'

type DishEditFormProps = {
  data: Dish
  onSuccess: (updatedData: Dish) => void
}

export function DishEditForm({ data, onSuccess }: DishEditFormProps) {
  const [name, setName] = useState(data.name)
  const [description, setDescription] = useState(data.description)
  const [foods, setFoods] = useState(
    data.foods.map(f => ({ foodId: f.id, name: f.name, quantity: f.quantity }))
  )

  const { updateDish, isUpdating } = useUpdateDishes()

  function handleQuantityChange(index: number, value: string) {
    const updatedFoods = [...foods]
    updatedFoods[index].quantity = parseFloat(value)
    setFoods(updatedFoods)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const payload = {
      name,
      description,
      foods: foods.map(f => ({ foodId: f.foodId, quantity: f.quantity })),
    }

    const updatedDish = await updateDish(data, payload)
    onSuccess(updatedDish)
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
        <div key={food.foodId} className="border p-4 rounded bg-gray-50">
          <div className="mb-2">
            <label className="block text-sm font-medium">Ingrediente</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded bg-gray-100 text-black"
              value={food.name}
              readOnly
              disabled
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Quantidade (g)</label>
            <input
              type="number"
              className="w-full px-3 py-2 border rounded bg-white text-black"
              value={food.quantity}
              onChange={e => handleQuantityChange(index, e.target.value)}
              required
            />
          </div>
        </div>
      ))}
    </form>
  )
}
