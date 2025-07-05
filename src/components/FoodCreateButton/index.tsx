import { useState } from 'react'
import { Button } from '../ui/button'
import { Food } from '@/shared/types/food'
import CreateFoodForm from '../FoodCreateForm'
import { Modal } from '../Modal'

export default function FoodCreateButton({ onCreate }: { onCreate: (food: Food) => void }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Novo Alimento</Button>
      <Modal
        title="Novo Alimento"
        isOpen={open}
        onClose={() => setOpen(false)}
        cancelText="Cancelar"
        variant="alert"
        formId="form-create-food"
      >
        <CreateFoodForm onClose={() => setOpen(false)} onCreate={onCreate} />
      </Modal>
    </>
  )
}
