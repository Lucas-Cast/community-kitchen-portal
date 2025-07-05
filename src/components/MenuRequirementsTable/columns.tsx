'use client'

import { ColumnDef } from '@tanstack/react-table'
import { MenuRequirement } from '@/shared/types/menu-requirement'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from '@radix-ui/react-dropdown-menu'
import { Button } from '@/components/ui/button'
import { MoreHorizontal } from 'lucide-react'
import { VerticalDataTable } from '../VerticalDataTable'

export const columns: ColumnDef<MenuRequirement>[] = [
  {
    accessorKey: 'minCalories',
    header: () => <div className="text-left">Mínimo de Calorias (kcal)</div>,
    cell: ({ row }) => <div className="text-left">{row.getValue('minCalories')}</div>,
  },
  {
    accessorKey: 'maxCalories',
    header: () => <div className="text-left">Máximo de Calorias (kcal)</div>,
    cell: ({ row }) => <div className="text-left">{row.getValue('maxCalories')}</div>,
  },
  {
    accessorKey: 'minCarbohydrates',
    header: () => <div className="text-left">Mínimo de Carboidratos (g)</div>,
    cell: ({ row }) => <div className="text-left">{row.getValue('minCarbohydrates')}</div>,
  },
  {
    accessorKey: 'maxCarbohydrates',
    header: () => <div className="text-left">Máximo de Carboidratos (g)</div>,
    cell: ({ row }) => <div className="text-left">{row.getValue('maxCarbohydrates')}</div>,
  },
  {
    accessorKey: 'minProteins',
    header: () => <div className="text-left">Mínimo de Proteínas (g)</div>,
    cell: ({ row }) => <div className="text-left">{row.getValue('minProteins')}</div>,
  },
  {
    accessorKey: 'maxProteins',
    header: () => <div className="text-left">Máximo de Proteínas (g)</div>,
    cell: ({ row }) => <div className="text-left">{row.getValue('maxProteins')}</div>,
  },
  {
    accessorKey: 'minFats',
    header: () => <div className="text-left">Mínimo de Gordura (g)</div>,
    cell: ({ row }) => <div className="text-left">{row.getValue('minFats')}</div>,
  },
  {
    accessorKey: 'maxFats',
    header: () => <div className="text-left">Máximo de Gordura (g)</div>,
    cell: ({ row }) => <div className="text-left">{row.getValue('maxFats')}</div>,
  },
  {
    accessorKey: 'minFiber',
    header: () => <div className="text-left">Mínimo de Fibra (g)</div>,
    cell: ({ row }) => <div className="text-left">{row.getValue('minFiber')}</div>,
  },
  {
    accessorKey: 'maxFiber',
    header: () => <div className="text-left">Máximo de Fibra (g)</div>,
    cell: ({ row }) => <div className="text-left">{row.getValue('maxFiber')}</div>,
  },
  {
    accessorKey: 'minSugar',
    header: () => <div className="text-left">Mínimo de Açucar (g)</div>,
    cell: ({ row }) => <div className="text-left">{row.getValue('minSugar')}</div>,
  },
  {
    accessorKey: 'maxSugar',
    header: () => <div className="text-left">Máximo de Açucar (g)</div>,
    cell: ({ row }) => <div className="text-left">{row.getValue('maxSugar')}</div>,
  },
  {
    accessorKey: 'minSodium',
    header: () => <div className="text-left">Mínimo de Sódio (mg)</div>,
    cell: ({ row }) => <div className="text-left">{row.getValue('minSodium')}</div>,
  },
  {
    accessorKey: 'maxSodium',
    header: () => <div className="text-left">Máximo de Sódio (mg)</div>,
    cell: ({ row }) => <div className="text-left">{row.getValue('maxSodium')}</div>,
  },
  {
    accessorKey: 'isActive',
    header: 'Status',
    cell: ({ row }) => (
      <div className="text-left">
        {row.getValue('isActive') ? '✅ Ativado' : '❌ Desativado'}
      </div>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: () => <div className="text-left">Data de criação</div>,
    cell: ({ row }) => {
      const date = new Date(row.getValue('createdAt')).toLocaleDateString()
      return <div className="text-left">{date}</div>
    },
  },
  {
    accessorKey: 'updatedAt',
    header: () => <div className="text-left">Data de alteração</div>,
    cell: ({ row }) => {
        const date = new Date(row.getValue('updatedAt')).toLocaleDateString()
        return <div className="text-left">{date}</div>
    },
   },
  {
    id: 'actions',
    enableHiding: false,
    header: () => <div className="text-left">Ações</div>,
    cell: ({ row }) => {
      const requirement = row.original
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
                onClick={() => navigator.clipboard.writeText(requirement.id.toString())}
                className="text-white hover:bg-gray-700/50 focus:bg-gray-700/50 cursor-pointer px-3 py-2 transition-all duration-150 rounded-sm mx-1"
              >
                <span className="flex items-center gap-2">📋 Copiar ID</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-white hover:bg-gray-700/50 focus:bg-gray-700/50 cursor-pointer px-3 py-2 transition-all duration-150 rounded-sm mx-1">
                <span className="flex items-center gap-2">🖉 Editar</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-white hover:bg-gray-700/50 focus:bg-gray-700/50 cursor-pointer px-3 py-2 transition-all duration-150 rounded-sm mx-1">
                <span className="flex items-center gap-2">🗑️ Deletar</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
]

interface MenuRequirementTableProps {
  data: MenuRequirement[]
}

export function MenuRequirementTable({ data }: MenuRequirementTableProps) {
  return (
    <VerticalDataTable
      columns={columns}
      data={data}
      title={(row: MenuRequirement) => `Requisito #${row.id}`}
    />
  )
}