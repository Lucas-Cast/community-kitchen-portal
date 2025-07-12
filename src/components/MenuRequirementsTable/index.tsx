'use client'

import { useEffect, useState } from 'react'
import { VerticalDataTable } from '../VerticalDataTable'
import { getColumns } from './columns'
import { MenuRequirement } from '@/shared/types/menu-requirement'
import CreateMenuRequirementButton from './MenuRequirementCreateButton'
import MenuRequirementDeactivateButton from './MenuRequirementDeactivateButton'
import { useMenuRequirements } from '@/shared/hooks/menuRequirements/useMenuRequirements'
import { useDeactivateMenuRequirement } from '@/shared/hooks/menuRequirements/useDeactivateMenuRequirement'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

export default function MenuRequirementTable() {
  const { data, isLoading, error } = useMenuRequirements()
  const { deactivate } = useDeactivateMenuRequirement()
  const [dataState, setDataState] = useState<MenuRequirement[]>(data || [])

  useEffect(() => {
    setDataState(data || [])
  }, [data])

  function handleCreate(newMenuRequirement: MenuRequirement) {
    setDataState(prev => [...prev, newMenuRequirement])
  }

  async function handleDelete(menuRequirement: MenuRequirement) {
    try {
      setDataState(prev => prev.filter(mr => mr.id !== menuRequirement.id))
    } catch (error) {
      console.error('Erro ao deletar menu requirement:', error)
      const axiosError = error as AxiosError
      toast.error(
        axiosError?.response?.status === 400
          ? 'Não é possível remover: o requisito ainda está ativo.'
          : 'Erro ao remover o requisito.'
      )
    }
  }

  async function handleDeactivate(menuRequirement: MenuRequirement) {
    try {
      await deactivate(menuRequirement.id)
      setDataState(prev =>
        prev.map(mr => (mr.id === menuRequirement.id ? { ...mr, isActive: false } : mr))
      )
    } catch (error) {
      console.error('Erro ao desativar menu requirement:', error)
      toast.error('Erro ao desativar o requisito.')
    }
  }

  function handleEdit(updatedMenuRequirement: MenuRequirement) {
    setDataState(prev =>
      prev.map(mr => (mr.id === updatedMenuRequirement.id ? updatedMenuRequirement : mr))
    )
  }

  const columns = getColumns(handleDelete, handleEdit)

  if (error) return <p className="text-red-500">Erro: {error}</p>
  if (isLoading) return <p className="text-gray-500">Carregando requisitos...</p>

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between mb-4">
        <CreateMenuRequirementButton onCreate={handleCreate} />

        <div className="flex justify-end">
          <MenuRequirementDeactivateButton onDeactivate={handleDeactivate} />
        </div>
      </div>
      <VerticalDataTable
        columns={columns}
        data={dataState}
        title={(row: MenuRequirement) => `Requisitos do Menu - ${row.id}`}
      />
    </div>
  )
}
