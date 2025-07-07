import { ColumnDef } from '@tanstack/react-table'
import { Dish } from '@/shared/types/dish'
import { Routes } from '@/shared/enums/routes'
import { Button } from '../ui/button'
import { ArrowUpDown } from 'lucide-react'
import { ActionsColumn } from '../ActionsColumn/ActionsColumn'
import { DishEditForm } from './DishEditForm'

export const getColumns = (
  onDelete: (dish: Dish) => void,
  onEdit: (dish: Dish) => void
): ColumnDef<Dish>[] => [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Nome <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="text-left font-medium">{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'description',
    header: () => <div className="text-left">Descrição</div>,
    cell: ({ row }) => (
      <div className="text-left max-w-[300px] truncate">{row.getValue('description')}</div>
    ),
  },
  {
    accessorKey: 'foods',
    header: () => <div className="text-left">Ingredientes</div>,
    cell: ({ row }) => {
      const foods = row.original.foods.map(food => food.name)
      return <div className="text-left max-w-[300px] truncate">{foods.join(', ')}</div>
    },
  },
  {
    accessorKey: 'createdAt',
    header: () => <div className="text-left">Criado em</div>,
    cell: ({ row }) => {
      const date = new Date(row.getValue('createdAt')).toLocaleDateString()
      return <div className="text-left">{date}</div>
    },
  },

  {
    accessorKey: 'updatedAt',
    header: () => <div className="text-left">Atualizado em</div>,
    cell: ({ row }) => {
      const date = new Date(row.getValue('updatedAt')).toLocaleDateString()
      return <div className="text-left">{date}</div>
    },
  },

  {
    id: 'actions',
    header: () => <div className="text-left">Ações</div>,
    cell: ({ row }) => (
      <ActionsColumn
        rowData={row.original}
        deleteUrl={data => `${Routes.LIST_DISHES}/${data.id}`}
        onDelete={onDelete}
        editUrl={data => `${Routes.LIST_DISHES}/${data.id}`}
        EditForm={DishEditForm}
        onEdit={onEdit}
      />
    ),
  },
]
