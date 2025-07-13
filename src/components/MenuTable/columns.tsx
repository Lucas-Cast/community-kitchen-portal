import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { Button } from '../ui/button'
import { Menu } from '@/shared/types/menu'
import { ActionsColumn } from '../ActionsColumn/ActionsColumn'
import { Routes } from '@/shared/enums/routes'
import CreateMenuForm from './CreateMenuForm'

export const columns: ColumnDef<Menu>[] = [
  {
    accessorKey: 'availableDay',
    header: () => <div className="text-left">Disponibilidade</div>,
    cell: ({ row }) => <div className="capitalize text-left">{row.getValue('availableDay')}</div>,
  },
  {
    accessorKey: 'dailyEvent',
    header: () => <div className="text-left">Refeição</div>,
    cell: ({ row }) => <div className="capitalize text-left">{row.original.dailyEvent.name}</div>,
  },
  {
    accessorKey: 'dishes',
    header: ({ column }) => {
      return (
        <div className="text-left">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Pratos
            <ArrowUpDown />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => (
      <div className="text-left">{row.original.dishes.map(dish => dish.name).join(', ')}</div>
    ),
  },
  {
    accessorKey: 'createdBy',
    header: () => <div className="text-left">Criado por</div>,
    cell: ({ row }) => <div className="font-medium text-left">{row.getValue('createdBy')}</div>,
  },
  {
    accessorKey: 'activationDate',
    header: () => <div className="text-left">Ativado em</div>,
    cell: ({ row }) => (
      <div className="font-medium text-left">{row.getValue('activationDate')}</div>
    ),
  },
  {
    accessorKey: 'deactivationDate',
    header: () => <div className="text-left">Desativado em</div>,
    cell: ({ row }) => (
      <div className="font-medium text-left">{row.getValue('deactivationDate') ?? '-'}</div>
    ),
  },
  {
    id: 'actions',
    enableHiding: false,
    header: () => <div className="text-left">Ações</div>,
    cell: ({ row }) => {
      return (
        <ActionsColumn
          rowData={row.original}
          deleteUrl={data => `${Routes.MENUS}/${data.id}`}
          onDelete={() => window.location.reload()}
          CustomEditForm={<CreateMenuForm data={row.original} />}
          isCustomEdit
        />
      )
    },
  },
]
