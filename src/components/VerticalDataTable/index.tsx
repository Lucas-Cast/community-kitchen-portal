'use client'

import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface VerticalDataTableProps<TData extends { id: string | number }, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  title?: (row: TData) => string
}

export function VerticalDataTable<TData extends { id: string | number }, TValue>({
  columns,
  data,
  title = (row: TData) => `Item #${row.id}`,
}: Readonly<VerticalDataTableProps<TData, TValue>>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="space-y-4">
      {table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map(row => (
          <Card key={row.id} className="border rounded-lg shadow-sm">
            <CardHeader className="border-b">
              <CardTitle className="text-lg font-semibold">
                {title(row.original)}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid grid-cols-1 gap-2">
                {row.getVisibleCells().map(cell => {

                  const header = table
                    .getHeaderGroups()
                    .flatMap(group => group.headers)
                    .find(h => h.column.id === cell.column.id)

                  return (
                    <div key={cell.id} className="flex justify-between border-b py-2">
                      <span className="font-medium text-gray-700">
                        {header && header.column.columnDef.header
                          ? typeof header.column.columnDef.header === 'string'
                            ? header.column.columnDef.header
                            : flexRender(header.column.columnDef.header, header.getContext())
                          : cell.column.id}
                      </span>
                      <span>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </span>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <Card className="border rounded-lg shadow-sm">
          <CardContent className="pt-6 text-center text-gray-500">
            Nenhum resultado encontrado.
          </CardContent>
        </Card>
      )}
    </div>
  )
}