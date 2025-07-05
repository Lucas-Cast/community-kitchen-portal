'use client'

import { useState } from 'react'
import { CreateMenuRequirement, MenuRequirement } from '@/shared/types/menu-requirement'
import { useUpdateMenuRequirement } from '@/shared/hooks/menuRequirements/useUpdateMenuRequirements'

type MenuRequirementEditFormProps = {
  data: MenuRequirement
  onSuccess: (updatedData: MenuRequirement) => void
}

export function MenuRequirementEditForm({ data, onSuccess }: MenuRequirementEditFormProps) {
  const [values, setValues] = useState<Record<keyof CreateMenuRequirement, string>>({
    minCalories: data.minCalories.toString(),
    maxCalories: data.maxCalories.toString(),
    minCarbohydrates: data.minCarbohydrates.toString(),
    maxCarbohydrates: data.maxCarbohydrates.toString(),
    minProteins: data.minProteins.toString(),
    maxProteins: data.maxProteins.toString(),
    minFats: data.minFats.toString(),
    maxFats: data.maxFats.toString(),
    minFiber: data.minFiber.toString(),
    maxFiber: data.maxFiber.toString(),
    minSugar: data.minSugar.toString(),
    maxSugar: data.maxSugar.toString(),
    minSodium: data.minSodium.toString(),
    maxSodium: data.maxSodium.toString(),
  })

  const { updateMenuRequirement } = useUpdateMenuRequirement()

  function handleChange(field: keyof CreateMenuRequirement, value: string) {
    setValues(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const updatedMenuRequirement = await updateMenuRequirement(data, {
      ...Object.fromEntries(Object.entries(values).map(([key, value]) => [key, Number(value)])),
    } as CreateMenuRequirement)
    onSuccess(updatedMenuRequirement)
  }

  return (
    <form className="space-y-4" id="edit-menu-requirement-form" onSubmit={handleSubmit}>
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
          field: `min${key}` as keyof CreateMenuRequirement,
        },
        {
          label: `Máx. ${label}`,
          field: `max${key}` as keyof CreateMenuRequirement,
        },
      ])?.map(({ label, field }) => (
        <div key={field}>
          <label className="block text-sm font-medium capitalize">{label}</label>
          <input
            type="number"
            className="w-full px-3 py-2 border rounded bg-white text-black"
            value={values[field]}
            onChange={e => handleChange(field, e.target.value)}
            step="any"
            required
          />
        </div>
      ))}

      <div className="pt-2 flex justify-end">
        <button
          type="submit"
          className="bg-black text-white rounded px-4 py-2 hover:bg-gray-800 transition-all"
        >
          Salvar
        </button>
      </div>
    </form>
  )
}