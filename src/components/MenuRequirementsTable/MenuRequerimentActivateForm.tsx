'use client';

import { useState } from 'react';
import { MenuRequirement } from '@/shared/types/menu-requirement';

import { useActivateMenuRequirement } from '@/shared/hooks/menuRequirements/useActivateMenuRequirement';
import { useInactiveMenuRequirements } from '@/shared/hooks/menuRequirements/useInactiveMenuRequirement';

interface Props {
  onActivate?: (menuRequirement: MenuRequirement) => void;
  onClose: () => void;
  refetch?: () => void;
}

export default function MenuRequirementActivateForm({ onActivate, onClose, refetch }: Props) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { data, loading, error } = useInactiveMenuRequirements();
  const { activate } = useActivateMenuRequirement(menu => {
    onActivate?.(menu);
    refetch?.();
    onClose();
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (selectedId !== null) {
      activate(selectedId);
    }
  }

  return (
    <form onSubmit={handleSubmit} id="activate-menu-form" className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">Selecione o requisito</label>
      {error && <p className="text-red-500">{error}</p>}
      {loading ? (
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