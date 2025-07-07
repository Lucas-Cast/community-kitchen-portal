import { useState } from 'react'
import { Button } from '../ui/button'
import { Dish } from '@/shared/types/dish'
import { Modal } from '../Modal'
import DishCreateForm from './DishCreateForm'

export default function DishCreateButton({ onCreate }: { onCreate: (dish: Dish) => void }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Novo Prato</Button>
      <Modal
        title="Novo Prato"
        isOpen={open}
        onClose={() => setOpen(false)}
        cancelText="Cancelar"
        variant="alert"
        formId="form-create-dish"
      >
        <DishCreateForm onClose={() => setOpen(false)} onCreate={onCreate} />
      </Modal>
    </>
  )
}
