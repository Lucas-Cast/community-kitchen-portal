import { useState } from 'react'
import { Button } from '../ui/button'
import { Modal } from '../Modal'
import CreateCustomerForm from './CustomerCreateForm'
import { Customer } from '@/shared/types/customer'

export default function CustomerCreateButton({
  onCreate,
}: {
  onCreate: (customer: Customer) => void
}) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Novo Cliente</Button>
      <Modal
        title="Novo Cliente"
        isOpen={open}
        onClose={() => setOpen(false)}
        cancelText="Cancelar"
        variant="alert"
        formId="form-create-customer"
      >
        <CreateCustomerForm onClose={() => setOpen(false)} onCreate={onCreate} />
      </Modal>
    </>
  )
}
