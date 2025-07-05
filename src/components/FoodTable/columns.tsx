import { ColumnDef } from '@tanstack/react-table'
import { Food } from '@/shared/types/food'

export const columns: ColumnDef<Food>[] = [
  {
    accessorKey: 'name',
    header: () => <div className="text-left">Nome</div>,
    cell: ({ row }) => <div className="text-left font-medium">{row.original.name}</div>,
  },
  {
    id: 'kcal',
    header: () => <div className="text-left">Kcal</div>,
    cell: ({ row }) => (
      <div className="text-left font-medium">
        {row.original.nutritionFacts.calories.toLocaleString('pt-BR')}
      </div>
    ),
  },
  {
    id: 'ptn',
    header: () => <div className="text-left">Proteína</div>,
    cell: ({ row }) => (
      <div className="text-left font-medium">
        {row.original.nutritionFacts.proteins.toLocaleString('pt-BR')}
      </div>
    ),
  },
  {
    id: 'carb',
    header: () => <div className="text-left">Carbohidrato</div>,
    cell: ({ row }) => (
      <div className="text-left font-medium">
        {row.original.nutritionFacts.carbohydrates.toLocaleString('pt-BR')}
      </div>
    ),
  },
  {
    id: 'fat',
    header: () => <div className="text-left">Gordura</div>,
    cell: ({ row }) => (
      <div className="text-left font-medium">
        {row.original.nutritionFacts.fats.toLocaleString('pt-BR')}
      </div>
    ),
  },
  {
    id: 'fib',
    header: () => <div className="text-left">Fibra</div>,
    cell: ({ row }) => (
      <div className="text-left font-medium">
        {row.original.nutritionFacts.fiber.toLocaleString('pt-BR')}
      </div>
    ),
  },
  {
    id: 'acuc',
    header: () => <div className="text-left">Açúcar</div>,
    cell: ({ row }) => (
      <div className="text-left font-medium">
        {row.original.nutritionFacts.sugar.toLocaleString('pt-BR')}
      </div>
    ),
  },
  {
    id: 'sod',
    header: () => <div className="text-left">Sódio</div>,
    cell: ({ row }) => (
      <div className="text-left font-medium">
        {row.original.nutritionFacts.sodium.toLocaleString('pt-BR')}
      </div>
    ),
  },
]
