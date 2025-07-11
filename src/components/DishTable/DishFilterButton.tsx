import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Modal } from '../Modal'
import { SlidersHorizontal } from 'lucide-react'
import { Dish } from '@/shared/types/dish'
import { DishFilterForm } from './DishFilterForm'

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
