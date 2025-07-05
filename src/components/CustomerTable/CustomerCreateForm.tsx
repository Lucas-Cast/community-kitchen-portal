'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Customer } from '@/shared/types/customer'
import { useCreateCustomer } from '@/shared/hooks/customer/useCreateCustomer'

interface Props {
  onClose: () => void
  onCreate?: (customer: Customer) => void
}

export default function CreateCustomerForm({ onClose, onCreate }: Props) {
  const [name, setName] = useState('')
  const [taxId, setTaxId] = useState('')
  const [birthDate, setBirthDate] = useState('')

  const { create } = useCreateCustomer(customer => {
    onCreate?.(customer)
    onClose()
  })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    create({
      name,
      taxId,
      birthDate: new Date(birthDate),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" id="form-create-customer">
      <div>
        <Label>Nome</Label>
        <Input value={name} onChange={e => setName(e.target.value)} required />
      </div>

      <div>
        <Label>CPF</Label>
        <Input value={taxId} onChange={e => setTaxId(e.target.value)} required />
      </div>

      <div>
        <Label>Data de nascimento</Label>
        <Input
          type="date"
          value={birthDate}
          onChange={e => setBirthDate(e.target.value)}
          required
        />
      </div>
    </form>
  )
}
