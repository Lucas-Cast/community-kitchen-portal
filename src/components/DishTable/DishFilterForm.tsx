import { useFilteredDishes } from '@/shared/hooks/dishes/useFilteredDishes'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dish } from '@/shared/types/dish'

type DishFilterFormProps = {
  onClose: () => void
  onApplyFilter: (data: Dish[]) => void
  filters: {
    carbohydrates: string
    sodium: string
    calories: string
    proteins: string
  }
  onChange: (name: string, value: string) => void
}

export function DishFilterForm({ onClose, onApplyFilter, filters, onChange }: DishFilterFormProps) {
  const { fetchFilteredDishes } = useFilteredDishes()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const filteredDishes = await fetchFilteredDishes({
      carbohydrates: filters.carbohydrates ? Number(filters.carbohydrates) : undefined,
      sodium: filters.sodium ? Number(filters.sodium) : undefined,
      calories: filters.calories ? Number(filters.calories) : undefined,
      proteins: filters.proteins ? Number(filters.proteins) : undefined,
    })

    onApplyFilter(filteredDishes)
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" id="form-filter-dish">
      <div className="flex flex-col gap-2">
        <Label className="block text-sm font-medium">Número máximo de carboidratos</Label>
        <Input
          type="number"
          placeholder="Máximo Carboidratos (g)"
          className="w-full px-3 py-2 border rounded bg-white text-black"
          value={filters.carbohydrates}
          onChange={e => onChange('carbohydrates', e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label className="block text-sm font-medium">Número máximo de sódio</Label>
        <Input
          type="number"
          placeholder="Máximo Sódio (mg)"
          className="w-full px-3 py-2 border rounded bg-white text-black"
          value={filters.sodium}
          onChange={e => onChange('sodium', e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label className="block text-sm font-medium">Número máximo de calorias</Label>
        <Input
          type="number"
          placeholder="Máximo Calorias"
          className="w-full px-3 py-2 border rounded bg-white text-black"
          value={filters.calories}
          onChange={e => onChange('calories', e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label className="block text-sm font-medium">Número mínimo de proteínas</Label>

        <Input
          type="number"
          placeholder="Mínimo Proteínas (g)"
          className="w-full px-3 py-2 border rounded bg-white text-black"
          value={filters.proteins}
          onChange={e => onChange('proteins', e.target.value)}
        />
      </div>
    </form>
  )
}
