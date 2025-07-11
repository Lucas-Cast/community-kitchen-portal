'use client'

import { ColumnDef } from '@tanstack/react-table'
import { DailyEvent } from '@/shared/types/daily-event'
import { ActionsColumn } from '../ActionsColumn/ActionsColumn'
import { Routes } from '@/shared/enums/routes'
import DailyEventEditForm from './DailyEventEditForm'

export const getColumns = (
  onDelete: (dailyEvent: DailyEvent) => void,
  onEdit: (dailyEvent: DailyEvent) => void
): ColumnDef<DailyEvent>[] => [
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
    header: () => <div className="text-left">Horário de Início</div>,
    cell: ({ row }) => <div className="text-left">{row.getValue('startTime')}</div>,
  },
  {
    accessorKey: 'endTime',
    header: () => <div className="text-left">Horário de Término</div>,
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
  {
    id: 'actions',
    header: () => <div className="text-left">Ações</div>,
    cell: ({ row }) => (
      <ActionsColumn
        rowData={row.original}
        deleteUrl={data => `${Routes.LIST_DAILY_EVENTS}/${data.id}`}
        onDelete={onDelete}
        editUrl={data => `${Routes.LIST_DAILY_EVENTS}/${data.id}`}
        EditForm={DailyEventEditForm}
        onEdit={onEdit}
      />
    ),
  },
]