'use client'

import { useState } from 'react';
import { MenuRequirement } from '@/shared/types/menu-requirement';
import { useActiveMenuRequirements } from '@/shared/hooks/menuRequirements/useActiveMenuRequirements';
import { useDeactivateMenuRequirement } from '@/shared/hooks/menuRequirements/useDeactivateMenuRequirement';

interface Props {
  onDeactivate?: (menuRequirement: MenuRequirement) => void;
  onClose: () => void;
  refetch?: () => void;
}

export default function MenuRequirementDeactivateForm({ onDeactivate, onClose, refetch }: Props) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { data, isLoading } = useActiveMenuRequirements();
  const { deactivate } = useDeactivateMenuRequirement(menu => {
    onDeactivate?.(menu);
    refetch?.();
    onClose();
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (selectedId !== null) {
      deactivate(selectedId);
    }
  }

  return (
    <form onSubmit={handleSubmit} id="deactivate-menu-form" className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">Selecione o menu</label>
      {isLoading ? (
        <p>Carregando...</p>
      ) : (
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
      )}
    </form>
  );
}