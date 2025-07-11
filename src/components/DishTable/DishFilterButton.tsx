import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Modal } from '../Modal'
import { SlidersHorizontal } from 'lucide-react'
import { Dish } from '@/shared/types/dish'
import { DishFilterForm } from './DishFilterForm'
import { useFilteredDishes } from '@/shared/hooks/dishes/useFilteredDishes'

type DishFilterButtonProps = {
  filters: {
    carbohydrates: string
    sodium: string
    calories: string
    proteins: string
  }
  onChangeFilter: (name: string, value: string) => void
  onApplyFilter: (data: Dish[]) => void
}

export default function DishFilterButton({
  filters,
  onChangeFilter,
  onApplyFilter,
}: DishFilterButtonProps) {
  const [open, setOpen] = useState(false)
  const { fetchFilteredDishes } = useFilteredDishes()

  async function handleClearFilters() {
    onChangeFilter('carbohydrates', '')
    onChangeFilter('sodium', '')
    onChangeFilter('calories', '')
    onChangeFilter('proteins', '')

    const filtered = await fetchFilteredDishes({})
    onApplyFilter(filtered)
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <span>Filtros</span>
        <SlidersHorizontal className="!h-4 !w-4"></SlidersHorizontal>
      </Button>

      <Modal
        title="Filtrar por:"
        isOpen={open}
        onClose={() => setOpen(false)}
        onCancel={handleClearFilters}
        cancelText="Remover filtros"
        confirmText="Aplicar filtros"
        variant="form"
        formId="form-filter-dish"
      >
        <DishFilterForm
          filters={filters}
          onChange={onChangeFilter}
          onClose={() => setOpen(false)}
          onApplyFilter={data => {
            onApplyFilter(data)
            setOpen(false)
          }}
        />
      </Modal>
    </>
  )
}
