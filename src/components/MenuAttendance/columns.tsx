import { ColumnDef } from '@tanstack/react-table'
import { ActionsColumn } from '../ActionsColumn/ActionsColumn'
import { Routes } from '@/shared/enums/routes'
import { MenuAttendance } from '@/shared/types/menu-attendance'
import MenuAttendanceForm from './MenuAttendanceForm'

export const columns: ColumnDef<MenuAttendance>[] = [
  {
    accessorKey: 'id',
    header: () => <div className="text-left">ID</div>,
    cell: ({ row }) => <div className="capitalize text-left">{row.getValue('id')}</div>,
  },
  {
    accessorKey: 'menuId',
    header: () => <div className="text-left">Id do Menu</div>,
    cell: ({ row }) => <div className="capitalize text-left">{row.original.menuId}</div>,
  },
  {
    accessorKey: 'customerName',
    header: () => <div className="text-left">Nome do cliente</div>,
    cell: ({ row }) => <div className="font-medium text-left">{row.getValue('customerName')}</div>,
  },
  {
    accessorKey: 'weekDay',
    header: () => <div className="text-left">Dia da semana</div>,
    cell: ({ row }) => <div className="capitalize text-left">{row.getValue('weekDay')}</div>,
  },
  {
    accessorKey: 'attendDate',
    header: () => <div className="text-left">Data de registro</div>,
    cell: ({ row }) => <div className="font-medium text-left">{row.getValue('attendDate')}</div>,
  },
]
