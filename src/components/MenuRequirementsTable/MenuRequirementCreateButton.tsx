import { useState } from 'react'
import { Button } from '../ui/button'
import { Modal } from '../Modal'
import CreateMenuRequirementForm from './MenuRequirementCreateForm'
import { MenuRequirement } from '@/shared/types/menu-requirement'


export default function MenuRequirementCreateButton({ onCreate }: { onCreate: (menuRequirement: MenuRequirement) => void }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Novo Requisito</Button>
      <Modal
        title="Novo Requisito"
        isOpen={open}
        onClose={() => setOpen(false)}
        cancelText="Cancelar"
        variant="default"
        formId="form-create-menu-requirement"
      >
        <CreateMenuRequirementForm onClose={() => setOpen(false)} onCreate={onCreate} />
      </Modal>
    </>
  )
}
