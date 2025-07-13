import { ColumnDef } from '@tanstack/react-table'
import { MostFrequentCustomer } from '@/shared/types/most-frequent-customer'

export const getColumns = (): ColumnDef<MostFrequentCustomer>[] => [
  {
    accessorKey: 'name',
    header: () => <div className="text-left">Nome</div>,
    cell: ({ row }) => <div className="text-left font-medium">{row.original.name}</div>,
  },
  {
    accessorKey: 'taxId',
    header: () => <div className="text-left">CPF</div>,
    cell: ({ row }) => <div className="text-left font-medium">{row.original.taxId}</div>,
  },
  {
    accessorKey: 'birthDate',
    header: () => <div className="text-left">Data de Nascimento</div>,
    cell: ({ row }) => {
      const date = new Date(row.original.birthDate)
      const day = String(date.getDate()).padStart(2, '0')
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const year = date.getFullYear()
      const formattedDate = `${day}/${month}/${year}`

      return <div className="text-left font-medium">{formattedDate}</div>
    },
  },
  {
    accessorKey: 'totalAttendences',
    header: () => <div className="text-left">Atendimentos</div>,
    cell: ({ row }) => <div className="text-left font-medium">{row.original.totalAttendences}</div>,
  },
]
