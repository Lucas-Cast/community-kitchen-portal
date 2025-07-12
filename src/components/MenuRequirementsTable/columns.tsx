'use client'

import { ColumnDef } from '@tanstack/react-table'
import { MenuRequirement } from '@/shared/types/menu-requirement'
import { ActionsColumn } from '../ActionsColumn/ActionsColumn'
import { Routes } from '@/shared/enums/routes'
import { MenuRequirementEditForm } from './MenuRequirementEditForm'

export const getColumns = (
  onDelete: (menuRequirement: MenuRequirement) => void,
  onEdit: (menuRequirement: MenuRequirement) => void
): ColumnDef<MenuRequirement>[] => [
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
    header: () => <div className="text-left">Mínimo de Açúcar (g)</div>,
    cell: ({ row }) => <div className="text-left">{row.getValue('minSugar')}</div>,
  },
  {
    accessorKey: 'maxSugar',
    header: () => <div className="text-left">Máximo de Açúcar (g)</div>,
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
      const date = new Date(row.getValue('createdAt')).toLocaleDateString('pt-BR')
      return <div className="text-left">{date}</div>
    },
  },
  {
    accessorKey: 'updatedAt',
    header: () => <div className="text-left">Data de alteração</div>,
    cell: ({ row }) => {
      const date = new Date(row.getValue('updatedAt')).toLocaleDateString('pt-BR')
      return <div className="text-left">{date}</div>
    },
  },
  {
  id: 'actions',
  header: () => <div className="text-left">Ações</div>,
  cell: ({ row }) => (
    <ActionsColumn
      rowData={row.original}
      deleteUrl={data => `${Routes.LIST_MENU_REQUIREMENTS}/${data.id}`}
      onDelete={onDelete}
      editUrl={data => `${Routes.LIST_MENU_REQUIREMENTS}/${data.id}`}
      EditForm={MenuRequirementEditForm}
      onEdit={onEdit}
      
    />
    ),
  }
]