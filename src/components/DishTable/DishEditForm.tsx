'use client'

import { useState } from 'react'
import { Dish } from '@/shared/types/dish'
import { useUpdateDishes } from '@/shared/hooks/dishes/useUpdateDishes'
import { Ingredient } from './Ingredient'
import { useFoods } from '@/shared/hooks/foods/useFoods'
import { Button } from '../ui/button'

type DishEditFormProps = {
  data: Dish
  onSuccess: (updatedData: Dish) => void
}

export function DishEditForm({ data, onSuccess }: DishEditFormProps) {
  const MAX_INGREDIENTS = 50

  const [name, setName] = useState(data.name)
  const [description, setDescription] = useState(data.description)

  const [foods, setFoods] = useState(
    data.foods.map(f => ({ foodId: f.id, name: f.name, quantity: f.quantity }))
  )
  const [newFoods, setNewFoods] = useState<{ name: string; quantity: string }[]>([])

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

  function handleAddFood() {
    const totalIngredients = foods.length + newFoods.length
    if (totalIngredients >= MAX_INGREDIENTS) return
    setNewFoods([...newFoods, { name: '', quantity: '' }])
  }
  function handleNewFoodChange(index: number, selectedName: string) {
    const updatedNewFoods = [...newFoods]
    updatedNewFoods[index].name = selectedName
    setNewFoods(updatedNewFoods)
  }
  function handleNewQuantityChange(index: number, value: string) {
    const updatedNewFoods = [...newFoods]
    updatedNewFoods[index].quantity = value
    setNewFoods(updatedNewFoods)
  }

  function handleRemoveFood(index: number) {
    const updatedFoods = [...foods]
    updatedFoods.splice(index, 1)
    setFoods(updatedFoods)
  }
  function handleRemoveNewFood(index: number) {
    const updatedNewFoods = [...newFoods]
    updatedNewFoods.splice(index, 1)
    setNewFoods(updatedNewFoods)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const newValidFoods = newFoods
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
      foods: [...foods.map(f => ({ foodId: f.foodId, quantity: f.quantity })), ...newValidFoods],
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
          onRemove={() => handleRemoveFood(index)}
        />
      ))}

      {newFoods.map((newFood, index) => (
        <Ingredient
          key={`new-food-${index}`}
          food={newFood}
          onQuantityChange={value => handleNewQuantityChange(index, value)}
          onFoodChange={value => handleNewFoodChange(index, value)}
          onRemove={() => handleRemoveNewFood(index)}
        />
      ))}

      {foods.length + newFoods.length < MAX_INGREDIENTS && (
        <Button type="button" onClick={handleAddFood} variant="default">
          Adicionar ingrediente
        </Button>
      )}
    </form>
  )
}
