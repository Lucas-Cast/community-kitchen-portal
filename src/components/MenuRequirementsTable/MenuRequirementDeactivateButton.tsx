'use client'

import { useState } from 'react'
import { Modal } from '@/components/Modal'
import { Button } from '@/components/ui/button'
import { useActiveMenuRequirements } from '@/shared/hooks/menuRequirements/useActiveMenuRequirements'
import { useDeactivateMenuRequirement } from '@/shared/hooks/menuRequirements/useDeactivateMenuRequirement'
import { MenuRequirement } from '@/shared/types/menu-requirement'

interface Props {
  onDeactivate?: (menuRequirement: MenuRequirement) => void
}

export default function MenuRequirementDeactivateButton({ onDeactivate }: Props) {
  const [open, setOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const { data } = useActiveMenuRequirements()
  const { deactivate, loading } = useDeactivateMenuRequirement(menu => {
    onDeactivate?.(menu)
    setOpen(false)
  })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (selectedId !== null) {
      deactivate(selectedId)
    }
  }

  return (
    <>
      <Button onClick={() => setOpen(true)} className="bg-red-600 hover:bg-red-700 text-white">
        🚫 Desativar Requisito
      </Button>

      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => {}}
        title="Desativar Menu"
        confirmText="Desativar"
        cancelText="Cancelar"
        formId="deactivate-menu-form"
        variant="alert"
      >
        <form onSubmit={handleSubmit} id="deactivate-menu-form" className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Selecione o menu</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={selectedId ?? ''}
            onChange={e => setSelectedId(Number(e.target.value))}
            required
          >
            <option value="" disabled>
              -- Selecione --
            </option>
            {data?.map(mr => (
              <option key={mr.id} value={mr.id}>
                ID {mr.id} - {mr.minCalories} cal
              </option>
            ))}
          </select>
        </form>
      </Modal>
    </>
  )
}
