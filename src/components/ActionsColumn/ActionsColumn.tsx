'use client'

import { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { MoreHorizontal } from 'lucide-react'
import { useDeleteResource } from '@/shared/hooks/useDeleteResource'
import { useFetchResource } from '@/shared/hooks/useFetchResource'
import { Modal } from '../Modal'

type ActionsColumnProps<T> = {
  rowData: T
  deleteUrl?: (data: T) => string
  onDelete?: (data: T) => void
  onEdit?: (updatedData: T) => void
  label?: string

  editUrl?: (data: T) => string
  EditForm?: React.ComponentType<{ data: T; onSuccess: (updatedData: T) => void }>
}

export function ActionsColumn<T>({
  rowData,
  deleteUrl,
  onDelete,
  onEdit,
  label = '⚙️ Ações',
  editUrl,
  EditForm,
}: ActionsColumnProps<T>) {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)

  const { deleteItem, isDeleting } = useDeleteResource<T>({
    getUrl: deleteUrl!,
    onSuccess: () => {
      setDeleteModalOpen(false)
      onDelete?.(rowData)
    },
  })

  const { data: editData, fetchData, setData: setEditData } = useFetchResource<T>()

  const handleEditOpen = async () => {
    setEditModalOpen(true)
    if (editUrl) {
      await fetchData(editUrl(rowData))
    }
  }

  return (
    <div className="text-left">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="h-8 w-8 p-0 text-white bg-gradient-to-r from-gray-900 to-black hover:from-gray-800 hover:to-gray-900 rounded-md shadow-md"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="bg-gray-900 text-white border border-gray-600 shadow-xl min-w-[180px] rounded-lg"
        >
          <DropdownMenuLabel className="px-3 py-2 text-sm">{label}</DropdownMenuLabel>

          {editUrl && EditForm && (
            <DropdownMenuItem
              onClick={handleEditOpen}
              className="hover:bg-gray-700/50 cursor-pointer px-3 py-2"
            >
              🖉 Editar
            </DropdownMenuItem>
          )}

          {deleteUrl && (
            <DropdownMenuItem
              onClick={() => setDeleteModalOpen(true)}
              className="hover:bg-gray-700/50 cursor-pointer px-3 py-2 text-red-400"
            >
              🗑️ Deletar
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Modal de Deleção */}
      {deleteUrl && (
        <Modal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={() => deleteItem(rowData)}
          title="Confirmar exclusão"
          description="Tem certeza que deseja deletar este item? Essa ação não pode ser desfeita."
          confirmText={isDeleting ? 'Deletando...' : 'Confirmar'}
          cancelText="Cancelar"
          variant="alert"
        />
      )}

      {/* Modal de Edição */}
      {editUrl && EditForm && (
        <Modal
          isOpen={editModalOpen}
          onClose={() => {
            setEditModalOpen(false)
            setEditData(null)
          }}
          title="Editar item"
          variant="form"
          size="xl"
          formId="edit-form"
        >
          {editData ? (
            <EditForm
              data={editData}
              onSuccess={updatedData => {
                setEditModalOpen(false)
                setEditData(null)
                onEdit?.(updatedData)
              }}
            />
          ) : (
            <p className="text-center py-8">Carregando dados...</p>
          )}
        </Modal>
      )}
    </div>
  )
}
