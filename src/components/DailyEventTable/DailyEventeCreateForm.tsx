'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useActiveMenuRequirements } from '@/shared/hooks/menuRequirements/useActiveMenuRequirements'
import { DailyEvent } from '@/shared/types/daily-event'
import { CreateDailyEvent, useCreateDailyEvent } from '@/shared/hooks/dailyEvents/useCreateDailyEvents'

interface Props {
  onClose: () => void
  onCreate?: (dailyEvent: DailyEvent) => void
}

export default function DailyEventCreateForm({ onClose, onCreate }: Props) {
  const [values, setValues] = useState({
    name: '',
    startTime: '',
    endTime: '',
    requirementId: '',
  })
  const { create } = useCreateDailyEvent((dailyEvent) => {
    onCreate?.(dailyEvent)
    onClose()
  })
  const { data: menuRequirements, isLoading, error } = useActiveMenuRequirements()

  function handleChange(field: keyof CreateDailyEvent, value: string) {
    setValues(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    create({
      name: values.name,
      startTime: values.startTime,
      endTime: values.endTime,
      requirementId: Number(values.requirementId),
    })
  }

  if (error) return <p className="text-red-500">Erro ao carregar requisitos: {error}</p>
  if (isLoading) return <p className="text-gray-500">Carregando requisitos...</p>

  return (
    <form onSubmit={handleSubmit} className="space-y-4" id="form-create-daily-event">
      <h3 className="font-semibold text-lg">Criar Evento Diário</h3>
      <div>
        <Label>Nome</Label>
        <Input
          type="text"
          required
          value={values.name}
          onChange={e => handleChange('name', e.target.value)}
        />
      </div>
      <div>
        <Label>Horário de Início</Label>
        <Input
          type="time"
          required
          value={values.startTime}
          onChange={e => handleChange('startTime', e.target.value)}
        />
      </div>
      <div>
        <Label>Horário de Término</Label>
        <Input
          type="time"
          required
          value={values.endTime}
          onChange={e => handleChange('endTime', e.target.value)}
        />
      </div>
      <div>
        <Label>Requisito do Menu</Label>
        <select
          className="w-full border rounded px-3 py-2"
          value={values.requirementId}
          onChange={e => handleChange('requirementId', e.target.value)}
          required
        >
          <option value="" disabled>
            -- Selecione --
          </option>
          {menuRequirements?.map(mr => (
            <option key={mr.id} value={mr.id}>
              ID {mr.id} - {mr.minCalories} a {mr.maxCalories} cal
            </option>
          ))}
        </select>
      </div>
    </form>
  )
}