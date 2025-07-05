import { useFoods } from '@/shared/hooks/foods/useFoods'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../ui/select'
import { Food } from '@/shared/types/food'

type SimplifiedFood = {
  foodId: number
  name: string
  quantity: number
}

type IngredientProps = {
  food?: SimplifiedFood
  onQuantityChange: (value: string) => void
  onFoodChange: (value: string) => void
}

export function Ingredient({ food, onQuantityChange, onFoodChange }: IngredientProps) {
  const { data: ingredients } = useFoods()
  const { name = '', quantity = '' } = food ?? {}

  return (
    <div className="border p-4 rounded bg-gray-50">
      <div className="mb-2">
        <label className="block text-sm font-medium">Ingrediente</label>
        <Select value={name} onValueChange={onFoodChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione um ingrediente" />
          </SelectTrigger>

          <SelectContent>
            {ingredients?.map(ingredient => (
              <SelectItem value={ingredient.name} key={ingredient.id}>
                {ingredient.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium">Quantidade (g)</label>
        <input
          type="number"
          className="w-full px-3 py-2 border rounded bg-white text-black"
          value={quantity}
          onChange={e => onQuantityChange(e.target.value)}
          required
        />
      </div>
    </div>
  )
}
