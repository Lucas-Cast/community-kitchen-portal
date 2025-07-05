import { ColumnDef } from '@tanstack/react-table'
import { Dish } from '@/shared/types/dish'
import { Button } from '../ui/button'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from '@radix-ui/react-dropdown-menu'

export const columns: ColumnDef<Dish>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Nome <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="text-left font-medium">{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'description',
    header: () => <div className="text-left">Descrição</div>,
    cell: ({ row }) => <div className="text-left">{row.getValue('description')}</div>,
  },
  {
    accessorKey: 'foods',
    header: () => <div className="text-left">Ingredientes</div>,
    cell: ({ row }) => {
      const foods = row.original.foods.map(food => food.name)
      return <div className="text-left">{foods.join(', ')}</div>
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
    cell: ({ row }) => {
      const dish = row.original
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
              <DropdownMenuLabel className="px-3 py-2 text-sm">⚙️ Ações</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(dish.id.toString())}
                className="hover:bg-gray-700/50 cursor-pointer px-3 py-2"
              >
                📋 Copiar ID
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-gray-700/50 cursor-pointer px-3 py-2">
                🖉 Editar
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-gray-700/50 cursor-pointer px-3 py-2">
                🗑️ Deletar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
]
