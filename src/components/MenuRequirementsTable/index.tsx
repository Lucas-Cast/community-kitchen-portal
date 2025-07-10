import { useEffect, useState } from 'react'
import { getColumns } from './columns'
import { VerticalDataTable } from '../VerticalDataTable'
import { MenuRequirement } from '@/shared/types/menu-requirement'
import CreateMenuRequirementButton from './MenuRequirementCreateButton'
import MenuRequirementDeactivateButton from './MenuRequirementDeactivateButton'
import { useMenuRequirements } from '@/shared/hooks/menuRequirements/useMenuRequirements'
import { useDeactivateMenuRequirement } from '@/shared/hooks/menuRequirements/useDeactivateMenuRequirement'
import { AxiosError } from 'axios'
import { toast } from 'sonner'


export default function MenuRequirementTable() {
  const { data, isLoading, error } = useMenuRequirements()
  const [localData, setLocalData] = useState<MenuRequirement[]>(data || [])
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [selectedMenuRequirement, setSelectedMenuRequirement] = useState<MenuRequirement | null>(null)
  const { deactivate } = useDeactivateMenuRequirement()

  useEffect(() => {
    setLocalData(data || [])
  }, [data])

  function handleCreate(newMenuRequirement: MenuRequirement) {
    setLocalData(prev => [...prev, newMenuRequirement])
  }

  async function handleDelete(menuRequirementToDelete: MenuRequirement) {
    try {
      setLocalData(prev => prev.filter(mr => mr.id !== menuRequirementToDelete.id))
    } catch (error) {
      console.error('Erro ao deletar menu requirement:', error)
      const axiosError = error as AxiosError
      if (axiosError?.response?.status === 400) {
        toast.error('Não é possível remover: o requisito ainda está ativo.')
      } else {
        toast.error('Erro ao remover o requisito.')
      }
    }
  }

  async function handleDeactivate(menuRequirement: MenuRequirement) {
    try {
      await deactivate(menuRequirement.id);
      setLocalData((prev) =>
        prev.map((mr) =>
          mr.id === menuRequirement.id ? { ...mr, isActive: false } : mr
        )
      )
    } catch (error) {
      console.error('Erro ao desativar menu requirement:', error);
    }
  }

  function handleEdit(updatedMenuRequirement: MenuRequirement) {
    setLocalData(prev =>
      prev.map(mr => (mr.id === updatedMenuRequirement.id ? updatedMenuRequirement : mr))
    )
    setEditModalOpen(false)
    setSelectedMenuRequirement(null)
  }

  const columns = getColumns(handleDelete, handleEdit)

  if (error) return <p className="text-red-500">Erro: {error}</p>
  if (isLoading) return <p className="text-gray-500">Carregando requisitos...</p>

  return (
    <div className="container mx-auto py-10 space-y-4">
      <div className="flex justify-between mb-4">
        <CreateMenuRequirementButton onCreate={handleCreate} />
        <MenuRequirementDeactivateButton onDeactivate={handleDeactivate} />
      </div>
      <VerticalDataTable
        columns={columns}
        data={localData}
        title={(row: MenuRequirement) => `Requisitos do Menu - ${row.id}`}
      />
    </div>
  )
}