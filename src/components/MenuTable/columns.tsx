import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from '@radix-ui/react-dropdown-menu'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import { Button } from '../ui/button'
import { Menu } from '@/shared/types/menu'

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
      const menu = row.original
      return (
        <div className="text-left">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0 bg-gradient-to-r from-gray-900 to-black text-white hover:from-gray-800 hover:to-gray-900 transition-all duration-200 rounded-md shadow-md"
              >
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-gradient-to-b from-gray-900 to-black text-white border border-gray-600 shadow-xl min-w-[180px] rounded-lg"
            >
              <DropdownMenuLabel className="text-gray-200 font-semibold px-3 py-2 text-sm">
                ⚙️ Ações
              </DropdownMenuLabel>

              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(menu.id.toString())}
                className="text-white hover:bg-gray-700/50 focus:bg-gray-700/50 cursor-pointer px-3 py-2 transition-all duration-150 rounded-sm mx-1"
              >
                <span className="flex items-center gap-2">
                  📋 <span>Copiar ID</span>
                </span>
              </DropdownMenuItem>

              <DropdownMenuItem className="text-white hover:bg-gray-700/50 focus:bg-gray-700/50 cursor-pointer px-3 py-2 transition-all duration-150 rounded-sm mx-1">
                <span className="flex items-center gap-2">
                  🖉 <span>Editar</span>
                </span>
              </DropdownMenuItem>

              <DropdownMenuItem className="text-white hover:bg-gray-700/50 focus:bg-gray-700/50 cursor-pointer px-3 py-2 transition-all duration-150 rounded-sm mx-1">
                <span className="flex items-center gap-2">
                  🗑️ <span>Deletar</span>
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
]
