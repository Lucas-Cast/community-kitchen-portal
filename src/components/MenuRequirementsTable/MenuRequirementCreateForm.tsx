'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CreateMenuRequirement, MenuRequirement } from '@/shared/types/menu-requirement'
import { useCreateMenuRequirement } from '@/shared/hooks/menuRequirements/useCreateMenuRequirements'

interface Props {
  onClose: () => void
  onCreate?: (menuRequirement: MenuRequirement) => void
}

export default function CreateMenuRequirementForm({ onClose, onCreate }: Props) {
  const [values, setValues] = useState<Record<keyof CreateMenuRequirement, string>>({
    minCalories: '',
    maxCalories: '',
    minCarbohydrates: '',
    maxCarbohydrates: '',
    minProteins: '',
    maxProteins: '',
    minFats: '',
    maxFats: '',
    minFiber: '',
    maxFiber: '',
    minSugar: '',
    maxSugar: '',
    minSodium: '',
    maxSodium: '',
  })

  const { create } = useCreateMenuRequirement((menuRequirement) => {
    onCreate?.(menuRequirement)
    onClose()
  })

  function handleChange(field: keyof CreateMenuRequirement, value: string) {
    setValues(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    create(
      Object.fromEntries(
        Object.entries(values).map(([key, value]) => [key, Number(value)])
      ) as CreateMenuRequirement
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" id="form-create-menu-requirement">
      <h3 className="font-semibold text-lg">Requisitos Nutricionais</h3>

      {(
        [
          ['Calorias', 'Calories'],
          ['Carboidratos', 'Carbohydrates'],
          ['Proteínas', 'Proteins'],
          ['Gorduras', 'Fats'],
          ['Fibras', 'Fiber'],
          ['Açúcares', 'Sugar'],
          ['Sódio', 'Sodium'],
        ] as const
      ).flatMap(([label, key]) => [
        {
          label: `Mín. ${label}`,
          field: `min${key}` as const,
        },
        {
          label: `Máx. ${label}`,
          field: `max${key}` as const,
        },
      ])?.map(({ label, field }) => (
        <div key={field}>
          <Label>{label}</Label>
          <Input
            type="number"
            required
            value={values[field]}
            onChange={e => handleChange(field, e.target.value)}
          />
        </div>
      ))}
    </form>
  )
}