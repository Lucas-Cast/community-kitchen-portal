'use client'

import { useState } from 'react'
import { Dish } from '@/shared/types/dish'
import { useUpdateDishes } from '@/shared/hooks/dishes/useUpdateDishes'
import { Ingredient } from './Ingredient'
import { useFoods } from '@/shared/hooks/foods/useFoods'

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

  const { data: allFoods = [] } = useFoods()

  const { updateDish, isUpdating } = useUpdateDishes()

  function handleFoodChange(index: number, selectedName: string) {
    const ingredient = allFoods.find(f => f.name === selectedName)
    if (!ingredient) return

    const updatedFoods = [...foods]
    updatedFoods[index] = {
      ...updatedFoods[index],
      foodId: ingredient.id,
      name: ingredient.name,
      quantity: updatedFoods[index].quantity,
    }
    setFoods(updatedFoods)
  }

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
        <Ingredient
          key={'food' + food.foodId}
          food={food}
          onQuantityChange={value => handleQuantityChange(index, value)}
          onFoodChange={value => handleFoodChange(index, value)}
        />
      ))}

      {/* Teste */}
      {/*       <Ingredient
        onQuantityChange={value => console.log('Nova quantidade:', value)}
        onFoodChange={value => console.log('Novo ingrediente:', value)}
      /> */}
    </form>
  )
}
