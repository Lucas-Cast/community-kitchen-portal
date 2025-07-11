'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/Modal'
import { DailyEvent } from '@/shared/types/daily-event'
import DailyEventCreateForm from './DailyEventeCreateForm'


interface Props {
  onCreate: (dailyEvent: DailyEvent) => void
}

export default function CreateDailyEventButton({ onCreate }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Criar Evento Diário
      </Button>
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => {}}
        title="Criar Evento Diário"
        confirmText="Criar"
        cancelText="Cancelar"
        formId="form-create-daily-event"
        variant="form"
      >
        <DailyEventCreateForm onClose={() => setOpen(false)} onCreate={onCreate} />
      </Modal>
    </>
  )
}