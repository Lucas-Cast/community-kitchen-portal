'use client'

import { useEffect, useState } from 'react'
import { VerticalDataTable } from '../VerticalDataTable'
import { getColumns } from './columns'
import { MenuRequirement } from '@/shared/types/menu-requirement'
import CreateMenuRequirementButton from './MenuRequirementCreateButton'
import MenuRequirementDeactivateButton from './MenuRequirementDeactivateButton'
import { useMenuRequirements } from '@/shared/hooks/menuRequirements/useMenuRequirements'
import { useDeactivateMenuRequirement } from '@/shared/hooks/menuRequirements/useDeactivateMenuRequirement'
import { useActiveMenuRequirements } from '@/shared/hooks/menuRequirements/useActiveMenuRequirements'
import MenuRequirementActivateButton from './MenuRequirementActivateButton'
import { useInactiveMenuRequirements } from '@/shared/hooks/menuRequirements/useInactiveMenuRequirement'

export default function MenuRequirementTable() {
  const { data, isLoading, error } = useMenuRequirements();
  const { deactivate } = useDeactivateMenuRequirement();
  const { refetch: refetchActiveMenuRequirements } = useActiveMenuRequirements();
  const { refetch: refetchInactiveMenuRequirements } = useInactiveMenuRequirements();
  const [dataState, setDataState] = useState<MenuRequirement[]>(data || []);

  useEffect(() => {
    setDataState(data || []);
  }, [data]);

  function handleCreate(newMenuRequirement: MenuRequirement) {
    setDataState(prev => [...prev, newMenuRequirement]);
    refetchActiveMenuRequirements();
    refetchInactiveMenuRequirements();
  }

  async function handleDelete(menuRequirement: MenuRequirement) {
    setDataState(prev => prev.filter(mr => mr.id !== menuRequirement.id));
    refetchActiveMenuRequirements();
    refetchInactiveMenuRequirements();
  }

  async function handleDeactivate(menuRequirement: MenuRequirement) {
    await deactivate(menuRequirement.id);
    setDataState(prev =>
      prev.map(mr => (mr.id === menuRequirement.id ? { ...mr, isActive: false } : mr))
    );
    refetchActiveMenuRequirements();
    refetchInactiveMenuRequirements();
  }

  async function handleActivate(menuRequirement: MenuRequirement) {
    setDataState(prev =>
      prev.map(mr => (mr.id === menuRequirement.id ? { ...mr, isActive: true } : mr))
    );
    refetchActiveMenuRequirements();
    refetchInactiveMenuRequirements();
  }

  function handleEdit(updatedMenuRequirement: MenuRequirement) {
    setDataState(prev =>
      prev.map(mr => (mr.id === updatedMenuRequirement.id ? updatedMenuRequirement : mr))
    );
  }

  const columns = getColumns(handleDelete, handleEdit);

  if (error) return <p className="text-red-500">Erro: {error}</p>;
  if (isLoading) return <p className="text-gray-500">Carregando requisitos...</p>;

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between mb-4">
        <CreateMenuRequirementButton onCreate={handleCreate} />
        <div className="flex justify-end gap-2">
          <MenuRequirementActivateButton
            onActivate={handleActivate}
            refetch={refetchInactiveMenuRequirements}
          />
          <MenuRequirementDeactivateButton
            onDeactivate={handleDeactivate}
            refetch={refetchActiveMenuRequirements}
          />
        </div>
      </div>
      <VerticalDataTable
        columns={columns}
        data={dataState}
        title={(row: MenuRequirement) => `Requisitos do Menu - ID: ${row.id}`}
      />
    </div>
  );
}