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
import { Modal } from '../Modal/modal'

type ActionsColumnProps<T> = {
    rowData: T
    onEdit?: (data: T) => void
    deleteUrl?: (data: T) => string
    onDelete?: (data: T) => void
    label?: string
}

export function ActionsColumn<T>({
    rowData,
    onEdit,
    deleteUrl,
    onDelete,        // pega essa prop
    label = '⚙️ Ações',
}: ActionsColumnProps<T>) {
    const [modalOpen, setModalOpen] = useState(false)

    const { deleteItem, isDeleting } = useDeleteResource<T>({
        getUrl: deleteUrl!,
        onSuccess: () => {
            setModalOpen(false)
            onDelete?.(rowData)
        },
    })

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

                    <DropdownMenuItem
                        onClick={() => navigator.clipboard.writeText((rowData as any).id?.toString() || '')}
                        className="hover:bg-gray-700/50 cursor-pointer px-3 py-2"
                    >
                        📋 Copiar ID
                    </DropdownMenuItem>

                    {onEdit && (
                        <DropdownMenuItem
                            onClick={() => onEdit(rowData)}
                            className="hover:bg-gray-700/50 cursor-pointer px-3 py-2"
                        >
                            🖉 Editar
                        </DropdownMenuItem>
                    )}

                    {deleteUrl && (
                        <DropdownMenuItem
                            onClick={() => setModalOpen(true)}
                            className="hover:bg-gray-700/50 cursor-pointer px-3 py-2 text-red-400"
                        >
                            🗑️ Deletar
                        </DropdownMenuItem>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>

            {deleteUrl && (
                <Modal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    onConfirm={() => deleteItem(rowData)}
                    title="Confirmar exclusão"
                    description="Tem certeza que deseja deletar este item? Essa ação não pode ser desfeita."
                    confirmText={isDeleting ? 'Deletando...' : 'Confirmar'}
                    cancelText="Cancelar"
                    variant="alert"
                />
            )}
        </div>
    )
}
