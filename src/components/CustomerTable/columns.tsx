import { ColumnDef } from '@tanstack/react-table'
import { ActionsColumn } from '../ActionsColumn/ActionsColumn'
import { Customer } from '@/shared/types/customer'

export const getColumns = (
  onDelete: (customer: Customer) => void,
  onEdit: (customer: Customer) => void
): ColumnDef<Customer>[] => [
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
    id: 'actions',
    header: () => <div className="text-left">Ações</div>,
    cell: ({ row }) => (
      <ActionsColumn
        rowData={row.original}
        deleteUrl={data => `/customers/${data.id}`}
        onDelete={onDelete}
      />
    ),
  },
]
