import { useEffect, useState } from 'react'
import { useActiveMenuRequirements } from '@/shared/hooks/menuRequirements/useActiveMenuRequirements'
import { getColumns } from './columns'
import { VerticalDataTable } from '../VerticalDataTable'
import { MenuRequirement } from '@/shared/types/menu-requirement'
import CreateMenuRequirementButton from './MenuRequirementCreateButton'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { MenuRequirementEditForm } from './MenuRequirementEditForm'
import MenuRequirementDeactivateButton from './MenuRequirementDeactivateButton'
import { useMenuRequirements } from '@/shared/hooks/menuRequirements/useMenuRequirements'


export default function MenuRequirementTable() {
  const { data, isLoading, error } = useMenuRequirements()
  const [localData, setLocalData] = useState<MenuRequirement[]>(data || [])
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [selectedMenuRequirement, setSelectedMenuRequirement] = useState<MenuRequirement | null>(null)

  useEffect(() => {
    setLocalData(data || [])
  }, [data])

  function handleCreate(newMenuRequirement: MenuRequirement) {
    setLocalData(prev => [...prev, newMenuRequirement])
  }

  function handleDelete(menuRequirementToDelete: MenuRequirement) {
    setLocalData(prev => prev.filter(mr => mr.id !== menuRequirementToDelete.id))
  }

  function handleEdit(menuRequirementToEdit: MenuRequirement) {
    setSelectedMenuRequirement(menuRequirementToEdit)
    setEditModalOpen(true)
  }

  function handleEditSuccess(updatedMenuRequirement: MenuRequirement) {
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
        <MenuRequirementDeactivateButton onDeactivate={handleDelete} />
      </div>
      <VerticalDataTable
        columns={columns}
        data={localData}
        title={(row: MenuRequirement) => `Requisitos do Menu - ${row.id}`}
      />
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="max-h-[80vh] overflow-y-auto p-6 bg-white rounded-lg shadow-lg max-w-md w-full">
          <DialogTitle className="text-lg font-semibold mb-4">Editar Requisito</DialogTitle>
          {selectedMenuRequirement && (
            <MenuRequirementEditForm
              data={selectedMenuRequirement}
              onSuccess={handleEditSuccess}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}