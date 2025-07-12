'use client'

import { ColumnDef } from '@tanstack/react-table'
import { DailyEvent } from '@/shared/types/daily-event'

export const getUpcomingColumns = (): ColumnDef<DailyEvent>[] => [
  {
    accessorKey: 'id',
    header: () => <div className="text-left">ID</div>,
    cell: ({ row }) => <div className="text-left">{row.getValue('id')}</div>,
  },
  {
    accessorKey: 'name',
    header: () => <div className="text-left">Nome</div>,
    cell: ({ row }) => <div className="text-left">{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'startTime',
    header: () => <div className="text-left">Início</div>,
    cell: ({ row }) => <div className="text-left">{row.getValue('startTime')}</div>,
  },
  {
    accessorKey: 'endTime',
    header: () => <div className="text-left">Término</div>,
    cell: ({ row }) => <div className="text-left">{row.getValue('endTime')}</div>,
  },
  {
  id: 'requirementId',
  header: () => <div className="text-left">ID - Requisito Nutricional</div>,
  cell: ({ row }) => {
    const requirement = row.original.requirement
    return (
      <div className="text-left">
        {requirement ? requirement.id : 'N/A'}
      </div>
      )
    },
  },
]
