'use client'

import { ColumnDef } from '@tanstack/react-table'
import { DailyEvent } from '@/shared/types/daily-event'

export const getUpcomingColumns = (): ColumnDef<DailyEvent>[] => [
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
]
