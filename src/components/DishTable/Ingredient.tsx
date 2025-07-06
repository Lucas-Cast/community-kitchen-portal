import { useFoods } from '@/shared/hooks/foods/useFoods'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../ui/select'
import { Button } from '../ui/button'
import { SimplifiedFood } from '@/shared/types/food'
import { Minus, Trash2 } from 'lucide-react'

type IngredientProps = {
  food?: SimplifiedFood
  onQuantityChange: (value: string) => void
  onFoodChange: (value: string) => void
  onRemove: () => void
}

export function Ingredient({ food, onQuantityChange, onFoodChange, onRemove }: IngredientProps) {
  const { data: ingredients } = useFoods()
  const { name = '', quantity = '' } = food ?? {}

  return (
    <div className="relative flex flex-col gap-2 border p-4 rounded bg-gray-50">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="group h-fit w-fit absolute top-4 right-4 text-muted-foreground cursor-pointer"
        onClick={onRemove}
      >
        <Trash2 className="!w-5 !h-5 group-hover:text-red-500 text-black transition"></Trash2>
      </Button>

      <div className="flex flex-col gap-2 mb-2">
        <label className="block text-sm font-medium">Ingrediente</label>
        <Select value={name} onValueChange={onFoodChange}>
          <SelectTrigger className="bg-white w-full">
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

      <div className="flex flex-col gap-2">
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
